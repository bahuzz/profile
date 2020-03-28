const gulp = require('gulp');
const { src,dest,parallel } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

var config = {
    paths: {
        html: ['src/*.html'],
        css: ['src/scss/app.scss'],
        img: ['src/img/**/**.*']
    }
};

function html() {
    return src(config.paths.html)
      .pipe(dest('app'))
  }

function img() {
    return src(config.paths.img)
      .pipe(dest('app/img'))
  }


function css() {
    return src(config.paths.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(dest('app/css'))
    }

function bs() {
    browserSync.init({
         server: {
             baseDir: "./app"
         }
     });
 }

 function watch() {
    gulp.watch(config.paths.html, html);
    gulp.watch(config.paths.css, css);
    // gulp.watch(config.paths.js, js);
    gulp.watch(config.paths.html).on("change", browserSync.reload);
    gulp.watch(config.paths.css).on("change", browserSync.reload);
  }

//   exports.js = js;
exports.css = css;
exports.html = html;
exports.img = img;
// exports.fonts = fonts;
exports.bs = bs;
exports.watch = watch;
exports.default = parallel(bs,html,css,watch);