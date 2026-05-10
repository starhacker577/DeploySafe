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
                withSonarQubeEnv('SonarQube') {
                    bat '''
                    sonar-scanner ^
                    -Dsonar.projectKey=DeploySafeProject ^
                    -Dsonar.sources=. ^
                    -Dsonar.host.url=http://localhost:9000 ^
                    -Dsonar.login=%SONAR_AUTH_TOKEN%
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t deploysafe .'
            }
        }

        stage('Docker Run') {
            steps {
                bat 'docker run -d -p 3000:3000 deploysafe'
            }
        }
    }
}