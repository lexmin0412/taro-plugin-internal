import { Options, DownloadError } from './../types/index'
const download = require('download-git-repo')
const fs = require('fs')

/**
 * 下载分包配置的git repos最新代码
 */
const downloadSubModules = (ctx, options: Options) => {
  const {
    helper: {
      chalk
    }
  } = ctx
  console.log(chalk.greenBright('开始 '), '进入分包下载步骤')
  const { repositories } = options
  
  return new Promise((resolve) => {
    let unFinishedSubModules: Array<DownloadError> = []
    let downloadPromises: Array<Promise<DownloadError>> = []

    if ( !repositories.length ) {
      console.log(chalk.blueBright('结束 '), '分包配置列表为空')
      resolve(true)
      return
    }
    
    repositories.forEach(element => {

      // 第一步 删除原目录
      if (fs.existsSync(`./src/subpackages/${element.dirname}`)) {
        console.log(`${chalk.gray('删除 ')}`, `分包 ${element.dirname} 的旧代码`)
        fs.rmSync(`./src/subpackages/${element.dirname}`, {
          maxRetries: 2,
          recursive: true,
          force: true
        })
      }

      const downloadPromise = (): Promise<DownloadError> => {
        return new Promise((resolve) => {
          console.log(chalk.magentaBright('拉取 '), `分包 ${element.dirname} 的最新代码`)
          download(`direct:${element.url}#${element.commit}`, `./src/subpackages/${element.dirname}`, {
            headers: {
              'PRIVATE-TOKEN': element.token
            },
            clone: true
          }, (err) => {
            if (err) {
              unFinishedSubModules.push({
                dirname: element.dirname,
                reason: err
              })
            }
            resolve({
              dirname: element.dirname,
              reason: err
            })
          })
        })
      }
      downloadPromises.push(downloadPromise())
    });

    // 下载所有的分包
    Promise.all([
      ...downloadPromises
    ]).then((res) => {
      const failedRepos = res.filter((item: DownloadError) => item.reason !== undefined)
      if (failedRepos.length) {
        failedRepos.forEach((element: DownloadError) => {
          console.log(chalk.redBright('错误 '),  `分包 ${element.dirname} 下载失败: ${element.reason}`)
        })
      } else {
        console.log(chalk.greenBright('成功 '), '所有分包下载成功 ✅');
      }
      console.log(chalk.blueBright('结束 '), '下载操作执行完成')
      console.log('');
      
      resolve(true)
    }).catch((err) => {
      console.log(chalk.redBright('错误 '), '下载分包执行失败, error: ', err)
    })
  })
}

export default downloadSubModules