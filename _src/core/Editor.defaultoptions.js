/*
* 常备参数存储在 sessionStorage中
* 避免二次实例化的时候都要重新设置
*/
// 维护编辑器一下默认的不在插件中的配置项
UE.Editor.defaultOptions = function(editor){
    var _url = editor.options.UEDITOR_HOME_URL;
    return {
        // 文档ID 初始化时候 尝试从远程读取 草稿
        UUID:'uuid',
        // 开发者KEY
        UKEY:"qRjE+HMLB8WcnAvdcon5Lx2BSGid7OdQUd5ozRV8QHj4sgP91+Y6xMfhrHZbONGpLErJGMZFZ8GAcEwINSE4VjwdEvna0DwHUJ3zzQNFlQg8s8nhqo4/I3y00q31eYi4", 
        // 用户签名请求头名
        SIGN:"signature", 
        APIURL:"https://api.youloge.com", // 开放接口
        VIPURL:"https://www.youloge.com", // 私密接口
        WHITES:['youloge.com'], // 图片/视频/外链 地址白名单(顶级域名)

        isShow: true,
        initialContent: '',
        initialStyle:'',
        autoClearinitialContent: false,
        iframeCssUrl: _url + 'themes/iframe.css',
        textarea: 'editorValue',
        focus: false,
        focusInEnd: true,
        autoClearEmptyNode: true,
        readonly: false,
        zIndex: 999,
        imagePopup: true,
        enterTag: 'p',
        customDomain: false,
        lang: 'zh-cn',
        langPath: _url + 'lang/',
        theme: 'default',
        themePath: _url + 'themes/',
        allHtmlEnabled: false,
        scaleEnabled: false,
        tableNativeEditInFF: false,
        autoSyncData : true,
        fileNameFormat: '{time}{rand:6}'
    }
};