export default (ctx, options) => {
  const {
    helper: {
      chalk
    }
  } = ctx

  ctx.onBuildStart(() => {
    console.log(chalk.yellow('插件 '), '编译开始');
  });

  ctx.onBuildStart(() => {
    console.log(chalk.yellow('插件 '), '编译结束');
  });
}