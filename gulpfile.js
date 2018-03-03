const gulp = require("gulp");
const ts = require("gulp-typescript");
const tslint = require("gulp-tslint");
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
const watch = require('gulp-watch');

const tsProject = ts.createProject("tsconfig.json");

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false }) // much faster
        .pipe(rimraf());
});

gulp.task("lint", () =>
    gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report())
);

gulp.task("build", ['lint'], function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

let watching = false;

gulp.task("nodemon", ['build'], function () {
    var options = {
        watch: "./src",
        script: "dist/server.js",
        tasks: ['build']
    }
    let stream = nodemon(options);
    stream.on('start', () => {
        console.log('Nodemon started');

        if(!watching){
            gulp.watch('./src', ['build']);
            watching = true;
        }
    }).on('restart', function () {
        console.clear();
    });
    return stream;
});

// gulp.task("watch", ['start'], function (cb){
//     // return watch('src/**/*.ts', { ignoreInitial: false })
//     //     .pipe(gulp.dest('lint'));
//     gulp.watch(["src/**/*.ts"], ["lint", "build"])
// });


gulp.task("default", ['nodemon'], function () {

});