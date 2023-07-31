def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]
pipeline {
    agent any
    environment {
        registry_front = "shahdevelopment/kube"
        registry_back = "shahdevelopment/kube_back"
        registryCredentials = 'dockerhub'
        GITHUB_SSH_CREDENTIALS = 'gitsshkey'
        SONAR_PROJECT_KEY = 'profile-site-nodejs'
        frontend = 'profile_front'
        backend = 'profile_backend'
        scannerHome = tool 'sonar4.7'
        k8 = 'k8s-definitions'
    }
    stages {
        stage('frontend-clone') {
            steps {
                script {
                        withCredentials([sshUserPrivateKey(credentialsId: env.GITHUB_SSH_CREDENTIALS, keyFileVariable: 'SSH_KEY')]) {
                        // Clone the GitHub repository using the SSH key
                            sh '''
                                rm -rf *
                                ssh-agent bash -c "ssh-add $SSH_KEY; git clone git@github.com:Shah0373/profile_front.git"
                            '''
                        }
                }
            }
        }
        // stage('frontend-build') {
        //     steps {
        //         sh '''
        //             cd ${frontend}
        //             rm package-lock.json
        //             rm package.json
        //             npm cache clean --force
        //             npm init -y
        //             cd ..
        //             cd ${frontend}
        //             npm install express
        //             npm install nedb
        //             npm install dotenv
        //         '''
        //     }
        // }
        stage('frontend-sonarqube ') {
            // environment {
            //     scannerHome = tool 'sonar4.7'
            // }
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=${frontend}/"
                }
            }
        }
        stage('frontend-docker-build') {
            steps {
                script {
                    dir("${frontend}") {
                        dockerImage = docker.build registry_front + ":v$BUILD_NUMBER"
                    }
                }    
            }
        }
        stage('frontend-upload-image') {
            steps {
                script{
                    docker.withRegistry('', registryCredentials) {
                        dockerImage.push("v$BUILD_NUMBER")
                    }
                }   
            }
        }
        stage('frontend-remove-image') {
            steps{
                sh "docker rmi $registry_front:v$BUILD_NUMBER "
            }
        }
        stage('kubernetes-pull') {
            agent {label 'KOPS'}
                steps {
                    script {
                        withCredentials([sshUserPrivateKey(credentialsId: env.GITHUB_SSH_CREDENTIALS, keyFileVariable: 'SSH_KEY')]) {
                        // Clone the GitHub repository using the SSH key
                            sh '''
                                rm -rf *
                                eval $(ssh-agent)
                                ssh-agent bash -c "ssh-add $SSH_KEY; git clone git@github.com:Shah0373/k8s-definitions.git"
                            '''
                        }
                    }
                }
        }
        // stage('frontend-kubernetes-deploy') {
        //     agent {label 'KOPS'}
        //         steps {
        //             dir("${k8}") {
        //                 sh "kops update cluster --name kubecluster.shahdevelopment.tech --state=s3://kubedevops001 --yes --admin"
        //             }
        //         }
        // }
        stage('backend-clone') {
            steps {
                script {
                        withCredentials([sshUserPrivateKey(credentialsId: env.GITHUB_SSH_CREDENTIALS, keyFileVariable: 'SSH_KEY')]) {
                            // Clone the GitHub repository using the SSH key
                            sh 'ssh-agent bash -c "ssh-add $SSH_KEY; git clone git@github.com:Shah0373/profile_backend.git"'
                        }
                }
            }
        }
        // stage('backend-build') {
        //     steps {
        //         script {
        //             dir("${backend}") {
        //                 npm ci
        //             }
        //         }
        //     }
        // }
        stage('backend-sonarqube') {
            // environment {
            //     scannerHome = tool 'sonar4.7'
            // }
            steps {
                withSonarQubeEnv('sonarqube') {
                    dir("${backend}") {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=${backend}/"
                    }
                }
            }
        }
        stage('backend-docker-build') {
            steps {
                script {
                    dir("${backend}") {
                        dockerImage = docker.build registry_back + ":v$BUILD_NUMBER"
                    }
                }    
            }
        }
        stage('backend-upload-image'){
            steps {
                script{
                    docker.withRegistry('', registryCredentials) {
                        dockerImage.push("v$BUILD_NUMBER")
                    }
                }   
            }
        }
        stage('backend-remove-image') {
            steps{
                sh "docker rmi $registry_back:v$BUILD_NUMBER "
            }
        }
        stage('kubernetes-deploy') {
            agent {label 'KOPS'}
                steps {
                    dir("${k8}") {
                        sh '''
                            /bin/bash secret.sh
                            helm upgrade --install --force my-app helm/profilecharts --set back-image=${registry_back}:v${BUILD_NUMBER} --set front-image=${registry_front}:v${BUILD_NUMBER}
                        '''
                    }
                }
                post {
                always {
                    echo 'Slack Notifications.'
                    slackSend channel: '#devopsbuilds',
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NMUBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
    }  
}