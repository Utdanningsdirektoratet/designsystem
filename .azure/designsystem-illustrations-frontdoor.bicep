metadata description = 'Adds the illustrations app to the shared Front Door at design.udir.no/illustrasjoner. Only adds its own origin group, origin, rule set and route; existing resources are referenced, never changed.'

@description('Host name of the illustrations storage account static website, from designsystem-illustrations.bicep.')
param illustrationsStaticWebsiteHost string

resource frontDoorProfile 'Microsoft.Cdn/profiles@2025-06-01' existing = {
  name: 'afd-designsystem-docs'
}

resource frontDoorEndpoint 'Microsoft.Cdn/profiles/afdEndpoints@2025-06-01' existing = {
  parent: frontDoorProfile
  name: 'udir-designsystem'
}

resource frontDoorCustomDomain 'Microsoft.Cdn/profiles/customDomains@2025-06-01' existing = {
  parent: frontDoorProfile
  name: 'design-udir-no'
}

// A separate origin group means an outage here marks only this origin unhealthy.
resource originGroup 'Microsoft.Cdn/profiles/originGroups@2025-06-01' = {
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

resource origin 'Microsoft.Cdn/profiles/originGroups/origins@2025-06-01' = {
  parent: originGroup
  name: 'illustrations-storage-account'
  properties: {
    hostName: illustrationsStaticWebsiteHost
    httpPort: 80
    httpsPort: 443
    originHostHeader: illustrationsStaticWebsiteHost
    enforceCertificateNameCheck: true
  }
}

resource ruleSet 'Microsoft.Cdn/profiles/ruleSets@2025-06-01' = {
  parent: frontDoorProfile
  name: 'illustrations'
}

resource slashRedirect 'Microsoft.Cdn/profiles/ruleSets/rules@2025-06-01' = {
  parent: ruleSet
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

// More specific than the default /* route, so docs and test app routes are unaffected.
resource route 'Microsoft.Cdn/profiles/afdEndpoints/routes@2025-06-01' = {
  parent: frontDoorEndpoint
  name: 'illustrations'
  dependsOn: [origin]
  properties: {
    customDomains: [
      { id: frontDoorCustomDomain.id }
    ]
    originGroup: {
      id: originGroup.id
    }
    ruleSets: [{ id: ruleSet.id }]
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
