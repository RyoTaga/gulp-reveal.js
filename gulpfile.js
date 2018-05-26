const gulp = require('gulp');
const fs = require('fs');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();

const Path = {
  Ejs: 'src/ejs/',
  Scss: 'src/scss/',
  Md: 'src/md/',
  Dist: './dist/'
};

gulp.task('ejs', () => {
  const config = JSON.parse(fs.readFileSync(`${Path.Ejs}ejs.config.json`));
  const data = config.data;
  const pages = config.pages;

  pages.forEach((page) => {
    gulp.src(`${Path.Ejs}template.ejs`)
      .pipe($.plumber())
      .pipe($.ejs({
        data,
        page,
      }))
      .pipe($.rename(`${page.id}.html`))
      .pipe(gulp.dest(`${Path.Dist}`))
      .pipe(browserSync.reload({ stream: true }));
  });
});

const outputStyle = 'compressed';

gulp.task('scss', () => {
  gulp.src([`${Path.Scss}reveal.scss`, `${Path.Scss}theme/*.scss`])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle,
    }))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(`${Path.Dist}css/`))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('md', () => {
  gulp.src(`${Path.Md}**.md`)
    .pipe(gulp.dest(`${Path.Dist}md/`))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "dist/"
    }
  });
});

const tasks = [
  'ejs',
  'scss',
  'md',
  'browser-sync'
];

gulp.task('default', tasks, () => {
  gulp.watch([`${Path.Ejs}**.ejs`, `${Path.Ejs}ejs.config.json`], ['ejs']);
  gulp.watch([`${Path.Scss}reveal.scss`, `${Path.Scss}theme/**.scss`], ['scss']);
  gulp.watch([`${Path.Md}**.md`], ['md']);
});
