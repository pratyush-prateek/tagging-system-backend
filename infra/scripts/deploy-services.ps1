# setup constants
$namespaceName="tagging-system-backend"
$defaultServiceReplicas = 3
$imageTag = Invoke-Expression "git rev-parse --short HEAD"
$dockerUserName = "logan3102" #replace with your docker prefix here
$registryName = $dockerUserName + "/" + $namespaceName
$dockerfilePaths = @(
    '../../apps/item-retrieval-service/Dockerfile',
    '../../apps/item-tagger-service/Dockerfile',
)
$imageNames = @()
$serviceNames = @()
$defaultContainerPort = 3000
$defaultServicePort = 3000

#-----------------------------FETCH SECRETS----------------------------------------------------------------
$rootDbPassword="password123"
$dbConnectionString="mongodb://root:$rootDbPassword@$namespaceName-mongodb-headless"

# ----------------------------BUILD AND PUSH IMAGES TO REGISTRY--------------------------------------------
# login into docker
# You need to specify the credentials store in $HOME/.docker/config.json to tell the docker engine to use it
docker login

# build docker images
foreach ($path in $dockerfilePaths) {
    try {
        $serviceName = $path.Split("/")[3]
        $repositoryName = $registryName + "_" + $serviceName
        $imageName = $repositoryName + ":" + $imageTag

        # store image name and tags with service names for future reference while deploying these
        $imageNames += $repositoryName
        $serviceNames += $serviceName
        #build the image
        docker build --progress=plain --no-cache -t $imageName -f $path ../../

        #push the image
        docker push $imageName
    }
    catch {
        Write-Host($_) -ForegroundColor Red
        Exit 1;
    }
}

# Sleep for 10 seconds
Write-Host("Sleeping for 5 seconds ...")
Start-Sleep -Seconds 5

# ---------------------------------------DEPLOY SERVICES ON OKTETO CLOUD---------------------------------------------------
# This has been deployed on OKTETO cloud, which can host K8S clusters for free
# Login to the K8s cluster
okteto context use https://cloud.okteto.com
okteto kubeconfig

# install and deploy helm charts for services
for ($i = 0; $i -lt $serviceNames.Count; $i++) {
    try {
        helm dependency build
        helm upgrade --install $serviceNames[$i] ../../helm/service-chart `
        --set name=$serviceNames[$i] `
        --set replicaCount=$defaultServiceReplicas `
        --set image.repository=$imageNames[$i] `
        --set image.tag=$imageTag `
        --set container.port=$defaultContainerPort `
        --set container.env.dbConnectionUri=$dbConnectionString `
        --set service.name=$serviceNames[$i] `
        --set service.port=$defaultServicePort `
        --set mongoDbRootPassword="password123"
    }
    catch {
        Write-Host($_) -ForegroundColor Red
        Exit 1;
    }
}