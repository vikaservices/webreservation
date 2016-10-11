var gulp = require('gulp');
var webpack = require('gulp-webpack')
var webpackConfig = require('./webpack.config.js')
var less = require('gulp-less');
var watch = require('gulp-watch');
var bs = require('browser-sync').create();

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('./less/**/*.less', ['less']);
  gulp.watch([
    './src/**/*.jsx',
    './src/**/*.js'], ['webpack']
  );
  gulp.watch('./index.html').on('change', bs.reload);
});

gulp.task('less', function() {
  return gulp.src('./less/main.less')
  .pipe(less())
  .pipe(gulp.dest('./public/css/'))
  .pipe(bs.reload({stream: true}));
});

gulp.task('webpack', function() {
  return gulp.src('./src/index.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./public/'))
    .pipe(bs.stream());
});

function reload(done) {
  browserSync.reload();
  done();
}

gulp.task('browser-sync', function() {
    bs.init({
      proxy: "localhost:8080",
      port: 9090
  });
});

gulp.task('default', [
  'webpack',
  'less'
]);
