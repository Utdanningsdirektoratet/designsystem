metadata description = 'Creates a resource group for the Designsystem test application'

targetScope = 'subscription'

resource rgdesignsystembuild 'Microsoft.Resources/resourceGroups@2025-04-01' = {
  name: 'rg-designsystem-testapp'
  location: 'westeurope'
  tags: {
    Environment: 'prod'
  }
}
