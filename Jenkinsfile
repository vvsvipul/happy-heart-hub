pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
        TEST_URL = 'http://localhost:8021'
    }

    triggers {
        // Add this block to poll SCM
        pollSCM('H/1 * * * *') // Poll every 5 minutes
    }

    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/vvsvipul/happy-heart-hub.git'
            }
        }

        stage('Stop and Remove Existing Containers') {
            steps {
                script {
                    echo 'Stopping and removing all running containers...'
                    sh '''
                        docker ps -q | xargs -r docker stop
                        docker ps -aq | xargs -r docker rm
                    '''
                }
            }
        }

        stage('Run Docker Compose') {
            steps {
                script {
                    echo 'Running Docker Compose...'
                    sh '''
                        docker-compose down
                        docker-compose up --build -d
                    '''
                }
            }
        }

        // stage('Test Application on Route 8021') {
        //     steps {
        //         script {
        //             echo 'Testing application on route 8021...'
        //             sh '''
        //                 RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" $TEST_URL)
        //                 if [ "$RESPONSE" -eq 200 ]; then
        //                     echo "Route 8021 is accessible and returned HTTP 200."
        //                 else
        //                     echo "Route 8021 test failed. HTTP response code: $RESPONSE."
        //                     exit 1
        //                 fi
        //             '''
        //         }
        //     }
        // }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs for errors.'
        }
    }
}
