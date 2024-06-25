# Design tokens for @digdir/designsystemet

## Next steps

### Using the theme in Figma

1. [Open Digdir's Figma component library](https://www.figma.com/community/file/1322138390374166141/designsystemet-core-ui-kit) and save it to your project
2. Install the [Tokens Studio plugin](<https://www.figma.com/community/plugin/843461159747178978/Tokens-Studio-for-Figma-(Figma-Tokens)>) in Figma
3. [Set up sync](https://docs.tokens.studio/sync/sync) in Tokens Studio for Figma
4. Use the ["Create variables" action](https://docs.tokens.studio/variables/creating-variables) in Tokens Studio
5. Push the resulting variables from Tokens Studio to Git

### Customizing the theme

1. Go to https://theme.designsystemet.no and set up a color theme
2. Press "Kopier tema"
3. Under "Json til Figma", copy the contents under Light / Dark to
   the corresponding file under `design-tokens`:  
    **Udir, Light**: `primitives/colors/light/udir.json`  
    **Udir, Dark**: `primitives/colors/dark/udir.json`  
   This can also be done in Tokens Studio for Figma.
4. **IMPORTANT!** In the JSON data you copied, replace `theme` on line 2
   with the correct theme identifier, depending on the theme you're customizing.
   This is the same as the json filename without extension (e.g. `udir`).

### Using the correct theme in Figma components

The "Designsystemet - Core UI Kit" component library is set up with the themes
"Theme1" and "Theme2" by default. To ensure our custom theme is used, follow these steps:

1. Open your copy of "Designsystemet - Core UI Kit" in Figma
2. Pull any changes from Git using Tokens Studio
3. Update the Figma variables using the "Styles & Variables" > "Sync variables" action in Tokens Studio
4. Access the [Variables modal](https://help.figma.com/hc/en-us/articles/15145852043927-Create-and-manage-variables)
5. Select the "Theme" collection in the upper left dropdown
6. Select "All variables"
7. Right click the modes "Theme1" and click "Delete mode"
8. Repeat for "Theme2"
9. Publish the library

### Updating the Figma components after theme changes

1. Open your copy of "Designsystemet - Core UI Kit" in Figma
2. Pull any changes from Git using Tokens Studio
3. Update the Figma variables using the "Styles & Variables" > "Sync variables" action in Tokens Studio
4. Publish the library
