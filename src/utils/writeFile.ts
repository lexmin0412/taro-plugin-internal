const fs = require('fs')

/**
 * 根据传入的内容写文件
 * @filePath 文件路径
 * @content 需要写入的内容
 * @options.startLine 开始行
 * @options.endLine 结束行
 * @options.startLineContent 开始行内容，与startLine任选一个即可
 * @options.endLineContent 结束行内容，与endLine任选一个即可
 */
export const writeFileByBoundry = (filePath, content, options: {
  startLine?: number;
  endLine?: number;
  startLineContent?: string;
  endLineContent?: string
}) => {
  const fileBuffer = fs.readFileSync(filePath).toString().split('\n');

  const {startLine, endLine, startLineContent, endLineContent} = options

  let start = 0
  let end = fileBuffer.length
  // 优先级 startLine > startLineContent
  if (startLine) {
    start = startLine
  } else if (startLineContent) {
    start = fileBuffer.findIndex(item => item.indexOf(startLineContent) > -1) + 1
  }
  // 优先级 endLine > endLineContent
  if (endLine) {
    end = endLine
  } else if (endLineContent) {
    end = fileBuffer.findIndex(item => item.indexOf(endLineContent) > -1)
  }

  // 清除掉开始和结束行之间的原有内容
  const cutLines = end - 1 - start
  fileBuffer.splice(start, cutLines)

  if (start === end) {
    fileBuffer.splice(start, 0, content);
  } else {
    fileBuffer.splice(start, cutLines);
  }

  // 拼接新内容
  fileBuffer[start] = content;

  const templateStr = `${fileBuffer.join('\n')}`;
  fs.writeFileSync(filePath, templateStr);
}