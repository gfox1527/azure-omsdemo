# Order Management Sample

This is a reference design for a basic order management system hosted in Linux containers running on [Azure App Service on Linux](https://docs.microsoft.com/en-us/azure/app-service/containers/quickstart-docker). This reference design is intended to highlight the following concepts:

* Application Performance Monitoring (APM) via Application Insights
* Workload scale options
* DevOps flows

The following diagram illustrates the basic data flow of this design:

<img src="media/overview.png" />

## Azure Infrastructure Deployment

TBD

## Service Configuration

Details for each service can be found in their respective pages:

* [Inventory Service](services/inventory/README.md)
* [Order Service](services/orders/README.md)

## Solution Deployment (AKS)

First, create a dedicated namespace for hosting this sample application:

```bash
kubectl create namespace fabrikam
```

Next, from the root directory use the Helm chart provided in this repo to deploy these microservices to your AKS cluster.

```bash
helm install fabrikam-oms deployment/helm --namespace fabrikam
```
