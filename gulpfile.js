let gulp = require('gulp');
let browserSync = require('browser-sync');
let reload = browserSync.reload;
let nodemon = require('gulp-nodemon');

gulp.task('browser-sync', ['nodemon'], () => {
    browserSync({
        proxy: 'localhost:3000',
        port: 5000,
        notify: true
    });
});

gulp.task('default', (callback) => {
    let called = false;
    return nodemon({
        script: 'backend/server.js',
        ignore: [
            'node_modules/',
            'gulpfile.js'
        ]
    })
        .on('start', () => {
            if (!called) {
                called = true;
                callback();
            }
        })
        .on('restart', () => {
            setTimeout(() => {
                reload({ stream: false });
            }, 1000);
        });
});
