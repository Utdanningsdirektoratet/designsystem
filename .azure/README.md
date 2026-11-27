# Azure infrastructure definitions

This folder contains Bicep templates for provisioning infrastructure required by the design system.

Before running any of the below commands, run `az login` and choose the subscription `Udir-Designteam` when prompted.

## Testapp infrastructure

The test app is a Nextjs application hosted as an Azure Container App.

To recreate the required infrastructure, first deploy the resource group

```
az deployment sub create --location westeurope --template-file resourcegroup-testapp.bicep
```

The Azure Container App instance gets created through the `azure-testapp-deploy.yml` workflow.

The documentation Front Door routes `/testapp` and `/testapp/*` to this container app. Deploy the test app before deploying `designsystem-docs.bicep` so the template can resolve the container app's ingress hostname.

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
pnpm build:docs
```

Then, to upload, run this from the root of the repo

```
az storage blob upload-batch --account-name stdesignsystemdocs -s @udir-design/react/storybook-static -d '$web' --destination-path beta
```

For other subpaths, replace `--pattern` and `--destination-path` in the commands as appropriate.

## Illustrations infrastructure

The illustrations app at `design.udir.no/illustrasjoner` uses:

- A storage account, `stdsillustrations`, with a static website (`$web`) for the app and a private
  container, `illustrations`, for the artwork
- Two routes in the documentation Front Door, defined in `designsystem-docs.bicep`: one for the app,
  and one that serves the artwork container at `design.udir.no/illustrasjoner-filer`

To recreate the required infrastructure, first deploy the resource group

```
az deployment sub create --location northeurope --template-file resourcegroup-illustrations.bicep
```

Then deploy the storage account and container

```
az deployment group create --resource-group rg-designsystem-illustrations --template-file designsystem-illustrations.bicep
```

Then enable static website hosting on the storage account. It does not accept account keys, so sign
in with `--auth-mode login`

```
az storage blob service-properties update --account-name stdsillustrations --auth-mode login --static-website --index-document index.html
```

Finally, deploy `designsystem-docs.bicep` (see above) to add the routes. It reads the static website
and blob addresses from the storage account, so the account must exist first.

### Access

The role assignments are made by IT Operations, not by these templates:

| Who                                                    | Role                          | Scope           |
| ------------------------------------------------------ | ----------------------------- | --------------- |
| Managed identity `uai-designsystem-illustrations`      | Storage Blob Data Contributor | Storage account |
| Group `AlleAnsatteKonsulenterDynamisk` (staff sign-in) | Storage Blob Data Reader      | Storage account |

The managed identity is used by `azure-illustrations-deploy.yml` through a federated credential for the
`illustrations` GitHub environment.
