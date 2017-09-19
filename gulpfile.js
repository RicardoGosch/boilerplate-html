const gulp        = require('gulp');
const stylus      = require('gulp-stylus');
const pug         = require('gulp-pug');
const browserSync = require('browser-sync').create();
const prefix      = require('autoprefixer-stylus');
const uglify      = require('gulp-uglify');
const sourcemaps  = require('gulp-sourcemaps');
const reload      = browserSync.reload;

const files = {
	src: {
		css: {
			all: "./src/styl/**/*.styl",
			unique: "./src/styl/*.styl"
		},
		js: {
			all: "./src/js/**/*.js",
			unique: "./src/js/*.js"
		},
		html: {
			all: "./src/pug/**/*.pug",
			unique: "./src/pug/*.pug"
		},
	},
	dist: {
		css: {
			all: "./assets/css",
			unique: "./assets/css/*.css"
		},
		js: {
			all: "./assets/js",
			unique: "./assets/js/*.js"
		},
		html: {
			all: "./",
			unique: "./*.html"
		}
	}
}

// Compila o stylus
gulp.task('stylus', function(){
	gulp.src(files.src.css.unique)
		.pipe(sourcemaps.init())
		.pipe(stylus({
			use: prefix(),
			compress: true
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(files.dist.css.all));
});

// Compila o pug
gulp.task('pug', function(){
	return gulp.src(files.src.html.unique)
		.pipe(pug({}))
		.pipe(gulp.dest(files.dist.html.all));
});

// Minifica o JS
gulp.task('js', function(){
	gulp.src(files.src.js.unique)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(files.dist.js.all))
});

// Live Preview
gulp.task('sync', function () {
	browserSync.init({
		server: {
		  baseDir: files.dist.html.all
		},
		open: false,
		notify: false
	})
});

// Chama a galera toda
gulp.task('default', ['js', 'pug', 'stylus', 'sync'], function(){

	// Auto compile
	gulp.watch(files.src.css.all, ['stylus']);
	gulp.watch(files.src.js.all, ['js']);
	gulp.watch(files.src.html.all, ['pug']);

	// Live preview
	gulp.watch(files.dist.html.unique).on('change', reload);
	gulp.watch(files.dist.js.unique).on('change', reload);
	gulp.watch(files.dist.css.unique).on('change', reload);
});
