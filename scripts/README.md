# Component Documentation Generator

This script automatically generates JSON documentation for all React components in your project, including their props, types, and metadata.

## Usage

Run the documentation generator:

```bash
npm run docs
```

This will create a `component-docs.json` file in the root directory.

## Output Format

The generated JSON file contains:

```json
{
  "generatedAt": "2025-11-04T13:19:48.438Z",
  "componentsCount": 7,
  "components": [
    {
      "filePath": "src/dev/components/DeviceFrame.tsx",
      "componentName": "DeviceFrame",
      "description": "Component description from JSDoc",
      "exports": ["MobileFrame", "TabletFrame", "DesktopFrame"],
      "dependencies": ["react"],
      "props": [
        {
          "interfaceName": "DeviceFrameProps",
          "props": [
            {
              "name": "type",
              "type": "DeviceType",
              "optional": false,
              "description": "Type of device frame to render"
            }
          ]
        }
      ]
    }
  ]
}
```

## Features

✅ **Automatic Discovery** - Finds all `.tsx` and `.ts` files in `src/`  
✅ **Props Extraction** - Extracts TypeScript interfaces and types  
✅ **JSDoc Support** - Reads JSDoc comments for descriptions  
✅ **Dependency Tracking** - Lists external package dependencies  
✅ **Export Detection** - Identifies all exported functions/components  

## Customization

Edit `scripts/generate-docs.js` to:
- Change the output format
- Add custom metadata extraction
- Filter specific components
- Add validation rules

## CI/CD Integration

Add to your CI pipeline:

```yaml
- name: Generate docs
  run: npm run docs

- name: Commit docs
  run: |
    git add component-docs.json
    git commit -m "Update component documentation"
```

## Build Integration

The documentation generation is automatically run before each build:

```bash
npm run build  # Runs docs first, then builds
```

This ensures your component documentation is always up-to-date with your latest changes.

## Type Safety

The script extracts:
- Interface definitions
- Type aliases
- Optional/required props
- Prop types (string, number, ReactNode, etc.)

## Adding Documentation

Add JSDoc comments above your components:

```tsx
/**
 * MobileFrame - Renders a mobile device frame with status bar
 * Displays content in a mobile-sized viewport (320×640px)
 */
export function MobileFrame({ children }: { children: ReactNode }) {
  // ...
}
```

Add inline comments for prop descriptions:

```tsx
interface DeviceFrameProps {
  /** Type of device frame to render */
  type: DeviceType
  /** Content to display inside the device frame */
  children: ReactNode
}
```
