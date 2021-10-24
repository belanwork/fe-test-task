const colors = require('./config/colors');
module.exports = {
  plugins: [
    require('postcss-simple-vars')({ variables: colors }),
    require('autoprefixer'),
    require('postcss-nested'),
  ],
};
