const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

// Images
const images = () => {
  return src('app/images/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest('dist/images'));
};
// Styles
const styles = () => {
  return src(['node_modules/swiper/swiper-bundle.css', 'app/scss/style.scss'])
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
      })
    )
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream());
};

// Scripts
const scripts = () => {
  return src([
    'node_modules/swiper/swiper-bundle.js',
    'node_modules/fslightbox/index.js',
    'app/js/index.js',
  ])
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream());
};

// Watching
const watching = () => {
  browserSync.init({
    server: {
      baseDir: 'app/',
    },
  });
  watch(['app/scss/*.scss'], styles);
  watch(['app/js/index.js'], scripts);
  watch(['app/*.html']).on('change', browserSync.reload);
};

// Clean Dist
const cleanDist = () => {
  return src('dist').pipe(clean());
};

// Build
const build = () => {
  return src(['app/css/style.min.css', 'app/js/index.min.js', 'app/*.html'], {
    base: 'app',
  }).pipe(dest('dist'));
};

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;

exports.build = series(build, images);
exports.default = parallel(styles, scripts, watching);
