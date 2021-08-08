const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

function css() {
	return gulp
		.src('scss/app.scss')
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 2 versions'],
			cascade: false
		}))
		.pipe(sass({
			outputStyle: 'expanded', // nested, compact, compressed
		}))
		.pipe(gulp.dest('css'));/* destino de scss a css */
}


/* watch sera el que esta atento a cualquier cambio para actualizar */
function watchFiles() {
	gulp.watch('scss/*.scss', css);
	//gulp.watch('index.html');
}


/* 

	En este apartado seran los script 
	Ejemplo 
	/dev_css$ gulp css /
	/dev_css$ gulp watch /

*/
// Registrar funciones como tareas
gulp.task('css', css);
gulp.task('watch', watchFiles);



/* gulp.task('watch', function() {
	gulp.parallel(watchFiles)
}); */


