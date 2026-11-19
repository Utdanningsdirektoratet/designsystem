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
    // Off for the account; the static website ($web) is still served anonymously regardless of this.
    allowBlobPublicAccess: false
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2025-01-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
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

// Holds the artwork versions, the raw SVGs from Figma and the `live` pointer. The deploy workflow
// deletes versions a week after they stop being live; see apps/illustrations/README.md. Don't add a
// lifecycle rule that deletes files nobody has read: it would also delete rarely downloaded files
// from the version the app uses, which then return 404.
resource artworkContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2025-01-01' = {
  parent: blobService
  name: containerName
  properties: {
    publicAccess: 'None'
  }
}
