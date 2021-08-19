const fs = require('fs')

/**
 * 删除文件夹
 * @param path 文件夹路径
 * @returns 
 */
export const deleteDirectory = (path) => {

  if ( fs.rmSync ) {
    fs.rmSync(path, {
      maxRetries: 2,
      recursive: true,
      force: true
    })
    return
  }
  
  let files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file) {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}