const gulp = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');

gulp.task('clean', function () {
  return del.sync(['dist/**/*']);
});

gulp.task('css', function () {
  return gulp.src('src/shrew.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({ browsers: 'last 2 versions' }),
      cssnano()
    ]))
    .pipe(rename('shrew.css'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  return gulp.src('src/index.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean', 'css', 'html']);

gulp.task('dev', ['build'], function () {
  browserSync.init({ server: 'dist' });
  gulp.watch('src/**/*.scss', ['css']);
  gulp.watch('src/**/*.html', ['html']).on('change', browserSync.reload);
});

gulp.task('default', ['build']);
