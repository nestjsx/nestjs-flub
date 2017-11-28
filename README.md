# Nest-Flub

[![Greenkeeper badge](https://badges.greenkeeper.io/shekohex/nestjs-flub.svg)](https://greenkeeper.io/)

Pretty ErrorHandler 😫, Stack Viewer for [Nestjs Framework](https://nestjs.com/) 🛠️
> it's just a simple `Filter` for Catching the Errorrs

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
 **FlubErrorHandler** accepts an object as an options to configure the Error Handler </br>
 for now it only have to Options
 ```typescript
theme: string; // for themes ['dark', 'light']
quote: boolean; // for displaying  very good quotes
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

you are welcome with this project for contributing,
If you have new themes just make a new PR with and simple image for the theme
