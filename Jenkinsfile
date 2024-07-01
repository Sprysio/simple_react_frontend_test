pipeline {
    agent {
        label 'docker-agent-node'
    }
    triggers {
        pollSCM '*/5 * * * *'
      } 
      
    stages {
        stage('Build') {
            when{
                allOf {
                    branch '*/feature/*'  
                    changeRequest()
                }
            }
            steps {
                echo 'Building for pull request from branch: ${branchName}'
                sh '''
                cd simple-frontend
                npm install
                '''
            }
        }
        stage('Test') {
            when{
                allOf {
                    branch '*/feature/*'  
                    changeRequest()
                }
            }
            steps {
                echo "Testing for pull request from branch:"
                sh '''
                cd simple-frontend
                npm --version
                npm test
                '''
            }
        }
        stage('Build image'){
            when{
                branch 'staging'
            }
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
            when{
                branch 'staging'
            }
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
        }
    }
    post{
        always {  
             echo 'This will always run'  
         }  
         success {  
             echo 'This will run only if successful'  

             script {
                echo "script"
                def branchName = env.CHANGE_BRANCH
                def prNumber = env.CHANGE_ID
               
                if (branchName!=null && branchName.startsWith('feature/') && prNumber) {
                    echo "Merging pull request #${prNumber} from branch ${branchName}"
                    
                    // Example using GitHub API to merge the pull request
                    withCredentials([usernamePassword(credentialsId: '2178dedf-778c-4152-9edb-647d2d769f96', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_PASSWORD')]) {
                        sh """
                        curl -X PUT -u ${GITHUB_USERNAME}:${GITHUB_PASSWORD} https://api.github.com/repos/your-org/your-repo/pulls/${prNumber}/merge
                        """
                    }
                }
             }
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