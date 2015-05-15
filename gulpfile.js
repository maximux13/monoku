var gulp = require("gulp"),
    sass = require("gulp-ruby-sass"),
    mincss = require("gulp-minify-css"),
    prefix = require("gulp-autoprefixer"),
    jade = require("gulp-jade"),
    useref = require("gulp-useref"),
    gulpif = require("gulp-if"),
    plumber = require("gulp-plumber"),
    jshint = require("gulp-jshint"),
    stylish = require("jshint-stylish"),
    uglify = require("gulp-uglify"),
    sync = require ("browser-sync").create();
    reload = sync.reload();

    gulp.task("jade", function(){
        return gulp.src(["./app/*.jade", "./app/view/*.jade"])
            .pipe(plumber())
            .pipe(jade({ pretty: true }))
            .pipe(gulp.dest("./app"));
    });

    gulp.task("html", function(){
        return gulp.src(["./app/**/*.html", "./app/views/*.html", "!./app/vendor/**/**.html"])
            .pipe(sync.reload({stream:true}));
    });

    gulp.task("sass", ['html'], function(){
        return sass("./app/sass", { style: 'compact' })
            .pipe(plumber())
            .pipe(prefix())
            .pipe(gulp.dest("./app/css"))
    });

    gulp.task("jshint", function(){
        return gulp.src("./app/js/**/*.js")
            .pipe(plumber())
            .pipe(jshint())
            .pipe(jshint.reporter(stylish));
    });

    gulp.task("build", function(){
        var assets = useref.assets();
        return gulp.src(["./app/**/*.html", "!./app/vendor/**/**.html"])
            .pipe(assets)
            .pipe(gulpif('*.js', uglify()))
            .pipe(gulpif('*.css', mincss()))
            .pipe(assets.restore())
            .pipe(useref())
            .pipe(gulp.dest('./public'));
    });

    gulp.task("serve", function(){
        sync.init({
            proxy   : "http://monoku/app",
            host    : "192.168.10.10"
        });

        gulp.watch(["./app/*.jade", "./app/view/*.jade"], ['jade']);
        gulp.watch(["./app/**/*.html"], ['html']);
        gulp.watch(["./app/sass/**/*.sass"], ['sass']);
        gulp.watch(["./app/css/**/*.css"], ['html']);
        gulp.watch("./app/js/**/*.js", ['jshint','html']);
    });

    gulp.task("default", ['jade','html','sass','jshint', 'serve']);