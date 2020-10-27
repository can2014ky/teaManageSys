// gulpfile.js

const path = require('path');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const cssWrap = require('gulp-css-wrap');

const className = 'theme-default';
const customThemeName = `.${className}`;

gulp.task('default', () => gulp
  .src(path.resolve(`./src/themes/${className}/index.css`), {
    allowEmpty: true,
  })
  .pipe(cssWrap({ selector: customThemeName }))
  .pipe(cleanCSS())
  .pipe(gulp.dest(`src/themes/${className}`)));
