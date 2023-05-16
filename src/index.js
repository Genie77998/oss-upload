const { Command } = require('commander')
const { exec } = require('child_process')
const { resolve } = require('path')
const { getConfig, setConfig } = require('./utils')
const publish = require('./command/publish')
const { version } = require(resolve(__dirname, '..', 'package.json'))


const program = new Command()

program
  .version(version)

program
  .command('publish')
  .alias('p')
  .usage('-d -p')
  .requiredOption('-d, --dist <string>', '需要上传的文件夹 例如 ./build')
  .option('-r, --region <string>', '设置oss region')
  .option('-k, --accessKeyId <string>', '设置accessKeyId')
  .option('-s, --accessKeySecret <string>', '设置accessKeySecret')
  .option('-b, --bucket <string>', '设置bucket')
  .option('-c, --config <string>', '配置文件地址 JSON')
  .action((options) => {
    const {
      dist,
      region,
      accessKeyId,
      accessKeySecret,
      bucket,
    } = options
    let config = options.config || getConfig()
    publish({
      dist,
      config,
      region,
      accessKeyId,
      accessKeySecret,
      bucket,
    })
  })

  program
  .command('set')
  .alias('s')
  .description('设置默认值')
  .option('-r, --region <string>', '设置默认oss region')
  .option('-k, --accessKeyId <string>', '设置默认accessKeyId')
  .option('-s, --accessKeySecret <string>', '设置默认accessKeySecret')
  .option('-b, --bucket <string>', '设置默认bucket')
  .action((options) => {
    const lastConfig = getConfig()
    setConfig({
      ...lastConfig,
      ...options,
    })
    console.log('设置成功!')
  })

program.parse(process.argv)


