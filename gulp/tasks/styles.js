var gulp = require('gulp'),
postcss = require('gulp-postcss'),
 autoprefixer = require('autoprefixer'),
 cssVars = require('postcss-simple-vars'),
 nested = require('postcss-nested'),
 cssImport = require('postcss-import'),
 mixins = require('postcss-mixins');

gulp.task('styles',function(){
    return gulp.src('./app/clientside/styles/styles.css')
    .pipe(postcss([cssImport,mixins, cssVars, nested, autoprefixer]))
    .on('error',function(errorInfo){
        console.log(errorInfo.toString());
        this.emit('end');
    })
    .pipe(gulp.dest('./app/public/styles'));
    });
    
