var config = require('./config')

var gulp = require('gulp')
var data = require('gulp-data')
var stylus = require('gulp-stylus')
var watch = require('gulp-watch')
var concat = require('gulp-concat')

// Transforma os arquivos .styl de componentes para .css
gulp.task('styl-components', () =>
	gulp
		.src([config.stylComponents, '!./src/assets/**/*.styl'])
		.pipe(
			data(file => {
				return {
					componentPath:
						'/' + file.path.replace(file.base, '').replace(/\/[^\/]*$/, '')
				}
			})
		)
		.pipe(stylus())
		.pipe(gulp.dest(config.stylComponentsDist))
)
gulp.task('watch-styl-components', () =>
	watch(config.stylComponents, gulp.series('styl-components'))
)

// Transforma os arquivos .styl de assets para .css
gulp.task('styl-global', () =>
	gulp
		.src(config.stylGlobal)
		.pipe(stylus({ compress: true }))
		.pipe(concat('0-all.css'))
		.pipe(gulp.dest(config.stylGlobalDist))
)
gulp.task('watch-styl-global', () =>
	watch(config.stylGlobal, gulp.series('styl-global'))
)

// Task padrão ao rodar gulp, inicia os watchers
gulp.task('default', done =>
	gulp.series(
		gulp.parallel('styl-components', 'styl-global'),
		gulp.parallel('watch-styl-components', 'watch-styl-global')
	)(done)
)
gulp.task('build', done =>
	gulp.series(gulp.parallel('styl-components', 'styl-global'))(done)
)
