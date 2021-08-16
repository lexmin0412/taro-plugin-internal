const fs = require('fs')
const nodePath = require('path')

/**
 * 判断一个path是否是文件夹
 */
export const isDirectory = (path) => {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory()
}

/**
 * 是否页面文件夹
 * @param path 
 * @returns 
 */
export const isPageDirectory = (path) => {
  if (isDirectory(path)) {
    const jsonPath = `${path}/meta.json`
    if (fs.existsSync(jsonPath)) {
      const json = require(`${nodePath.resolve()}/${jsonPath}`)
      return json.is_page
    }
    return false
  }
  return false
}