// node http模块引入
var http = require("http"),
// 在服务端使用jQuery..
    cheerio = require("cheerio"),

    // 访问请求配置
    options = {  
        host: 'stackoverflow.com',
        path: '/',
        method: 'GET',
        headers: {
            'Accept': 'text/html'
        }
    },
    data = "";

// 发起请求
// PS:node属于C/S通讯，不是B/S，故这种请求，可以跨域
var req = http.request(options, function(res){
    // 设置显示编码
    res.setEncoding("utf8");
    // chunk指的是服务器数据的返回是一段一段的，这个和TCP滑动窗口协议有关，需要使用data串接起来，参照buffer
    res.on('data', function(chunk){
        data += chunk;
    });
    // 响应完毕时间出发，输出返回的全部内容
    res.on('end', function(){
        var $ = cheerio.load(data);
        var items = [];
        $('#question-mini-list .question-summary').each(function (idx, element) {
            var $element = $(element).find('.summary').children().eq(0).find('a');
            //console.log($element.attr('href'));
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            });
        });
        console.log(items);
    });
});

// 发送请求
req.end();