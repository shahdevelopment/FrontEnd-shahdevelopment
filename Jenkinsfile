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
    }
    stages {
        // stage('setup test') {
        //     steps {
        //         sh '''
        //             sudo /bin/bash /opt/jenkins-slave/workspace/scripts/npm-dev-dep.sh
        //         '''
        //     }
        // }
        stage('project-clone') {
            steps {
                cleanWs()
                withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                    script {
                        retry(4) {
                            dir("${frontend}") {
                                sshagent(['gitsshkey']) {
                                    sh "git clone ${frontgit} ."
                                }
                            }
                        }
                        retry(4) {
                            dir("${backend}") {
                                sshagent(['gitsshkey']) {
                                    sh "git clone ${backgit} ."
                                }
                            }
                        }
                        retry(4) {
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
                    sh 'sleep 1'
                    sh "docker run -dt --name ${frontend} -p 3000:3000 ${registry_front}:v${BUILD_NUMBER} && sleep 20"
                }
            }
        }
        stage('Test') {
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
                    sh "echo Testing complete."
                }
            }
        }
        stage('frontend-echoove-image') {
            steps{
                script {
                    sh "docker stop ${frontend} && docker rm ${frontend}"
                    sh "docker stop ${backend} && docker rm ${backend}"
                    sh "sleep 2"
                    sh "docker rmi $registry_front:v$BUILD_NUMBER"
                    sh "docker rmi $registry_back:v$BUILD_NUMBER "
                }
            }
        }
        stage('docker-build') {
            steps {
                dir("${frontend}") {
                    sh '''
                        echo  ____   _    _  _____  _       _____      _____  _______  ______  _____"
                        echo |  _ ) | |  | ||_   _|| |     |  _   |    /   __||__   __||  ____||  __ |"
                        echo | |_|  | |  | |  | |  | |     | | |  |   |  (_     | |   | |__   | |__| |"
                        echo |  _ | | |  | |  | |  | |     | | |  |    |__  |   | |   |  __|  |  ___/"
                        echo | |_) || |__| | _| |_ | |____ | |_/  /    ___)  |  | |   | |____ | |"
                        echo |____/ |_____/ |_____||______||_____/    |_____/   |_|   |______||_|"
                    '''
                    script {
                        dockerImage = docker.build("$registry_front" + ":v$BUILD_NUMBER")
                        sh 'sleep 1'

                        docker.withRegistry('', registryCredentials) {
                            dockerImage.push("v$BUILD_NUMBER")
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
        }
        // stage('remove-dev-dependencies') {
        //     steps{
        //         sh '''
        //             sudo /bin/bash /opt/jenkins-slave/workspace/scripts/npm-dev-cln.sh                
        //         '''
        //     }
        // }
        stage('kubernetes-deploy') {
            steps {
                dir("${k8}") {
                    sh '''
                        kubectl get pods -n profile-site
                        if
                    '''
                    sh 'kops update cluster --name=kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --yes --admin'
                    sh "/bin/bash move.sh"
                    sh "helm upgrade my-app ./helm/profilecharts --set backimage=${registry_back}:v${BUILD_NUMBER} --set frontimage=${registry_front}:v${BUILD_NUMBER}"
                    // the below is for a fresh deploy
                    // helm upgrade --install --force my-app helm/profilecharts --set backimage=${registry_back}:v${BUILD_NUMBER} --set frontimage=${registry_front}:v${BUILD_NUMBER}
                    
                    sh '''
                        echo                  
                        echo                                ▓▓▓▓▒▒▒▒▒▒                      
                        echo                              ▓▓▓▓▒▒▒▒▒▒▓▓▒▒▓▓                  
                        echo                            ▓▓▓▓▓▓░░░░░░▓▓▓▓▓▓                  
                        echo                          ▓▓▓▓▓▓░░░░░░░░░░▓▓▓▓▓▓                
                        echo                          ▓▓▓▓░░░░░░░░░░░░▓▓▓▓▓▓                
                        echo                    ░░    ▓▓▓▓░░░░░░░░░░░░░░▓▓▓▓                
                        echo                    ░░░░  ▓▓▓▓░░░░░░░░░░░░░░▓▓▓▓▓▓              
                        echo                    ░░░░    ▓▓░░░░░░░░░░░░██▓▓▓▓▓▓              
                        echo                    ░░░░░░  ▓▓██░░░░░░░░▒▒██▓▓▓▓▓▓              
                        echo                      ░░░░  ▓▓▓▓██▒▒░░▒▒░░██▓▓▓▓                
                        echo                        ░░  ░░▓▓░░░░░░░░░░░░░░▓▓                
                        echo                        ░░  ▒▒░░░░░░░░░░░░░░▓▓░░░░              
                        echo                      ░░░░  ▒▒░░░░▒▒░░░░░░▓▓░░░░░░░░            
                        echo                      ░░░░▓▓░░░░▒▒░░░░░░▓▓░░░░░░░░░░            
                        echo                    ░░░░▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓░░░░▒▒░░░░            
                        echo                    ░░░░▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓░░  ░░░░            
                        echo                    ░░░░░░▓▓▓▓░░░░░░▓▓▓▓▓▓░░    ░░░░            
                        echo                    ░░░░░░  ░░░░░░░░░░░░░░      ░░░░            
                        echo                            ░░░░░░░░░░░░▒▒      ░░░░░░          
                        echo                            ░░░░░░░░░░░░░░░░      ░░░░░░        
                        echo                            ░░░░░░░░░░░░░░░░░░      ░░░░░░      
                        echo                            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ░░░░░░    
                        echo                            ▓▓▓▓▓▓░░░░░░░░░░░░░░▓▓    ░░░░    
                        echo                            ▓▓░░░░░░░░░░░░░░░░░░▒▒    ░░░░░░  
                        echo                            ░░░░░░░░░░░░░░░░░░░░░      ░░  ░░  
                        echo                            ░░░░░░░░░░░░░░░░░░         ░░    ░░
                        echo                          ░░░░░░░░░░░░░░░░░░                    
                        echo                        ░░░░░░░░░░░░░░░░░░░░                    
                        echo                        ░░░░░░░░░░░░░░░░░░░░                    
                        echo                      ░░░░░░░░░░░░░░░░░░░░░░                    
                        echo                    ░░░░░░░░░░░░░░░░░░░░░░░░                    
                        echo                  ░░░░░░░░░░░░░░░░░░░░░░░░░░                    
                        echo                  ░░░░░░░░░░░░░░░░░░░░░░░░    ░░░░              
                        echo                  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░          
                        echo                    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      
                        echo                                  ░░░░░░░░                      
                        echo                                  ░░░░░░░░░░                    
                        echo                                  ░░░░░░░░░░                    
                        echo                                  ░░░░░░░░░░                    
                        echo                                    ░░░░░░░░                    
                        echo                                    ░░░░░░░░                    
                        echo                                    ░░░░░░                      
                        echo                                    ░░░░░░                      
                        echo                                    ░░░░░░                      
                        echo                                    ░░░░                        
                        echo                                    ░░░░                        
                        echo                                  ░░░░░░                        
                        echo                            ▒▒░░░░░░░░░░░░        
                    '''      
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