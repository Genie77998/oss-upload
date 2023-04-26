### 介绍

阿里云上传文件、文件夹cli命令

### 安装

```bash
npm i @wj77998/oss-upload -g

```

### 使用
```bash
oss-upload publish -d ./build -c ./config-example.json

# 全局配置 (优先级最高)
oss-upload publish -d ./build -c /User/xxx/oss-upload.json

# 命令行配置
oss-upload publish -d ./build -r <region> -k <accessKeyId> -s <accessKeySecret> -b <bucket>
```

### 配置文件
```json
{
  "accessKeyId": "",
  "accessKeySecret": "",
  "region": "",
  "bucket": ""
}
```

### 自定义全局命令
```bash
alias upload="oss-upload publish -c ~/oss-config.json -d"
```
```bash
$ upload ./dist
$ upload ./a.zip
```
