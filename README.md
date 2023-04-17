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

