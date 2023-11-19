/**
 * 锚点插件，为UEditor提供插入锚点支持
 * @youloge 登录插件
 * @since 1.2.6.1
 */
UE.plugin.register('login', function (){
    var me = this;
    const utils = UE.utils;
    const useStorage = UE.Storage.useStorage;
    const setStorage = UE.Storage.setStorage;
    // 初始化检测
    const initialization = ()=>{
        // 检测是否登录
        let {profile} = useStorage();let time = new Date().getTime() / 1000 >> 0;
        if(profile?.signature == undefined || profile?.expire < time){
            onLogin()
        }else{
            // 广播一下 登录成功
            me.fireEvent('article.init')
        }
        console.log('profile',profile)
    }
    // 开启sso登录
    const onLogin = ()=>{
        let ukey = me.options.UKEY;let hash = '#'+Math.random().toString(36).substring(2);
        let mask = document.createElement('div');
        mask.style = `position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: #ffffff5c; z-index: 99999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);`
        let iframe = document.createElement('iframe');
        iframe.style = `width: 100%; height: 100%; border: 0;`;
        iframe.src = `https://open.youloge.com/login${hash}`;
        mask.appendChild(iframe);document.body.appendChild(mask)
        window.addEventListener('message',({data,origin,source}) =>{
            let {[hash]:{method,params}} = data;
            if(method){
                console.log('anchor message',method,params);
                let action = {
                    'ready':()=>{
                        let confog = {ukey:ukey}
                        source.postMessage({[hash]:{method:'init',params:confog}},origin);
                    },
                    'success':()=>{
                        let {signature} = params
                        setStorage('profile',params);
                        setStorage('signature',signature);
                        mask.remove();
                        // 广播一下 登录成功
                        me.fireEvent('article.init')
                    }
                }
                action[method] ? action[method]() : ''
            }
        })
    }
    return {
        bindEvents:{
            'ready':function(){
                utils.cssRule('login','.pagebreak{display:block;clear:both !important;cursor:default !important;width: 100% !important;margin:0;}',document);

                initialization()
            }
        },
       commands:{
           'login.refresh':{
               execCommand:function (cmd, name) {
                 initialization()
               }
           }
       }
    }
});
