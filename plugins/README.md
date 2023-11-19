### 插件开发指南
 
- `/plugins/插件名/plugin.js` 插件入口文件
- `/plugins/插件名/dialog.html` 弹窗html(可选)

### `plugin.js` 插件书写

1. 注册插件

``` js
UE.plugin.register('myplugin', function (){})
UE.plugin.register.myplugin = function (){ }
UE.plugin.register.myplugin = {
  Dialog:{
    name:'',
    cssRules:'',
    className:'',
    autoReset: true,
    draggable: true,
    holdScroll: false,
    onok: function (){},
    oncancel: function (){},
    onclose: function (t, ok){},
  }
}

```
2. 返回插件方法
```js
/**
 * 锚点插件，为UEditor提供插入锚点支持
 * @defaultOptions 配置参数 `插件名.变量=值` 
 * @bindEvents `ready ...`
 * @inputRule 输入规则
 * @outputRule 输出规则
 * @commands 指令集
 */

return {defaultOptions:{},bindEvents:{},inputRule:{},....}
```
3. 开始使用
```js
const ue = UE.getEditor('editor',{
  ,plugins:['myplugin']
  ,toolbar:['myplugin(可选)']
});
```
- `plugins` 是导入会自动加载`/plugins/插件名/plugin.js`文件，帮事件/规则初始化
- `toolbar` 如果有会读取`plugin.js @toolbar`方法：并依次展示到工具栏

### 示例：`myplugin 插件`使用弹窗
- `plugin.js` 写一个`openDialog`方法
- 方式一：`@commands` 写一个监听指令`openmyplugin`其他位置通过运行`UE.getEditor('editor').execCommand("openmyplugin");`
- 方式二：`@bindEvents`监听事件 `ready` 编辑器初始化完成时内部调用 `openDialog`
- 如果有html弹窗Dialog 异步初始化

### 