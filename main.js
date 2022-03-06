const cmd = require('node-cmd');
const http = require("http");
const qs = require('querystring');
const fs = require('fs')
const time=require('timers')
const url = require('url');
const processRef = cmd.run(
    `java -Dfile.encoding=UTF-8 -jar server.jar
    
    `);

let data_line = '';
processRef.stdout.on(
    'data',
    function (data) {
        data_line = data + '<br>' + data_line;
    }
);

function handle(command) {
    if (command == "clear") {
        data_line = '';
    }else if(command == "refresh")
    {

    }else
    {
        processRef.stdin.write(command + '\n');
    }



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
        //console.log(body.command);
        if (body.command) {
            console.log( 'receive a ' +body.command+ ' command from '+req.socket.remoteAddress);
            //data_line = '';
            handle(body.command);
            body = "";
            setTimeout(() => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                //console.log('data writing:'+data_line);
                res.write(data_line.toString());
                res.end();
            }, 100)
        } else {
            fs.readFile('console.html', function (err, data) {
                if (err) {
                    console.log(err);
                    res.writeHead(404, {'Content-Type': 'text/html'});
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data.toString());
                }
                res.end();
            });
        }


    });
}).listen(56344);
