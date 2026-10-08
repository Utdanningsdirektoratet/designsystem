metadata description = 'Creates the storage account for the illustrations app: a public static site for the app shell and a private container for the artwork'

param location string = resourceGroup().location

param allowedOrigins array = [
  'https://design.udir.no'
  'http://localhost:4400'
  'http://localhost:4500'
]

var containerName = 'illustrations'

// The storage static website address is allowed too, so the app can be tried there before Front Door.
var staticWebsiteOrigin = 'https://${parseUri(storageAccount.properties.primaryEndpoints.web).host}'

resource storageAccount 'Microsoft.Storage/storageAccounts@2025-01-01' = {
  name: 'stdsillustrations'
  location: location
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
    accessTier: 'Hot'
    // No account keys: only Entra ID can read or write.
    allowSharedKeyAccess: false
    // The static website ($web, app shell only) is served anonymously. The artwork container stays private.
    allowBlobPublicAccess: true
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2025-01-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    lastAccessTimeTrackingPolicy: {
      enable: true
      name: 'AccessTimeTracking'
      trackingGranularityInDays: 1
      blobType: [
        'blockBlob'
      ]
    }
    cors: {
      corsRules: [
        {
          allowedOrigins: concat(allowedOrigins, [staticWebsiteOrigin])
          allowedMethods: [
            'GET'
            'HEAD'
            'OPTIONS'
          ]
          allowedHeaders: [
            'authorization'
            'x-ms-version'
            'x-ms-client-request-id'
          ]
          exposedHeaders: [
            'content-length'
            'content-type'
          ]
          maxAgeInSeconds: 3600
        }
      ]
    }
  }
}

resource artworkContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' = {
  parent: blobService
  name: containerName
  properties: {
    publicAccess: 'None'
  }
}

// Each deploy uploads artwork under a new version path. Old versions stop being read and are
// removed by last access, so the live version is never deleted while people use it.
resource cleanup 'Microsoft.Storage/storageAccounts/managementPolicies@2025-01-01' = {
  parent: storageAccount
  name: 'default'
  // Access tracking is set on the blob service and must exist before a rule can use it.
  dependsOn: [blobService]
  properties: {
    policy: {
      rules: [
        {
          name: 'delete-unused-artwork-versions'
          enabled: true
          type: 'Lifecycle'
          definition: {
            filters: {
              blobTypes: [
                'blockBlob'
              ]
              prefixMatch: [
                '${containerName}/'
              ]
            }
            actions: {
              baseBlob: {
                delete: {
                  daysAfterLastAccessTimeGreaterThan: 90
                }
              }
            }
          }
        }
      ]
    }
  }
}

output staticWebsiteHost string = parseUri(storageAccount.properties.primaryEndpoints.web).host
