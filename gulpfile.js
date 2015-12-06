var atImport = require("postcss-import")
var autoprefixer = require("autoprefixer")
var browserSync = require("browser-sync").create()
var concat = require("gulp-concat")
var csswring = require("csswring")
var del = require("del")
var gulp = require("gulp")
var minifyHTML = require("gulp-minify-html")
var path = require("path")
var postcss = require("gulp-postcss")
var uglify = require("gulp-uglify")

var publicDir = path.join(__dirname, "public")
var srcDir = path.join(__dirname, "src")

gulp.task("browser-sync", ["build"], function () {
    browserSync.init({
        port: 6590,
        server: {
            baseDir: "public",
            index: "index.html"
        }
    })
})

gulp.task("build", ["html", "css", "js", "img"])

gulp.task("clean-css", function () {
    return del(path.join(publicDir, "css", "**", "*.css"))
})

gulp.task("clean-html", function () {
    return del(path.join(publicDir, "*.html"))
})

gulp.task("clean-img", function () {
    return del(path.join(publicDir, "img", "*.*"))
})

gulp.task("clean-js", function () {
    return del(path.join(publicDir, "js", "**", "*.js"))
})

gulp.task("css", ["clean-css"], function (cb) {
    var processors = [
        atImport,
        autoprefixer({browsers: [
            "last 3 version"
        ]}),
        csswring
    ]

    return gulp
        .src(path.join(srcDir, "css", "*.css"))
        .pipe(postcss(processors))
        .pipe(gulp.dest(path.join(publicDir, "css")))
        .pipe(browserSync.stream())
})

gulp.task("css-watch", ["css"])

gulp.task("html", ["clean-html"], function () {
    return gulp
        .src(path.join(srcDir, "*.html"))
        .pipe(minifyHTML())
        .pipe(gulp.dest(publicDir))
        .pipe(browserSync.stream())
})

gulp.task("html-watch", ["html"], browserSync.reload)

gulp.task("img", ["clean-img"], function () {
    return gulp
        .src(path.join(srcDir, "img", "*.*"))
        .pipe(gulp.dest(path.join(publicDir, "img")))
})

gulp.task("js", ["clean-js"], function () {
    return gulp
        .src([
            path.join(srcDir, "js", "vendor", "jquery.min.js"),
            path.join(srcDir, "js", "vendor", "foundation.min.js"),
            path.join(srcDir, "js", "*.js")
        ])
        .pipe(uglify())
        .pipe(concat("main.js"))
        .pipe(gulp.dest(path.join(publicDir, "js")))
        .pipe(browserSync.stream())
})

gulp.task("js-watch", ["js"], browserSync.reload)

gulp.task("watch", function () {
    gulp.watch(path.join(srcDir, "*.html"), ["html-watch"])
    gulp.watch(path.join(srcDir, "css", "*.css"), ["css-watch"])
    gulp.watch(path.join(srcDir, "js", "*.js"), ["js-watch"])
})

gulp.task("server", ["browser-sync", "watch"])