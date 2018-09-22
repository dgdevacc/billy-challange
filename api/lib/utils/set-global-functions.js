/* global __base */

module.exports = () => {
  if (global.GLOBAL_FUNCTIONS_DEFINED) return;

  console.log('[info] Setting global functions');

  global.getController = name => require(`${__base}/api/controllers/${name}/${name}.controller`);

  global.GLOBAL_FUNCTIONS_DEFINED = 1;
};
