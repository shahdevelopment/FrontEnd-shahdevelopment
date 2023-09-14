def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]
pipeline {
    agent {label 'ansible'}
    // options {
        // // Reuse the workspace from previous builds
        // ws("/opt/jenkins-slave/workspace/profile-site-build")
    // }
    options { skipDefaultCheckout() }
    environment {
        registry_front = "shahdevelopment/kube"
        registry_back = "shahdevelopment/kube_back"
        registryCredentials = 'dockerhub'
        
        frontend = 'profile_front'
        backend = 'profile_backend'
        k8 = 'k8s-definitions'

        front = 'front-end-service'
        back = 'back-end-service'

        SONAR_PROJECT_KEY = 'profile-site-nodejs'
        scannerHome = tool 'sonar4.7'

        frontgit = 'git@github.com:Shah0373/profile_front.git'
        backgit = 'git@github.com:Shah0373/profile_backend.git'
        defgit = 'git@github.com:Shah0373/k8s-definitions.git'

        back_image_name="$registry_back" + ":v$BUILD_NUMBER"
        front_image_name="$registry_front" + ":v$BUILD_NUMBER"
    }
    stages {
        stage('clean-workspace') {
            steps {
                cleanWs()
                sh '''
                    echo Gather info
                    echo --------------------------------------------------------------------
                    echo --------------------------------------------------------------------
                    echo
                    free -h -t
                    echo
                    echo --------------------------------------------------------------------
                    echo
                    df -h
                    echo
                    echo --------------------------------------------------------------------
                    echo
                    whoami
                    echo
                    echo --------------------------------------------------------------------
                    echo
                    docker ps
                    echo
                    echo --------------------------------------------------------------------
                    echo
                    docker images
                    echo
                    echo --------------------------------------------------------------------
                    echo --------------------------------------------------------------------
                '''
            }
        }
        stage('project-clone') {
            steps {
                    script {
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${frontend}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone ${frontgit} ."
                                    }
                                }
                            }
                        }
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${backend}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone ${backgit} ."
                                    }
                                }
                            }
                        }
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${k8}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone ${defgit} ."
                                    }
                                }
                            }
                        }
                    }
            }    
        }
        stage('sonarqube Analysis') {
            // environment {
            //     scannerHome = tool 'sonar4.7'
            // }
            steps {
                withSonarQubeEnv('sonarqube') {
                    script {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=${frontend}"
                        sh "sleep 1"
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=${backend}"
                    }
                }
            }
        }
        stage('docker-build-dev') {
            steps {
                dir("${frontend}") {
                    script {
                        dockerImage = docker.build("$registry_front" + ":v$BUILD_NUMBER", "--build-arg ENVIRONMENT=dev .")
                        sh 'sleep 1'
                    }
                }
                dir("${backend}") {
                    script {
                        dockerImage = docker.build("$registry_back" + ":v$BUILD_NUMBER", "--build-arg ENVIRONMENT=dev .")
                        sh 'sleep 1'
                    }
                }    
            }
        }
        stage('run container') {
            steps{
                script {
                    sh "docker run -dt --name ${backend} -p 9000:9000 ${registry_back}:v${BUILD_NUMBER}"
                    sh 'sleep 5'
                    sh "backcont=${docker service ls | grep ${backend} | awk {'print $1'}} && docker service logs $backcont"
                    sh "docker run -dt --name ${frontend} -p 3000:3000 ${registry_front}:v${BUILD_NUMBER}"
                    sh 'sleep 5'
                    sh "frontcont=${docker service ls | grep ${frontend} | awk {'print $1'}} && docker service logs $frontcont"
                    sh 'sleep 5'
                }
            }
        }
        stage('test') {
            steps {
                dir("${frontend}") {
                    script {
                        def healthCheckResult = sh(returnStatus: true, script: "docker exec ${frontend} node dev/tests/path-check.js")
                        if (healthCheckResult != 0) {
                            currentBuild.result = 'UNSTABLE'
                            error("front-Path operation health check failed!")
                        }
                        // sh 'docker exec -it ${frontend} npm test'
                        sh'docker cp ${frontend}:/usr/src/app/npm-tests/report.json .'
                    }
                }
                dir("${backend}") {
                    script {
                        def healthCheckResult = sh(returnStatus: true, script: "docker exec ${backend} node dev/tests/path-check.js")
                        if (healthCheckResult != 0) {
                            currentBuild.result = 'UNSTABLE'
                            error("front-Path operation health check failed!")
                        }
                        // sh 'docker exec -it ${frontend} npm test'
                        sh 'docker cp ${frontend}:/usr/src/app/npm-tests/report.json .'
                    }
                }
            }
            post {
                always {
                    script {
                        sh '/home/ansible/jenkins/./docker-rm-vm.sh'
                        sh '''
                            set +e
                            /home/ansible/jenkins/./docker-rmi.sh
                            set -e
                        '''
                        // sh "vm=('${backend}' '${frontend}')" 
                        // sh "image=('${back_image_name}' '${front_image_name}')"
                        // sh '''
                        //     echo #########################################################################################################
                        //     echo Cleaning local test containers..........
                        //     echo #########################################################################################################                            
                        //     for i in "${vm[@]}"
                        //     do
                        //         docker kill $i
                        //         docker rm $i
                        //     done
                        // '''
                        // sh '''
                        //     echo #########################################################################################################
                        //     echo Cleaning local test images..........
                        //     echo #########################################################################################################
                        //     for i in "${image[@]}"
                        //     do
                        //         docker rmi $i
                        //     done
                        // '''  
                    }
                }
            }
        }
        // stage('frontend-echoove-image') {
        //     steps{
        //         script {
        //             sh "docker stop ${frontend} && docker rm ${frontend}"
        //             sh "docker stop ${backend} && docker rm ${backend}"
        //             sh "sleep 2"
        //             sh "docker rmi $registry_front:v$BUILD_NUMBER"
        //             sh "docker rmi $registry_back:v$BUILD_NUMBER "
        //         }
        //     }
        // }
        stage('docker-build') {
            steps {
                dir("${frontend}") {
                    //     echo " ____   _    _  _____  _       _____       _____  ______  ______  _____   "
                    //     echo "|  _ ) | |  | ||_   _|| |     |  _   |    /   __||__  __||  ____||  __ |  "
                    //     echo "| |_|  | |  | |  | |  | |     | | |  |   |  (_     | |   | |__   | |__| | "
                    //     echo "|  _ | | |  | |  | |  | |     | | |  |    |__  |   | |   |  __|  |  ___/  "
                    //     echo "| |_) || |__| | _| |_ | |____ | |_/  /    ___)  |  | |   | |____ | |      "
                    //     echo "|____/ |_____/ |_____||______||_____/    |_____/   |_|   |______||_|      "
                    script {
                        dockerImage = docker.build("$registry_front" + ":v$BUILD_NUMBER")
                        sh 'sleep 1'
                        docker.withRegistry('', registryCredentials) {dockerImage.push("v$BUILD_NUMBER")
                        }
                        sh 'sleep 1'
                    }
                }
                dir("${backend}") {
                    script {
                        dockerImage = docker.build("$registry_back" + ":v$BUILD_NUMBER")
                        sh 'sleep 1'

                        docker.withRegistry('', registryCredentials) {
                            dockerImage.push("v$BUILD_NUMBER")
                        }
                    }
                }    
            }
            post {
                always {
                    script {
                        sh '''
                            set +e
                            /home/ansible/jenkins/./docker-rmi.sh
                            set -e
                        '''                        // sh "image=('${back_image_name}' '${front_image_name}')"
                        // sh '''
                        //     echo #########################################################################################################
                        //     echo Cleaning local prod images.
                        //     echo #########################################################################################################
                        //     for i in "${image[@]}"
                        //     do
                        //         docker rmi $i
                        //     done
                        // '''
                    }
                }
            }
        }
        // stage('remove-dev-dependencies') {
        //     steps{
        //         sh '''
        //             sudo /bin/bash /opt/jenkins-slave/workspace/scripts/npm-dev-cln.sh                
        //         '''
        //     }
        // }
        stage('kubernetes-clustervalidation') {
            steps {
                dir("${k8}") {
                    script {
                        sh '''
                            echo Validating cluster...............
                            echo ##########################################################################################################################################################
                            echo ##########################################################################################################################################################

                            set +e
                            kubectl get pods -n profile-site
                            profilesiteoutput=$?
                            kubectl get pods -n ingress-nginx
                            ingressnginxoutput=$?
                            set -e

                            echo ##########################################################################################################################################################
                            if [ "$profilesiteoutput" -ne 0 ] || [ "$ingressnginxoutput" -ne 0 ]
                            then
                                echo Updating cluster....................
                                echo ##########################################################################################################################################################
                                kops update cluster --config=/home/ansible/.kube/config --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --yes --admin
                                
                                set +e
                                kubectl get pods -n profile-site
                                profilesiteoutput=$?
                                kubectl get pods -n ingress-nginx
                                ingressnginxoutput=$?
                                set -e

                                if [ "$profilesiteoutput" -ne 0 ] || [ "$ingressnginxoutput" -ne 0 ]
                                then
                                    set +e
                                    /home/ansible/kube/./default-scale
                                    set -e

                                    timeout_duration=600  # Specify timeout duration in seconds
                                    start_time=$(date +%s)
                                    elapsed_time=0

                                    until [ "$profilesiteoutput" == 0 ] && [ "$ingressnginxoutput" == 0 ]
                                    do
                                        if [ "$elapsed_time" -ge "$timeout_duration" ]
                                        then
                                            echo "Timeout reached"
                                            break
                                        fi
                                        echo Checking cluster availability..............................................
                                        echo ##########################################################################################################################################################
                                        
                                        set +e
                                        kops validate cluster --config=/home/ansible/.kube/config --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --time 1m 2>/dev/null
                    
                                        kubectl get pods -n profile-site
                                        profilesiteoutput=$?

                                        kubectl get pods -n ingress-nginx
                                        ingressnginxoutput=$?
                                        set -e
                                        
                                        elapsed_time=$($elapsed_time + 60)
                                        echo Time Elapsed: $elapsed_time seconds......
                                    done

                                    set +e
                                    kubectl get pods -n profile-site
                                    profilesiteoutput = $?
                                    kubectl get pods -n ingress-nginx
                                    ingressnginxoutput = $?
                                    set -e

                                    if [ "$profilesiteoutput" -ne 0 ] || [ "$ingressnginxoutput" -ne 0 ]
                                    then
                                        echo Cluster update failed. Temporarily unable to resolve endpoint.
                                        if [ "$profilesiteoutput" -ne 0]
                                        then
                                            echo profilesite namespace failed to update.
                                        fi
                                        if [ "$ingressnginxoutput" -ne 0]
                                        then
                                            echo Nginx ingress controller failed to update.
                                        fi
                                        echo ##########################################################################################################################################################
                                        echo ##########################################################################################################################################################
                                        echo Diagnostic info:
                                        echo ------------------------------------------------------------------------------------------------------------------------------
                                        echo ------------------------------------------------------------------------------------------------------------------------------
                                        set +e
                                        kubectl get all
                                        echo ------------------------------------------------------------------------------------------------------------------------------
                                        kubectl get nodes
                                        echo ------------------------------------------------------------------------------------------------------------------------------
                                        kops validate cluster --config=/home/ansible/.kube/config --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001
                                        echo ------------------------------------------------------------------------------------------------------------------------------
                                        kubectl describe all -n profile-site
                                        echo ------------------------------------------------------------------------------------------------------------------------------
                                        kubectl describe all -n ingress-nginx
                                        set -e
                                        break
                                    fi
                                else
                                    echo Cluster is now up and runnning!
                                fi
                            else
                                echo Cluster is runnning!
                            fi
                        '''
                    }
                }
            }
            post {
                always {
                    echo '########## Cluster Health Notification ##########'
                    slackSend channel: '#kube-cluster-health',
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
        stage('kubernetes-deploy') {
            steps {
                dir("${k8}") {
                    sh "/bin/bash move.sh"
                    sh "helm upgrade my-app ./helm/profilecharts --set backimage=${registry_back}:v${BUILD_NUMBER} --set frontimage=${registry_front}:v${BUILD_NUMBER}"
                    // the below is for a fresh deploy
                    // helm upgrade --install --force my-app helm/profilecharts --set backimage=${registry_back}:v${BUILD_NUMBER} --set frontimage=${registry_front}:v${BUILD_NUMBER}
                    sh '''
                        set +x
                        echo B                  
                        echo B                                ▓▓▓▓▒▒▒▒▒▒                      
                        echo B                              ▓▓▓▓▒▒▒▒▒▒▓▓▒▒▓▓                  
                        echo B                            ▓▓▓▓▓▓░░░░░░▓▓▓▓▓▓                  
                        echo B                          ▓▓▓▓▓▓░░░░░░░░░░▓▓▓▓▓▓                
                        echo B                          ▓▓▓▓░░░░░░░░░░░░▓▓▓▓▓▓                
                        echo B                    ░░    ▓▓▓▓░░░░░░░░░░░░░░▓▓▓▓                
                        echo B                    ░░░░  ▓▓▓▓░░░░░░░░░░░░░░▓▓▓▓▓▓              
                        echo B                    ░░░░    ▓▓░░░░░░░░░░░░██▓▓▓▓▓▓              
                        echo B                    ░░░░░░  ▓▓██░░░░░░░░▒▒██▓▓▓▓▓▓              
                        echo B                      ░░░░  ▓▓▓▓██▒▒░░▒▒░░██▓▓▓▓                
                        echo B                        ░░  ░░▓▓░░░░░░░░░░░░░░▓▓                
                        echo B                        ░░  ▒▒░░░░░░░░░░░░░░▓▓░░░░              
                        echo B                      ░░░░  ▒▒░░░░▒▒░░░░░░▓▓░░░░░░░░            
                        echo B                      ░░░░▓▓░░░░▒▒░░░░░░▓▓░░░░░░░░░░            
                        echo B                    ░░░░▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓░░░░▒▒░░░░            
                        echo B                    ░░░░▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓░░  ░░░░            
                        echo B                    ░░░░░░▓▓▓▓░░░░░░▓▓▓▓▓▓░░    ░░░░            
                        echo B                    ░░░░░░  ░░░░░░░░░░░░░░      ░░░░            
                        echo B                            ░░░░░░░░░░░░▒▒      ░░░░░░          
                        echo B                            ░░░░░░░░░░░░░░░░      ░░░░░░        
                        echo B                            ░░░░░░░░░░░░░░░░░░░     ░░░░░░      
                        echo B                            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ░░░░░░    
                        echo B                            ▓▓▓▓▓▓░░░░░░░░░░░░░░▓▓    ░░░░    
                        echo B                            ▓▓░░░░░░░░░░░░░░░░░░▒▒    ░░░░░░  
                        echo B                            ░░░░░░░░░░░░░░░░░░░░░      ░░  ░░  
                        echo B                            ░░░░░░░░░░░░░░░░░░         ░░    ░░
                        echo B                          ░░░░░░░░░░░░░░░░░░                    
                        echo B                        ░░░░░░░░░░░░░░░░░░░░                    
                        echo B                        ░░░░░░░░░░░░░░░░░░░░                    
                        echo B                      ░░░░░░░░░░░░░░░░░░░░░░                    
                        echo B                    ░░░░░░░░░░░░░░░░░░░░░░░░                    
                        echo B                  ░░░░░░░░░░░░░░░░░░░░░░░░░░                    
                        echo B                  ░░░░░░░░░░░░░░░░░░░░░░░░    ░░░░              
                        echo B                  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░          
                        echo B                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      
                        echo B                                  ░░░░░░░░                      
                        echo B                                  ░░░░░░░░░░                    
                        echo B                                  ░░░░░░░░░░                    
                        echo B                                  ░░░░░░░░░░                    
                        echo B                                    ░░░░░░░░                    
                        echo B                                    ░░░░░░░░                    
                        echo B                                    ░░░░░░                      
                        echo B                                    ░░░░░░                      
                        echo B                                    ░░░░░░                      
                        echo B                                    ░░░░                        
                        echo B                                    ░░░░                        
                        echo B                                  ░░░░░░                        
                        echo B                            ▒▒░░░░░░░░░░░░        
                        set -x
                    ''' //
                }
            }
            post {
                always {
                    echo 'Slack Notifications.'
                    slackSend channel: '#devopsbuilds',
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
    }  
}