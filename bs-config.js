var browserSync = require("browser-sync")
var path = require("path")

var baseDir = path.join(__dirname, "public")

module.exports = {
    files: [
        path.join(baseDir, "*.html"),
        path.join(baseDir, "css", "**", "*.css"),
        path.join(baseDir, "js", "**", "*.js")
    ],
    port: 6590,
    server: {
        baseDir: "public",
        index: "index.html"
    }
}