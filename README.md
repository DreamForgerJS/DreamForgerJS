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

<script type="module">
  import { DreamForger, body, alg, iris } from 'https://cdn.jsdelivr.net/gh/DreamForgerJS/DreamForgerJS@[ version ]/scripts/core.js';
    
  //setup function
  DreamForger.setup();
    
  //setting options
  DreamForger.setOptions({
    //...
  });
</script>
