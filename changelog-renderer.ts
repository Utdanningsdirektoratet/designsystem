import DefaultChangelogRenderer from 'nx/release/changelog-renderer';
import { ChangelogChange } from 'nx/src/command-line/release/changelog';

// See: https://www.conventionalcommits.org/en/v1.0.0/#specification
// Conventional commits footers start with either "BREAKING CHANGE:" (section 9 & 12);
// "BREAKING-CHANGE:" (section 16); "<token>: " or "<token> #" (section 8),
// where "<token>" is a word or a sentence with space replaced by dash (section 9).
const breakingChangePattern = /^BREAKING[ -]CHANGE:/m;
const tokenFooterPattern = /^[A-Za-z-]+(?:: | #)/m;
const footerPattern = new RegExp(
  `(?:${breakingChangePattern.source})|(?:${tokenFooterPattern.source})`,
  'm'
);

function removeGitInfo(message: string) {
  return message.split(/^"\n\n/m)[0];
}

function indent(lines: string, hanging = false, indentation = '  '): string {
  return lines
    .split('\n')
    .map((line, index) =>
      hanging && index === 0 ? line : `${indentation}${line}`
    )
    .join('\n');
}

export default class ChangelogRenderer extends DefaultChangelogRenderer {
  protected formatChange(change: ChangelogChange): string {
    const firstLine = super.formatChange(change);
    let bodyWithoutFooter = '';
    if (change.body) {
      bodyWithoutFooter = removeGitInfo(change.body)
        .split(footerPattern)[0]
        .trim();
      bodyWithoutFooter = indent(bodyWithoutFooter);
    }
    return [firstLine, bodyWithoutFooter].join('\n\n').trim();
  }

  protected extractBreakingChangeExplanation(message: string): string | null {
    // Note: this code assumes a BREAKING CHANGE footer, if any, precedes any other footers
    const messageWithoutTokenFooter = removeGitInfo(message)
      .split(tokenFooterPattern)[0]
      .trim();
    const breakingChangeMessage = messageWithoutTokenFooter
      .split(breakingChangePattern)[1]
      ?.trim();
    if (breakingChangeMessage) {
      return indent(breakingChangeMessage, true);
    }
    return indent(messageWithoutTokenFooter, true);
  }
}
