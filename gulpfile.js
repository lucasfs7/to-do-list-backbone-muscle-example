var gulp = require('gulp');
var util = require('gulp-util');
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var ks = require('kouto-swiss');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var argv = require('minimist')(process.argv.slice(2));
var minifyCSS = require('gulp-minify-css');

var path = {
  layouts: './src/layouts/**/*.jade',
  jade: './src/**/*.jade',
  stylus: './src/stylus/*.styl',
  stylusAll: './src/stylus/**/*.styl',
  scripts: {
    app: './src/scripts/**/*.ls',
    modules: {
      main: './src/scripts/main.ls',
      templates: './src/scripts/templates/**/*.jade'
    }
  },
  images: [
    './src/images/**/*.jpg',
    './src/images/**/*.png',
    './src/images/**/*.gif'
  ]
};

gulp.task('compile:html', function() {
  gulp.src([path.jade, '!'+path.layouts, '!'+path.scripts.modules.templates])
    .pipe(jade())
    .pipe(gulp.dest('./build/'))
});

gulp.task('compile:css', function () {
  var t = gulp.src(path.stylus);
  t = t.pipe(stylus({use: [ks()]}));

  if (argv.c) {
    t = t.pipe(minifyCSS());
  }

  t = t.pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('browserify:app', function() {
  var t = gulp.src(path.scripts.modules.main, { read: false });

  t = t.pipe(browserify({
    transform: ['liveify', 'jadeify'],
    extensions: ['.ls', '.jade']
  }));

  if (argv.u) {
    t = t.pipe(uglify());
  }

  t = t.pipe(rename('app.js'));
  t = t.pipe(gulp.dest('./build/scripts'));
});

gulp.task('compress:images', function() {
  gulp.src(path.images)
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/'));
});

gulp.task('build', ['compile:html', 'compile:css', 'browserify:app', 'compress:images']);

gulp.task('watch', function() {
  gulp.watch(path.jade, ['compile:html']);
  gulp.watch(path.scripts.modules.templates, ['browserify:app']);
  gulp.watch(path.stylusAll, ['compile:css']);
  gulp.watch(path.scripts.app, ['browserify:app']);
  gulp.watch(path.images, ['compress:images']);
});

gulp.task('default', ['build', 'watch']);
