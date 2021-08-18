// 下载错误
export interface DownloadError {
  dirname: string
  reason: string
}

/**
 * 插件配置项
 */
export interface Options {
  /**
   * repo配置
   */
  repositories: Array<{
    dirname: string
    url: string
    commit: string
    token: string
  }>
  /**
   * 写文件配置
   */
  writeConfig: {
    app: {
      enable: boolean
      filePath: string
      options: {
        startLineContent: string
        endLineContent: string
      }
    },
    gitignore: {
      enable: boolean
      filePath: string
      options: {
        startLineContent: string
        endLineContent: string
      }
    }
  }
}