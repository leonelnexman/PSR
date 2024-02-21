import gulp from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import prettify from 'gulp-prettify';
import data from 'gulp-data';
import frontMatter from 'front-matter';
import replace from 'gulp-replace';
import webpHTML from '../util/gulp-avif-webp-html';
import config from '../config';

const renderHtml = onlyChanged => {
    nunjucksRender.nunjucks.configure({
        watch: false,
        trimBlocks: true,
        lstripBlocks: false
    });

    const timestamp = (new Date()).getTime();

    return gulp
        .src([`${config.src.templates}/**/[^_]*.html`])
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html)))
        .pipe(data(((file) => {
            const content = frontMatter(String(file.contents));
            return content.attributes;
        })))
        .pipe(nunjucksRender({
            PRODUCTION: config.production,
            path: [config.src.templates]
        }))
        .pipe(webpHTML())
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto', // 'force'
            preserve_newlines: false,
            // unformatted: [],
            end_with_newline: true
        }))
        .pipe(gulpif(config.production, replace('app.css', `app.css?v=${  timestamp}`)))
        .pipe(gulpif(config.production, replace('app.js', `app.js?v=${  timestamp}`)))
        .pipe(gulp.dest(config.dest.html));
}

gulp.task('nunjucks', () => renderHtml());
gulp.task('nunjucks:changed', () => renderHtml(true));

const build = gulp => gulp.parallel('nunjucks');
const watch = gulp => function () {
    gulp.watch([
        `${config.src.templates}/**/[^_]*.html`
    ], gulp.parallel('nunjucks:changed'));

    gulp.watch([
        `${config.src.templates}/**/_*.html`
    ], gulp.parallel('nunjucks'));
};

module.exports.build = build;
module.exports.watch = watch;
