const { src, dest, watch, parallel, series } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");
const avif = require("gulp-avif");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const svgSprite = require("gulp-svg-sprite");
const fonter = require("gulp-fonter");
const ttf2woff2 = require("gulp-ttf2woff2");
const htmlmin = require("gulp-htmlmin");

function htmlCompress() {
  return src("src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist"));
}

function fonts() {
  return src("src/fonts/src-fonts/*.*")
    .pipe(
      fonter({
        formats: ["woff", "ttf"],
      })
    )
    .pipe(src("src/fonts/*.ttf"))
    .pipe(ttf2woff2())
    .pipe(dest("src/fonts"));
}

function images() {
  return src(["src/img/src-img/*.*", "!src/img/src-img/*.svg"])
    .pipe(newer("src/img"))
    .pipe(avif({ quality: 50 }))

    .pipe(src("src/img/src-img/*.*"))
    .pipe(newer("src/img"))
    .pipe(webp())

    .pipe(src("src/img/src-img/*.*"))
    .pipe(newer("src/img"))
    .pipe(imagemin())

    .pipe(dest("src/img"));
}

function sprite() {
  return src("src/img/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
            example: true,
          },
        },
      })
    )
    .pipe(dest("src/img"));
}

function scripts() {
  return src("src/js/main.js")
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("src/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("src/sass/style.sass")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
      })
    )
    .pipe(dest("src/css"))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "src/",
    },
  });
  watch(["src/fonts/src-fonts"], fonts);
  watch(["src/sass/*.sass"], styles);
  watch(["src/img/src-img"], images);
  watch(["src/js/main.js"], scripts);
  watch(["src/*.html"]).on("change", browserSync.reload);
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    [
      "src/css/style.min.css",
      "src/img/*.*",
      "!src/img/*.svg",
      "src/img/sprite.svg",
      "src/fonts/*.*",
      "src/js/main.min.js",
    ],
    {
      base: "src",
    }
  ).pipe(dest("dist"));
}

exports.htmlCompress = htmlCompress;
exports.images = images;
exports.fonts = fonts;
exports.sprite = sprite;
exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;

exports.build = series(cleanDist, building, htmlCompress, sprite);
exports.default = parallel(styles, scripts, watching);
