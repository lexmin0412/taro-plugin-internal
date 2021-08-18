import downloadSubModules from './utils/download'
import { writeApp, writeGitIgnore } from './utils/writeApp'

export default (ctx, options) => {
  const {
    helper: {
      chalk
    }
  } = ctx

  console.log('');  // 用于与上下文日志分割
  
  
  ctx.onBuildStart(async() => {
    console.log(chalk.yellow('插件 '), 'taro-plugin-internal 外部分包代码同步并写入配置');

    // 下载并写入分包配置
    await downloadSubModules(ctx, options)

    writeApp(ctx, options)
    writeGitIgnore(ctx, options)

    console.log('');  // 用于与上下文日志分割
  })
}