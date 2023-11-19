/*
* 草稿插件
* 定义草稿的加载 和 数据结构 drafts
* status==草稿 才能下载正文
*/
UE.plugin.register('drafts', function (){
  let me = this;metadata = null;
  var drafts = {
    title:'',
    intro:'',
    poster:'',
    status:'',
    label:[],
    labels:[],
  }
  // 初始表单
  const initialization = ()=>{
    metadata = document.querySelector('#metadata');
    metadata.innerHTML = `
<div class="left">
  <div class="poster"><img src="https://img.youloge.com/Fkv6g7gfTxlzdyEwojNj_VEd2a-k!80"></div>
</div>
<div class="right">
  <div class="title">
    <input type="text" name="title" placeholder="这里输入标题" id="title">
  </div>
  <div class="intro">
    <input type="text" name="intro" placeholder="好的描述更容易被SEO索引" id="intro">
  </div>
  <div class="label">
    <div class="labels"></div>
    <input type="text" name="label" placeholder="添加标签话题" id="label">
  </div>
</div>
`;
    // 添加监听
    document.querySelector('#metadata #label').onchange = (e)=>{
      let {value} = e.target;
      drafts.labels.push(value)
      console.log(drafts.labels,e.target.value)
      e.target.value = ''
      onLabel()
    }
    document.querySelector('#metadata .labels').onclick = (e)=>{
      if(e.target.nodeName == 'SPAN'){
        drafts.labels.splice(drafts.labels.indexOf(e.target.dataset.label),1);
        onLabel()
      }
      // console.log(e)
    }
  }
  // 渲染标签
  const onLabel = ()=>{
    let {labels} = drafts;
    if(labels.length){
      drafts.label = Array.from(new Set(labels))
      let html = drafts.label.map(label=>{
        return `<span class="label" data-label="${label}">${label}</span>`
      }).join('')
      document.querySelector('#metadata .labels').innerHTML = html
    }
  }
  // 填充表单
  const fillForm = ()=>{
    let {title,intro,poster,status,labels} = drafts;

  }
  // 下载正文
  const loadContent = ()=>{
    let {uuid,status} = drafts;
    status === '草稿' ? fetch(`https://cdn.youloge.com/draft/${uuid}`).then(r=>r.text()).then(res=>{
      me.setContent(res);
      me.fireEvent("submit.init",uuid);
      me.fireEvent('showmessage',{content:`草稿加载成功`,timeout : 2000});
    }) :  me.fireEvent('showmessage',{content:`改文档不是[草稿]状态`,timeout : 2000});
  }
  return {
    bindEvents:{
      'ready':function(){
        initialization()
      }
    },
    commands:{
      'drafts.init':{
        execCommand:function (cmd, article) {
          let me = this;
          let {uuid} =Object.assign(drafts,article);
          loadContent()
          // 获取上传地址
          
          // drafts = {...drafts,...article}
          // console.log('drafts.init',drafts)
        },
      }
    }
  }
})