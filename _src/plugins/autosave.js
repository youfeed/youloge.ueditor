/*
* 监听 ctrl+s 保存
* 点击保存按钮 
*/
UE.plugin.register('autosave', function (){
    var me = this,uuid=null,upload=null,expire=null;

    return {
        shortcutkey:{
            "submit.save":"ctrl+83"
        },
        bindEvents:{
            'ready':function(){

                // var _suffix = "-drafts-data",
                //     key = null;

                // if ( me.key ) {
                //     key = me.key + _suffix;
                // } else {
                //     key = ( me.container.parentNode.id || 'ue-common' ) + _suffix;
                // }

                // //页面地址+编辑器ID 保持唯一
                // saveKey = ( location.protocol + location.host + location.pathname ).replace( /[.:\/]/g, '_' ) + key;

            },
            'contentchange': function () {
                // if ( !saveKey ) {
                //     return;
                // }
                // if ( me._saveFlag ) {
                //     window.clearTimeout( me._saveFlag );
                // }
                // if ( me.options.saveInterval > 0 ) {
                //     me._saveFlag = window.setTimeout( function () {
                //         save( me );
                //     }, me.options.saveInterval );
                // } else {
                //     save(me);
                // }
            },
            'submit.init':function(cmd,uuid){
                UE.fetch('article','updated',{uuid:uuid},true).then(r=>r.json()).then(({err,msg,data})=>{
                    if(err == 200){
                        let {upload,expire} = data
                        uuid = uuid
                        upload = data.upload
                        expire = data.expire
                        me.fireEvent('showmessage',{content:`草稿初始化完成`,timeout : 2000});
                    }
                })
            }
        },
        commands:{
            // 上传地址
            // 保存草稿
            'submit.save':{
                execCommand:function (cmd, name) {
                    console.log(cmd,name);
                    me.fireEvent('showmessage',{content:me.getLang('autosave.success'),timeout : 2000});
                },
            },
            // 弹窗提示 通过审核后 无法撤销 不可编辑
            'submit.push':{
                execCommand:function (cmd, name) {
                    console.log(cmd,name);
                    me.fireEvent('showmessage',{content:me.getLang('autosave.success'),timeout : 2000});
                },
            }
        }
    }

});