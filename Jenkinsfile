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

        timeout_duration=960
        elapsed_time=1
        condition1_met='false'
        // condition2_met='false'
    }
    stages {
        stage('clean-workspace') {
            steps {
                cleanWs()
                sh '''
                    echo "Gathering resource info on ansible control plane........."
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
                    sh "docker logs ${backend}"
                    sh "docker run -dt --name ${frontend} -p 3000:3000 ${registry_front}:v${BUILD_NUMBER}"
                    sh 'sleep 5'
                    sh "docker logs ${frontend}"
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
        stage('kubernetes-clustervalidation') {
            steps {
                dir("${k8}") {
                    script {
                        sh "export timeout_duration=${timeout_duration} && echo $timeout_duration"
                        sh "export elapsed_time=${elapsed_time} && echo $elapsed_time"
                        sh "export start_time=$SECONDS && echo $start_time"
                        sh "condition1_met=${condition1_met} && echo $condition1_met"
                        // sh "condition2_met=${condition2_met} && echo $condition2_met"
                        sh '''
                        echo ##########################################################################################################################################################
                        echo ##########################################################################################################################################################
                        '''
                        sh '''
                            set +e
                            kubectl get pods -n profile-site && proSite=$?
                            kubectl get pods -n ingress-nginx && ingNginx=$?
                            
                            echo ##########################################################################################################################################################
                            if [ "$proSite" -ne 0 ] || [ "$ingNginx" -ne 0 ]; then
                                kops update cluster --config=/home/ansible/.kube/config --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --yes --admin
                                kubectl get pods -n profile-site && proSite=$?
                                kubectl get pods -n ingress-nginx && ingNginx=$?

                                if [ "$proSite" -ne 0 ] || [ "$ingNginx" -ne 0 ]; then
                                    /home/ansible/kube/./default-scale && sleep 2
                                    sleep 1
                                    echo "Checking cluster availability.............................................."
                                    while ! $condition1_met; do
                                        # && ! $condition2_met; do
                                        echo ----------//----------------------------------------------------------------------------------------//---------------------------
                                        echo ----------//----------------------------------------------------------------------------------------//---------------------------
                                        if [ $elapsed_time -gt "$timeout_duration" ]; then
                                            echo "Timeout reached"
                                            kubectl get pods -n profile-site && proSite=$?
                                            kubectl get pods -n ingress-nginx && ingNginx=$?

                                            echo Cluster update failed. Temporarily unable to resolve endpoint.
                                            if [ "$proSite" -ne 0]; then
                                                echo profile-site namespace failed to update.
                                            fi
                                            if [ "$ingNginx" -ne 0]; then
                                                echo ingress-nginx namespace failed to update.
                                            fi
                                            echo
                                            echo ----------//----------------------------------------------------------------------------------------//---------------------------                                    
                                            echo Diagnostic info:
                                            echo ###################################################################################################
                                            kubectl get all
                                            echo ###################################################################################################
                                            kubectl get nodes
                                            echo ###################################################################################################
                                            kops validate cluster --config=/home/ansible/.kube/config --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 && sleep 3
                                            echo ###################################################################################################
                                            kubectl describe all -n profile-site
                                            echo ###################################################################################################
                                            kubectl describe all -n ingress-nginx
                                            echo ----------//----------------------------------------------------------------------------------------//---------------------------
                                            echo ----------//----------------------------------------------------------------------------------------//---------------------------
                                        else
                                            set +e
                                            echo ###################################################################################################
                                            kops validate cluster --config=/home/ansible/.kube/config --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 && sleep 3
                                            echo ###################################################################################################
                                            
                                            kubectl get pods -n profile-site && proSite=$?
                                            kubectl get pods -n ingress-nginx && ingNginx=$?

                                            if [ "$proSite" -eq 0 ] && [ "$ingNginx" -eq 0 ]; then
                                                condition1_met=true
                                            # if [ $ingNginx -eq 0 ]; then
                                                # condition2_met=true
                                            fi
                                        fi
                                        elapsed_time=$((SECONDS-start_time))
                                        set -e
                                        echo 'Elapsed time: $elapsed_time seconds'
                                        echo ----------//----------------------------------------------------------------------------------------//---------------------------
                                        echo ----------//----------------------------------------------------------------------------------------//---------------------------                                    
                                    done
                                else
                                    echo Cluster is running!
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