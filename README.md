# RW-HPSWebConsole
这是铁锈战争高性能服务器网页控制程序。需要node.js和java环境。
你可以下载这些文件，或者更简单的用npm直接安装，命令是

### npm i rwhpswebconsole

安装完成后，使用node main.js开启服务器。

访问你的服务器的56344端口，开启对server.jar的web控制。

加入群831366592进行讨论。

你完全可以用其他程序通过此nodejs程序控制RW-HPS，方法为：向本机56344（默认）端口发送post请求，请求中command值为你需要执行的命令，服务器的输出就是响应内容。
同样地，你也可以自己写一个漂亮的前端，通过post请求调用本程序，因为自带的前端比较简洁。

内置RW-HPS版本：5.3.0-DEV1