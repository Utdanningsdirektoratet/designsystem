metadata description = 'Creates infrastructure for Designsystemet test application'

param location string = resourceGroup().location

resource staticWebApp 'Microsoft.Web/staticSites@2025-03-01' = {
  name: 'stapp-designsystem-testapp-prod'
  location: location
  sku: {
    name: 'Standard'
    tier: 'Standard'
  }
  properties: {}
}
