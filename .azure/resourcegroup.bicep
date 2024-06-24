metadata description = 'Creates a resource group for the Designsystem build resources'

targetScope = 'subscription'

resource rgdesignsystembuild 'Microsoft.Resources/resourceGroups@2024-03-01' = {
  name: 'rg-designsystem-build'
  location: 'norwayeast'
  tags: {
    Environment: 'nonprod'
  }
}
