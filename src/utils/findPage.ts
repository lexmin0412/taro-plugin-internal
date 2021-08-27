const fs = require('fs')
import {isPageDirectory, isDirectory} from './isDirectory'
import {isValidPageFilePath} from './filterFile'

/**
 * 寻找遍历页面
 * @params rootDir 根文件夹
 * @params base 文件夹base
 */
export const findPage = (rootDir, base: string, options: {
  chalk: any
}) => {
  const { chalk } = options
  let paths: string[] = []
  const basePath = `${rootDir}/${base}`
  // 遍历文件列表
  if (isDirectory(basePath)) {
    const files = fs.readdirSync(basePath)
    files.forEach(element => {
      const currentPath = `${rootDir}/${base}/${element}`
      const nextBase: string = base ? `${base}/${element}` : element
      const isCurrentPageDirectory = isPageDirectory(currentPath)

      // 是文件夹则递归
      if (isDirectory(currentPath)) {
        paths = paths.concat(findPage(rootDir, nextBase, {chalk}))
      } 
      // 如果是文件则先判断当前是不是page目录 不是则不push页面
      else if (isCurrentPageDirectory) {
        // 文件扩展名在传入的枚举中则加入
        if (isValidPageFilePath(element)) {
          console.log(chalk.magentaBright('扫描 '), `发现页面 ${nextBase}`);
          paths.push(nextBase)
        }
      }
    });
  }
  return paths
}