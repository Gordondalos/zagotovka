'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	jade = require('gulp-jade'),
	prefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cssmin = require('gulp-minify-css'), // минимизирует ксс
	rimraf = require('rimraf'), // очищает директорию
	browserSync = require("browser-sync"),
	reload = browserSync.reload;

var path = {
	build: {
		html: 'build/',
		js: 'build/js/',
		fonts: 'build/fonts/',
		jade: 'build/'
	},
	src: {
		html: 'src/*.html',
		js: 'src/js/common.js',
		style: 'src/sass/main.sass',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*',
		jade: 'src/jade/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		fonts: 'src/fonts/**/*.*',
		jade: 'src/jade/**/*.*'
	},
	clean: './build'
};

var config = {
	server: {
		baseDir: "./build"
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "Frontend_Devil"
};


gulp.task('jade', function() {
	gulp.src(path.src.jade)
		.pipe(jade())
		.pipe(gulp.dest(path.build.jade))
});



gulp.task('webserver', function () {
	browserSync(config);
});

gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});


gulp.task('js:build', function () {
	gulp.src(path.src.js)
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.js))
		.pipe(reload({stream: true}));
});



gulp.task('fonts:build', function() {
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(reload({stream: true}));
});


gulp.task('jade:build', function() {
	gulp.src(path.src.jade)
		.pipe(jade())
		.pipe(gulp.dest(path.build.jade))
		.pipe(reload({stream: true}));
});

gulp.task('build', [
	'js:build',
	'fonts:build',
	'jade:build'
]);


gulp.task('watch', function(){

	watch([path.watch.jade], function(event, cb) {
		gulp.start('jade:build');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});

	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');

	});

});


gulp.task('default', ['build', 'webserver', 'watch']);