metadata description = 'Creates a resource group for the Designsystem documentation'

targetScope = 'subscription'

resource rgdesignsystembuild 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-designsystem-docs'
  location: 'norwayeast'
  tags: {
    Environment: 'prod'
  }
}
