// node http模块引入
var http = require("http");
var url = "http://www.bepotato.com/";
var data = "";

// 发起请求
var req = http.request(url, function(res){
    // 设置显示编码
    res.setEncoding("utf8");
    // chunk指的是服务器数据的返回是一段一段的，这个和TCP滑动窗口协议有关，需要使用data串接起来，参照buffer
    res.on('data', function(chunk){
        data += chunk;
    });
    // 响应完毕时间出发，输出返回的全部内容
    res.on('end', function(){
        console.log(data);
    });
});

// 发送请求
req.end();