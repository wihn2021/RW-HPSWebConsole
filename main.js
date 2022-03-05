const cmd = require('node-cmd');
const http = require("http");
const qs = require('querystring');
const fs=require('fs')
let postHTML="";
const processRef = cmd.run(
    `java -jar server.jar
    
    `);

let data_line = '';
processRef.stdout.on(
    'data',
    function (data) {
        data_line = data + '<br>' + data_line;
        //console.log(postHTML.encode);
        update();
    }
);

function update()
{
    postHTML =
        '<html><head><meta charset="utf-8"><title>RW-HPS console</title></head>' +
        '<body>' +
        '<div style="width: 1000px;height: 600px; overflow-y:auto;">' + data_line + '</div><br>' +
        '<form method="post">' +
        'command:<input name="command"><br>' +
        '<input type="submit">' +
        '</form><h2>submit an empty command==refresh</h2>' +
        '</body></html>';
}

function handle(command) {
    if (command == "clear") {
        data_line = '';
    }
        processRef.stdin.write(command + '\n');
    

}

http.createServer((req, res) => {
    let body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        // 解析参数
        body = qs.parse(body);
        // 设置响应头部信息及编码
        res.writeHead(200, {'Content-Type': ('text/html; charset=utf-8')});

        if (body.command) {
            data_line='';
            handle(body.command)
            if(body.encoding)
            {
                encoding=body.encoding;
            }
            body = "";
            setTimeout(() => {
                res.write(postHTML);
                res.end();
            }, 100)
        } else {
            res.write(postHTML);
            res.end();
        }


    });
}).listen(56344);