metadata description = 'Creates a storage account and container for Designsystemet documentation'

param location string = resourceGroup().location

@onlyIfNotExists()
resource storageAccount 'Microsoft.Storage/storageAccounts@2025-01-01' = {
  name: 'stdesignsystemdocs'
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

@onlyIfNotExists()
resource frontDoorProfile 'Microsoft.Cdn/profiles@2025-06-01' = {
  name: 'afd-designsystem-docs'
  location: 'global'
  sku: {
    name: 'Standard_AzureFrontDoor'
  }
}

@onlyIfNotExists()
resource frontDoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2025-06-01' = {
  location: 'global'
  parent: frontDoorProfile
  name: 'udir-designsystem'
}

@onlyIfNotExists()
resource frontDoorCustomDomain 'Microsoft.Cdn/profiles/customDomains@2025-06-01' = {
  parent: frontDoorProfile
  name: 'design-udir-no'
  properties: {
    hostName: 'design.udir.no'
  }
}

@onlyIfNotExists()
resource frontDoorOriginGroup 'Microsoft.Cdn/profiles/originGroups@2025-06-01' = {
  parent: frontDoorProfile
  name: 'default'
  properties: {
    loadBalancingSettings: {
      sampleSize: 4
      successfulSamplesRequired: 3
    }
  }
}

var storageAccountHostName = parseUri(storageAccount.properties.primaryEndpoints.web).host

@onlyIfNotExists()
resource frontDoorOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2025-06-01' = {
  parent: frontDoorOriginGroup
  name: 'docs-storage-account'
  properties: {
    hostName: storageAccountHostName
    httpPort: 80
    httpsPort: 443
    originHostHeader: storageAccountHostName
  }
}

@onlyIfNotExists()
resource frontDoorRuleSet 'Microsoft.Cdn/profiles/ruleSets@2025-06-01' = {
  parent: frontDoorProfile
  name: 'default'
}

@onlyIfNotExists()
resource frontDoorRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2025-06-01' = {
  parent: frontDoorEndpoint
  name: 'default'
  dependsOn: [frontDoorOrigin]
  properties: {
    customDomains: [
      { id: frontDoorCustomDomain.id }
    ]
    originGroup: {
      id: frontDoorOriginGroup.id
    }
    ruleSets: [{ id: frontDoorRuleSet.id }]
    supportedProtocols: [
      'Http'
      'Https'
    ]
    patternsToMatch: [
      '/*'
    ]
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    httpsRedirect: 'Enabled'
  }
}

type redirectRuleType = {
  name: string
  from: string?
  to: string?
  type: ('PermanentRedirect' | 'TemporaryRedirect')?
}
var redirectRuleDefs redirectRuleType[] = [
  { name: 'main' }
  { name: 'alpha' }
  { name: 'beta' }
  { name: 'latest' }
  { name: 'root', from: '/', to: '/beta/', type: 'TemporaryRedirect' }
]

@onlyIfNotExists()
resource redirectRules 'Microsoft.Cdn/profiles/ruleSets/rules@2025-06-01' = [
  for (rule, index) in redirectRuleDefs: {
    parent: frontDoorRuleSet
    name: 'docsredirect${rule.name}'
    properties: {
      order: index + 1
      conditions: [
        {
          name: 'UrlPath'
          parameters: {
            typeName: 'DeliveryRuleUrlPathMatchConditionParameters'
            operator: 'Equal'
            matchValues: [rule.?from ?? '/${rule.name}']
          }
        }
      ]
      actions: [
        {
          name: 'UrlRedirect'
          parameters: {
            redirectType: rule.?type ?? 'PermanentRedirect'
            destinationProtocol: 'Https'
            typeName: 'DeliveryRuleUrlRedirectActionParameters'
            customPath: rule.?to ?? '/${rule.name}/'
          }
        }
      ]
    }
  }
]
