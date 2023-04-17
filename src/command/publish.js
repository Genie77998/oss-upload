const fs = require('fs-extra')
const OSS = require('ali-oss')
const { resolve, readFileOrDir } = require('../utils')

module.exports = async ({
  dist,
  region,
  accessKeyId,
  accessKeySecret,
  bucket,
  config
} = {}) => {
  if (typeof config === 'string' && !!config) {
    const data = await fs.readJSON(resolve(config))
    configObj = { ...data }
  }
  if (config && typeof config === 'object') {
    configObj = { ...config }
  }
  const client = new OSS({
    accessKeyId,
    accessKeySecret,
    bucket,
    region,
    ...configObj
  })
  const filelist = await readFileOrDir(resolve(dist))
  await filelist.map(async item => {
    await client.put(item.replace(process.cwd(), ''), item)
  })
  console.log(`${filelist.length}个文件上传完成！`)
}
