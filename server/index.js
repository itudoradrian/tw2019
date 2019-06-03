const http = require('http');
const url = require('url');
const ejs = require('ejs');
const qs = require('querystring');

people = ['geddy', 'neil', 'alex'];
    

//create a server object:
http.createServer(function (req, res) {
     //write a response to the client
    if(req.url == '/form')
    {
        //html = ejs.render('<%= msg %>', {msg: JSON.stringify(reqMsg)});
        ejs.renderFile('form.ejs',function(err, str){
            res.write(str);
            res.end(); 
        })
    }
    if(req.url == '/post')
    {

        if (req.method == 'POST') {
            let body = '';
    
            req.on('data', function (data) {
                body += data;
    
                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    req.connection.destroy();
            });
    
            req.on('end', function () {
                let post = qs.parse(body);
                res.write(JSON.stringify(post));
                res.end(); 
            });
        }
    }
  }).listen(8080); //the server object listens on port 8080