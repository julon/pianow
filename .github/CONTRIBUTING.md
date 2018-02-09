# Contributing

## Usage

```bash
# Install dependencies
npm install

# Build 
npm run build

# Run development server with storybook
npm run storybook

# Run all tests with lint/jest
npm run test

# Run test in watch mode
npm run test:watch

# Update test snapshot
npm run test:update

# Run linter
npm run lint

# Run linter with auto fix
npm run lint:fix

# Commit files with commitizen (use this instead of git commit)
npm run cz
```

## Folder structure
```
/ .storybook : config folder for storybook
/ src : this library source files
  / components
    - Vue components files
  / services
    - JS services : create it if needed
  - index.js : bootstrap library
  - index.umd.js : add library to window namespace
/ dist
  - Generated files with "npm run build"
/ stories
  - Storybook stories
```
## Workflow

- Create a component in the src/components folder
- Add tests in the src/components/\_\_tests\_\_ folder
- Register this component in src/index.js
- Write stories which use your component as a template in src/stories/index.stories.js
- Run `npm run storybook` to author your components by having a development environment
- Run lint and tests before commiting anything
- Commit using [Commit Convention](.github/COMMIT_CONVENTION.md) and push to github
- New release will be created on github if needed :)

