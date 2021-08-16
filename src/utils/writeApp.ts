import {findPage} from './findPage'
import {writeFileByBoundry} from './writeFile'
import { Options } from './../types/index'

const writeApp = (ctx, options: Options) => {

  const {
    helper: {
      chalk
    }
  } = ctx

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

    const files = findPage(`src/subpackages/${item.dirname}`, '')

    let pageStr = ``
    files.forEach((file) => {
      file = file.slice(0, file.indexOf('.'))
      pageStr = pageStr ? `${pageStr}
          "${file}",` : `"${file}",`
    })

    // 只有页面个数大于0才加入分包列表
    if (pageStr) {
      joinPages = `${joinPages}      {
        "root": "${item.dirname}",
        "pages": [
          ${pageStr}
        ]
      },`
    } else {
      console.log(chalk.yellow(`${item.dirname}分包没有扫描到任何页面，请检查`))
    }
  })

  // 将扫描到的分包信息写入app.tsx
  writeFileByBoundry(filePath, joinPages, {
    startLineContent,
    endLineContent
  })
}

export default writeApp