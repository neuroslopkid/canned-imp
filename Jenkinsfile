pipeline {
  agent any

  stages {
    stage('Static Analysis') {
      agent {
        docker {
          image 'node:24-alpine'
          reuseNode true
        }
      }

      steps {
        echo '=== Check Node.js ==='
        sh 'node -v'
        sh 'npm -v'

        echo '=== Install dependencies ==='
        sh 'npm ci'

        echo '=== Lint ==='
        sh 'npm run lint'

        echo '=== TypeScript type check ==='
        sh 'npm run check-types'

        echo '=== Code style check ==='
        sh 'npm run prettier'
      }
    }

    stage('Secrets Scan') {
      agent {
        docker {
          image 'trufflesecurity/trufflehog:latest'
          reuseNode true
        }
      }

      steps {
        echo '=== Scan repository for secrets ==='
        sh 'trufflehog filesystem . --results=verified,unknown --fail'
      }
    }
  }
}
