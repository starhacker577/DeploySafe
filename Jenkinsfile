pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        SCANNER_HOME = tool 'SonarQubeScanner'
    }

    stages {

        stage('Git Checkout') {
            steps {
                git branch: 'main',
                url: 'https://github.com/starhacker577/DeploySafe.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {

                    def scannerHome = tool 'SonarQubeScanner'

                    withSonarQubeEnv('SonarQube') {

                        bat """
                        ${scannerHome}\\bin\\sonar-scanner.bat ^
                        -Dsonar.projectKey=DeploySafeProject ^
                        -Dsonar.projectName=DeploySafeProject ^
                        -Dsonar.sources=. ^
                        -Dsonar.host.url=http://localhost:9000
                        """
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t deploysafe .'
            }
        }

        stage('Trivy Security Scan') {
            steps {

                bat '''
                "C:\\Users\\Tushar Sharma\\AppData\\Local\\Microsoft\\WinGet\\Links\\trivy.exe" image --skip-db-update deploysafe
                '''
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop deploysafe-container || exit 0'
                bat 'docker rm deploysafe-container || exit 0'
            }
        }

        stage('Docker Run') {
            steps {
                bat 'docker run -d --name deploysafe-container -p 3000:3000 deploysafe'
            }
        }

        stage('Deployment Success') {
            steps {
                echo '✅ DeploySafe Project Successfully Deployed!'
            }
        }
    }

    post {

        success {
            echo '🎉 Pipeline Executed Successfully!'
        }

        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}