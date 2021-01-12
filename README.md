# DreamForgerJS

DreamForgerJS is a JS library to help you make [Interactive Fiction](https://en.wikipedia.org/wiki/Interactive_fiction) games.  This library is still in progress.

## Usage
Basic Commands to help you be able to use DreamForgerJS

### embeding guide
In your HTML file, create a script tag with `type` set to "module".  If you don't do this, then DreamForgerJS won't run.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>DreamForger.js 1.0.1</title>
    </head>
    <body></body>
    <script type="module">
    
    </script>
</html>
```

Inside of your script tag, put an `import` statement as shown below:

```html
<script type="module">
  //change "[ version ]" to the desired version. -->
  import { DreamForger, body, alg, iris } from 'https://cdn.jsdelivr.net/gh/DreamForgerJS/DreamForgerJS@[ version ]/scripts/core.js';
</script>
```

You have just finished embedding DreamForgerJS!

### setting up

Now you will be guided through setting up the environment with DreamForgerJS.  Do not code any HTML in the body tag.  The entire HTML environment will be defined for you once you call the setup function.
Once you have the code below, you should see a dark-gray screen with an input ">".

```html
<script type="module">
  import { DreamForger, body, alg, iris } from 'https://cdn.jsdelivr.net/gh/DreamForgerJS/DreamForgerJS@[ version ]/scripts/core.js';
  //setup function
  DreamForger.setup();
</script>
```

### options

You can use the `DreamForger.setOptions()` function to make changes to the game's visibility and functionality.  Note that none of the options are required.

```html
<script type="module">
  import { DreamForger, body, alg, iris } from 'https://cdn.jsdelivr.net/gh/DreamForgerJS/DreamForgerJS@[ version ]/scripts/core.js';
    
  //setup function
  DreamForger.setup();
    
  //setting options
  DreamForger.setOptions({
  
    textColor: "red", //changes the main text color of the game.  The Iris module can still change colors if this option is used.
    
    backgroundColor: "blue", //changes the background color of the body.
    
    strokeColor: "green", //changes the color of the intersection line.
    
    textFont: "monospace", //changes the text font in the game
    
    fontSize: 15, //changes the body font size (px).  Enter an integer
    
    title: "DreamForger Execution Environment", //changes the title of the game.  Useful in live websites.
    
    /*****
     *  Special Options
     *****/
    
    selectCommandOnSubmit: true, //see example #1 below
    
    maxLines: "auto", //see example #2 below
    
    clearBodyOverflow: true, //see example #2 below
    
    showLastCommand: true, //see example #3 below
    
  });
</script>
```

#### example #1 : selectCommandOnSubmit
Usually, in an interactive fiction game, once you submit the command, the input box will clear and you will have to type in the next one.
If you want to allow users to enter the same command multiple times without having to retype them, set the `selectCommandOnSubmit` option to `true`.  By default, it is set to `false`.

#### example #2 : maxLines & clearing body overflow
Most of the time in interactive fiction games, all the commands you enter and the entire story is left in the body.  In the DreamForgerJS engine, you can't scroll to see your past gameplay.
setting the `maxLines` and `clearBodyOverflow` properties are **highly** reccomended.  If you don't set them, your game will be very inefficient.
You can set the `maxLines` property to an integer or to "auto".  If you set it to, say, `5`, the body log will only allow five lines of text in the game.  Setting it to "auto" will be much better.  Depending on the height of the device, the maximum number of lines will be limited to the screen height.
Make sure if you set the `maxLines` property, you set the `clearBodyOverflow` property to `true` as well or it will not work.

#### example #3 : showLastCommand
In a classic Interactive Fiction game, the player's last command is shown.  In this engine, by default, it is not.  If you would like to let the player see their last command, set the `showLastCommand` property to true.
