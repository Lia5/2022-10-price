//NPM-MODULES
var gulp       	 = require('gulp');
var sass       	 = require('gulp-sass');
var browserSync 	 = require('browser-sync').create();
var autoprefixer 	 = require('gulp-autoprefixer');
var plumber 		 = require('gulp-plumber');
var babel         = require('gulp-babel'),
	imagemin      = require('gulp-imagemin'),
	concat        = require('gulp-concat'),
	uglify        = require('gulp-uglify'),
	sourcemaps    = require('gulp-sourcemaps'),
	cleancss      = require('gulp-clean-css'),
	// gcmq      = require('gulp-group-css-media-queries'),
	rename        = require('gulp-rename'),
	notify        = require("gulp-notify"),
	include       = require('gulp-include'),
	util          = require('gulp-util'),
	eslint        = require('gulp-eslint'),
	gulpIf        = require('gulp-if');
gulp.task('browser-sync', function(done) { 
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    notify: false
  });
  
  browserSync.watch('dist/').on('change', browserSync.reload);
  
  done()
});	

gulp.task('styles', function(done){
  gulp.src('src/scss/**/*.scss')
    .pipe(plumber({
      errorHandler : function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass({errLogToConsole: true}))

	.pipe(sourcemaps.init({loadMaps: true}) )
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
	// .pipe(gcmq())
	// .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(sourcemaps.write('map',{addComment: false}))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({stream: true}));
  
  done()
});

const isFixed = (file) => (file.eslint != null && file.eslint.fixed);

gulp.task('jsLint', function() {
    const lintType = 1;
    return gulp.src(['./src/js/**/**.js', '!./src/js/min/**.js'], {since: gulp.lastRun('jsLint')})
        .pipe(eslint({
            parserOptions: {
                "ecmaVersion": 6
            },
            fix: true,
            rules: {
                'quotes': [1, 'single'],
                'semi': [1, 'always'],
                'no-console': [1, {allow: ['error']}],
                'no-empty': [lintType, {'allowEmptyCatch': true}],
                'no-debugger': [lintType],
                'no-alert': [lintType],
                'camelcase': [1, {properties: "never"}],
                'indent': [
                    1,
                    4,
                    {'SwitchCase': 1}
                ],
                'no-multiple-empty-lines': [1, {max: 2, maxBOF: 1}],
                'lines-around-comment': [1, {'beforeBlockComment': true}]
            },
        }))
        .pipe(eslint.format())
        .pipe(gulpIf(isFixed, gulp.dest('dist/js')))
        .pipe(eslint.failAfterError())
});

gulp.task('js', function() {
	return gulp.src([
		// './src/libs/1.jquery/dist/jquery.min.js',
		'./src/js/custom.js',
		])
    .pipe(plumber())
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(include())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(babel({
		presets: ['@babel/preset-env']
	}))
	.pipe(rename(function (path) {
		// path.dirname += "js";
		path.extname = ".js";
	}))
	.pipe(uglify())
	.pipe(sourcemaps.write('map',{addComment: false}) )
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream: true}));
});

// gulp.task('js2', function() {
// 	return gulp.src([
// 		'src/js/custom.js', // Always at the end
// 		])
// 	.pipe(plumber())
// 	.pipe(concat('custom.js'))
// 	// .pipe(uglify()) // Mifify js (opt.)
// 	.pipe(gulp.dest('dist/js'))
// 	.pipe(browsersync.reload({ stream: true }))
// });

gulp.task('images', function() {
	return gulp.src(['src/img/**/*.{gif,jpg,png,svg,webp}'])
	.pipe(plumber())
	.pipe(imagemin({progressive: true}))
	.pipe(gulp.dest("dist/img"))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.{eot,ttf,woff,svg,woff2}')
	.pipe(gulp.dest('dist/fonts'))
	.pipe(browserSync.reload({stream: true}));
});
gulp.task('html', function() {
  return gulp.src(['src/**/*.html', '!src/libs/**/*.html'])
	.pipe(gulp.dest('dist/'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', gulp.series('styles', 'html', 'js', 'images', 'fonts', 'browser-sync', function(done) {
	gulp.watch('src/**/*.scss', gulp.series('styles'));
	gulp.watch(['src/js/**/*.js'], gulp.series('jsLint', 'js'));
	// gulp.watch(['src/**/*.js'], gulp.series('js'));
	gulp.watch('src/img/**/*.{gif,jpg,png,svg}', gulp.series('images'));
	gulp.watch(['src/*.html', '!src/libs/**/*.html'], gulp.series('html'));
	gulp.watch('src/fonts/**/*.{eot,ttf,woff,svg,woff2}', gulp.series('fonts'));

  done()
}));

gulp.task('default', gulp.series('watch'));