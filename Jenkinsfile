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
    environment {
        // Docker Registry Info
        registry_front = ""
        registry_back = ""
        registryCredentials = ""

        // Workspace Subdirectories
        frontend = ""
        backend = ""
        k8 = ""
        
        // Unknown
        // front = ""
        // back = ""

        // Sonarqube
        SONARPROJECT_KEY = ""
        scannerHome = tool 'sonar4.7'

        // GitHub Repos
        frontgit = ""
        backgit = ""
        defgit = ""
        // Docker Images
        // back_image_name = ""
        // front_image_name = ""
        back_image_name="$registry_back" + ":v$BUILD_NUMBER"
        front_image_name="$registry_front" + ":v$BUILD_NUMBER"

        // Kops
        kubecluster = ""
        s3bucket = ""
        config = ""

        // AWS
        awsregion = ""
        awszones = ""

        // API Keys
        api_maps_key = ""
        api_chat_key = ""

        // K8s Docker Creds 
        // docker_config_json = ""

        // SSL
        // ssl_tls_crt = ""
        ssl_tls_key = ""
    }
    options { skipDefaultCheckout() }
    // parameters {
    //     file(name: './envvar', description: 'Key-Value Pair File')
    // }
    stages {
        // stage('Cluster-Delete') {
        //     steps {
        //         dir("${k8}") {
        //             script {
        //                 sh '''
        //                     echo ----------//---------------------//---------------------------
        //                     echo ----------//---------------------//---------------------------
        //                     echo "Deleting Deployment........."
        //                 '''
        //                 sh """
        //                     set +e
        //                     kops delete cluster --region=${awsregion} --config=${config} --name ${kubecluster} --state=${s3bucket} --yes && sleep 30
        //                     set -e
        //                 """
        //             }
        //         }
        //     }
        // }
        stage('File Param WA') {
            steps {
                cleanWs()
                script {
                    // writeFile file: 'env_vars.txt', text: params.environment
                    // sh '''
                    //     chmod +x env_vars.sh
                    //     . ./env_vars.sh
                    //     echo $registry_back
                    //     echo $registry_front
                    // '''
                    // configFile = 'env_vars.txt'
                    // configFileContent = params.environment
                    // configFileContent = readFile configFile
                    @NonCPS
                    def paramsFile = params.env_vars
                    def parameters = [:]
                    paramsFile.each { String line ->
                        parameters["${line.split('=')[0].trim()}"] = "${line.split('=')[1].trim()}"
                    }
                    echo "Registry Front: ${parameters['registry.front']}"
                    echo "Registry Back: ${parameters['registry.back']}"

                    registry_front = parameters['registry.front']
                    registry_back = parameters['registry.back']

                    echo "Registry Front: ${registry_front}"
                    echo "Registry Back: ${registry_back}"

                    // registryCredentials = parameters['registry.creds']
                    
                    // frontend = parameters['app.frontend']
                    // backend = parameters['app.backend']
                    // k8 = parameters['kube.k8']
                    
                    // front = parameters['service.front']
                    // back = parameters['service.back']
                    
                    // SONARPROJECT_KEY = parameters['sonar.projectkey']
                    // // scannerHome = parameters['sonar.scannerhome']
                    
                    // frontgit = parameters['git.front']
                    // echo parameters['git.front']
                    // echo frontgit
                    // backgit = parameters['git.back']
                    // defgit = parameters['git.definition']
                    
                    // back_image_name = parameters['image.back']
                    // front_image_name = parameters['image.front']
                    
                    // kubecluster = parameters['kube.url']
                    // s3bucket = parameters['s3.bucket']
                    // config = parameters['kube.config']
                    
                    // awsregion = parameters['aws.region']
                    // awszones = parameters['aws.zones']

                    // api_maps_key = parameters['api.maps_key']
                    // api_chat_key = parameters['api.chat_key']
                    
                    // docker_config_json = parameters['docker.configjson']
                    
                    // ssl_tls_crt = parameters['tls.crt']
                    // ssl_tls_key = parameters['tls.key']
                }

            }
        }
        stage('System Check') {
            steps {
                // cleanWs()
                sh '''
                    echo "Gathering resource info on ansible control plane........."
                    echo --------------------------------------------------------------------
                    echo --------------------------------------------------------------------
                    free -h -t
                    echo --------------------------------------------------------------------
                    df -h
                    echo --------------------------------------------------------------------
                    whoami
                    echo --------------------------------------------------------------------
                    docker ps
                    echo --------------------------------------------------------------------
                    docker images
                    echo --------------------------------------------------------------------
                    echo --------------------------------------------------------------------
                '''
            }
        }
        stage('Clone Github Repos') {
            steps {
                    script {
                        echo frontgit
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${frontend}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone $frontgit ."
                                    }
                                }
                            }
                        }
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${backend}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone $backgit ."
                                    }
                                }
                            }
                        }
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${k8}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone $defgit ."
                                    }
                                }
                            }
                        }
                    }
            }    
        }
        stage('Code Sonarqube Analysis') {
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
        stage('Build Test Container') {
            steps {
                dir("${frontend}") {
                    script {
                        dockerImage = docker.build("$registry_front" + ":v$BUILD_NUMBER", "--build-arg maps_key=${api_maps_key} --build-arg ENVIRONMENT=dev  .")
                        sh 'sleep 1'
                    }
                }
                dir("${backend}") {
                    script {
                        dockerImage = docker.build("$registry_back" + ":v$BUILD_NUMBER", "--build-arg chat_key=${api_chat_key} --build-arg ENVIRONMENT=dev .")
                        sh 'sleep 1'
                    }
                }    
            }
        }
        stage('Run Test Containers') {
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
        stage('Run Path Check on Test Containers') {
            steps {
                dir("${frontend}") {
                    script {
                        def healthCheckResult = sh(returnStatus: true, script: "docker exec ${frontend} node dev/tests/path-check.js")
                        if (healthCheckResult != 0) {
                            currentBuild.result = 'UNSTABLE'
                            error("front-Path operation health check failed!")
                        }
                        // sh 'docker exec -it ${frontend} npm test'
                        sh 'docker cp ${frontend}:/usr/src/app/npm-tests/report.json .'
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
        stage('Docker-Build') {
            steps {
                dir("${frontend}") {
                    //     echo " ____   _    _  _____  _       _____       _____  ______  ______  _____   "
                    //     echo "|  _ ) | |  | ||_   _|| |     |  _   |    /   __||__  __||  ____||  __ |  "
                    //     echo "| |_|  | |  | |  | |  | |     | | |  |   |  (_     | |   | |__   | |__| | "
                    //     echo "|  _ | | |  | |  | |  | |     | | |  |    |__  |   | |   |  __|  |  ___/  "
                    //     echo "| |_) || |__| | _| |_ | |____ | |_/  /    ___)  |  | |   | |____ | |      "
                    //     echo "|____/ |_____/ |_____||______||_____/    |_____/   |_|   |______||_|      "
                    script {
                        dockerImage = docker.build("$registry_front" + ":v$BUILD_NUMBER", "--build-arg maps_key=${api_maps_key} .")
                        sh 'sleep 1'
                        docker.withRegistry('', registryCredentials) {dockerImage.push("v$BUILD_NUMBER")
                        }
                        sh 'sleep 1'
                    }
                }
                dir("${backend}") {
                    script {
                        dockerImage = docker.build("$registry_back" + ":v$BUILD_NUMBER", "--build-arg chat_key=${api_chat_key} .")
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
        // stage('Cluster-Deployment') {
        //     steps {
        //         dir("${k8}") {
        //             script {
        //                 sh '''
        //                     echo ----------//---------------------//---------------------------
        //                     echo ----------//---------------------//---------------------------
        //                     echo "Attempting Deployment..............."
        //                 '''
        //                 sh "kops create cluster --config=${config} --name=${kubecluster} --state=${s3bucket} --zones=${awszones} --node-count=2 --node-size=t3.medium --master-size=t3.medium --dns-zone=${kubecluster} --node-volume-size=15 --master-volume-size=15 && sleep 2"
        //                 sh "echo ----------//---------------------//---------------------------"
        //                 sh "kops update cluster --config=${config} --name ${kubecluster} --state=${s3bucket} --yes --admin && sleep 2"
        //                 sh "echo ----------//---------------------//---------------------------"
        //                 sh """
        //                     set +e
        //                     kops validate cluster --config=${config} --name=${kubecluster} --state=${s3bucket} --wait 20m --count 5 && sleep 2
        //                     set -e
        //                 """
        //                 sh '''
        //                     echo ----------//---------------------//---------------------------
        //                     echo ----------//---------------------//---------------------------
        //                 '''
        //             }
        //         }
        //     }
        //     post {
        //         always {
        //             echo '########## Cluster Health Notification ##########'
        //             slackSend channel: '#kube-cluster-health',
        //             color: COLOR_MAP[currentBuild.currentResult],
        //             message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
        //         }
        //     }
        // }
        stage('Application-Deployment') {
            steps {
                dir("${k8}") {
                    sh "/home/ansible/kube/./default-scale"
                    sh "/bin/bash move.sh"
                    sh "helm upgrade my-app ./helm/profilecharts --set backimage=${registry_back}:v${BUILD_NUMBER} --set frontimage=${registry_front}:v${BUILD_NUMBER} --set docker_configjson=${docker_config_json} --set tls_crt=${ssl_tls_crt} --set tls_key=${ssl_tls_key}"
                    // sh "helm upgrade --install --force --kubeconfig=${config} my-app ./helm/profilecharts --set backimage=${registry_back}:v${BUILD_NUMBER} --set frontimage=${registry_front}:v${BUILD_NUMBER}"

                    sh '''
                    sleep 240
                    if [ $? -eq 0 ]; then
                        echo "Cluster is now up and running!"
                        echo "Please add DNS entry for:"
                        aws elbv2 describe-load-balancers | grep DNSName
                    else
                        echo Cluster not running after 15m!
                    fi
                    '''

                    sh '''
                        set +x
                        echo B                  
                        echo B "                               ▓▓▓▓▒▒▒▒▒▒                      "
                        echo B "                             ▓▓▓▓▒▒▒▒▒▒▓▓▒▒▓▓                  "
                        echo B "                           ▓▓▓▓▓▓░░░░░░▓▓▓▓▓▓                  "
                        echo B "                         ▓▓▓▓▓▓░░░░░░░░░░▓▓▓▓▓▓                "
                        echo B "                         ▓▓▓▓░░░░░░░░░░░░▓▓▓▓▓▓                "
                        echo B "                   ░░    ▓▓▓▓░░░░░░░░░░░░░░▓▓▓▓                "
                        echo B "                   ░░░░  ▓▓▓▓░░░░░░░░░░░░░░▓▓▓▓▓▓              "
                        echo B "                   ░░░░    ▓▓░░░░░░░░░░░░██▓▓▓▓▓▓              "
                        echo B "                   ░░░░░░  ▓▓██░░░░░░░░▒▒██▓▓▓▓▓▓              "
                        echo B "                     ░░░░  ▓▓▓▓██▒▒░░▒▒░░██▓▓▓▓                "
                        echo B "                       ░░  ░░▓▓░░░░░░░░░░░░░░▓▓                "
                        echo B "                       ░░  ▒▒░░░░░░░░░░░░░░▓▓░░░░              "
                        echo B "                     ░░░░  ▒▒░░░░▒▒░░░░░░▓▓░░░░░░░░            "
                        echo B "                     ░░░░▓▓░░░░▒▒░░░░░░▓▓░░░░░░░░░░            "
                        echo B "                   ░░░░▒▒▓▓▒▒▓▓▓▓▓▓▓▓▓▓▓▓░░░░▒▒░░░░            "
                        echo B "                   ░░░░▓▓▓▓▓▓▓▓░░▓▓▓▓▓▓▓▓▓▓░░  ░░░░            "
                        echo B "                   ░░░░░░▓▓▓▓░░░░░░▓▓▓▓▓▓░░    ░░░░            "
                        echo B "                   ░░░░░░  ░░░░░░░░░░░░░░      ░░░░            "
                        echo B "                           ░░░░░░░░░░░░▒▒      ░░░░░░          "
                        echo B "                           ░░░░░░░░░░░░░░░░      ░░░░░░        "
                        echo B "                           ░░░░░░░░░░░░░░░░░░░     ░░░░░░      "
                        echo B "                           ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ░░░░░░    "
                        echo B "                           ▓▓▓▓▓▓░░░░░░░░░░░░░░▓▓    ░░░░    "
                        echo B "                           ▓▓░░░░░░░░░░░░░░░░░░▒▒    ░░░░░░  "
                        echo B "                           ░░░░░░░░░░░░░░░░░░░░░      ░░  ░░  "
                        echo B "                           ░░░░░░░░░░░░░░░░░░         ░░    ░░"
                        echo B "                         ░░░░░░░░░░░░░░░░░░                    "
                        echo B "                       ░░░░░░░░░░░░░░░░░░░░                    "
                        echo B "                       ░░░░░░░░░░░░░░░░░░░░                    "
                        echo B "                     ░░░░░░░░░░░░░░░░░░░░░░                    "
                        echo B "                   ░░░░░░░░░░░░░░░░░░░░░░░░                    "
                        echo B "                 ░░░░░░░░░░░░░░░░░░░░░░░░░░                    "
                        echo B "                 ░░░░░░░░░░░░░░░░░░░░░░░░    ░░░░              "
                        echo B "                 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░          "
                        echo B "                   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░      "
                        echo B "                                 ░░░░░░░░                      "
                        echo B "                                 ░░░░░░░░░░                    "
                        echo B "                                 ░░░░░░░░░░                    "
                        echo B "                                 ░░░░░░░░░░                    "
                        echo B "                                   ░░░░░░░░                    "
                        echo B "                                   ░░░░░░░░                    "
                        echo B "                                   ░░░░░░                      "
                        echo B "                                   ░░░░░░                      "
                        echo B "                                   ░░░░░░                      "
                        echo B "                                   ░░░░                        "
                        echo B "                                   ░░░░                        "
                        echo B "                                 ░░░░░░                        "
                        echo B "                           ▒▒░░░░░░░░░░░░        "
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