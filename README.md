# taro-plugin-internal

Taro开放式跨团队协作插件，基于 gitlab api。

## Usage

> 注意：本插件仅试用于 Taro2.x 版本项目，3.x版本未测试。

```js
// config/index.js
module.exports = {
  plugins: {
    ['taro-plugin-internal', {
      repositories: [
        {
          dirname: "mp-subpackage",
          url: "git@xxx.com:lexmin0412/demo-subpackage.git",
          commit: "master",
          token: "sFtnN73T88P28JpSHWdH"
        },
      ],
      writeConfig: {
        app: {
          enable: true,
          filePath: './src/app.tsx',
          options: {
            startLineContent: '/** internal placeholder start */',
            endLineContent: '/** internal placeholder end */'
          }
        },
        gitignore: {
          enable: true,
          filePath: './.gitignore',
          options: {
            startLineContent: '/** internal placeholder start */',
            endLineContent: '/** internal placeholder end */'
          }
        }
      }
    }]
  }
}
```

## API

### Options

| 配置项       | 说明                  | 类型            | 是否必传 |
|--------------|-----------------------|-----------------|----------|
| repositories | 需要拉取的git仓库配置 | [Object Object] | 是      |
| writeConfig  | 写入文件配置          | [Object Object] | No       |

### Options.repositories

| 配置项 | 说明 | 类型 | 是否必传 |
|--------|------|------|----------|
|dirname|拉取后的本地文件夹名称|string|是|
|url|git仓库地址，暂只支持gitlab|string|是|
|commit|git分支名|string|是|
|token|gitlab access token|string|是|

### Options.writeConfig 

| 配置项 | 说明 | 类型 | 是否必传 |
|--------|------|------|----------|
|app|入口文件写入配置|WriteFileConfig|否|
|gitignore|.gitignore文件写入配置|WriteFileConfig|否|

### WriteFileConfig

| 属性 | 说明 | 类型 | 是否必传 |
|--------|------|------|----------|
|enable|是否启用|boolean|否|
|filePath|写入的文件路径|boolean|否|
|options|写入文件的具体配置|WriteConfig|否|

### WriteConfig

| 属性 | 说明 | 类型 | 是否必传 |
|------|------|------|----------|
|startLineContent|开始行的内容标识|string|是|
|startLineContent|开始行的内容标识|string|是|


