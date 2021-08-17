import downloadSubModules from './utils/download'
import writeApp from './utils/writeApp'

export default (ctx, options) => {
  const {
    helper: {
      chalk
    }
  } = ctx

  ctx.onBuildStart(async() => {
    console.log(chalk.yellow('插件 '), 'taro-plugin-internal 外部分包代码同步并写入配置');

    // 下载并写入分包配置
    await downloadSubModules(ctx, options)
    writeApp(ctx, options)
  })
}