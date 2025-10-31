# UI Library Template

A React UI library template built with TypeScript, Vite, and Tailwind CSS. This template packages Tailwind CSS with the library, so consumers don't need to install Tailwind separately.

## Features

- ⚡ Built with Vite for fast development and optimized builds
- 🎨 Tailwind CSS included and packaged with the library
- 📦 Library build outputs ES modules and UMD formats
- 🔧 TypeScript support with type definitions
- 🧩 Modular component structure

## Installation

```bash
npm install lib-template
```

## Usage

Import the components and the CSS:

```tsx
import { RootComponent } from 'lib-template';
import 'lib-template/dist/lib-template.css';

// Use the components
<RootComponent name="c1" />
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Preview the build
npm run preview
```

## Components

- `RootComponent`: Main component that renders C1 or C2 based on the `name` prop
- `C1`: Component 1
- `C2`: Component 2

## Build Output

The library builds to the `dist/` directory with:
- `my-ui-library.es.js` - ES module
- `my-ui-library.umd.js` - UMD module
- `lib-template.css` - Compiled Tailwind CSS
- `index.d.ts` - TypeScript definitions
```
