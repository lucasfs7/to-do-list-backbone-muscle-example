var gulp = require('gulp');
var util = require('gulp-util');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('compile:html', function() {
  gulp.src('./src/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./build/'))
});

gulp.task('compile:css', function () {
  gulp.src('./src/stylus/**/*.styl')
    .pipe(stylus({
      set:['compress'],
      use: ['nib']
    }))
    .pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('browserify', function() {
  gulp.src('./src/app/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: !gulp.env.production
    })
    .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest('./build/scripts'))
});

gulp.task('concat:vendor', function() {
  gulp.src('./src/vendor/scripts/**/*.js')
    .pipe(concat("vendor.js"))
    .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest('./build/scripts/'))
});

gulp.task('build', ['compile:html', 'compile:css', 'compile:javascript', 'concat:vendor']);

gulp.task('default', ['build'], function(){
  gulp.watch('./src/**/*.jade', ['compile:html']);
  gulp.watch('./src/stylus/**/*.styl', ['compile:css']);
  gulp.watch('./src/app/**/*.js', ['browserify']);
  gulp.watch('./src/vendor/scripts/**/*.js', ['concat:vendor']);
});
