// import purify from "purify-css"
const purify = require('purify-css')

var content = ['public/js/super_admin/*.js', '/views/super_admin/*.html'];
var css = ['public/css/*.css'];

var options = {
  // Will write purified CSS to this file.
  output: 'purified.css'
};

purify(content, css, options);