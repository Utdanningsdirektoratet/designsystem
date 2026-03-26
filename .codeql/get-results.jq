.runs[].results |
  map({
    rule: .ruleId,
    message: .message.text,
    locations: .locations |
      map({
        file: .physicalLocation.artifactLocation.uri
      } + .physicalLocation.region)
  })
