/**
 * Laravel Mix configuration file.
 *
 * Laravel Mix is a layer built on top of WordPress that simplifies much of the
 * complexity of building out a Webpack configuration file. Use this file to
 * configure how your assets are handled in the build process.
 *
 * @link https://laravel.com/docs/5.6/mix
 *
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 */

// Import required packages.
const mix = require('laravel-mix');

/*
 * -----------------------------------------------------------------------------
 * Build Process
 * -----------------------------------------------------------------------------
 * The section below handles processing, compiling, transpiling, and combining
 * all of the plugin's assets into their final location. This is the meat of the
 * build process.
 * -----------------------------------------------------------------------------
 */

/*
 * Sets the development path to assets. By default, this is the `/build/plugin`
 * folder in the plugin.
 */

const devPath = 'src';
const devScssPath = 'scss';

/*
 * Sets the path to the generated assets. By default, this is the `/dist/plugin/assets` folder
 * in the plugin. If doing something custom, make sure to change this everywhere.
 */
mix.setPublicPath('pkg/dist-web');

/*
 * Set Laravel Mix options.
 *
 * @link https://laravel.com/docs/5.6/mix#postcss
 * @link https://laravel.com/docs/5.6/mix#url-processing
 */
mix.options({
  // eslint-disable-next-line global-require
  postCss: [require('postcss-preset-env')()],
  processCssUrls: false
});

/*
 * Builds sources maps for assets.
 *
 * @link https://laravel.com/docs/5.6/mix#css-source-maps
 */
mix.sourceMaps();

/*
 * Versioning and cache busting. Append a unique hash for production assets. If
 * you only want versioned assets in production, do a conditional check for
 * `mix.inProduction()`.
 *
 * @link https://laravel.com/docs/5.6/mix#versioning-and-cache-busting
 */
mix.version();

/*
 * Compile JavaScript.
 *
 * @link https://laravel.com/docs/5.6/mix#working-with-scripts
 */

mix.js(`${devPath}/index.js`, '').js(`${devPath}/index-vaadin-grid.js`, '');

// currently no wildcard support
// https://github.com/JeffreyWay/laravel-mix/issues/982
mix.sass(`${devScssPath}/global/test.scss`, 'css');

/*
 * Extract vendors etc.
 *
 * @link https://laravel-mix.com/docs/5.0/extract
 */
mix.extract();

/*
 * Add custom Webpack configuration.
 *
 *
 * @link https://laravel.com/docs/5.6/mix#custom-webpack-configuration
 * @link https://webpack.js.org/configuration/
 */
mix.webpackConfig(() => {
  return {
    stats: 'minimal',
    devtool: mix.inProduction() ? false : 'source-map',
    performance: { hints: false },
    module: {
      rules: [
        {
          test: require.resolve('headroom.js'),
          use: 'imports-loader?this=>window,define=>false,exports=>false'
        }
      ]
    }
  };
});
