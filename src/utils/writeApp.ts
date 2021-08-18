import {findPage} from './findPage'
import {writeFileByBoundry} from './writeFile'
import { Options } from './../types/index'

/**
 * 将最新的外部分包配置写入app.tsx
 * @param ctx
 * @param options 
 */
const writeApp = (ctx, options: Options) => {

  const {
    helper: {
      chalk
    }
  } = ctx
  console.log(chalk.greenBright('开始 '), '进入读取分包并写入配置阶段')

  const { repositories, writeConfig: {
    filePath,
    options: {
      startLineContent,
      endLineContent
    }
  } } = options
  
  let joinPages = ''

  // 循环读取文件
  repositories.forEach((item) => {
    console.log(chalk.magentaBright('扫描 '), `发现分包 ${item.dirname}`);
    const files = findPage(`src/subpackages/${item.dirname}`, '', {
      chalk
    })

    let pageStr = ``
    files.forEach((file) => {
      file = file.slice(0, file.indexOf('.'))
      pageStr = pageStr ? `${pageStr}
          "${file}",` : `"${file}",`
    })

    // 只有页面个数大于0才加入分包列表
    if (pageStr) {
      joinPages = `${joinPages}      {
        "root": "subpackages/${item.dirname}",
        "pages": [
          ${pageStr}
        ]
      },`
    } else {
      console.log(chalk.redBright('错误 '), `分包 ${item.dirname} 没有扫描到任何页面，请检查`)
    }
  })

  // 将扫描到的分包信息写入app.tsx
  writeFileByBoundry(filePath, joinPages, {
    startLineContent,
    endLineContent
  })

  // 写入.gitignore
  let ignoreStr = ``
  repositories.forEach((item)=>{
    ignoreStr = `${ignoreStr}
src/subpackages/${item.dirname}`
  })
  writeFileByBoundry('./.gitignore', ignoreStr, {
    startLineContent: '# internal placeholder start',
    endLineContent: '# internal placeholder end'
  })

  console.log(chalk.blueBright('结束 '), '分包配置写入完成');
  console.log('');
}

export default writeApp