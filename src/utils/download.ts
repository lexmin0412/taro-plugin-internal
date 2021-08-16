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
  console.log(chalk.yellow('options', options));
  const { repositories } = options
  
  return new Promise((resolve) => {
    let unFinishedSubModules: Array<DownloadError> = []
    let downloadPromises: Array<Promise<DownloadError>> = []
    repositories.forEach(element => {

      // 第一步 删除原目录
      if (fs.existsSync(`./src/subpackages/${element.dirname}`)) {
        fs.rmSync(`./src/subpackages/${element.dirname}`, {
          maxRetries: 2,
          recursive: true,
          force: true
        })
      }

      const downloadPromise = (): Promise<DownloadError> => {
        return new Promise((resolve) => {
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
      console.log('下载操作执行完成');
      const failedRepos = res.filter((item: DownloadError) => item.reason !== undefined)
      if (failedRepos.length) {
        failedRepos.forEach((element: DownloadError) => {
          console.log(`分包 ${element.dirname} 下载失败: ${element.reason}`);
        })
      } else {
        console.log('所有分包下载成功 ✅');
      }
      resolve(true)
    }).catch((err) => {
      console.log('执行失败', err)
    })
  })
}

export default downloadSubModules