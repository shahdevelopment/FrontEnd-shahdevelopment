// -------------------------------------------------------------- >>
// Default Build Groovy Script
// -------------------------------------------------------------- >>
// -------------------------------------------------------------- >>
// Shah's Portfolio Web Application
// ~
// NPM | Node.JS | Kubernetes | AWS Cloud | Helm | Docker Hub | Jenkins | Sonarqube | GIT | GitHub | KOPS | Bash | Groovy | Slack | Linux Ubuntu | Microservices Design | Authentication | Prometheus | Grafana | RabbitMQ | PostgreSQL | AWS 
// -------------------------------------------------------------->>>
def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]
pipeline {
    agent {label 'ansible'}
    // options {
    //     Reuse the workspace from previous builds
    //     ws("/opt/jenkins-slave/workspace/profile-site-build")
    // }
        // Clean the workspace completely

    environment {
        nameSpace = ""

        // Docker Registry Info
        registry_front = ""
        registry_back = ""
        registry_db = ""
        registryCredentials = ""

        // Workspace Subdirectories
        frontend = ""
        backend = ""
        k8 = ""

        // EndPoints
        app_back_end = ""
        
        // Sonarqube
        SONAR_PROJECT_KEY = ""

        // GitHub Repos
        frontgit = ""
        backgit = ""
        defgit = ""

        // Docker Images
        back_image = ""
        front_image = ""
        db_image = ""

        // Kops
        kubecluster = ""
        s3bucket = ""
        config = ""

        // AWS
        awsregion = ""
        awszones = ""

        // API Keys
        api_maps_key = ""
        auth_jwt_secret = ""
        api_chat_key = ""
        api_email_key = ""

        // // K8s Docker Creds 
        // docker_config_json = ""

        // // SSL
        // ssl_tls_crt = ""
        // ssl_tls_key = ""

        // Node 1
        n1 = ""
        n1_maxS = ""
        n1_minS = ""

        // Node 2
        n2 = ""
        n2_maxS = ""
        n2_minS = ""

        // Master
        m1 = ""
        m1_maxS = ""
        m1_minS = ""

        // Tests
        test_file = ""
        test_result = ""

        // Slack Notifications
        slack_devops = ""
        slack_cluster = ""

        // Postgres
        postgres_user = ""        
        postgres_pass = ""
        postgres_db = ""
        postgres_host = ""

        // Email
        app_admin_email = ""

        NAMESPACE = ""

        ebs_id = ""
        gf_user = ""
        gf_pass = ""
        api_ip = ""
        postgres_exporter = ""
        prometheus_url = ""

        rabbitmq_url = ""
        login_queue = ""
        signup_queue = ""
        jwt_queue = ""
        chat_queue = ""
        user_queue = ""
        email_queue = ""
        posts_queue = ""
        delete_queue = ""
        allposts_queue = ""
        rab_user = ""
        rab_pass = ""

    }
    options { skipDefaultCheckout() }
    stages {
        stage('File Param WA') {
            steps {
                deleteDir()  // This deletes all files and folders in the current workspace

                echo "Workspace after cleanup: ${pwd()}"
                // cleanWs()
                script {
                    echo "------------------------------------"
                    echo "------------------------------------"
                    echo "------------------------------------"
                    // writeFile file: 'env_vars.txt', text: params.environment
                    // configFile = 'env_vars.txt'
                    // configFileContent = readFile configFile
                    // @NonCPS
                    def paramsFile = params.env_vars
                    def parameters = [:]
                    echo "Parameters List......."
                    paramsFile.split('\n').each { String line ->
                        echo "------------------------------------"
                        echo "${line.split('=')[0].trim()}"
                        echo "${line.split('=')[1].trim()}"
                        echo "------------------------------------"
                        parameters["${line.split('=')[0].trim()}"] = "${line.split('=')[1].trim()}"
                    }
                    echo "------------------------------------"
                    // ---------- Docker Configuration
                    nameSpace = parameters['name.space']
                    registry_front = parameters['registry.front']
                    registry_back = parameters['registry.back']
                    registry_db = parameters['registry.db']
                    registryCredentials = parameters['registry.creds']

                    // ---------- Dir Names
                    frontend = parameters['app.frontend']
                    backend = parameters['app.backend']
                    k8 = parameters['app.k8']

                    // ---------- Uknown
                    // front = parameters['service.front']
                    // back = parameters['service.back']

                    // ---------- SonarQube Project Key
                    SONAR_PROJECT_KEY = parameters['sonar.projectkey']

                    // ---------- GitHub Repos
                    frontgit = parameters['git.front']
                    backgit = parameters['git.back']
                    defgit = parameters['git.definition']
                    // echo parameters['git.front']
                    // echo frontgit

                    // ---------- Cluster State Management
                    kubecluster = parameters['kube.url']
                    s3bucket = parameters['s3.bucket']
                    config = parameters['kube.config']

                    // ---------- AWS
                    awsregion = parameters['aws.region']
                    awszones = parameters['aws.zones']

                    // ---------- API Keys
                    api_maps_key = parameters['api.maps_key']
                    auth_jwt_secret = parameters['auth.jwt_secret']
                    api_chat_key = parameters['api.chat_key']
                    api_email_key = parameters['api.email_key']
                    
                    // ---------- SSL
                    // ssl_tls_key = parameters['tls.key']
                    // ssl_tls_crt = parameters['tls.crt']

                    // EndPoints
                    app_back_end = parameters['app.back_end']

                    // ---------- Docker Images
                    back_image = "${registry_back}:v${BUILD_NUMBER}"
                    front_image = "${registry_front}:v${BUILD_NUMBER}"
                    db_image = "${registry_db}:v${BUILD_NUMBER}"

                    // ---------- Node 1
                    n1 = parameters['n1.label']
                    n1_maxS = parameters['n1.maxS']
                    n1_minS = parameters['n1.minS']

                    // ---------- Node 2
                    n2 = parameters['n2.label']
                    n2_maxS = parameters['n2.maxS']
                    n2_minS = parameters['n2.minS']

                    // ---------- Master
                    m1 = parameters['m1.label']
                    m1_maxS = parameters['m1.maxS']
                    m1_minS = parameters['m1.minS']

                    // ---------- Path Operation Testing
                    test_result = parameters['testPath.result']
                    test_file = parameters['testPath.file']

                    // ---------- Slack Notification
                    slack_devops = parameters['slack.devops']
                    slack_cluster = parameters['slack.cluster']

                    // ---------- Postgres
                    postgres_user = parameters['postgres.user']                    
                    postgres_pass = parameters['postgres.pass']
                    postgres_db = parameters['postgres.db']
                    postgres_host = parameters['postgres.host']

                    // Email
                    app_admin_email = parameters['app.admin_email']

                    // PG Backup
                    NAMESPACE = parameters['app.namespace']

                    // ---------- Moved to Pipeline Console Config
                    // ssl_tls_crt = params.ssl_tls_crt
                    // docker_config_json = params.docker_config_json
                    ebs_id = parameters['ebs.id']
                    gf_user = parameters['gf.user']
                    gf_pass = parameters['gf.pass']

                    api_ip = parameters['api.ip']
                    postgres_exporter = parameters['postgres.exporter']
                    prometheus_url = parameters['prometheus.url']

                    rabbitmq_url = parameters['rabbitmq.url']
                    login_queue = parameters['login.queue']
                    signup_queue = parameters['signup.queue']
                    jwt_queue = parameters['jwt.queue']
                    chat_queue = parameters['chat.queue']
                    user_queue = parameters['user.queue']
                    email_queue = parameters['email.queue']
                    posts_queue = parameters['posts.queue']
                    delete_queue = parameters['delete.queue']
                    allposts_queue = parameters['allposts.queue']

                    rab_user = parameters['rab.user']
                    rab_pass = parameters['rab.pass']

                    echo "------------------------------------"
                    echo "------------------------------------"
                    echo "-------------------------------------"
                }
            }
            post {
                always {
                    echo '########## Build Status Notification ##########'
                    slackSend channel: "${slack_devops}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "Build Started: *${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
        stage('System Check') {
            steps {
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
            post {
                always {
                    echo 'Slack Notifications.'
                    slackSend channel: "${slack_devops}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*System Check Completed with Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"                    
                }
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
            post {
                always {
                    echo 'Slack Notifications.'
                    slackSend channel: "${slack_devops}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*GitHub Repo Clone Step with Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"                    
                }
            }                
        }
        stage('PG Backup') {
            steps {
                dir("${backend}") {
                    retry(4) {
                        script {
                            // Run shell command and capture output in a Groovy variable
                            sh "~/kube/./backuppg.sh"

                        }
                    }
                }
            }
            post {
                always {
                    echo '########## Postgres DB Notification ##########'
                    slackSend channel: "${slack_cluster}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*DB backed up with Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
        // stage('Code Sonarqube Analysis') {
        //     environment {
        //         scannerHome = tool 'sonar4.7'
        //     }
        //     steps {
        //         withSonarQubeEnv('sonarqube') {
        //             script {
        //                 sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=${frontend}"
        //                 sh "sleep 1"
        //                 sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.sources=${backend}"
        //             }
        //         }
        //     }
        //     post {
        //         always {
        //             echo 'Slack Notifications.'
        //             slackSend channel: "${slack_devops}",
        //             color: COLOR_MAP[currentBuild.currentResult],
        //             message: "*Sonarqube Code Analysis Step Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"                    
        //         }
        //     }
        // }
        stage('Build Dev Container') {
            steps {
                dir("${frontend}") {
                    script {
                        dockerImage = docker.build("${front_image}", "--build-arg maps_key='${api_maps_key}' --build-arg ENVIRONMENT=dev .")
                        sh 'sleep 1'
                    }
                }
                dir("${backend}") {
                    script {
                        dockerImage = docker.build("${back_image}", "--build-arg chat_key=${api_chat_key} --build-arg ENVIRONMENT=dev --build-arg email_key=${api_email_key} .")
                        sh 'sleep 1'
                    }
                }    
            }
            post {
                always {
                    echo 'Slack Notifications.'
                    slackSend channel: "${slack_devops}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*Dev Docker Build Step Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"                    
                }
            }

        }
        stage('Run Dev Containers') {
            steps{
                script {
                    sh "docker run -dt --name ${backend} -p 9000:9000 ${back_image}"
                    sh 'sleep 5'
                    sh "docker logs ${backend}"
                    sh "docker run -dt --name ${frontend} -p 3000:3000 ${front_image}"
                    sh 'sleep 5'
                    sh "docker logs ${frontend}"
                    sh 'sleep 5'
                }
            }
            post {
                always {
                    echo 'Slack Notifications.'
                    slackSend channel: "${slack_devops}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*Dev Docker Container Run Step Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"                    
                }
            }
            
        }
        stage('Run Path Check on Dev Containers') {
            steps {
                dir("${frontend}") {
                    script {
                        def healthCheckResult = sh(returnStatus: true, script: "docker exec ${frontend} node ${test_file}")
                        if (healthCheckResult != 0) {
                            currentBuild.result = 'UNSTABLE'
                            error("front-Path operation health check failed!")
                        }
                        sh "docker cp ${frontend}:${test_result} ."
                    }
                }
                dir("${backend}") {
                    script {
                        def healthCheckResult = sh(returnStatus: true, script: "docker exec ${backend} node ${test_file}")
                        if (healthCheckResult != 0) {
                            currentBuild.result = 'UNSTABLE'
                            error("front-Path operation health check failed!")
                        }
                        sh "docker cp ${frontend}:${test_result} ."
                    }
                }
            }
            post {
                always {
                    script {
                        sh "docker stop ${backend} ${frontend}"
                        sh "docker rm ${backend} ${frontend} && sleep 10"


                        sh "docker rmi ${back_image} ${front_image}"
                    }
                    echo 'Slack Notifications.'
                    slackSend channel: "${slack_devops}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*Path Check Step Completed with Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"                    
                }
            }
        }
        stage('Docker-Build-Push') {
            steps {
                dir("${backend}") {
                    script {
                        // Postgres
                        dockerImage = docker.build("${db_image}", "--build-arg pg_user=${postgres_user} --build-arg pg_pass=${postgres_pass} --build-arg pg_db=${postgres_db} -f ./db/Dockerfile .")

                        sh 'sleep 1'
                        docker.withRegistry('', registryCredentials) {
                            dockerImage.push("v$BUILD_NUMBER")
                        }  
                        // Backend Server
                        dockerImage = docker.build("${back_image}", "--build-arg chat_key=${api_chat_key} --build-arg admin_email=${app_admin_email} --build-arg email_key='${api_email_key}' --build-arg pg_user=${postgres_user} --build-arg pg_pass=${postgres_pass} --build-arg pg_db=${postgres_db} --build-arg pg_host='${postgres_host}' --build-arg jwt_secret=${auth_jwt_secret} --build-arg rabbitmq_url=${rabbitmq_url} --build-arg login_queue=${login_queue} --build-arg signup_queue=${signup_queue} --build-arg jwt_queue=${jwt_queue} --build-arg chat_queue=${chat_queue} --build-arg user_queue=${user_queue} --build-arg email_queue=${email_queue} --build-arg posts_queue=${posts_queue} --build-arg delete_queue=${delete_queue} --build-arg allposts_queue=${allposts_queue} .")
                        sh 'sleep 1'

                        docker.withRegistry('', registryCredentials) {
                            dockerImage.push("v$BUILD_NUMBER")
                        }                      
                    }
                }                    
                dir("${frontend}") {
                    //     echo " ____   _    _  _____  _       _____       _____  ______  ______  _____   "
                    //     echo "|  _ ) | |  | ||_   _|| |     |  _   |    /   __||__  __||  ____||  __ |  "
                    //     echo "| |_|  | |  | |  | |  | |     | | |  |   |  (_     | |   | |__   | |__| | "
                    //     echo "|  _ | | |  | |  | |  | |     | | |  |    |__  |   | |   |  __|  |  ___/  "
                    //     echo "| |_) || |__| | _| |_ | |____ | |_/  /    ___)  |  | |   | |____ | |      "
                    //     echo "|____/ |_____/ |_____||______||_____/    |_____/   |_|   |______||_|      "
                    script {
                        dockerImage = docker.build("${front_image}", "--build-arg map_key=${api_maps_key} --build-arg jwt_secret=${auth_jwt_secret} --build-arg back_end=${app_back_end} .")
                        sh 'sleep 1'
                        docker.withRegistry('', registryCredentials) {dockerImage.push("v$BUILD_NUMBER")
                        }
                        sh 'sleep 1'
                    }
                }
            }
            post {
                always {
                    script {
                        sh "docker rmi ${back_image} ${front_image} ${db_image}"
                        echo 'Slack Notifications.'
                        slackSend channel: "${slack_devops}",
                        color: COLOR_MAP[currentBuild.currentResult],
                        message: "*Docker Build & Push Production Step Completed with Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL} \n *Logs:* \n ${currentBuild.rawBuild.getLog(1000)}"
                    }        
                }
            }
        }
        // stage('Kube Cluster Scale/Connect') {
        //     steps {
        //         dir("${k8}") {
        //             script {
        //                 sh """
        //                     echo "------------------------------------"
        //                     ~/kube/default-scale
        //                 """
        //             }
        //         }
        //     }
        //     post {
        //         always {
        //             echo '########## Cluster Health Notification ##########'
        //             slackSend channel: "${slack_cluster}",
        //             color: COLOR_MAP[currentBuild.currentResult],
        //             message: "*Cluster Scaled with Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
        //         }
        //     }
        // }
        stage('Application-Deployment') {
            steps {
                dir("${k8}") {
                    script {
                        def ca_cer = sh(script: "grep certificate-authority-data ~/.kube/config | awk '{print \$2}'", returnStdout: true).trim()
                        def cl_key = sh(script: "grep client-key-data ~/.kube/config | awk '{print \$2}'", returnStdout: true).trim()
                        def cl_cer = sh(script: "grep client-certificate-data ~/.kube/config | awk '{print \$2}'", returnStdout: true).trim()
                        // echo "helm install my-app ./helm/profilecharts --set backimage=${back_image} --set frontimage=${front_image} --set pgimage=${db_image} --set docker_configjson=${docker_config_json} --set tls_crt=${ssl_tls_crt} --set tls_key=${ssl_tls_key} --set back_end=${app_back_end} --set ht_pass=${ht_pass} --set ca_crt=${ca_cert} --set client_cert=${client_cert} --set client_key=${client_key} --set gfUser=${gf_user} --set gfPass=${gf_pass} --set ebsId=${ebs_id}"
                        sh 'echo ------------------------------------' 
                        sh "~/kube/envVarsSet.sh ${api_ip} ${postgres_exporter} ${prometheus_url}"
                        sh '/bin/bash move.sh'
                        sh 'echo ------------------------------------'
                        sh "kubectl delete all --all -n ${nameSpace}"
                        sh 'echo ------------------------------------'
                        retry(3) { // Retry up to 3 times
                            sh "helm upgrade --install my-app ./helm/profilecharts --set backimage=${back_image} --set frontimage=${front_image} --set pgimage=${db_image} --set docker_configjson=${docker_config_json} --set tls_crt=${ssl_tls_crt} --set tls_key=${ssl_tls_key} --set back_end=${app_back_end} --set ht_pass=${ht_pass} --set ca_crt=${ca_cer} --set client_cert=${cl_cer} --set client_key=${cl_key} --set gfUser=${gf_user} --set gfPass=${gf_pass} --set ebsId=${ebs_id} --set rabUser=${rab_user} --set rabPass=${rab_pass}"
                        }
                    }
                }
            }
            post {
                always {
                    script {
                        echo 'Slack Notifications.'
                        slackSend channel: "${slack_devops}",
                        color: COLOR_MAP[currentBuild.currentResult],
                        message: "*Build Completed with Result - ${currentBuild.currentResult}:* \n Job ${env.JOB_NAME} \n build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL} \n *Logs:* \n ${currentBuild.rawBuild.getLog(1000)}"
                    }
                }
            }
        }
        stage('Set Local Environment Variables') {
            steps {
                script {
                    def envVars = [
                        "buildNumber": "${env.BUILD_NUMBER}",
                        "dockerConfigJson": "${docker_config_json}",
                        // "tlsCert": "${ssl_tls_crt}",
                        // "tlsKey": "${ssl_tls_key}",
                        "backEnd": "${app_back_end}",
                        "htPass": "${ht_pass}",
                        "caCert": "${ca_cert}",
                        "clientCert": "${client_cert}",
                        "clientKey": "${client_key}",
                        "gfUser": "${gf_user}",
                        "gfPass": "${gf_pass}",
                        "ebsId": "${ebs_id}",
                        "rabUser": "${rab_user}",
                        "rabPass": "${rab_pass}"
                    ]
                    
                    // Path to the environment file to modify
                    def envFile = "/etc/environment"

                    // Backup the file for safety
                    sh "sudo cp ${envFile} ${envFile}.bak"

                    // Read the current environment file
                    def envFileContent = sh(script: "sudo cat ${envFile}", returnStdout: true).trim()

                    // Update or add environment variables
                    envVars.each { key, value ->
                        if (envFileContent.contains("${key}=")) {
                            // Replace existing variable
                            envFileContent = envFileContent.replaceAll(/(?m)^${key}=.*$/, "${key}=${value}")
                        } else {
                            // Add new variable
                            envFileContent += "\n${key}=${value}"
                        }
                    }

                    // Write the updated environment file
                    sh "echo '${envFileContent}' | sudo tee ${envFile}"

                    // Reload the environment file
                    sh ". .${envFile}"
                }
            }
        }
        stage('PG Restore') {
            steps {
                dir("${backend}") {
                    script {
                        sh 'sleep 60'
                        sh "~/kube/./restorepg.sh"
                    }
                }
            }
            post {
                always {
                    echo '########## Postgres DB Notification ##########'
                    slackSend channel: "${slack_cluster}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*DB restored with Result - ${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
    }
}

