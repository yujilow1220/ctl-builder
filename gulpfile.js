var gulp = require('gulp');
var rename = require("gulp-rename");

gulp.task('watch', function () {
    gulp.watch('*/**', ['copy']);
});

gulp.task('copy', function(){
  gulp.src('/Users/owner/.ghq/github.com/yujilow1220/ctl-builder/**/*')
    .pipe(rename(function (path) {
      path.dirname += '/dest';
    }))
    .pipe(gulp.dest('/Users/owner/dev/utils/vagrant/ubuntu/ctl'));
})
