const gulp = require('gulp'),
	clean = require('gulp-clean'),
	concatCss = require('gulp-concat-css'),
	cssnano = require('gulp-cssnano'),
	rename = require('gulp-rename'),
	zip = require('gulp-zip');


gulp.task('watch', function () {
	gulp.watch(['assets/css/**/*.css']).on(
		'change',
		gulp.series(
			'clean-shared',
			'clean-blocks',
			'minify-shared',
			'minify-blocks'
		)
	);
});

gulp.task('clean-shared', function () {
	return gulp.src('assets/css/style-shared.min.css', {
			read: false,
			allowEmpty: true,
		})
		.pipe(clean());
});

gulp.task('clean-blocks', function () {
	return gulp.src('assets/css/blocks/*.min.css', {
			read: false,
			allowEmpty: true,
		})
		.pipe(clean());
});

gulp.task('minify-shared', function () {
	return gulp.src('assets/css/*.css')
		.pipe(concatCss('style-shared.min.css'))
		.pipe(cssnano())
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('minify-blocks', function () {
	return gulp.src('assets/css/blocks/*.css')
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('assets/css/blocks'));
});

// Zip files up
gulp.task('zip', function () {
	return gulp.src([
	  '*',
	  './assets/**/*',
	  './css/*',
	  './fonts/*',
	  './images/**/*',
	  './inc/**/*',
	  './js/**/*',
	  './languages/*',
	  './sass/**/*',
	  './template-parts/*',
	  './templates/*',
	  '!bower_components',
		'!node_modules',
		'!.babelrc',
		'!.editorconfig',
	  '!.eslintrc',
	  '!.eslintignore',
	  '!.gitignore',
	  '!.stylelintignore',
	  '!.stylelintrc.json',
	  '!composer.json',
	  '!gulpfile.js',
	  '!package-lock.json',
	  '!package.json',
	  '!phpcs.xml.dist',
	  '!phpstan.neon.dist',
	  '!postcss.config.js',
	 ], {base: "."})
	 .pipe(zip('bitin.zip'))
	 .pipe(gulp.dest('../'));
});

gulp.task(
	'default',
	gulp.series(
		'clean-shared',
		'clean-blocks',
		'minify-shared',
		'minify-blocks'
	)
);
