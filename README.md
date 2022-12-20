# Simple REST API with Typescript, Phantom
## Description
Demostrating REST API written by Typescript code. The APIs are mainly on ExpressJS. Also with PhantomJS for a client app.
## Setup Commands
Dependency
```
npm install typescript ts-node@10.9.1 express nodemon phantom
npm install @types/express @types/phantom
```
Compile & Execute
```
tsc [file]
tsc --project tsconfig.json

npx ts-node [file]
```
Build
```
npm run build
```
Run project with monitoring
```
npm start
```
## Configuration
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
## References
- Typescript [sorce](https://www.typescriptlang.org/)
- Typescript CLI [sorce](https://www.typescriptlang.org/docs/handbook/compiler-options.html#compiler-options)
- Typescript on NPM [sorce](https://www.npmjs.com/package/typescript)
- TS ExpressJS [sorce](https://www.npmjs.com/package/@types/express)
- Phantom [sorce](https://phantomjs.org/api/webpage/method/open-url.html)