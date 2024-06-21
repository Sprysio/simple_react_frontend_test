pipeline {
    agent {
        label 'docker-agent-node'
    }
    triggers {
        pollSCM '*/5 * * * *'
      } 
      
    stages {
        stage('Build') {
            steps {
                echo 'Building....'
                sh '''
                cd simple-frontend
                npm install
                '''
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                sh '''
                cd simple-frontend
                npm --version
                npm test
                '''
            }
        }/*
        stage('Build image'){
            steps{
                echo 'bulding docker image'
                sh ''' 
                docker build -t sprysio/frontend_build:${BUILD_ID} .
                docker tag sprysio/frontend_build:${BUILD_ID} sprysio/frontend_build:latest
                '''
            }
        }
        stage('Push dockerhub')
        {
            steps{
                echo 'pushing to dockerhub'
                withCredentials([usernamePassword(credentialsId: 'fbc65aa1-fe5a-4e2d-89c8-ec8fe49c1180', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                sh '''
                docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}
                docker push sprysio/frontend_build:${BUILD_ID} 
                docker push sprysio/frontend_build:latest
                '''
            }
            }
        }*/

        stage('Clone development repo'){
            steps{
                echo 'Clone development repo'
                dir("/tmp/repo_b") {
                     withCredentials([sshUserPrivateKey(credentialsId: 'ssh-credentials-id', keyFileVariable: 'SSH_KEY')]) {
                        sh '''
                        mkdir -p ~/.ssh
                        ssh-keyscan github.com >> ~/.ssh/known_hosts
                        ssh-agent sh -c 'ssh-add ${SSH_KEY}; git clone -b main git@github.com:Sprysio/simple-development-test2.git .'
                        '''
                    }
             } 
            }
        }
        stage('Moving files'){
            steps{
                echo 'moving files'
                sh 'cp -r /home/jenkins/workspace/${JOB_NAME}/* /tmp/repo_b'
            }
        }
        stage('Push to Git'){
            steps{
                echo 'pushing to github'
                    dir("/tmp/repo_b") {
                 withCredentials([sshUserPrivateKey(credentialsId: 'ssh-credentials-id', keyFileVariable: 'SSH_KEY')]) {
                    sh '''
                    export GIT_SSH_COMMAND="ssh -i $SSH_KEY"
                    git config user.email "99020634+Sprysio@users.noreply.github.com"
                    git config user.name "Sprysio"
                    git checkout -b jenkins_branch_${BUILD_ID}
                    git add .
                    git commit -m "push to git"
                    git push origin jenkins_branch_${BUILD_ID}
                    '''
                 }
             }
            }
        }
    }
    post{
        always {  
             echo 'This will always run'  
         }  
         success {  
             echo 'This will run only if successful'  
         }  
         failure {  
            echo 'This will run only if failure'  
             //mail bcc: '', body: "<b>Example</b><br>Project: ${env.JOB_NAME} <br>Build Number: ${env.BUILD_NUMBER} <br> URL de build: ${env.BUILD_URL}", cc: '', charset: 'UTF-8', from: '', mimeType: 'text/html', replyTo: '', subject: "ERROR CI: Project name -> ${env.JOB_NAME}", to: "sebastianfors123@tutanota.com";  
         }  
         unstable {  
             echo 'This will run only if the run was marked as unstable'  
         }  
         changed {  
             echo 'This will run only if the state of the Pipeline has changed'  
             echo 'For example, if the Pipeline was previously failing but is now successful'  
         }
      }
}