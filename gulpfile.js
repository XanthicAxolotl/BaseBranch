var gulp = require('gulp');
var reactify = require('reactify');
var htmlreplace = require('gulp-html-replace');
var browserify = require('browserify');
var react = require('gulp-react');

var path = {
  HTML: './client/src/*',
  DEST: './client/dist',
  DEST_BUILD: './client/dist/build',
  DEST_SRC: './client/dist/src',
  ENTRY_POINT: './client/src/js/App.jsx'
};

// gulp.task('build', function() {
//   browserify({
//     entries: [path.ENTRY_POINT],
//     transform: [reactify]
//   })
//     .bundle()
//     .pipe(gulp.dest(path.DEST_BUILD));
// });

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('build', function () {
    return gulp.src(path.ENTRY_POINT)
        .pipe(react())
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      //'css': ['./css/main.css', './css/styles.css'],
      'js': './build/App.js'
    }))
    .pipe(gulp.dest(path.DEST));
});
