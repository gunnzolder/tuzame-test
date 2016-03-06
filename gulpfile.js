'use strict';

var gulp = require('gulp'),
    map = require('map-stream'),
    concat = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    jsdoc = require("gulp-jsdoc"),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer');


var processors = [
    autoprefixer({browsers: 'last 2 versions'})
];


var SRC_BASE = './src',
    DIST_BASE = './app';

/* JSDoc */
gulp.task('jsdoc', function () {
    gulp.src(SRC_BASE + '/**/*.js')
        .pipe(jsdoc('./jsdoc'));
});


/* SCSS */

gulp.task('sass', function () {
    gulp.src([
            SRC_BASE + '/**/*.scss'
        ], { base: '.' })
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest(DIST_BASE))
        .pipe(postcss(processors))
        .pipe(gulp.dest(DIST_BASE));
});

/* Javascript */

gulp.task('scripts', function () {
    gulp.src([
            SRC_BASE + '/**/*.module.js',
            SRC_BASE + '/**/*.factory.js',
            SRC_BASE + '/**/*.directive.js',
            SRC_BASE + '/**/*.controller.js'
        ], { base: '.' })
        //.pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(DIST_BASE));
});

gulp.task('libs', function () {
    gulp.src([
            'node_modules/angular/angular.min.js',
            'node_modules/angular-resource/angular-resource.min.js',
            'node_modules/angular-sanitize/angular-sanitize.min.js',
            'node_modules/angular-sanitize/angular-animate.min.js',
        ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest(DIST_BASE));
});

gulp.task('templates', function () {
    gulp.src([
            SRC_BASE + '/blocks/**/*.html'
        ], { base:  SRC_BASE + '/blocks' })
        .pipe(gulp.dest(DIST_BASE + '/views'));
});

gulp.task('resources', function () {
    gulp.src([
            SRC_BASE + '/**/images/**/*.{jpg,png,svg}'
        ], { base:  '.'})
        .pipe(map(stripPaths))
        .pipe(gulp.dest(DIST_BASE + '/images'));
});

/* Watcher */

gulp.task('watch', function () {
    gulp.watch([SRC_BASE + '/**/*.scss'], ['sass']);
    gulp.watch([SRC_BASE + '/**/*.js'], ['scripts']);
    gulp.watch([SRC_BASE + '/**/*.html'], ['templates']);
});


gulp.task('default', ['sass','scripts','templates']);
gulp.task('deploy', ['sass','libs','scripts','templates','resources']);



function stripPaths(file, cb) {
    file.path = file.base+'/'+file.path.split('/').pop();
    cb(null, file);
};