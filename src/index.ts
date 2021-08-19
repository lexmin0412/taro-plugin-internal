import downloadSubModules from './utils/download'
import { writeApp, writeGitIgnore } from './utils/writeApp'
import { Options } from './types/index'

export default (ctx, options: Options) => {
  const {
    helper: {
      chalk
    }
  } = ctx

  console.log('');  // 用于与上下文日志分割
  
  ctx.onBuildStart(async() => {
    console.log(chalk.yellow('插件 '), 'taro-plugin-internal 外部分包代码同步并写入配置');

    if (!options?.repositories?.length) {
      console.log(chalk.blueBright('结束 '), '分包配置列表为空')
      console.log('');
      return
    }

    // 下载并写入分包配置
    await downloadSubModules(ctx, options)

    if (options?.writeConfig?.app?.enable) {
      writeApp(ctx, options)
    }
    if (options?.writeConfig?.gitignore?.enable) {
      writeGitIgnore(ctx, options)
    }

    console.log('');  // 用于与上下文日志分割
  })
}