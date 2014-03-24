var GLYPH_REPLACEMENT_PLEFIX = "glyglyglygly"
var GLYPH_CLASS_REPLACEMENTS = {
  ":" : "c",
  "(" : "lc",
  ")" : "r",
  // :not(.foo) ...
}
var GLYPH_ELEMENT_REPLACEMENTS = {
  "@" : "namespace"
}
function replaceAsElement(glyph){
  return  GLYPH_REPLACEMENT_PLEFIX + "__" + GLYPH_ELEMENT_REPLACEMENTS[glyph] + "___"
}
function replaceAsClass(glyph){
  return ".__" + GLYPH_REPLACEMENT_PLEFIX + "__" + GLYPH_CLASS_REPLACEMENTS[glyph] + "___";
}

function replaceGlyphFunc(str){
  for(var glyph in GLYPH_CLASS_REPLACEMENTS){
    var replaced = replaceAsClass(glyph)
    str = str.split(glyph).join(replaced)
  }
  for(var glyph in GLYPH_ELEMENT_REPLACEMENTS){
    var replaced = replaceAsElement(glyph)
    str = str.split(glyph).join(replaced)
  }
  return str
}

function restoreGlyphFunc(str){
  for(var glyph in GLYPH_CLASS_REPLACEMENTS){
    var replaced = replaceAsClass(glyph)
    str = str.split(replaced).join(glyph)
  }
  for(var glyph in GLYPH_ELEMENT_REPLACEMENTS){
    var replaced = replaceAsElement(glyph)
    str = str.split(replaced).join(glyph)
  }
  return str
}


module.exports = {
  replace : replaceGlyphFunc,
  restore : restoreGlyphFunc
}