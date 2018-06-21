# CSS and Sass

Our CSS is written using the Sass (.scss files).

A `sass` task is included in the Gulp and Grunt files.

## BEM with Namespaces

Our CSS class names follow [BEM notation](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) (block, element, modifier) and each class is namespaced. Our namespacing convention follows [this post by Harry Roberts](https://csswizardry.com).

## General formatting

Comments are included using native CSS syntax and Sass syntax:

````
/* comment */
````
````
// comment
````

The top of each Sass partial includes the name of the partial:
````
/*
 * table
 */
````
Subsequent section of the partials have headings like this:
````
/* heading */
````
Comments in the Sass partials (as well as JavaScript files) use the following syntax, initially added when using the ["Better Comments" VS Code extension](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments):

![Better Comments screenshot](https://github.com/aaron-bond/better-comments/raw/master/images/better-comments.PNG)

These settings can be configured in the extension's settings in VS Code. 

