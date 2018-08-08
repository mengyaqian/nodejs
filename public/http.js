function api(url,opt,methods) {
    var hosts = 'http://127.0.0.1:3000/';
    return new Promise(function(resove,reject){
    
      methods = methods || 'POST';
      var xmlHttp = null;
      if (XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
      } else {
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
      };
      
      var params = [];
      for (var key in opt){
        if(!!opt[key] || opt[key] === 0){
          params.push(key + '=' + opt[key]);
        }
      };
      var postData = params.join('&');
      if (methods.toUpperCase() === 'POST') {
        xmlHttp.open('POST', hosts+url, true);
        xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xmlHttp.send(JSON.stringify(opt));
      }else if (methods.toUpperCase() === 'GET') {
        xmlHttp.open('GET', hosts+url + '?' + postData, true);
        xmlHttp.send(null);
      }else if(methods.toUpperCase() === 'DELETE'){
        xmlHttp.open('DELETE', hosts+url + '?' + postData, true);
        xmlHttp.send(null);
      }
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          resove(JSON.parse(xmlHttp.responseText));
        }
      };
    });
  }
