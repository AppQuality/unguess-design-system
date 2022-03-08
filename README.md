# UNGUESS Design System

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Used by

- [Unguess platform](https://app.unguess.io/)

## Tech stack

Building components

- 🪴 [Zendesk Garden](https://garden.zendesk.com/) as base design system
- ⚛️ [React](https://reactjs.org/) declarative component-centric UI
- 📚 [Storybook](https://storybook.js.org) for UI component development and [auto-generated docs](https://medium.com/storybookjs/storybook-docs-sneak-peak-5be78445094a)
- 👩‍🎤 [Styled Components](https://styled-components.com/) for component-scoped styling

Maintaining the system

- 📦 [Yarn](https://yarnpkg.com/) for package management
- 📦 [NPM](https://www.npmjs.com/) for distribution
- ✅ [Chromatic](https://www.chromatic.com/) to prevent UI bugs in components (by Storybook maintainers)

## Why

The Unguess design system codifies existing UI components into a central, well-maintained repository. It is built to address having to paste the same components into multiple projects again and again. This simplifies building UI's with Storybook's design patterns.

#### What we're doing

- Build and maintain a design system in the open
- Share UI components between multiple apps
- Dogfood upcoming Storybook features
- Welcome contributors of all levels and backgrounds

#### What we're not doing

- Rewrite all new components from scratch
- Overhaul the visual design of components
- Typescript (the consumer apps don't use it)
- Compete with more general design systems like ANT or Material.

## Install

```bash
yarn
```

## Global Styles

Components within the design system assume that a set of global styles have been configured. Depending upon the needs of the application, this can be done several ways:

#### Option 1: Render the `GlobalStyle` component

Useful when you don't need any custom `body` styling in the application, typically this would be placed in a layout component that wraps all pages, or a top-level `App` component.

```javascript
import { global } from '@storybook/design-system';
const { GlobalStyle } = global;
```

```javascript
/* Render the global styles once per page */
<GlobalStyle />
```

#### Option 2: Use the `bodyStyles` to apply styling

Useful when you want build upon the shared global styling.

```javascript
import { Global, css } from '@storybook/theming';
import { global } from '@storybook/design-system';
const { bodyStyles } = global;

const customGlobalStyle = css`
  body {
    ${bodyStyles}// Custom body styling for the app
  }
`;

const CustomGlobalStyle = () => <Global styles={customGlobalStyle} />;
```

```javascript
/* Render the global styles once per page */
<CustomGlobalStyle />
```
