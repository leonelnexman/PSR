import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream'
import log from 'fancy-log';
import notify from 'gulp-notify';
import plumber from "gulp-plumber";
import PluginError from "plugin-error";
import server from './server';
import config from '../config';
import { createConfig } from "../../webpack.config";

const webpackConfig = createConfig(config.env);

const handler = (err, stats, cb) => {
    const { errors } = stats.compilation;

    if (err) throw new PluginError('webpack', err);

    if (errors.length > 0) {
        notify.onError({
            title: 'Webpack Error',
            message: '<%= error.message %>',
            sound: 'Submarine'
        }).call(null, errors[0]);
    }

    log('[webpack]', stats.toString({
        colors: true,
        chunks: false,
        errors: false
    }));

    server.server.reload();
    if (typeof cb === 'function') cb();
}

const webpackPromise = () => new Promise(resolve => webpack(webpackConfig, (err, stats) => handler(err, stats, resolve)));
const webpackPromiseWatch = () => new Promise(resolve => webpack(webpackConfig).watch({
    aggregateTimeout: 100,
    poll: false
}, handler));

const build = gulp => gulp.series(webpackPromise);
const watch = gulp => gulp.series(webpackPromiseWatch);
// const watch = gulp => () => gulp.watch(`${config.src.js  }/**/*`, gulp.series('js'));

module.exports.build = build;
module.exports.watch = watch;
