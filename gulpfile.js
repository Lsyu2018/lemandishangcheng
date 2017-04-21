// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');//压缩工具
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var mincss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var babel = require('gulp-babel');
var webpack = require('gulp-webpack');
// Load plugins
var $ = require('gulp-load-plugins')();
// 检查脚本
gulp.task('lint', function() {
   gulp.src('libs/js/*.js')
       .pipe(jshint())
       .pipe(jshint.reporter('default'));
});
// 合并，压缩文件(js)
gulp.task('minjs', function() {
    gulp.src('dist/*.js')
//      .pipe(concat('all.js'))
//      .pipe(gulp.dest('libs/dist'))
//      .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('libs/js'));
});
//压缩图片
gulp.task('testImagemin', function () {
    gulp.src('dist/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('libs/img'));
});
//使用connect启动一个Web服务器
gulp.task('connect', function () {
    connect.server({
        root: '',
        port: "",
        livereload: true
    });
});
gulp.task('html', function () {
    gulp.src('*.html').pipe(connect.reload());
    gulp.src('html/*.html').pipe(connect.reload());
});

// 编译Sass
gulp.task('sass', function() {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('libs/css'))
        .pipe(concat('common.css'))
        .pipe(gulp.dest('libs/css'))
        .pipe(rename('index.min.css'))
        .pipe(mincss())
        .pipe(gulp.dest('libs/css'));        
});
//编译ds6
//gulp.task('es6', function(){
//  gulp.src('es6/*.js')//es6 源文件
//  .pipe(babel()) //执行 babel 将 es6 编译成 es5
//  .pipe(uglify())
//  .pipe(gulp.dest('dist/js'))//编译成 es5 的文件存放目录
//  .pipe(webpack({//将所有 es5 的文件编译成一个文件 all.js
//    output:{
//      filename:"all.js",
//    },
//    stats:{
//      colors:true
//    },
//    module:{
//      loaders:[{test: /\.js$/, loaders: ['babel']}]
//    }
//  }))
//  .pipe(gulp.dest('dist/js'));//将 all.js 存放到此目录
//})
/* es6 */
gulp.task("es6", function () {
    return gulp.src("es6/*.js")
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("dist/js"));
});

//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
    //前面是监听的文件，后面是调用的任务
    gulp.watch(['*.html'], ['html']);
    gulp.watch(['dist/*.js'], ['minjs']);
    gulp.watch(['scss/*.scss'], ['sass']);
    gulp.watch(['libs/*.js'], ['html']);
    gulp.watch(['libs/css/common.min.css'], ['html']);
    gulp.watch(["es6/*.js"],["es6"]);
});
gulp.task('default', function(){
    gulp.run('watch', 'connect','sass',"html","es6");
});
