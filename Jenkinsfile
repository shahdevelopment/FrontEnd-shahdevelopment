node {
    stage('File Param WA') {
        script {
            writeFile file: 'env-var', text: params.environment
            configFile = './env-var'
            configFileContent = readFile configFile

            def parameters = [:]
            
            
            configFileContent.eachLine { line ->
                def parts = line.split('=')
                if (parts.size() == 2) {
                    def paramName = parts[0].trim()
                    def paramValue = parts[1].trim()
                    parameters[paramName] = paramValue
                }
            }
            
            registry_front="${parameters['registry.front']}"
            sh "echo ${registry_front}"
            registry_back="${parameters['registry.back']}"
            sh "echo ${registry_back}"
            registryCredentials="${parameters['registry.creds']}"
            sh "echo ${registryCredentials}"
            
            frontend="${parameters['app.frontend']}"
            sh "echo ${frontend}"
            backend="${parameters['app.backend']}"
            sh "echo ${backend}"
            k8="${parameters['kube.k8']}"
            sh "echo ${k8}"
            
            front="${parameters['service.front']}"
            sh "echo ${front}"
            back="${parameters['service.back']}"
            sh "echo ${back}"
            
            SONARPROJECT_KEY="${parameters['sonar.projectkey']}"
            sh "echo ${SONARPROJECT_KEY}"
            scannerHome="${parameters['sonar.scannerhome']}"
            sh "echo ${scannerHome}"
            
            frontgit="${parameters['git.front']}"
            sh "echo ${frontgit}"
            backgit="${parameters['git.back']}"
            sh "echo ${backgit}"
            defgit="${parameters['git.definition']}"
            sh "echo ${defgit}"
            
            back_image_name="${parameters['image.back']}"
            sh "echo ${back_image_name}"
            front_image_name="${parameters['image.front']}"
            sh "echo ${front_image_name}"
            
            kubecluster="${parameters['kube.url']}"
            sh "echo ${kubecluster}"
            s3bucket="${parameters['s3.bucket']}"
            sh "echo ${s3bucket}"
            config="${parameters['kube.config']}"
            sh "echo ${config}"
            
            awsregion="${parameters['aws.region']}"
            sh "echo ${awsregion}"
            awszones="${parameters['aws.zones']}"
            sh "echo ${awszones}"

            api_maps_key="${parameters['api.maps_key']}"
            sh "echo ${api_maps_key}"
            api_chat_key="${parameters['api.chat_key']}"
            sh "echo ${api_chat_key}"
            
            docker_config_json="${parameters['docker.configjson']}"
            sh "echo ${docker_config_json}"
            
            ssl_tls_crt="${parameters['tls.crt']}"
            sh "echo ${ssl_tls_crt}"
            ssl_tls_key="${parameters['tls.key']}"
            sh "echo ${ssl_tls_key}"




            // registry_front = (configFileContent =~ /^registry\.front=(.*)$/).size() > 0 ? (configFileContent =~ /^registry\.front=(.*)$/)[0][1] : null

            // registry_back = (configFileContent =~ /^registry\.back=(.*)$/).size() > 0 ? (configFileContent =~ /^registry\.back=(.*)$/)[0][1] : null
            // registryCredentials = (configFileContent =~ /^registry\.creds=(.*)$/).size() > 0 ? (configFileContent =~ /^registry\.creds=(.*)$/)[0][1] : null
            
            // frontend = (configFileContent =~ /^app\.frontend=(.*)$/).size() > 0 ? (configFileContent =~ /^app\.frontend=(.*)$/)[0][1] : null
            // backend = (configFileContent =~ /^app\.backend=(.*)$/).size() > 0 ? (configFileContent =~ /^app\.backend=(.*)$/)[0][1] : null
            // k8 = (configFileContent =~ /^kube\.k8=(.*)$/).size() > 0 ? (configFileContent =~ /^kube\.k8=(.*)$/)[0][1] : null
            
            // front = (configFileContent =~ /^service\.front=(.*)$/).size() > 0 ? (configFileContent =~ /^service\.front=(.*)$/)[0][1] : null
            // back = (configFileContent =~ /^service\.back=(.*)$/).size() > 0 ? (configFileContent =~ /^service\.back=(.*)$/)[0][1] : null
            
            // SONARPROJECT_KEY = (configFileContent =~ /^sonar\.projectkey=(.*)$/).size() > 0 ? (configFileContent =~ /^sonar\.projectkey=(.*)$/)[0][1] : null
            // scannerHome = (configFileContent =~ /^sonar\.scannerhome=(.*)$/).size() > 0 ? (configFileContent =~ /^sonar\.scannerhome=(.*)$/)[0][1] : null
            
            // frontgit = (configFileContent =~ /^git\.front=(.*)$/).size() > 0 ? (configFileContent =~ /^git\.front=(.*)$/)[0][1] : null
            // backgit = (configFileContent =~ /^git\.back=(.*)$/).size() > 0 ? (configFileContent =~ /^git\.back=(.*)$/)[0][1] : null
            // defgit = (configFileContent =~ /^git\.def=(.*)$/).size() > 0 ? (configFileContent =~ /^git\.def=(.*)$/)[0][1] : null
            
            // back_image_name = (configFileContent =~ /^image\.back=(.*)$/).size() > 0 ? (configFileContent =~ /^image\.back=(.*)$/)[0][1] : null
            // front_image_name = (configFileContent =~ /^image\.front=(.*)$/).size() > 0 ? (configFileContent =~ /^image\.front=(.*)$/)[0][1] : null
            
            // kubecluster = (configFileContent =~ /^kube\.url=(.*)$/).size() > 0 ? (configFileContent =~ /^kube\.url=(.*)$/)[0][1] : null
            // s3bucket = (configFileContent =~ /^s3\.bucket=(.*)$/).size() > 0 ? (configFileContent =~ /^s3\.bucket=(.*)$/)[0][1] : null
            // config = (configFileContent =~ /^kube\.config=(.*)$/).size() > 0 ? (configFileContent =~ /^kube\.config=(.*)$/)[0][1] : null
            
            // awsregion = (configFileContent =~ /^aws\.region=(.*)$/).size() > 0 ? (configFileContent =~ /^aws\.region=(.*)$/)[0][1] : null
            // awszones = (configFileContent =~ /^aws\.zones=(.*)$/).size() > 0 ? (configFileContent =~ /^aws\.zones=(.*)$/)[0][1] : null
            
            // api_maps_key = (configFileContent =~ /^api\.maps_key=(.*)$/).size() > 0 ? (configFileContent =~ /^api\.maps_key=(.*)$/)[0][1] : null
            // api_chat_key = (configFileContent =~ /^api\.chat_key=(.*)$/).size() > 0 ? (configFileContent =~ /^api\.chat_key=(.*)$/)[0][1] : null
            
            // docker_config_json = (configFileContent =~ /^docker\.configjson=(.*)$/).size() > 0 ? (configFileContent =~ /^docker\.configjson=(.*)$/)[0][1] : null
            
            // ssl_tls_crt = (configFileContent =~ /^tls\.crt=(.*)$/).size() > 0 ? (configFileContent =~ /^tls\.crt=(.*)$/)[0][1] : null
            // ssl_tls_key = (configFileContent =~ /^tls\.key=(.*)$/).size() > 0 ? (configFileContent =~ /^tls\.key=(.*)$/)[0][1] : null




        }
    }
}
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
        stage('Clean Workspace & System Check') {
            steps {
                cleanWs()
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