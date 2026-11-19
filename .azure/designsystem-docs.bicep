metadata description = 'Creates a storage account and container for Designsystemet documentation'

param location string = resourceGroup().location

resource testApp 'Microsoft.App/containerApps@2025-01-01' existing = {
  name: 'ca-designsystem-testapp'
  scope: resourceGroup('rg-designsystem-testapp')
}

var testAppHostName = testApp.properties.configuration.ingress.fqdn

resource illustrationsStorageAccount 'Microsoft.Storage/storageAccounts@2025-01-01' existing = {
  name: 'stdsillustrations'
  scope: resourceGroup('rg-designsystem-illustrations')
}

var illustrationsHostName = parseUri(illustrationsStorageAccount.properties.primaryEndpoints.web).host

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

@onlyIfNotExists()
resource frontDoorTestAppOriginGroup 'Microsoft.Cdn/profiles/originGroups@2025-06-01' = {
  parent: frontDoorProfile
  name: 'testapp'
  properties: {
    healthProbeSettings: {
      probeIntervalInSeconds: 30
      probePath: '/testapp'
      probeProtocol: 'Https'
      probeRequestType: 'HEAD'
    }
    loadBalancingSettings: {
      sampleSize: 4
      successfulSamplesRequired: 3
    }
  }
}

// A separate origin group means an outage of the illustrations app marks only this origin unhealthy.
@onlyIfNotExists()
resource frontDoorIllustrationsOriginGroup 'Microsoft.Cdn/profiles/originGroups@2025-06-01' = {
  parent: frontDoorProfile
  name: 'illustrations'
  properties: {
    healthProbeSettings: {
      probeIntervalInSeconds: 60
      probePath: '/illustrasjoner/index.html'
      probeProtocol: 'Https'
      probeRequestType: 'HEAD'
    }
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
resource frontDoorTestAppOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2025-06-01' = {
  parent: frontDoorTestAppOriginGroup
  name: 'testapp-container-app'
  properties: {
    enforceCertificateNameCheck: true
    hostName: testAppHostName
    httpPort: 80
    httpsPort: 443
    originHostHeader: testAppHostName
  }
}

@onlyIfNotExists()
resource frontDoorIllustrationsOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2025-06-01' = {
  parent: frontDoorIllustrationsOriginGroup
  name: 'illustrations-storage-account'
  properties: {
    enforceCertificateNameCheck: true
    hostName: illustrationsHostName
    httpPort: 80
    httpsPort: 443
    originHostHeader: illustrationsHostName
  }
}

@onlyIfNotExists()
resource frontDoorRuleSet 'Microsoft.Cdn/profiles/ruleSets@2025-06-01' = {
  parent: frontDoorProfile
  name: 'default'
}

@onlyIfNotExists()
resource frontDoorIllustrationsRuleSet 'Microsoft.Cdn/profiles/ruleSets@2025-06-01' = {
  parent: frontDoorProfile
  name: 'illustrations'
}

@onlyIfNotExists()
resource illustrationsSlashRedirect 'Microsoft.Cdn/profiles/ruleSets/rules@2025-06-01' = {
  parent: frontDoorIllustrationsRuleSet
  name: 'illustrationsslash'
  properties: {
    order: 1
    conditions: [
      {
        name: 'UrlPath'
        parameters: {
          typeName: 'DeliveryRuleUrlPathMatchConditionParameters'
          operator: 'Equal'
          matchValues: ['/illustrasjoner']
        }
      }
    ]
    actions: [
      {
        name: 'UrlRedirect'
        parameters: {
          redirectType: 'PermanentRedirect'
          destinationProtocol: 'Https'
          typeName: 'DeliveryRuleUrlRedirectActionParameters'
          customPath: '/illustrasjoner/'
        }
      }
    ]
  }
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

@onlyIfNotExists()
resource frontDoorTestAppRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2025-06-01' = {
  parent: frontDoorEndpoint
  name: 'testapp'
  dependsOn: [frontDoorTestAppOrigin]
  properties: {
    customDomains: [
      { id: frontDoorCustomDomain.id }
    ]
    originGroup: {
      id: frontDoorTestAppOriginGroup.id
    }
    supportedProtocols: [
      'Http'
      'Https'
    ]
    patternsToMatch: [
      '/testapp'
      '/testapp/*'
    ]
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    httpsRedirect: 'Enabled'
  }
}

// More specific than the default /* route, so the documentation and test app routes are unaffected.
@onlyIfNotExists()
resource frontDoorIllustrationsRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2025-06-01' = {
  parent: frontDoorEndpoint
  name: 'illustrations'
  dependsOn: [frontDoorIllustrationsOrigin]
  properties: {
    customDomains: [
      { id: frontDoorCustomDomain.id }
    ]
    originGroup: {
      id: frontDoorIllustrationsOriginGroup.id
    }
    ruleSets: [{ id: frontDoorIllustrationsRuleSet.id }]
    supportedProtocols: [
      'Http'
      'Https'
    ]
    patternsToMatch: [
      '/illustrasjoner'
      '/illustrasjoner/*'
    ]
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    httpsRedirect: 'Enabled'
    cacheConfiguration: {
      queryStringCachingBehavior: 'IgnoreQueryString'
      compressionSettings: {
        isCompressionEnabled: true
        contentTypesToCompress: [
          'text/html'
          'text/css'
          'application/javascript'
          'text/javascript'
          'application/json'
        ]
      }
    }
  }
}

var illustrationsBlobHostName = parseUri(illustrationsStorageAccount.properties.primaryEndpoints.blob).host

// The private artwork container, served on the same host as the app. Same-origin requests need no
// CORS preflight, and Front Door speaks HTTP/2 to the browser, where Blob Storage only speaks
// HTTP/1.1. The browser sends the user's own token, which Front Door passes on to storage.
// No health probe: the container rejects requests without a token.
@onlyIfNotExists()
resource frontDoorIllustrationsArtworkOriginGroup 'Microsoft.Cdn/profiles/originGroups@2025-06-01' = {
  parent: frontDoorProfile
  name: 'illustrations-artwork'
  properties: {
    loadBalancingSettings: {
      sampleSize: 4
      successfulSamplesRequired: 3
    }
  }
}

@onlyIfNotExists()
resource frontDoorIllustrationsArtworkOrigin 'Microsoft.Cdn/profiles/originGroups/origins@2025-06-01' = {
  parent: frontDoorIllustrationsArtworkOriginGroup
  name: 'illustrations-blob'
  properties: {
    enforceCertificateNameCheck: true
    hostName: illustrationsBlobHostName
    httpPort: 80
    httpsPort: 443
    originHostHeader: illustrationsBlobHostName
  }
}

@onlyIfNotExists()
resource frontDoorIllustrationsArtworkRuleSet 'Microsoft.Cdn/profiles/ruleSets@2025-06-01' = {
  parent: frontDoorProfile
  name: 'illustrationsartwork'
}

// A rewrite only sees the path after the route's pattern, and `originPath: '/'` on the route drops
// the pattern itself, so `/illustrasjoner-filer/<path>` reaches storage as `/illustrations/<path>`.
@onlyIfNotExists()
resource illustrationsArtworkRewrite 'Microsoft.Cdn/profiles/ruleSets/rules@2025-06-01' = {
  parent: frontDoorIllustrationsArtworkRuleSet
  name: 'container'
  properties: {
    order: 1
    conditions: []
    actions: [
      {
        name: 'UrlRewrite'
        parameters: {
          typeName: 'DeliveryRuleUrlRewriteActionParameters'
          sourcePattern: '/'
          destination: '/illustrations/'
          preserveUnmatchedPath: true
        }
      }
    ]
  }
}

// Caching is on only because Front Door compresses as part of it. Requests with an Authorization
// header are never cached unless the response allows it with `Cache-Control: public`, `s-maxage` or
// `must-revalidate`, so the artwork must never be uploaded with those; it would then be served to
// anyone without a token.
@onlyIfNotExists()
resource frontDoorIllustrationsArtworkRoute 'Microsoft.Cdn/profiles/afdEndpoints/routes@2025-06-01' = {
  parent: frontDoorEndpoint
  name: 'illustrations-artwork'
  dependsOn: [frontDoorIllustrationsArtworkOrigin]
  properties: {
    customDomains: [
      { id: frontDoorCustomDomain.id }
    ]
    originGroup: {
      id: frontDoorIllustrationsArtworkOriginGroup.id
    }
    originPath: '/'
    ruleSets: [{ id: frontDoorIllustrationsArtworkRuleSet.id }]
    supportedProtocols: [
      'Http'
      'Https'
    ]
    patternsToMatch: [
      '/illustrasjoner-filer/*'
    ]
    forwardingProtocol: 'HttpsOnly'
    linkToDefaultDomain: 'Enabled'
    httpsRedirect: 'Enabled'
    cacheConfiguration: {
      queryStringCachingBehavior: 'UseQueryString'
      compressionSettings: {
        isCompressionEnabled: true
        contentTypesToCompress: [
          'image/svg+xml'
          'application/json'
        ]
      }
    }
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
  { name: 'root', from: '/', to: '/latest/' }
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
