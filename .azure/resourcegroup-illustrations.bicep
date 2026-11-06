metadata description = 'Creates a resource group for the Designsystem illustrations app'

targetScope = 'subscription'

resource rgIllustrations 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  name: 'rg-designsystem-illustrations'
  location: 'norwayeast'
  tags: {
    Environment: 'prod'
  }
}
