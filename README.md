## Youloge.ueditor(定制版本：需要搭配使用)
=====

> 试了很多富文本编辑器,还是微信富文本编辑器+各种插件+样式中心可以满足需求：
> 所以开一个项目慢慢写：[另一个定制tinymce](https://github.com/youfeed/youloge.tinymce)
> 基于百度ueditor1.4.3.3 富文本编辑器(_ueditor.1.4.3.3)

## 更新日志

- 1.5.5 增加`plugins`参数 允许静默初始化插件
- 1.5.2 继续抽离代码：在重构结构，像`tinymce 插件方向`靠齐
- 1.5.1 增强结构 清楚更多插件，改写部分插件 允许外部触发
- 1.5.0 改变目录解构`正式开发从这里开始` 打包`Releases 发布`
- 1.4.5 把`pageage.json` 升级了，支持`es6写法` 删除修改了一些插件
- 1.4.4 百度UEditor 1.4.4 版本

## 入门部署和体验 ##

```js
1. `git clone ` 仓库
2. `npm install` 安装依赖：`安装 grunt` 安装 `http-server`
3. 执行 `npm run build` 打包编译
4. 执行 `npm run dev` 开启本地预览
5. 重复 `npm run build` 页面刷新查看效果
```

## 参考项目
- [ueditor-plus](https://gitee.com/modstart-lib/ueditor-plus) 由`ModStart`开发
- [neditor](https://gitee.com/notadd/neditor) 2年前我最早接触的二开
- [jian27com/ueditor-plus-typecho](https://github.com/jian27com/ueditor-plus-typecho) UEditor-for-Typecho 二开
- [LinkPoly/UEditor-for-Typecho](https://github.comLinkPoly/UEditor-for-Typecho) UEditor-for-Typecho
:::


![image](https://github.com/youfeed/youloge.ueditor/assets/22223510/334f396c-f583-486e-b654-c8fdb71891d9)


这是第四次 再次整理富文本编辑器了：需要功能贴合，容易定制，样式自由并不简单

这里留个疑问：[请看ISSUE](https://github.com/youfeed/youloge.edotor/issues/1)

:::