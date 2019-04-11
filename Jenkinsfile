#!groovy
// -*- coding: utf-8; mode: Groovy; -*-
def project_token = 'ASabadMQiBYLyPpAlzVVmZDnyyk1M8ZP39M'

properties([
    buildDiscarder (logRotator (artifactDaysToKeepStr: '', artifactNumToKeepStr: '10', daysToKeepStr: '', numToKeepStr: '10')),
    disableConcurrentBuilds (),
    gitLabConnection('GitLab'),
    pipelineTriggers([
        [
            $class: 'GitLabPushTrigger',
            branchFilterType: 'All',
            triggerOnPush: true,
            triggerOnMergeRequest: false,
            triggerOpenMergeRequestOnPush: "never",
            triggerOnNoteRequest: true,
            noteRegex: "Jenkins please retry a build",
            skipWorkInProgressMergeRequest: true,
            secretToken: project_token,
            ciSkip: true,
            setBuildDescription: true,
            addNoteOnMergeRequest: true,
            addCiMessage: true,
            addVoteOnMergeRequest: true,
            acceptMergeRequestOnSuccess: false,
            branchFilterType: "NameBasedFilter",
            includeBranchesSpec: "release/qat",
            excludeBranchesSpec: "",
        ]
    ])
])


node ('internet-enabled') {
    timestamps {
        ansiColor('xterm') {
            env.DOCKER_REGISTRY = 'docker-local-customer-delivery.art.lmru.tech'
            env.DOCKER_REGISTRY_CREDS = 'lm-sa-legofront'
            env.settings_file = 'settings-xml'
            def GIT_REPO = scm.userRemoteConfigs[0].url
            def is_master = env.BRANCH_NAME == 'master'
            env.BRANCH = env.BRANCH_NAME.toLowerCase().replaceAll('/','-')
            def version_suffix = is_master ? '' : "-${BRANCH}"
            def docker_image = (GIT_REPO =~ /.+\/(.+?).git$/)[0][1]
            def docker_image_name = "${docker_image}${version_suffix}"
            def docker_image_tag = "${env.BUILD_NUMBER}"

            currentBuild.displayName = "#${env.BUILD_NUMBER} ${docker_image_name}:${docker_image_tag}"

            stage('Checkout') {
                checkout scm
            }

            def git_commit = sh(returnStdout:true, script: 'git log -1 --format=%h').trim();
            def git_date = sh(returnStdout:true, script: "git show -s --format=%ci ${git_commit}").trim();

            stage ('Build Image') {

            }

            stage ('Wipe') {
                cleanWs();
            }
        }
    }
}

def image_build_and_push(docker_image_name, docker_image_tag, is_master, git_repo, git_commit, git_date) {
    def env_vars = ["GIT_REPO=${git_repo}",
                    "GIT_COMMIT=${git_commit}",
                    "GIT_DATE='${git_date}'",
                    "BUILD_TARGET=${BUILD_TARGET}",
                    "BRANCH_NAME=${BRANCH_NAME}"
                    ]
    build_args = env_vars.collect{arg -> '--no-cache --build-arg ' + arg}.join(' ')
    configFileProvider([configFile(fileId: '${env.settings_file}', targetLocation: './settings.xml')]) {
        def image = docker.build("${env.DOCKER_REGISTRY}/${docker_image_name}:${docker_image_tag}", build_args + " .")
        try {
            docker.withRegistry("https://${env.DOCKER_REGISTRY}", "$DOCKER_REGISTRY_CREDS") {
                image.push(docker_image_tag)
                if (is_master) {
                  image.push('latest')
                  sh "docker rmi ${env.DOCKER_REGISTRY}/${docker_image_name}:latest"
                }
            }
        }
        finally {
          sh "docker rmi ${env.DOCKER_REGISTRY}/${docker_image_name}:${docker_image_tag}"
        }
    }
}