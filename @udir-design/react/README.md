# @udir-design/react

## Getting started

Install the library

```
npm add @udir-design/react@next
```

Load the Inter font somewhere, e.g. place this in your `index.html` `<head>`

```html
<link
  rel="preload stylesheet"
  as="style"
  href="https://altinncdn.no/fonts/inter/inter.css"
/>
```

Import the library's styles from your main entry point js/ts file

```ts
import '@udir-design/react/style.css';
```

...or, alternatively, from your main css file

```css
@import '@udir-design/react/style.css';
```

Add the following styles

```css
body {
  font-family: 'Inter', sans-serif;
  font-feature-settings: 'cv05' 1; /* Enable lowercase l with tail */
}
```

`body` can be replaced with a selector for the part of the page where the library is being used
