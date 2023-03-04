# Deploy consumer consumers
# Constants
$namespaceName="tagging-system-backend"
$defaultconsumerReplicas = 3
$imageTag = Invoke-Expression "git rev-parse --short HEAD"
$dockerUserName = "logan3102" #replace with your docker prefix here
$registryName = $dockerUserName + "/" + $namespaceName
$dockerfilePath = '../../apps/item-tag-db-update-consumer/Dockerfile'
$consumerName = $dockerfilePath.Split("/")[3]
$repositoryName = $registryName + "_" + $consumerName
$imageName = $repositoryName + ":" + $imageTag
$defaultContainerPort = 3000

# ------------------------------ SECRETS (NOT A GOOD IDEA TO ADD THEM HERE)---------------------------------------------------------------
$rabbitMqUri="amqps://sdqnpmgy:kP_E6hOGRg2VAYF7snL1Qu1egnUpgGHK@puffin.rmq2.cloudamqp.com/sdqnpmgy"
$tagAdditionQueueName="tag_addition_queue"
$tagRemovalQueueName="tag_removal_queue"

# ------------------------------ BUILD AND PUSH IMAGES TO REGISTRY -------------------------------------
# login into docker
# You need to specify the credentials store in $HOME/.docker/config.json to tell the docker engine to use it
try {
    docker login
    docker build --progress=plain --no-cache -t $imageName -f $dockerfilePath ../../
    docker push $imageName
}
catch {
    Write-Host($_) -ForegroundColor Red
    Exit 1;
}

# ---------------------------------------DEPLOY CONSUMER ON OKTETO CLOUD---------------------------------------------------
# This has been deployed on OKTETO cloud, which can host K8S clusters for free
# Login to the K8s cluster
okteto context use https://cloud.okteto.com
okteto kubeconfig
helm dependency build ../../helm/consumer-chart
helm upgrade --install $consumerName ../../helm/consumer-chart `
            --set name=$consumerName `
            --set replicaCount=$defaultconsumerReplicas `
            --set containers.main.name=$consumerName `
            --set containers.main.image.repository=$repositoryName `
            --set containers.main.image.tag=$imageTag `
            --set containers.main.port=$defaultContainerPort `
            --set containers.main.envVars[0].name=RABBITMQ_URI `
            --set-string containers.main.envVars[0].value=$rabbitMqUri `
            --set containers.main.envVars[1].name=PORT `
            --set-string containers.main.envVars[1].value="$defaultContainerPort" `
            --set containers.main.envVars[2].name=TAG_ADDITION_QUEUE_NAME `
            --set-string containers.main.envVars[2].value=$tagAdditionQueueName `
            --set containers.main.envVars[3].name=TAG_REMOVAL_QUEUE_NAME `
            --set-string containers.main.envVars[3].value=$tagRemovalQueueName `

