/*Gulp modules
 * */

var gulp 		= require('gulp'),
	
	gutil		= require("gulp-util"),
	concat 		= require('gulp-concat'),
	runSequence = require('run-sequence'),
	rename 		= require('gulp-rename'),
	
	sass 		= require('gulp-sass'),
	minifyCss 	= require('gulp-minify-css'),
	autoprefixer 	= require('gulp-autoprefixer'),
	
	bower 		= require('gulp-bower'),
	server 		= require('gulp-server-livereload')

	bundle = require('gulp-bundle-assets');

/*Vars*/
var assetsPath = ['assets/'],
	bowerDir = 'bower_components/',
	fonts  = [bowerDir+'fontawesome/fonts/*'];

var config = {
		//we exclude animations because irt is imported in page specific animations
		sassPaths: ['app/**/*.scss'],
		autoprefixerOptions : {
			browsers: [
                       '> 1%',
                       'last 2 versions',
                       'firefox >= 4',
                       'safari 7',
                       'safari 8',
                       'IE 8',
                       'IE 9',
                       'IE 10',
                       'IE 11'
                   ],
                   cascade: false
		},
		serverOptions : {
		      livereload: true,
		      open: true,
		      defaultFile: 'index.html',
		      fallback: 'index.html', 
		      port : 8100
		}
};


gulp.task('move-fonts', function() {
	//fontawesome
	var faFrom = fonts,
	faTo = assetsPath+'fonts/fontawesome';

	gulp.src(faFrom)
		.pipe(gulp.dest(faTo))
		.on('end', function(){  gutil.log(gutil.colors.green('moved fonawesome font-files from '+faFrom+' to '+faTo)); });

});

gulp.task('sass', function(done) {
	  var scssFrom = config.sassPaths,
		  scssTo = assetsPath+'/css';

	 return  gulp.src(scssFrom)

	  	.pipe(concat('app.css'))
	    .pipe(sass({
	      errLogToConsole: true
	    }))

	    .pipe(autoprefixer(config.autoprefixerOptions))
	    .on('end', function(){  gutil.log(gutil.colors.green('prefixes created')); })

	    .pipe(gulp.dest(scssTo))
	    .on('end', function(){  gutil.log(gutil.colors.green('app.css created')); })

	    .pipe(minifyCss({
	      keepSpecialComments: 0
	    }))
	    .on('end', function(){  gutil.log(gutil.colors.green('app.min.css created')); })

	    .pipe(rename({ extname: '.min.css' }))
	    .pipe(gulp.dest(scssTo), done);

});

gulp.task('watch-sass',['sass'], function() {

	gutil.log(gutil.colors.green('watch-sass started'));
	return  gulp.watch(config.sassPaths, ['sass']);

});


/*livereload*/
gulp.task('webserver',['watch-sass'], function() {
	return   gulp.src('./')
	    .pipe(server(config.serverOptions));
});

/*The default task (called when you run `gulp` from cli)*/
gulp.task('default', ['sass', 'watch-sass', 'webserver']);