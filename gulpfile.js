var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var server = require('gulp-server-livereload');
var less = require('gulp-less');

var path = {
  INDEX_HTML: './client/src/index.html',
  GRAPH_HTML: './client/src/graph.html',
  CURRICULUM_HTML: './client/src/curriculum.html',
  COURSE_HTML: './client/src/course.html',
  CSS: './client/src/css/*.css',
  INDEX_MINIFIED_OUT: 'index.min.js',
  GRAPH_MINIFIED_OUT: 'graph.min.js',
  CURRICULUM_MINIFIED_OUT: 'curriculum.min.js',
  COURSE_MINIFIED_OUT: 'course.min.js',
  OUT: 'bundle.js',
  DEST: './client/dist',
  DEST_BUILD: './client/dist/build',
  DEST_SRC: './client/dist/src',
  INDEX_ENTRY_POINT: './client/src/js/App.jsx',
  GRAPH_ENTRY_POINT: './client/src/js/Graph.jsx',
  CURRICULUM_ENTRY_POINT: './client/src/js/Curriculum.jsx',
  COURSE_ENTRY_POINT: './client/src/js/Course.jsx'
};

gulp.task('build', function(){
  browserify({
    entries: [path.INDEX_ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.INDEX_MINIFIED_OUT))
    .pipe(streamify(uglify(path.INDEX_MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('buildGraph', function(){
  browserify({
    entries: [path.GRAPH_ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.GRAPH_MINIFIED_OUT))
    .pipe(streamify(uglify(path.GRAPH_MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('buildCurriculum', function(){
  browserify({
    entries: [path.CURRICULUM_ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.CURRICULUM_MINIFIED_OUT))
    .pipe(streamify(uglify(path.CURRICULUM_MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('buildCourse', function(){
  browserify({
    entries: [path.COURSE_ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.COURSE_MINIFIED_OUT))
    .pipe(streamify(uglify(path.COURSE_MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('less', function(){
  return gulp.src('./client/src/css/main.less')
    .pipe(less({path: '/'}))
    .pipe(gulp.dest(path.DEST + '/css'))
});

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('copyCSS', function(){
    gulp.src(path.CSS)
      .pipe(gulp.dest(path.DEST + '/css'));
})

// gulp.task('build', function () {
//   return gulp.src(path.ENTRY_POINT)
//       .pipe(react())
//       .pipe(gulp.dest(path.DEST_JS));
// });

gulp.task('webserver', function() {
  gulp.src('./client/dist')
    .pipe(server({
      livereload: true,
      directoryListing: false,
      defaultFile: '/index.html',
      open: true
    }));
});

gulp.task('watchProd', function(){
  gulp.watch(['client/src/index.html', 'client/src/styles.css', 'client/src/js/*.jsx', 'client/src/js/components/*.jsx'], ['production'])
});

gulp.task('replaceHTML', function(){
  gulp.src(path.INDEX_HTML)
    .pipe(htmlreplace({
      'css': './css/main.css',
      'js': 'build/' + path.INDEX_MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceGraphHTML', function(){
  gulp.src(path.GRAPH_HTML)
    .pipe(htmlreplace({
      'css': './css/main.css',
      'js': 'build/' + path.GRAPH_MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceCurriculumHTML', function(){
  gulp.src(path.CURRICULUM_HTML)
    .pipe(htmlreplace({
      'css': './css/main.css',
      'js': 'build/' + path.CURRICULUM_MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceCourseHTML', function(){
  gulp.src(path.COURSE_HTML)
    .pipe(htmlreplace({
      'css': './css/main.css',
      'js': 'build/' + path.COURSE_MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('production', ['less', 'copyCSS', 'replaceHTML', 'replaceGraphHTML', 'replaceCurriculumHTML', 'replaceCourseHTML', 'build', 'buildGraph', 'buildCurriculum', 'buildCourse']);
gulp.task('localtest', ['production', 'webserver', 'watchProd']);
gulp.task('default', ['watch']);

