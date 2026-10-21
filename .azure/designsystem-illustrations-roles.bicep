metadata description = 'Grants access to the illustrations storage account. Needs Owner or User Access Administrator on the resource group, so it is kept apart from the storage deployment.'

@description('Object ID of the Entra group whose members may read the artwork (members only, no guests).')
param staffGroupObjectId string

@description('Object ID of the managed identity that deploys from GitHub Actions.')
param deployPrincipalObjectId string

@description('Object ID of the person who sets up the account (enables the static website). Leave empty to skip.')
param setupUserObjectId string = ''

// Built-in roles: Storage Blob Data Reader and Storage Blob Data Contributor.
var blobReaderRoleId = '2a2b9908-6ea1-4ae2-8e65-a410df84e7d1'
var blobContributorRoleId = 'ba92f5b4-2d11-453d-a403-e96b0029c9fe'

resource storageAccount 'Microsoft.Storage/storageAccounts@2025-01-01' existing = {
  name: 'stdsillustrations'
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2025-01-01' existing = {
  parent: storageAccount
  name: 'default'
}

resource artworkContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' existing = {
  parent: blobService
  name: 'illustrations'
}

// Reading is scoped to the artwork container only, and this is the real access control.
resource staffCanRead 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: artworkContainer
  name: guid(artworkContainer.id, staffGroupObjectId, blobReaderRoleId)
  properties: {
    principalId: staffGroupObjectId
    principalType: 'Group'
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobReaderRoleId)
  }
}

resource deployerCanWrite 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: storageAccount
  name: guid(storageAccount.id, deployPrincipalObjectId, blobContributorRoleId)
  properties: {
    principalId: deployPrincipalObjectId
    principalType: 'ServicePrincipal'
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobContributorRoleId)
  }
}

resource setupUserCanWrite 'Microsoft.Authorization/roleAssignments@2022-04-01' = if (!empty(setupUserObjectId)) {
  scope: storageAccount
  name: guid(storageAccount.id, setupUserObjectId, blobContributorRoleId)
  properties: {
    principalId: setupUserObjectId
    principalType: 'User'
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', blobContributorRoleId)
  }
}
