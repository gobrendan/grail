  // jQuery plugin to change class name
  // https://stackoverflow.com/questions/317170/how-can-i-change-html-attribute-names-with-jquery

jQuery.fn.extend({
  renameAttr: function( name, newName, removeData ) {
    var val;
    return this.each(function() {
      val = jQuery.attr( this, name );
      jQuery.attr( this, newName, val );
      jQuery.removeAttr( this, name );
    });
  }
});