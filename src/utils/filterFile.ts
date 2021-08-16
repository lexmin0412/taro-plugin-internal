/**
 * 判断文件是否是支持的类型
 * @param fileName 文件名
 * @param supportedSuffix 支持的后缀数组
 */
export const isFileSupported = (fileName: string, supportedSuffix: Array<string>) => {
  const fileSuffix = fileName.slice(fileName.lastIndexOf('.'));
  // console.log('fileSuffix', fileSuffix, 'supportedSuffix', supportedSuffix);

  if (!supportedSuffix.includes(fileSuffix)) {
    return false
  }
  return true
}

/**
 * 是合法的文件类型
 * @param fileName 
 * @returns 
 */
export const isValidPageFilePath = (fileName: string) => {
  // console.log('fileName', fileName);

  return isFileSupported(fileName, ['.tsx'])
}

export default isFileSupported