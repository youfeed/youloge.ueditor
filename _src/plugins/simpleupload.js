/**
 * @description
 * 简单上传:点击按钮,直接选择文件上传
 * @author Jinqn
 * @date 2014-03-31
 */
UE.plugin.register('simpleupload', function (){
    var me = this,isLoaded = false,containerBtn,hideFile;
    function initUploadBtn(){
				debugger;
        hideFile = document.createElement('input');
        hideFile.id = 'file';
        hideFile.type = 'file';
        hideFile.accpet = 'image/*';
        // hideFile.style.cssText = 'width:0;height:0;border:0;margin:0;padding:0;position:absolute;top:0;left:0;filter:alpha(opacity=0);-moz-opacity:0;-khtml-opacity: 0;opacity: 0;cursor:pointer;';
        
				const onchange = ()=>{
					var [file] = e.target.files;
					let loadingId = `loading_${Math.random().toString(36)}`;
					let src = URL.createObjectURL(file)
					me.focus();
					me.execCommand('inserthtml', `<img class="loadingclas loading" id="${loadingId}" src="${src}" style="max-width:100%;">`);
					// 上传图片
					let body = new FormData();
					body.append('file', file);
					console.error(me.document.getElementById(loadingId));
					fetch(me.getOpt('IMGURL'),{method:'post',body:body}).then(r=>r.json()).then(({err,msg,data})=>{
							let loader = me.document.getElementById(loadingId);
							loader.setAttribute('src', data.src);
							loader.removeAttribute('id');
							loader.removeAttribute('class');
							loader.setAttribute('_src', data.src);
							loader.setAttribute('data-uuid', data.uuid);
							loader.setAttribute('data-width', data.w);
							loader.setAttribute('data-height', data.h);
							loader.setAttribute('alt', data.alt || 'alt');
					}).catch(e=>{
							let loader = me.document.getElementById(loadingId);
							loader.remove();
					}).finally(()=>{
							URL.revokeObjectURL(src);
					})
				}
				hideFile.onchange = onchange
				document.body.appendChild(hideFile);
    }

    return {
        bindEvents:{
            'ready': function() {
                //设置loading的样式
                utils.cssRule('loading',
                    '.loadingclass{display:inline-block;cursor:default;background: url(\''
                    + this.options.themePath
                    + this.options.theme +'/images/loading.gif\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n' +
                    '.loaderrorclass{display:inline-block;cursor:default;background: url(\''
                    + this.options.themePath
                    + this.options.theme +'/images/loaderror.png\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;' +
                    '}',
                    this.document);
            },
            /* 初始化简单上传按钮 */
            'simpleuploadbtnready': function(type, container) {
							
							console.log('simpleuploadbtnready');
                containerBtn = container;
                me.afterConfigReady(initUploadBtn);
            }
        },
        outputRule: function(root){
            utils.each(root.getNodesByTagName('img'),function(n){
                if (/\b(loaderrorclass)|(bloaderrorclass)\b/.test(n.getAttr('class'))) {
                    n.parentNode.removeChild(n);
                }
            });
        },
        commands: {
            'simpleupload': {
                queryCommandState: function () {
                    return isLoaded ? 0:-1;
                }
            }
        }
    }
});