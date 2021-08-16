const fs = require('fs')
import {isPageDirectory} from './isDirectory'
import {isValidPageFilePath} from './filterFile'

/**
 * 寻找遍历页面
 * @params rootDir 根文件夹
 * @params base 文件夹base
 */
export const findPage = (rootDir, base: string) => {
  let paths: string[] = []
  const basePath = `${rootDir}/${base}`
  console.log(`开始遍历${basePath}`)
  // 如果是页面文件夹，则遍历读取
  if (isPageDirectory(basePath)) {
    const files = fs.readdirSync(basePath)
    files.forEach(element => {
      const currentPath = `${rootDir}/${base}/${element}`
      const nextBase: string = base ? `${base}/${element}` : element

      if (isPageDirectory(currentPath)) {
        // 是文件夹则递归
        paths = paths.concat(findPage(rootDir, nextBase))
      } else if (isValidPageFilePath(element)) {
        // 文件是页面类型则加入
        paths.push(nextBase)
      }
    });
  }
  return paths
}