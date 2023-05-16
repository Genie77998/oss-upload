const { resolve, join } = require('path')
const fs = require('fs-extra')
const { homedir } = require('os')
const resolvePath = (...rest) => resolve(process.cwd(), ...rest)

const configPath = join(homedir(), '.oss-upload-config.json')

function getConfig() {
  try {
    return fs.readJsonSync(configPath)
  } catch (error) {
    return {}
  }
}

function setConfig(data = {}) {
  try {
    fs.writeJSONSync(configPath, data)
  } catch (error) {
    throw new Error(`failed to set config: ${error.message}`)
  }
}

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

function checkParams(params = {}) {
  const {
    accessKeyId,
    accessKeySecret,
    bucket,
  } = params
  if (!accessKeyId) {
    throw new Error('请设置accessKeyId')
  }
  if (!accessKeySecret) {
    throw new Error('请设置accessKeySecret')
  }
  if (!bucket) {
    throw new Error('请设置bucket')
  }
}

module.exports = {
  resolve: resolvePath,
  readFileOrDir,
  configPath,
  getConfig,
  setConfig,
  checkParams
}
