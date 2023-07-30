pipeline {
    agent any
    environment {
        registry_front = "shahdevelopment/kube"
        registry_back = "shahdevelopment/kube_back"
        registryCredentials = 'dockerhub'
        GITHUB_SSH_CREDENTIALS = 'gitsshkey'
        SONAR_PROJECT_KEY = 'profile-site-nodejs'
        frontend = 'profile_front'
        backend = 'profile_back'
    }
    stages {
        stage('frontend-clone') {
            steps {
                script {
                        withCredentials([sshUserPrivateKey(credentialsId: env.GITHUB_SSH_CREDENTIALS, keyFileVariable: 'SSH_KEY')]) {
                        // Clone the GitHub repository using the SSH key
                            sh 'ssh-agent bash -c "ssh-add $SSH_KEY; git clone git@github.com:Shah0373/profile_front.git"'
                        }
                }
            }
        }

        stage('frontend-build') {
            steps {
                script {
                    dir("${frontend}") {
                        npm install
                    }
                }
            }
        }
        stage('frontend-sonarqube ') {
            environment {
                scannerHome = tool 'sonar4.7'
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    dir("${frontend}") {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=."
                    }
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
        stage('frontend-kubernetes-deploy') {
            agent {label 'KOPS'}
                steps {
                    sh "helm upgrade --install --force my-app helm/profilecharts --set front-image=${registry_front}:V${BUILD_NUMBER}"
                }
        }
        stage('backend-clone') {
            steps {
                script {
                        withCredentials([sshUserPrivateKey(credentialsId: env.GITHUB_SSH_CREDENTIALS, keyFileVariable: 'SSH_KEY')]) {
                            // Clone the GitHub repository using the SSH key
                            sh 'ssh-agent bash -c "ssh-add $SSH_KEY; git clone git@github.com:Shah0373/profile_back.git"'
                        }
                }
            }
        }
        stage('backend-build') {
            steps {
                script {
                    dir("${backend}") {
                        npm install
                    }
                }
            }
        }
        stage('backend-sonarqube') {
            environment {
                scannerHome = tool 'sonar4.7'
            }
            steps {
                withSonarQubeEnv('sonarqube') {
                    dir("${backend}") {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=."
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
        stage('backend-kubernetes-deploy') {
            agent {label 'KOPS'}
                steps {
                    sh "helm upgrade --install --force my-app helm/profilecharts --set back-image=${registry_back}:V${BUILD_NUMBER}"
                }
        }
    }  
}