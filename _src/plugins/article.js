/*
* 文章列表 article
* 依赖登录状态
*/
UE.plugin.register('article',function(){
  var me = this,dim = null;
  var aside = null,ul = null;
  var options = {
    selector:'#article',
    count:0,
    list:[],
    filter:'',
    orderby:'created desc',
    limit:10,
    offset:0
  }
  const initialization = ()=>{
    aside = document.querySelector(options.selector);
    ul = document.createElement('ul');
    aside.appendChild(ul);
    loadLazy()
  }
  const loadLazy = ()=>{
    UE.fetch('article','list',{},true).then(r=>r.json()).then(({err,msg,data})=>{
      err == 200 ? (options.list = data.list,options.count = data.count,rendLazy()) : console.log(msg);
      console.log(data)
    }).catch(err=>{

    })
    // document.createElement('li');
  }
  const rendLazy = ()=>{
    console.log('rendLazyrendLazyrendLazy',options.list)
    options.list.forEach((item,index)=>{
      let li = document.createElement('li');
      li.onclick = ()=>{
        me.execCommand('article.load',item)
      }
      li.innerHTML = item.title;
      li.setAttribute('data-uuid',item.uuid);
      ul.appendChild(li);
    })
  }
  return {
    bindEvents:{
      'ready':function(){
      },
      'article.init':function(){
        initialization()
      }
    },
    commands:{
      // 初始化 设置UUID 指定文章 初始化草稿
      'article.load':{
        execCommand:function (cmd, article) {
          let me = this;
          let {uuid} = article;UE.Storage.setConfog('UUID',uuid);
          me.execCommand('drafts.init',article)
        },
      }
    }
  }
})