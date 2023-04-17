const { resolve } = require('path')
const fs = require('fs-extra')

const resolvePath = (...rest) => resolve(process.cwd(), ...rest)

function readFileOrDir (dir, res = []) {
  try {
    fs.readFileSync(dir)
    res.push(dir)
  } catch (error) {
    const resp = fs.readdirSync(dir)
    resp.map(item => {
      return readFileOrDir(resolve(dir, item), res)
    })
  }
  return res
}

module.exports = {
  resolve: resolvePath,
  readFileOrDir
}
