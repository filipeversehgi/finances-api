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

gulp.task("compile", ['lint'], function() {
    console.log('Building...');
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
    gulp.watch('src/**/*.ts', ["compile"]);
});

gulp.task("serve", ["compile", "watch"], () => {
    nodemon({
        script: "dist/server.js",
        env: { "NODE_ENV": "development" }
    })
        .on("restart", () => {
            console.log("restarted");
        })
})

// gulp.task("nodemon", ['compile'], function () {
//     var options = {
//         watch: "src/**/*.ts",
//         script: "dist/server.js",
//         tasks: ['compile'],
//         exec: 'node --inspect=0.0.0.0:5858',
//         stdout: true,
//         delay: 5
//     }
//     let stream = nodemon(options);
//     return stream;
// });

// gulp.task("watch", ['start'], function (cb){
//     // return watch('src/**/*.ts', { ignoreInitial: false })
//     //     .pipe(gulp.dest('lint'));
//     gulp.watch(["src/**/*.ts"], ["lint", "compile"])
// });


gulp.task("default", ['serve'], function () {

});