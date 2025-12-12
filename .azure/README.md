# Azure infrastructure definitions

This folder contains Bicep templates for provisioning infrastructure required by the design system.

Before running any of the below commands, run `az login` and choose the subscription `Udir-Designteam` when prompted.

## Build-time infrastructure

Remote caching for Nx builds has been implemented using a storage container in Azure.

To recreate the required infrastructure, first deploy the resource group

```
az deployment sub create --location norwayeast --template-file resourcegroup-build.bicep
```

Then deploy the storage account, container and related resources

```
az deployment group create --resource-group rg-designsystem-build --template-file designsystem-build.bicep
```

## Runtime infrastructure

We use the following resources for our documentation:

- Azure storage account, for hosting the documentation as a static web site
- Azure Front Door, to handle redirects and support using a custom domain

To recreate the required infrastructure, first deploy the resource group

```
az deployment sub create --location norwayeast --template-file resourcegroup-docs.bicep
```

Then deploy the storage account, container and related resources

```
az deployment group create --resource-group rg-designsystem-docs --template-file designsystem-docs.bicep
```

Finally, enable static website hosting on the storage account

```
az storage blob service-properties update --account-name stdesignsystemdocs --static-website --index-document index.html
```

### Deploying the documentation manually

Let's say you need to deploy the `beta` documentation manually.

First, empty the directory

```
az storage blob delete-batch --account-name stdesignsystemdocs -s '$web' --pattern 'beta/*'
```

Build the documentation

```
pnpm nx build:docs
```

Then, to upload, run this from the root of the repo

```
az storage blob upload-batch --account-name stdesignsystemdocs -s @udir-design/react/storybook-static -d '$web' --destination-path beta
```

For other subpaths, replace `--pattern` and `--destination-path` in the commands as appropriate.
