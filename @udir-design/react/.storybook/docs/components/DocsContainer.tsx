import {
  ComponentOrigin,
  ComponentOriginParameters,
} from '.storybook/types/parameters';
import {
  DocsContainer as OriginalDocsContainer,
  type DocsContainerProps,
} from '@storybook/addon-docs/blocks';
import { ComponentType, useState } from 'react';
import { OriginText } from './Origin';

export const DocsContainer = ({
  children,
  ...props
}: React.PropsWithChildren<DocsContainerProps>) => {
  const [componentName, setComponentName] = useState<string>('');
  const [componentOrigin, setComponentOrigin] = useState<ComponentOrigin>();

  // Wait for docs to render before retrieving stories, as they are not available until at first render.
  props.context.channel.addListener('docsRendered', () => {
    // Get the component name and origin information from parameters of the first story,
    // inherited from the stories file meta properties
    const firstStory = props.context.componentStories().at(0);
    if (!firstStory) {
      return;
    }
    if (firstStory.component) {
      setComponentName(
        (firstStory.component as ComponentType).displayName ?? '',
      );
    } else {
      const i = firstStory.title.lastIndexOf('/');
      setComponentName(firstStory.title.substring(i + 1) ?? '');
    }
    setComponentOrigin(
      (firstStory.parameters as ComponentOriginParameters).componentOrigin,
    );
  });

  return (
    <OriginalDocsContainer {...props}>
      {children}
      {componentOrigin && (
        <OriginText component={componentName} {...componentOrigin} />
      )}
    </OriginalDocsContainer>
  );
};
