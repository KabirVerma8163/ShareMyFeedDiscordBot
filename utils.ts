import fs = require('fs')
import path = require('path')


function getAllFiles(dirPath: string, arrayOfFiles: any[]) {
  let files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file: string) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles  
}

export function saveJSON(filePath:string, data:object) {
  fs.writeFile(filePath, JSON.stringify(data), (err => {
    if (err) console.log(err)
    else console.log(`${filePath} has been updated successfully`)
  }))
}

export function getAllParticularFiles(dirpath: string, arrayOfFiles: any[], extension: string) {
  return getAllFiles(dirpath, arrayOfFiles).filter(file => file.endsWith(extension))
}

export function arrToString(arr:string[]): string{
  let a = ""
  arr.forEach((value) => {
    a = a + value + ", "
  })
  a = a.substring(0, a.length - 2)
  return a
}
