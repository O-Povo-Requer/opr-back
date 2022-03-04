pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker {image 'node'}
            }
            steps {
                echo 'Building..'
                sh 'npm install'
            }
        }
        stage('Test') {
            agent {
                docker {image 'node'}
            }
            steps {
                echo 'Testing..'
                sh 'npm run start-jenkins'
                sh 'npm test'
                sh 'npm run stop-jenkins'
            }
        }
        stage('Ambiente de HML') {
            steps{
                
                timeout(time: 2, unit: "HOURS") {
                    input message: 'Promover para HML?', ok: 'Prosseguir'
                }

                script{
                    env.PASSWORD = input message: 'Senha para o user Git',
                                parameters: [password(defaultValue: '',
                                            description: '',
                                            name: 'Password')]
                }

                echo "Password: ${env.PASSWORD}"
                echo 'Promovendo para HML..'
                
            }
        }
        stage('Deploy') {
            steps {
                timeout(time: 2, unit: "HOURS") {
                    input message: 'Promover para PRD?', ok: 'Prosseguir'
                }

                script{
                    env.PASSWORD = input message: 'Senha para o user Git',
                                parameters: [password(defaultValue: '',
                                            description: '',
                                            name: 'Password')]
                }

                echo "Password: ${env.PASSWORD}"
                echo 'Deploy finalizado'
            }
        }
    }
}