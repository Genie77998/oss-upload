const { Command } = require('commander')
const { exec } = require('child_process')
const { resolve } = require('path')
const publish = require('./command/publish')
const { version } = require(resolve(__dirname, '..', 'package.json'))

// const aliOSSAccessKeyId = process.env.npm_config_aliossaccesskeyid
// const aliOSSAccessKeySecret = process.env.npm_config_aliossaccesskeysecret
// const aliOSSBucket = process.env.npm_config_aliossbucket
// const aliOSSRegion = process.env.npm_config_aliossregion

const program = new Command()

program
  .version(version)

program
  .command('publish')
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
      config
    } = options
    publish({
      dist,
      config
    })
  })

  // program
  // .command('set')
  // .alias('s')
  // .description('设置默认值')
  // .option('-r, --region <string>', '设置默认oss region')
  // .option('-k, --accessKeyId <string>', '设置默认accessKeyId')
  // .option('-s, --accessKeySecret <string>', '设置默认accessKeySecret')
  // .option('-b, --bucket <string>', '设置默认bucket')
  // .action((options) => {
  //   const req = Object.keys(options).map(item => {
  //     exec(`npm set alioss${item.toLocaleLowerCase()} ${options[item]}`)
  //   })
  //   if (req.length > 0) {
  //     console.log('设置成功!')
  //   }
  // })

program.parse(process.argv)
