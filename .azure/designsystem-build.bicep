metadata description = 'Creates a storage account, container and lifecycle management policy for Designsystem build artifacts'

param location string = resourceGroup().location

resource stdesignsystembuild 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: 'stdesignsystembuildbicep'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    accessTier: 'Hot'
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-05-01' = {
  parent: stdesignsystembuild
  name: 'default'
  properties: {
    lastAccessTimeTrackingPolicy: {
      enable: true
    }
    deleteRetentionPolicy: {
      enabled: false
    }
    containerDeleteRetentionPolicy: {
      days: 7
      enabled: true
    }
  }
}

resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-05-01' = {
  parent: blobService
  name: 'nx-remotecache'
}

resource managementPolicies 'Microsoft.Storage/storageAccounts/managementPolicies@2023-05-01' = {
  parent: stdesignsystembuild
  name: 'default'
  properties: {
    policy: {
      rules: [{
        name: 'Cleanup'
        type: 'Lifecycle'
        definition: {
          actions: {
            baseBlob: {
              tierToCool: {
                daysAfterLastAccessTimeGreaterThan: 10
              }
              delete: {
                daysAfterLastAccessTimeGreaterThan: 30
              }
            }
          }
          filters: {
            blobTypes: [ 'blockBlob' ]
            prefixMatch: [ container.name ]
          }
        }
      }]
    }
  }
}
