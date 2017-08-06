const path = require('path')
const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]
/**
 * 详细说明https://github.com/sorrycc/roadhog
 */
export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  //移步config.js去配置serverUrl
  // 接口代理示例
  // proxy: {
  //   "http://47.93.48.40:8888/api/v1": {
  //     //"target": "http://119.29.88.16:8888",
  //     //"target": "http://localhost:8888",
  //     //阿里云的服务器
  //     "target": " http://47.93.48.40:8888",
  //     "changeOrigin": true,
  //     "pathRewrite": {"^/api/v1": "/api/v1"}
  //   },
  // },



  //针对特定的环境进行配置。server 的环境变量是 development，build 的环境变量是 production
  env: {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    },
    production: {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", {"libraryName": "antd", "style": true}]
      ]
    }
  },
  //配置是否多页应用。多页应用会自动提取公共部分为 common.js 和 common.css
  //必须在index.html 里面引用
  multipage: false,
}
