import downloadSubModules from './utils/download'
import writeApp from './utils/writeApp'

export default (ctx, options) => {
  const {
    helper: {
      chalk
    }
  } = ctx

  ctx.onBuildStart(() => {
    console.log(chalk.yellow('插件 '), '编译开始');

    // 下载并写入分包配置
    downloadSubModules(ctx, options).finally(() => {
      writeApp(ctx, options)
    })
    
  });

  ctx.onBuildStart(() => {
    console.log(chalk.yellow('插件 '), '编译结束');
  });
}