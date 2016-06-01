'use strict';

var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var server = require('gulp-server-livereload');
var watch = require('gulp-watch');
var debug = require('gulp-debug');

gulp.task('styles', function () {
    return gulp.src('src/css/*.css')
        .pipe(concatCss('style.min.css'))
        .pipe(gulp.dest('dist'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.min.js'))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});

gulp.task('pages', function () {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(debug({title: 'src'}))
        .pipe(server({
            livereload: true,
            directoryListing: false,
            open: true,
            defaultFile: 'index.html',
        }))
        .pipe(debug({title: 'server'}))
});

gulp.task('default', function () {

    gulp.start('pages', 'styles', 'scripts', 'webserver');

    gulp.watch('src/*.html', ['pages']);
    gulp.watch('src/css/*.css', ['styles']);
    gulp.watch('src/js/*.js', ['scripts']);
});
