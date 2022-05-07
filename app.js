(function() {
  "use strict";
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
  }

  function previewMD(text){
    document.getElementById("preview").innerHTML=text;
    return text;
  }
  
  var mdFilePath = getUrlParam("file") || getUrlParam("f") || getUrlParam("md");
  var sourceUrl = (getUrlParam("source") || getUrlParam("s") || getUrlParam("base")) ? (getUrlParam("source") || getUrlParam("s") || getUrlParam("base")) : "https://lkprojects.glitch.me/_public/files/";
  var xhr;
  if(window.XMLHttpRequest){
    xhr=new XMLHttpRequest();
  }else{
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xhr.open("GET", mdFilePath, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      if(xhr.status == 200){
        document.getElementById("md_files_source").setAttribute("href",sourceUrl);
        previewMD(marked(xhr.responseText));
      }else{
        if(xhr.status != 0){
          previewMD(marked("**Read Markdown File Error! Code:"+xhr.status+"**"));
        }else{
          previewMD(marked("**Unexpected error reading Markdown file!**\n**Please Press F12 To View Error Info!**"));
        }
      }
    }
  };
})(window);
