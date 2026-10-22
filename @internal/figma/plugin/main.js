/* global figma, __html__, extractSnapshot, clearCaches, SNAPSHOT_SCHEMA */
/**
 * Development plugin that runs `extract-snapshot.js` on every page of the open file and hands
 * the results to the UI as one JSON bundle. `build.ts` concatenates the extractor and this file
 * into `dist/code.js`, so the functions above are the extractor's.
 *
 * Like the extractor, it only reads. It switches pages to load them, and returns to the page
 * that was open when it started.
 */

figma.showUI(__html__, { width: 360, height: 320, themeColors: true });

figma.ui.onmessage = async (message) => {
  if (message?.type !== 'extract') return;
  try {
    figma.ui.postMessage({ type: 'done', bundle: await extractBundle() });
  } catch (error) {
    figma.ui.postMessage({ type: 'error', message: errorMessage(error) });
  }
};

async function extractBundle() {
  clearCaches();
  const startPage = figma.currentPage;
  const pageNames = figma.root.children.map((page) => page.name);
  const files = [];
  const errors = [];
  try {
    progress('Variables');
    files.push(await extractSnapshot({ part: 'variables' }));

    for (const [index, name] of pageNames.entries()) {
      progress(`Page ${index + 1} of ${pageNames.length}: ${name}`);
      try {
        // By position as well as name: separator pages often share a name such as `---`.
        const result = await extractSnapshot({
          part: 'components',
          page: name,
          pageIndex: index,
        });
        if (result.data.length > 0) files.push(result);
      } catch (error) {
        errors.push({ page: name, message: errorMessage(error) });
      }
    }
  } finally {
    await figma.setCurrentPageAsync(startPage);
  }
  return {
    schema: SNAPSHOT_SCHEMA,
    kind: 'bundle',
    file: figma.root.name,
    files,
    errors,
  };
}

function progress(text) {
  figma.ui.postMessage({ type: 'progress', text });
}

function errorMessage(error) {
  // Not `instanceof Error`: errors thrown by the Plugin API may come from another realm.
  return typeof error?.message === 'string' ? error.message : String(error);
}
