const gulp = require('gulp');
const { src,dest,parallel } = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

var config = {
    paths: {
        html: ['src/*.html'],
        css: ['src/scss/*.scss'],
        app: ['app/css/*.css','app/*.html'],
        cssInit: ['src/scss/app.scss'],
        img: ['src/img/**/**.*'],
        fonts: ['src/fonts/**.*'],
        js: [
          // 'src/js/jquery.min.js',
          'src/js/select.js',
          'src/js/perfect-scrollbar.js',
          'src/js/nouislider.js',
          'src/js/init.js'
        ]
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

function fonts() {
    return src(config.paths.fonts)
      .pipe(dest('app/fonts'))
  }


function css() {
    return src(config.paths.cssInit)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(dest('app/css'))
    }

function js() {
  return src(config.paths.js, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourcemaps.write('maps'))
    .pipe(dest('app/js'))
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
    gulp.watch(config.paths.js, js);
    gulp.watch(config.paths.app).on("change", browserSync.reload);
  }

exports.js = js;
exports.css = css;
exports.html = html;
exports.img = img;
exports.fonts = fonts;
exports.bs = bs;
exports.watch = watch;
exports.default = parallel(bs,html,css,js,fonts,watch);