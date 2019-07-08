var express = require('express'),
 app=express(),
 gulp = require('gulp'),
 watch = require('gulp-watch'),
 browserSync = require('browser-sync').create();
 app.set('view engine','ejs')


gulp.task('watch',function(){

    browserSync.init({
        server:{
            baseDir:"app"
        }
    })
    watch('./app/views/**/*.ejs',function(){
        browserSync.reload();
        });

     watch('./app/clientside/styles/**/*.css',function(){
        gulp.start('cssInject')
            });

            watch('./app/clientside/scripts/**/*.js',function(){
                gulp.start('scriptsRefresh')
                    });
});

 gulp.task('cssInject',['styles'],function(){
    return gulp.src('./app/clientside/styles/styles.css')
    .pipe(browserSync.stream());
});

gulp.task('scriptsRefresh',['scripts'],function(){
    browserSync.reload();
});