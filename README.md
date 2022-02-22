# taro-plugin-internal

> [点此](https://lexmin0412.github.io/tarox/docs/) 查看文档。

Taro跨团队协作插件，基于 gitlab api，实现一主多从的多团队开发模式。

## what is internal?

对于一些较大的产品团队，可能由一个主要的产品来承担平台的作用，给其他周边产品来提供流量入口，或者说不同产品之间的互相引流，都是实实在在存在的场景。对于这样的场景，可能有以下的实现形式：

1. 外部团队临时加入平台产品团队进行开发，任务完成后回归；
2. 平台产品团队参与外部产品的需求评审，帮忙开发功能模块；
3. 平台产品提供入口，外部团队自行开发，以类似于SDK的形式接入，平台只在发布时进行打包整合的工作。

第一种形式对外部团队的开发人员不够友好，第二种形式则会给平台开发团队造成较大的压力，综合来说，最后一种形式毫无疑问兼具了前两种的优点又规避了它们的一些缺点，本插件就是为了在 Taro 项目中提供了这样的解决方案。具体实现：

外部团队新开单独的 git 仓库来存放代码，在开发时拉取主项目，将自己的仓库作为分包来进行开发，开发完成后，将仓库的信息提交给主项目的开发人员，主项目通过添加分包配置，拉取对应的分包仓库进行打包。

## Usage

> 注意：本插件仅试用于 Taro2.x 版本项目，3.x版本未经测试，因涉及到文件读写操作，请谨慎使用。

`config/index.js`

```js
module.exports = {
  plugins: {
    ['taro-plugin-internal', {
      repositories: [
        {
          dirname: "mp-subpackage",
          url: "https://xxx.com/lexmin0412/demo-subpackage.git",
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
            startLineContent: '# internal placeholder start',
            endLineContent: '# internal placeholder end'
          }
        }
      }
    }]
  }
}
```

`.gitignore`

```bash
# internal placeholder start

# internal placeholder end
```

`app.tsx`

```jsx
class App extends Component {
  config: Config = {
    pages: [
      'page/home/index',
    ],
    subPackages: [
      ...
      /** internal placeholder start */

      /** internal placeholder end */,
      ...
    ]
  }
}
```

## API

### Options

| 配置项       | 说明                  | 类型            | 是否必传 |
|--------------|-----------------------|-----------------|----------|
| repositories | 需要拉取的git仓库配置 | [Object Object] | 是      |
| writeConfig  | 写入文件配置          | [Object Object] | 否       |

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
|endLineContent|结束行的内容标识|string|是|


