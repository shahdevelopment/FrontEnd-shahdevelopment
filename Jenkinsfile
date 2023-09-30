def COLOR_MAP = [
    'SUCCESS': 'good', 
    'FAILURE': 'danger',
]
// ------------------------ Good for PI
pipeline {
    agent {label 'ansible'}
    // options {
    //     Reuse the workspace from previous builds
    //     ws("/opt/jenkins-slave/workspace/profile-site-build")
    // }
    environment {
        // Docker Registry Info
        registry_front = ""
        registry_back = ""
        registry_postgres = ""
        registry_mem = ""
        registry_rab = ""

        registryCredentials = ""

        // Workspace Subdirectories
        frontend = ""
        backend = ""
        k8 = ""
        postgres = ""
        memcache = ""
        rabbit = ""

        
        // Sonarqube
        SONAR_PROJECT_KEY = ""

        // GitHub Repos
        frontgit = ""
        backgit = ""
        defgit = ""
        rabgit = ""
        memgit = ""
        postgit = ""

        // Docker Images
        back_image = ""
        front_image = ""
        post_image = ""
        mem_image = ""
        rab_image = ""

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

        // // K8s Docker Creds 
        // docker_config_json = ""

        // // SSL
        // ssl_tls_crt = ""

        ssl_tls_key = ""

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

        // PostgreSQL
        postgres_db = ""
        postgres_user = ""
        postgres_pass = ""

        // RabbitMQ
        rabbitmq_user = ""
        rabbitmq_host = ""
        rabbitmq_pass = ""
    }
    // ------------------------ Good for PI
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
        // ------------------------ Good for PI
        stage('File Param WA') {
            steps {
                cleanWs()
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
                    registry_front = parameters['registry.front']
                    registry_back = parameters['registry.back']
                    registry_postgres = parameters['registry.postgres']
                    registry_mem = parameters['registry.mem']
                    registry_rab = parameters['registry.rab']

                    // Good

                    // ---------- Dir Names
                    frontend = parameters['app.frontend']
                    backend = parameters['app.backend']
                    k8 = parameters['app.k8']
                    memcache = parameters['app.mem']
                    postgres = parameters['app.postgres']
                    rabbit = parameters['app.rab']

                    // ---------- Docker Images
                    back_image = "${registry_back}:v${BUILD_NUMBER}"
                    front_image = "${registry_front}:v${BUILD_NUMBER}"
                    post_image = "${registry_postgres}:v${BUILD_NUMBER}"
                    mem_image = "${registry_mem}:v${BUILD_NUMBER}"
                    rab_image = "${registry_rab}:v${BUILD_NUMBER}"

                    // ---------- GitHub Repos
                    frontgit = parameters['git.front']
                    backgit = parameters['git.back']
                    defgit = parameters['git.definition']
                    rabgit = parameters['git.rabbit']
                    memgit = parameters['git.mem']
                    postgit = parameters['git.postgres']

                    // ---------- SonarQube Project Key
                    SONAR_PROJECT_KEY = parameters['sonar.projectkey']
                    registryCredentials = parameters['registry.creds']


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
                    api_chat_key = parameters['api.chat_key']
                    
                    // ---------- SSL
                    ssl_tls_key = parameters['tls.key']


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

                    // ---------- PostgreSQL
                    postgres_db = parameters['postgres.db']
                    postgres_user = parameters['postgres.user']
                    postgres_pass = parameters['postgres.pass']

                    // ---------- RabbitMQ
                    rabbitmq_user = parameters['rabbitmq.user']
                    rabbitmq_host = parameters['rabbitmq.host']
                    rabbitmq_pass = parameters['rabbitmq.pass']

                    // ---------- Moved to Pipeline Console Config
                    // ssl_tls_crt = params.ssl_tls_crt
                    // docker_config_json = params.docker_config_json
                    echo "------------------------------------"
                    echo "------------------------------------"
                    echo "------------------------------------"
                }
            }
        }
        // ------------------------ Good for PI
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
        }
        // ------------------------ Good for PI
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
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${rabbit}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone $rabgit ."
                                    }
                                }
                            }
                        }
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${memcache}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone $memgit ."
                                    }
                                }
                            }
                        }
                        retry(4) {
                            withCredentials([sshUserPrivateKey(credentialsId: 'gitsshkey', keyFileVariable: 'SSH_KEY')]) {
                                dir("${postgres}") {
                                    sshagent(['gitsshkey']) {
                                        sh "git clone $postgit ."
                                    }
                                }
                            }
                        }
                    }
            }    
        }
        // ------------------------ Good for PI
        stage('Code Sonarqube Analysis') {
            environment {
                scannerHome = tool 'sonar4.7'
            }
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
        // ------------------------ Good for PI
        stage('Build Test Container') {
            steps {
                dir("${frontend}") {
                    script {
                        dockerImage = docker.build("${front_image}", "--build-arg map_key=${api_maps_key} --build-arg ENVIRONMENT=dev  .")
                        sh 'sleep 1'
                    }
                }
                dir("${backend}") {
                    script {
                        dockerImage = docker.build("${back_image}", "--build-arg chat_key=${api_chat_key} --build-arg ENVIRONMENT=dev --build-arg rabbitmqUser=${rabbitmq_user} --build-arg rabbitmqPass=${rabbitmq_pass} --build-arg rabbitmq_host=${rabbitmq_host} --build-arg postgresPass=${postgres_pass} --build-arg postgresUser=${postgres_user} --build-arg postgresDb=${postgres_db} .")
                        sh 'sleep 1'
                    }
                }
                dir("${rabbit}") {
                    script {
                        dockerImage = docker.build("${rab_image}", "--build-arg rabbitmqUser=${rabbitmq_user} --build-arg rabbitmqPass=${rabbitmq_pass} --build-arg rabbitmq_host=${rabbitmq_host} .")
                        sh 'sleep 1'
                    }
                }
                // dir("${memcache}") {
                //     script {
                //         dockerImage = docker.build("${mem_image} .")
                //         sh 'sleep 1'
                //     }
                // }   
                dir("${postgres}") {
                    script {
                        dockerImage = docker.build("${post_image}", "--build-arg postgresPass=${postgres_pass} --build-arg postgresUser=${postgres_user} --build-arg postgresDb=${postgres_db} .")
                        sh 'sleep 1'
                    }
                }
            }
        }
        // ------------------------ Good for PI
        stage('Run Test Containers') {
            steps{
                script {
                    sh "docker run -dt --name ${backend} -p 9000:9000 ${back_image}"
                    sh 'sleep 5'
                    sh "docker logs ${backend}"

                    sh "docker run -dt --name ${frontend} -p 3000:3000 ${front_image}"
                    sh 'sleep 5'
                    sh "docker logs ${frontend}"

                    // sh "docker run -dt --name ${memcache} -p 11211:11211 ${mem_image}"
                    // sh 'sleep 5'
                    // sh "docker logs ${memcache}"

                    sh "docker run -dt --name ${postgres} -p 5432:5432 ${post_image}"
                    sh 'sleep 5'
                    sh "docker logs ${postgres}"

                    sh "docker run -dt --name ${rabbit} -p 5672:5672 ${rab_image}"
                    sh 'sleep 5'
                    sh "docker logs ${rabbit}"
                }
            }
        }
        // ------------------------ PI Found ***************************************
        stage('Run Path Check on Test Containers') {
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
                        sh "docker stop ${backend} ${frontend} ${rabbit} ${postgres}"
                        sh "docker rm ${backend} ${frontend} ${rabbit} ${postgres} && sleep 10"
                        // ${memcache} ${mem_image} 

                        sh "docker rmi ${back_image} ${front_image} ${post_image} ${rab_image}"
                    }
                }
            }
        }
        // ------------------------ Good for PI
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
                        dockerImage = docker.build("${front_image}", "--build-arg map_key=${api_maps_key} .")
                        sh 'sleep 1'
                        docker.withRegistry('', registryCredentials) {dockerImage.push("v$BUILD_NUMBER")
                        }
                        sh 'sleep 1'
                    }
                }
                dir("${backend}") {
                    script {
                        dockerImage = docker.build("${back_image}", "--build-arg chat_key=${api_chat_key} --build-arg ENVIRONMENT=dev --build-arg rabbitmqUser=${rabbitmq_user} --build-arg rabbitmqPass=${rabbitmq_pass} --build-arg rabbitmq_host=${rabbitmq_host} --build-arg postgresPass=${postgres_pass} --build-arg postgresUser=${postgres_user} --build-arg postgresDb=${postgres_db} .")
                        sh 'sleep 1'

                        docker.withRegistry('', registryCredentials) {
                            dockerImage.push("v$BUILD_NUMBER")
                        }
                    }
                }
                dir("${rabbit}") {
                    script {
                        dockerImage = docker.build("${rab_image}", "--build-arg rabbitmqUser=${rabbitmq_user} --build-arg rabbitmqPass=${rabbitmq_pass} --build-arg rabbitmq_host=${rabbitmq_host} .")
                        sh 'sleep 1'
                        docker.withRegistry('', registryCredentials) {
                            dockerImage.push("v$BUILD_NUMBER")
                        }                        
                    }
                }  
                // dir("${memcache}") {
                //     script {
                //         dockerImage = docker.build("${mem_image} .")
                //         sh 'sleep 1'
                //         docker.withRegistry('', registryCredentials) {
                //             dockerImage.push("v$BUILD_NUMBER")
                //         }                          
                //     }
                // }   
                dir("${postgres}") {
                    script {
                        dockerImage = docker.build("${rab_image}", "--build-arg postgresPass=${postgres_pass} --build-arg postgresUser=${postgres_user} --build-arg postgresDb=${postgres_db} .")
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
                        sh "docker rmi ${back_image} ${front_image} ${rab_image} ${rab_image}"
                    }
                }
            }
        }
        // ------------------------ Good for PI
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
        //             slackSend channel: "${slack_cluster}",
        //             color: COLOR_MAP[currentBuild.currentResult],
        //             message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
        //         }
        //     }
        // }
        // ------------------------ Good for PI
        stage('Cluster Scale/Connect') {
            steps {
                dir("${k8}") {
                    script {
                        sh """
                            echo "------------------------------------"
                            echo "------------------------------------"
                            kops update cluster --config=${config} --name=${kubecluster} --state=${s3bucket} --yes --admin
                            echo "------------------------------------"

                            kops edit ig ${n1} --config=${config} --name=${kubecluster} --state=${s3bucket} --set="spec.maxSize=${n1_maxS}"
                            kops edit ig ${n1} --config=${config} --name=${kubecluster} --state=${s3bucket} --set="spec.minSize=${n1_minS}"
                            echo "------------------------------------"

                            kops edit ig ${n2} --config=${config} --name=${kubecluster} --state=${s3bucket} --set="spec.maxSize=${n2_maxS}"
                            kops edit ig ${n2} --config=${config} --name=${kubecluster} --state=${s3bucket} --set="spec.minSize=${n2_minS}"
                            echo "------------------------------------"

                            kops edit ig ${m1} --config=${config} --name=${kubecluster} --state=${s3bucket} --set="spec.maxSize=${m1_maxS}"
                            kops edit ig ${m1} --config=${config} --name=${kubecluster} --state=${s3bucket} --set="spec.minSize=${m1_minS}"
                            echo "------------------------------------"

                            # kops rolling-update cluster --config=${config} --name=${kubecluster} --state=${s3bucket}
                            echo "------------------------------------"

                            kops validate cluster --config=${config} --name=${kubecluster} --state=${s3bucket} --wait 20m --count 4
                        """
                    }
                }
            }
            post {
                always {
                    echo '########## Cluster Health Notification ##########'
                    slackSend channel: "${slack_cluster}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
        // ------------------------ Good for PI
        stage('Application-Deployment') {
            steps {
                dir("${k8}") {
                    // echo "helm upgrade my-app ./helm/profilecharts --set backimage=${back_image} --set frontimage=${front_image} --set docker_configjson=${docker_config_json} --set tls_crt=${ssl_tls_crt} --set tls_key=${ssl_tls_key} && sleep 30"
                    sh 'echo ------------------------------------'
                    sh '/bin/bash move.sh'
                    sh 'echo ------------------------------------'
                    sh 'echo ------------------------------------'
                    sh "helm upgrade my-app ./helm/profilecharts --set backimage=${back_image} --set frontimage=${front_image} --set docker_configjson=${docker_config_json} --set memimage=${mem_image} --set rabimage=${rab_image} --set postimage=${post_image} --set tls_crt=${ssl_tls_crt} --set tls_key=${ssl_tls_key} && sleep 30"
                    // notes
                    sh '''
                        sleep 30
                        kubectl get pods -n profile-site
                        if [ $? -eq 0 ]; then
                            echo Cluster is now up and running!
                            echo Please add DNS entry if applicable for:
                            aws elbv2 describe-load-balancers | grep DNSName
                        else
                            echo Cluster not running after 15m!
                        fi
                    '''
                    sh '''
                        echo '------------------------------------------------------------------'
                        echo '------------------------------------------------------------------'
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
                        echo "------------------------------------------------------------------"
                        echo "------------------------------------------------------------------"
                    '''
                }
            }
            post {
                always {
                    echo 'Slack Notifications.'
                    slackSend channel: "${slack_devops}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
        // ------------------------ Good for PI
    }
}