import del from 'del';
import log from 'fancy-log';
import colors from 'ansi-colors';
import config from '../config';

const build = () => function () {
  return del([
    config.dest.root
  ])
      .then(paths => log('Deleted:', colors.magenta(paths.join('\n'))))
};

module.exports.build = build;
