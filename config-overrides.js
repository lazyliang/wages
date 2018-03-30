const {injectBabelPlugin, getLoader} = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

module.exports = function override (config, env) {

  config = injectBabelPlugin([
    'import',
    {libraryName: 'antd', style: true},
  ], config)
  config = injectBabelPlugin('transform-decorators-legacy', config)

  //更换antd主题
  config = rewireLess(config, env, {
    modifyVars: {'@layout-header-background': '#2f4050'},
  })

  return config
}