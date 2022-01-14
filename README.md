# k8s-demo
## Prerequisite
* Python = 3.8.1
* Django = 4.0
  * Django rest framework = 3.13.0
* Node.js = 14.0
* React = 17.0
* Nginx and uWSGI
* Docker = 20.10.8
* minikube = 1.23.2
* Kubernetes = 1.22.2

## Getting Started
1. Start minikube
    ```
    minikube Start
    ```
2. Create service & deployment
    ```
    kubectl create -f service.yaml, deployment.yaml
    ```
3. Open up minikube tunneling
    ```
    minikube tunnel
    ```
4. Shut down whole environment
    ```
    minikube delete
    ```
