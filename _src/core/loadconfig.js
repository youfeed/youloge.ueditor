UE.Editor.prototype.loadServerConfig = function(){
    const me = this;
    const showErrorMsg = (msg)=> {
        me.fireEvent('showMessage', { 'content': msg, 'type': 'error' });
    }
    UE.fetch('editor','config').then(r=>r.json()).then(res=>{
        console.log(res)
        // var config = isJsonp ? r:eval("("+r.responseText+")");
        // utils.extend(me.options, config);
        // me.fireEvent('serverConfigLoaded');
        // me._serverConfigLoaded = true;
        showErrorMsg(me.getLang('loadconfigFormatError'));
    }).catch(error=>{
        showErrorMsg(me.getLang('loadconfigFormatError'));
    })
};

UE.Editor.prototype.isServerConfigLoaded = function(){
    var me = this;
    return me._serverConfigLoaded || false;
};

UE.Editor.prototype.afterConfigReady = function(handler){
    if (!handler || !utils.isFunction(handler)) return;
    var me = this;
    var readyHandler = function(){
        handler.apply(me, arguments);
        me.removeListener('serverConfigLoaded', readyHandler);
    };

    if (me.isServerConfigLoaded()) {
        handler.call(me, 'serverConfigLoaded');
    } else {
        me.addListener('serverConfigLoaded', readyHandler);
    }
};
// (function(){

// })();
