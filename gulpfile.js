var fs = require('fs')
var argv = require('yargs').argv
var del = require('del')

var debug = !!argv.debug

var gulp = require('gulp')
    , gulpFilter = require('gulp-filter')
    , sourcemaps = require('gulp-sourcemaps')
    , nodemon = require('gulp-nodemon')
    , babel = require('gulp-babel')
    , spawn = require('child_process').spawn

gulp.task('clean', function () {
    return del('dist')
})

gulp.task('compile', ['clean'], function () {
    var filter = gulpFilter(['**/*.js'], {restore: true})

    return gulp.src('./src/**/*') // your ES2015 code
        .pipe(filter)
        .pipe(sourcemaps.init())
        .pipe(babel()) // compile new ones
        .pipe(sourcemaps.write())
        .pipe(filter.restore)
        .pipe(gulp.dest('./dist')) // write them
})

gulp.task('version', ['compile'], function () {
    return fs.writeFileSync('dist/version.txt', (new Date()).valueOf().toString())
})

gulp.task('watch', ['compile', 'version'], function () {
    var bunyan

    var options = {
        script: 'dist/server.js' // run ES5 code
        , watch: 'src' // watch ES2015 code
        , tasks: ['compile', 'version'] // compile synchronously onChange
        , stdout: false
    }

    if (debug) {
        options.execMap = {
            js: 'node --debug-brk'
        }
    }

    return nodemon(options).on('readable', function () {
        // free memory
        bunyan && bunyan.kill()

        bunyan = spawn('./node_modules/.bin/bunyan', [
            '--output', 'short',
            '--color'
        ])

        bunyan.stdout.pipe(process.stdout)
        bunyan.stderr.pipe(process.stderr)

        this.stdout.pipe(bunyan.stdin)
        this.stderr.pipe(bunyan.stdin)
    })
})
