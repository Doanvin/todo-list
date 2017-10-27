// Required Plugins
var gulp          = require('gulp');
var autoprefixer  = require('gulp-autoprefixer');
var browserSync   = require('browser-sync');
var cache         = require('gulp-cache');
var concat        = require('gulp-concat');
var htmlmin       = require('gulp-htmlmin');
var imagemin      = require('gulp-imagemin');
var cleanCSS      = require('gulp-clean-css');
var plumber       = require('gulp-plumber');
var reload        = browserSync.reload;
var rename        = require('gulp-rename');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');
var sourcemaps    = require('gulp-sourcemaps');
var babel         = require('gulp-babel');


gulp.task('js-minify', function () {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(babel())
        .pipe(sourcemaps.init())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}));
});

// gulp.task('js', ['js-minify']);

// Css Task
gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(plumber())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}));
});

// Sass Task
gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}));
});

// HTML Task
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
});

// Img Task
gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({progressive: true})))
        .pipe(gulp.dest('dist/img'))
        .pipe(reload({stream:true}));
});

gulp.task('move-fonts', function() {
    return gulp.src([
        'src/font/**/*'
        ])
        .pipe(gulp.dest('dist/font'));
})

// Browser-Sync Task
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    });
});

// Watch Task
gulp.task('live',  ['browser-sync'], function() {
    // Watch scss, js, img, html files
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/css/**/*.css', ['css']);
    gulp.watch('src/js/**/app.js', ['js-minify']);
    gulp.watch('src/img/**/*', ['img']);
    gulp.watch('src/**/*.html', ['html']);
});

// Default Task
gulp.task('default', function() {
    gulp.start('sass', 'css', 'js-minify', 'img', 'html', 'move-fonts');
});
