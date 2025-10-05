## Docker

![docker](docker.gif)

`bash
docker image rm web-2048:latest
docker build -t web-2048 .
docker images
docker run -d -p 8080:80 --name container web-2048
docker ps -a
docker volume ls
docker network ls
docker exec container ls .
docker update --cpus 1.5 container
docker stop container
docker ps -a
docker start container
docker ps -a
docker restart container
docker stop container
docker ps -a
docker rm container
docker ps -a`

## Kubernetes 

https://asciinema.org/a/z40Jh9yqajst0aF51fFdYYTdD

commands:

`kind create cluster --name=first-cluster`

`kubectl get nodes`

`docker ps -a`

`k9s`

![cluster](kind-cluster.gif)


sources:

https://medium.com/@tradingcontentdrive/creating-a-kind-kubernetes-cluster-a-step-by-step-guide-7b51de16f99c

https://kind.sigs.k8s.io/docs/user/quick-start/

https://docker-curriculum.com/

https://kubernetes.io/docs/home/
