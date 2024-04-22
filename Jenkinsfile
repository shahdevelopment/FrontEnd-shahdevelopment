// -------------------------------------------------------------- >>
// This Script is for KOPS Scaling
// -------------------------------------------------------------- >>
// -------------------------------------------------------------- >>
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
        registryCredentials = ""

        // Workspace Subdirectories
        frontend = ""
        backend = ""
        k8 = ""
        
        // Sonarqube
        SONAR_PROJECT_KEY = ""

        // GitHub Repos
        frontgit = ""
        backgit = ""
        defgit = ""

        // Docker Images
        back_image = ""
        front_image = ""

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
    }
    // ------------------------ Good for PI
    options { skipDefaultCheckout() }
    stages {
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
                    api_chat_key = parameters['api.chat_key']
                    
                    // ---------- SSL
                    // ssl_tls_key = parameters['tls.key']
                    // ssl_tls_crt = parameters['tls.crt']


                    // ---------- Docker Images
                    back_image = "${registry_back}:v${BUILD_NUMBER}"
                    front_image = "${registry_front}:v${BUILD_NUMBER}"

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

                    // ---------- Moved to Pipeline Console Config
                    // ssl_tls_crt = params.ssl_tls_crt
                    // docker_config_json = params.docker_config_json
                    echo "------------------------------------"
                    echo "------------------------------------"
                    echo "------------------------------------"
                }
            }
            post {
                always {
                    echo '########## Build Status Notification ##########'
                    slackSend channel: "${slack_cluster}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "Cluster Create Started: *${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
        stage('Cluster-Delete') {
            steps {
                dir("${k8}") {
                    script {
                        sh '''
                            echo ----------//---------------------//---------------------------
                            echo ----------//---------------------//---------------------------
                            echo "Deleting Deployment........."
                        '''
                        sh """
                            kops delete cluster --region=${awsregion} --config=${config} --name ${kubecluster} --state=${s3bucket} --yes && sleep 2
                        """
                        sh "echo ----------//---------------------//---------------------------"
                        sh "kops update cluster --config=${config} --name ${kubecluster} --state=${s3bucket} --yes --admin && sleep 2"
                        sh "echo ----------//---------------------//---------------------------"
                        sh """
                            set +e
                            kops validate cluster --config=${config} --name=${kubecluster} --state=${s3bucket} --wait 20m --count 5 && sleep 2
                            set -e
                        """
                        sh '''
                            echo ----------//---------------------//---------------------------
                            echo ----------//---------------------//---------------------------
                        '''
                    }
                }
            }
            post {
                always {
                    echo '########## Cluster Deleted ##########'
                    slackSend channel: "${slack_cluster}",
                    color: COLOR_MAP[currentBuild.currentResult],
                    message: "*${currentBuild.currentResult}:* Job ${env.JOB_NAME} build ${env.BUILD_NUMBER} \n More info at: ${env.BUILD_URL}"
                }
            }
        }
        // ------------------------ Good for PI
        stage('Cluster-Deployment') {
            steps {
                dir("${k8}") {
                    script {
                        sh '''
                            echo ----------//---------------------//---------------------------
                            echo ----------//---------------------//---------------------------
                            echo "Attempting Deployment..............."
                        '''
                        sh "kops create cluster --config=${config} --name=${kubecluster} --state=${s3bucket} --zones=${awszones} --node-count=1 --node-size=t3.medium --master-size=t3.medium --dns-zone=${kubecluster} --node-volume-size=15 --master-volume-size=15 && sleep 2"
                        sh "echo ----------//---------------------//---------------------------"
                        sh "kops update cluster --config=${config} --name ${kubecluster} --state=${s3bucket} --yes --admin && sleep 2"
                        sh "echo ----------//---------------------//---------------------------"
                        sh """
                            set +e
                            kops validate cluster --config=${config} --name=${kubecluster} --state=${s3bucket} --wait 20m --count 5 && sleep 2
                            set -e
                        """
                        sh '''
                            echo ----------//---------------------//---------------------------
                            echo ----------//---------------------//---------------------------
                        '''
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
    }
}