# Azure infrastructure definitions

This folder contains Bicep templates for provisioning infrastructure required by the design system.

## Build-time infrastructure

Remote caching for Nx builds has been implemented using a storage container in Azure.

To recreate the required infrastructure, first deploy the resource group

```
az deployment sub create --location norwayeast --template-file resourcegroup.bicep
```

Then deploy the storage account, container and related resources

```
az deployment group create --resource-group rg-designsystem-build --template-file designsystem-build.bicep
```

## Runtime infrastructure

There is currently no infrastructure used for running apps or services.
