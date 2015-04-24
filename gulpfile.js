/*==================== REQUIRE MODULES ====================*/
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

/*================= SET PATHS FOR BUILDING =================*/
var path = {
  //SRC HTML Files
  INDEX_HTML: './client/src/index.html',
  GRAPH_HTML: './client/src/graph.html',
  CURRICULUM_HTML: './client/src/curriculum.html',
  COURSE_HTML: './client/src/course.html',
  LOGIN_HTML: './client/src/login.html',
  SIGNUP_HTML: './client/src/signup.html',
  PROFILE_HTML: './client/src/profile.html',
  ABOUT_HTML: './client/src/about.html',
  //SRC CSS Files
  CSS: ['./client/src/css/*.css', './node_modules/bootstrap/dist/css/*.css'],
  IMG: ['./client/src/images/*', './client/src/images/stack/*'],
  //Target Minified JS File Names
  INDEX_MINIFIED_OUT: 'index.min.js',
  GRAPH_MINIFIED_OUT: 'graph.min.js',
  CURRICULUM_MINIFIED_OUT: 'curriculum.min.js',
  COURSE_MINIFIED_OUT: 'course.min.js',
  LOGIN_MINIFIED_OUT: 'login.min.js',
  SIGNUP_MINIFIED_OUT: 'signup.min.js',
  PROFILE_MINIFIED_OUT: 'profile.min.js',
  ABOUT_MINIFIED_OUT: 'about.min.js',
  OUT: 'bundle.js',
  //Production Build Destination Directories
  DEST: './client/dist',
  DEST_BUILD: './client/dist/build',
  //Source File Directory
  DEST_SRC: './client/dist/src',
  //Target JSX Files for Browserify
  INDEX_ENTRY_POINT: './client/src/js/App.jsx',
  GRAPH_ENTRY_POINT: './client/src/js/Graph.jsx',
  CURRICULUM_ENTRY_POINT: './client/src/js/Curriculum.jsx',
  COURSE_ENTRY_POINT: './client/src/js/Course.jsx',
  LOGIN_ENTRY_POINT: './client/src/js/Login.jsx',
  SIGNUP_ENTRY_POINT: './client/src/js/SignUp.jsx',
  PROFILE_ENTRY_POINT: './client/src/js/Profile.jsx',
  ABOUT_ENTRY_POINT: './client/src/js/About.jsx',
};

/*===================== BUILD JSX TO JS =====================*/
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

gulp.task('buildLogin', function(){
  browserify({
    entries: [path.LOGIN_ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.LOGIN_MINIFIED_OUT))
    .pipe(streamify(uglify(path.LOGIN_MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('buildSignup', function(){
  browserify({
    entries: [path.SIGNUP_ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.SIGNUP_MINIFIED_OUT))
    .pipe(streamify(uglify(path.SIGNUP_MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('buildProfile', function(){
  browserify({
    entries: [path.PROFILE_ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.PROFILE_MINIFIED_OUT))
    .pipe(streamify(uglify(path.PROFILE_MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('buildAbout', function(){
  browserify({
    entries: [path.ABOUT_ENTRY_POINT],
    transform: [reactify],
  })
    .bundle()
    .pipe(source(path.ABOUT_MINIFIED_OUT))
    .pipe(streamify(uglify(path.ABOUT_MINIFIED_OUT)))
    .pipe(gulp.dest(path.DEST_BUILD));
});

/*================== BUILD MATERIAL UI CSS ==================*/
gulp.task('less', function(){
  return gulp.src('./client/src/css/main.less')
    .pipe(less({path: '/'}))
    .pipe(gulp.dest(path.DEST + '/css'))
});

// gulp.task('copy', function(){
//   gulp.src(path.HTML)
//     .pipe(gulp.dest(path.DEST));
// });

/*=================== COPY CSS TO DIST DIR ===================*/
gulp.task('copyCSS', function(){
    gulp.src(path.CSS)
      .pipe(gulp.dest(path.DEST + '/css'));
});

gulp.task('copyImg', function(){
  gulp.src(path.IMG)
    .pipe(gulp.dest(path.DEST+ '/images'))
});

gulp.task('copyImgStack', function(){
  gulp.src(path.IMG)
    .pipe(gulp.dest(path.DEST+ '/images/stack'))
});

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

/*=================== BUILD HTML TO DIST DIR ===================*/
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

gulp.task('replaceLoginHTML', function(){
  gulp.src(path.LOGIN_HTML)
    .pipe(htmlreplace({
      'css': './css/main.css',
      'js': 'build/' + path.LOGIN_MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceSignupHTML', function(){
  gulp.src(path.SIGNUP_HTML)
    .pipe(htmlreplace({
      'css': './css/main.css',
      'js': 'build/' + path.SIGNUP_MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceProfileHTML', function(){
  gulp.src(path.PROFILE_HTML)
    .pipe(htmlreplace({
      'css': './css/main.css',
      'js': 'build/' + path.PROFILE_MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceAboutHTML', function(){
  gulp.src(path.ABOUT_HTML)
    .pipe(htmlreplace({
      'css': './css/main.css',
      'js': 'build/' + path.ABOUT_MINIFIED_OUT
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

gulp.task('production', ['less', 'copyCSS', 'replaceHTML', 'copyImg', 'copyImgStack', 'replaceGraphHTML', 'replaceCurriculumHTML', 'replaceCourseHTML', 'replaceLoginHTML', 'replaceSignupHTML','replaceProfileHTML', 'replaceAboutHTML', 'build', 'buildGraph', 'buildCurriculum', 'buildCourse', 'buildLogin', 'buildSignup', 'buildProfile', 'buildAbout']);
gulp.task('localtest', ['production', 'webserver', 'watchProd']);
gulp.task('default', ['watch']);

