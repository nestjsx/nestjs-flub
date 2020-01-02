<p align="center"><img src="https://avatars1.githubusercontent.com/u/43827489?s=400&u=45ac0ac47d40b6d8f277c96bdf00244c10508aef&v=4"/></p>
<p align="center">
    <a href="https://travis-ci.org/nestjsx/nestjs-flub"><img src="https://travis-ci.org/nestjsx/nestjs-flub.svg?branch=master"/></a>
    <a href="https://www.npmjs.com/package/nestjs-flub"><img src="https://img.shields.io/npm/v/nestjs-flub.svg"/></a>
    <a href="https://github.com/nestjsx/nestjs-flub/blob/master/LICENSE"><img src="https://img.shields.io/github/license/nestjsx/nestjs-flub.svg"/></a>
    <a href='https://coveralls.io/github/nestjsx/nestjs-flub?branch=master'><img src='https://coveralls.io/repos/github/nestjsx/nestjs-flub/badge.svg?branch=master' alt='Coverage Status' /></a>
    <a href="https://greenkeeper.io/"><img src="https://badges.greenkeeper.io/shekohex/nestjs-flub.svg"/></a>
</p>
<h1 align="center">Nestjs Flub</h1>

Pretty ErrorHandler 😫, Stack Viewer for [Nestjs Framework](https://nestjs.com/) 🛠️
> it's just a simple `Filter` for Catching the Errors

## Features

1. HTML reporter

2. JSON reporter, if request accepts a json instead of text/html.

3. Sorted frames of error stack.

4. Themes


### Dark Theme
![dark](https://files.gitter.im/nestjs/nestjs/qkqB/error-dark.png)

### Light Theme
![light](https://files.gitter.im/nestjs/nestjs/z6X6/error-light.png)

## Install

```bash
npm install nestjs-flub --save
```

## Simple Usage
Just add this filter as you used to add any filters
```typescript
import { FlubErrorHandler } from 'nestjs-flub';
@Controller('cats')
@UseFilters(new FlubErrorHandler())
export class CatsController { 

@Get('/error')
  throwError() {
    throw new Error('Very Bad Error');
  }
}

```

## Configuration 
 **FlubErrorHandler** accepts an object as an option to configure the Error Handler </br>
 for now it only have two Options
 ```typescript
theme: string; // for themes ['dark', 'light', 'default']
quote: boolean; // for displaying  very good quotes
souremap: boolean; // for resolving sourcemap positions
 ```
 example
 
 ```typescript
 @UseFilters(new FlubErrorHandler({ theme: 'dark', quote:true }))
 ```
 #### Theming
 
 copy `/src/themes/error.default.mustache` and play
 
 ## TODO 
- [ ] Write Tests
- [ ] list syntax required

 ## Contributing

You are welcome with this project for contributing,
If you have new themes just make a new PR with and simple image for the theme

## Global filters 

Use flub error handler for all controllers 

```typescript 
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalFilters(new FlubErrorHandler());
  await app.listen(3000);
}
bootstrap();
