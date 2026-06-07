import type { Heading, Root, RootContent } from 'mdast';

declare module 'mdast' {
  export interface HeadingData {
    id: string;
  }
}

export interface RemarkGetSectionOptions {
  sectionId?: string;
}

export function remarkGetSection({ sectionId }: RemarkGetSectionOptions) {
  return function (tree: Root): void {
    if (sectionId === undefined) {
      return;
    }

    const isWantedHeading = (x: RootContent): x is Heading =>
      x.type === 'heading' && x.data?.id === sectionId;

    const startIndex = tree.children.findIndex(isWantedHeading);
    if (startIndex === -1) {
      return;
    }

    const wantedHeading = tree.children[startIndex] as Heading;

    let endIndex = tree.children.length;
    for (let i = startIndex + 1; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.type === 'heading' && node.depth <= wantedHeading.depth && node.data?.id !== sectionId) {
        endIndex = i;
        break;
      }
    }

    tree.children = tree.children.slice(startIndex, endIndex);
  };
}
