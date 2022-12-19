# Simple REST API with Typescript
## Description
Demostrating REST API written by Typescript code. The APIs are mainly on ExpressJS.
## Setup Commands
Dependency
```
npm install typescript ts-node@10.9.1 express
npm install --save @types/express 
```
Configuration
Generating initial file
```
tsc --init
```
Simple Templates 
```
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "moduleResolution": "node",
    "rootDir": "src",
    "outDir": "dist",
    "lib": ["ES2022"],
    "strict": true,
    "esModuleInterop": true,
    "allowJs": true,
    "checkJs": false,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```
Compile
```
tsc [file]
```
Execute
```
npx ts-node [file]
```
## References
- Typescript [sorce](https://www.typescriptlang.org/)
- Typescript CLI [sorce](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options)
- Typescript on NPM [sorce](https://www.npmjs.com/package/typescript)
- TS ExpressJS [sorce](https://www.npmjs.com/package/@types/express)