## CSS

### Sass

Our CSS is written using Sass syntax (.scss files). This allows us to use Sass features like variables, mixins and placeholders. 

### Features

Our CSS includes modern features like Flexbox and Grid, as well as Custom Properties (native CSS variables). Fallback  solutions are in place for browsers that don't support these features. 

## Notation

### BEM with Namespaces

Our CSS class names follow [BEM notation](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/) (block, element, modifier) and each class is namespaced (.gr-c-header, .gr-c-footer, etc.). 

Our namespacing convention roughly follows the guidelines described by [Harry Roberts](https://csswizardry.com) in his article, "[More Transparent UI Code with Namespaces](https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces)." 

We deviate from the Roberts' namepsacing guidelines in a few ways:
- We include an additional prefix -- `ch` -- which stands for Christ Hospital. Adding this prefix provides another level of control and autonomy to our CSS selectors. 
- Rather than  `object` (gr-o-), we use `layout` (gr-l-)

Also note that classes added with Modernizr use the prefix `gr-mod-`. More on Modernizr here (add link!)

## SharePoint Overrides

(more soon)

## General formatting

### Comments 

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

Additional comments are included using Sass syntax or native CSS syntax. If we want a comment included in the unminified CSS file(s), we use native CSS comments. If they can be hidden in the unminified CSS file, we use Sass syntax. All comments are excluded from the minified CSS files. 

````
//
// comment
//

// comment
````
````
/*
 * comment
 */
 
/* comment */
````

### Rules

Each rule includes one line break above and below, and a line break above and below the declaration block. The colon after each property na,e is followed by a space. 

````
img {

  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;

}
````

## Grunt

The Grunt file includes a `css` task, which handles Sass compiling, CSS autoprefixing, CSS minification, and copies the static CSS files to the `public` and `prod-ready-assets` directories. Each task can be run independently as well (`sass`, `cssmin`, and `compress`).

## CSS Analyzers 

- Parker
- PurgeCSS - Review HTML (not DOM-inserted stuff from JS!). Useful when considering what rules need to be kept in the production environment. Useful if wanting to remove selectors like "article" and "legend" if you know you won't need them. Use DiffChecker to review. 

## CSS File Versions

- sassed
- autoprefixed
- etc.

## Vendor Stylesheets

If .edited at end of file name, it's the original file with edits made. Edits are called out in file. 

## Notes

- The border, padding, height and text styling for the custom <select> and text input elements should be the same.
- In edited vendor Sass partials, notes like "addition" and "override" are included, and they mean....
- In edited vendor Sass partials, some rules commented out, with note above denoting that