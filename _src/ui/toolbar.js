// Toolbar 后面想办法 挂载到 baidu.editor上
(function (){
    var utils = baidu.editor.utils,
        uiUtils = baidu.editor.ui.uiUtils,
        UIBase = baidu.editor.ui.UIBase,
        Toolbar = baidu.editor.ui.Toolbar = function (options){
            this.initOptions(options);
            this.initToolbar();
        };
    Toolbar.prototype = {
        items: [],
        initToolbar: function (){
            // this.items = this.items || [];
            this.initUIBase(); 
        },
        add: function (item,index){
            if(index === undefined){
                this.items.push(item);
            }else{
                this.items.splice(index,0,item)
            }

        },
        getHtmlTpl: function (){
            let html = this.items.map(is=>is.renderHtml()).join('')
            return `<div id="##" class="edui-toolbar %%" onselectstart="return false;" onmousedown="return $$._onMouseDown(event, this);">${html}</div>`
        },
        postRender: function (){
            var box = this.getDom();
            for (var i=0; i<this.items.length; i++) {
                this.items[i].postRender();
            }
            uiUtils.makeUnselectable(box);
        },
        _onMouseDown: function (e){
            var target = e.target || e.srcElement,
                tagName = target && target.tagName && target.tagName.toLowerCase();
            if (tagName == 'input' || tagName == 'object' || tagName == 'object') {
                return false;
            }
        }
    };
    utils.inherits(Toolbar, UIBase);
})();
