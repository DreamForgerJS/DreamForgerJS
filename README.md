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


### Logging text to the body

There are a few basic functions to help you log text to the body.
  - `body.log("text")` will log some text to the body and will create a line break after.
  - `body.write("text")` will write some text to the body without applying a line break.
  - `body.logln("text")` will log some text followed by two line breaks.
  - `body.clear()` will clear the entire body of all its text.
You can also code HTML inside of the body logging/writing function.  
`body.log("This is text <code>This is code</code> <br> <ul><li>List Item</li></ul>")`
You can use the `<br>` tag to apply line breaks.
`body.log("Line one<br> Line two<br> Line three<br> Line four")`
Header tags (h1-h6) can also be logged, but let's not try that.


### Handling Commands with DreamForgerJS

Add the code below into your JS.  Make sure it's after the setup.

```javascript
let com;
DreamForger.handleCommands = function(){ 
  com = DreamForger.setCommander()
}
```

The "com" variable doesn't have to be named "com", but that is the name of the variable used in the tutorial.  You can use it to control a lot of things.  Here are the different propery values of it.

- `com.all` will return the entire value of the player's input as a string.
- `com.splt` is the same but splitted into an array.  You probably won't need to use this but if you do, use it as an array
- `com.first` is the first word that the player inputs.  It can be very useful at times
- `com.last` is the last word that the player inputs
- `com.mid` is the content in the middle of the first and last words the player inputs.  If the player types `one two three four`, `com.mid` will return `two three`
- `com.leftSide` will return the player's input except for the last word as a string
- `com.rightSide` will return the player's input as a string except for the first word.  If you typed something like `say hello to jonathan potter`, `com.rightSide` will return `hello to jonathan potter`

Test if the first word the player inputs is "hello"

```javascript
if(com.first === "hello"){
    body.log("You greeted me!");
}
```

- `>hello` -> "You greeted me!"
- `>hello computer` -> "You greeted me!"
- `>hello world` -> "You greeted me!"
- `>hello hello blob flop ew gut` -> "You greeted me!"

Test if `com.mid` is "are so"

```javascript
if(com.mid === "are so"){
    body.log("I know, right?")
}
```

- `>dogs are so bad` -> "I know, right?"
- `>cats are so wierd` -> "I know, right?"
- `>elephants are so big` -> "I know, right?"
- `>elves are so fat` -> "I know, right?"

The other properties of the `com` variable should be simple enough to understand for you.


### The Iris Module : Parsing words & colors.

Declare a function and name it whatever you want.  In this example, it will be called `parseColors()`.  Place it before setting the `DreamForger.handleCommands` function.

```javascript
function parseColors(){

}
```

Next, call the function at the **end** of the `DreamForger.handleCommands` function.  Note that it has to be the very last line of code in the command handler function.

```javascript
import { DreamForger, body, alg, iris } from 'https://cdn.jsdelivr.net/gh/DreamForgerJS/DreamForgerJS@[ version ]/scripts/core.js';

DreamForger.setup();
DreamForger.setOptions({
    //...
});

function parseColors(){

}

let com;
DreamForger.handleCommands = function(){ 
  com = DreamForger.setCommander()
  
  if(com.first === "hello"){
    body.log("Lorem Ipsum Dolor Sit Amet Ew Pew Ug Blat Random Text Wierd");
  }
  
  parseColors();
}
```

Now you are ready to start parsing words.
There are five color parsing functions that you will need to learn.

#### 1.  The `__cs()` function
The `__cs()` function stands for "colored string".  Use this for parsing stuff like sentences.  Don't even think about parsing individual words with this.  A few better function will be shown in a second.
An example would be: 

```javascript
body.log(__cs("You walk in a dark, dense forest full of massive pine trees", "rgb(0,150,0)"));
```

You can pass in all colors including RGB, HSL, Hex Codes, and CSS colors.  To avoid crashing the iris engine (which can happen at times), don't enter built-in CSS colors.  Use hex, rgb, and hsl instead.
##### Identically Colored Strings
```javascript
body.log(iris.__cs("You walk in a dark, dense forest full of massive pine trees", "rgb(0,150,0)"));
body.log(iris.__cs("You walk in a dark, dense forest full of massive pine trees", "hsl(120, 100%, 29%)"));
body.log(iris.__cs("You walk in a dark, dense forest full of massive pine trees", "#009600"));
```

#### 2.  the `parseWord()` function
If you want to color a specific word, call the function inside of the `parseColors()` function.
```javascript
function parseColors(){
    iris.parseWord("apple","#FF0000");
}
```
Now if the word "apple" is logged to the body, all matches will be colored red.

#### 3.  multi-colored words.
Let's say you want to color the word "rainbow" multiple colors.  If you do, here's the perfect function for you.
```javascript
function parseColors(){
    iris.parseMultWord("rainbow", [
        "#FF0000",
        "rgb(200,175,0)",
        "rgb(255,255,0)",
        "#00FF00",
        "#0000FF",
        "#AA00FF",
        "#FF0000"
    ]);
}
```
Each item in the array stands for one character in the word.  The first letter in the word "rainbow" in this example will be colored "#FF0000", the second "rgb(200,175,0)", etc.


#### 4.  `parseWordChain()`
With the `parseWordChain()` function, you can parse multiple words at once without having to call the `parseWord()` function multiple times.
```javascript
function parseColors(){
    iris.parseWordChain({
        "apple":"#FF0000",
        "banana":"#FFFF00",
        "water":"#0000FF"
    });
}
```
The word "apple" will be colored "#FF0000", "banana" colored "#FFFF00", etc.

#### 5.  `parseMultChain()`
This function is very simillar to the `parseWordChain()` one.  You should be able to find out how to use it.

```javascript
function parseColors(){
    iris.parseMultChain({
    "rainbow":["#FF0000", "rgb(200,175,0)", "rgb(255,255,0)", "#00FF00", "#0000FF", "#AA00FF", "#FF0000"],
    //add more mult words here
    });
}
```

### Built-in algorithms

You can use thest built-in string and array algorithms to make your life easier.
Here is the starter code for you.  Assume you have already imported everything.
```javscript
let inventory = [
    "apple",
    "banana",
    "iron dagger",
    "hunk of turquoise",
    "gold nugget",
    "flask of elixir"
];
DreamForger.setup();
DreamForger.setOptions({
    maxLines: "auto",
    clearBodyOverflow: true,
})
body.log("Alg.js testing");
DreamForger.handleCommands = function() {
    let com = DreamForger.setCommander();
    //...
}
```

Let's start by using the `matchArr` function.  The `matchArr` function will take two arguments: an array, and a value.  It will test if an item in the array matches the value.  It the array has the exact value, the function will return `true`.  Set your `df.handleCommands` as shown below:
(assume we are using the code above with the inventory variable)

```javascript
    body.log("Type in something and hit enter.  You will be told if you have that item in your inventory.")
    DreamForger.handleCommands = function() {
        let inventoryMatch = alg.matchArr(inventory, com.all);
        if (inventoryMatch) {
            body.log("You have that item.")
        }else {
            body.log("You don't have that item.")
        }
    }
```

Next, you will learn how to use the `searchArr` function.  It is extremely useful.  What it does is it takes an array and a value like `matchArr`, but what's different is that it will return the array item that contains the value.

```javascript
let inventory = [
    "apple",
    "banana",
    "iron dagger",
    "hunk of turquoise",
    "gold nugget",
    "flask of elixir"
];
let match1 = alg.matchArr(inventory, "apple") // returns "apple"
let match2 = alg.matchArr(inventory, "app") // returns "apple"
let match3 = alg.matchArr(inventory, "hunk") // returns "hunk of turquiose"
let match4 = alg.matchArr(inventory, "turquoise") // returns "hunk of turquiose"
let match5 = alg.matchArr(inventory, "a") // returns "apple"
let match6 = alg.matchArr(inventory, "g") // returns "iron dagger"
```

If you are wondering why match5 and match6 aren't returning other values that have the specified match, here's why: The function scans for the match from beginning to end of the array so the first element that has the match is returned.

##### other basic algorithms

- The `arrRand()` function returns a random element in an array.  Just pass an array in as a parameter and get the returned value.
`let randEl = alg.arrRand(inventory)`

- The `ind()` function is a shortened version of the built-in `indexOf()` JS function.  It returns the index of an item in an array.  The first parameter is a array and the second is the value.
`let arrayIndex = alg.ind(inventory, "apple")`

- The `rem()` function removes an item from an array.
`alg.rem(inventory, "banana")`

- The `rand()` function returns a random number between a minimum and maximum range.
`let number = alg.rand(1, 5)`

- The `floorRand()` function returns a random **whole number** between a minimum and maximum range.
`let wholeNumber = arl.floorRand(1, 10)`

&copy; Conner Ow (LeviathanProgramming) 2021.
