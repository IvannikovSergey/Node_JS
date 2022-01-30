const http = require('http')
const port = process.env.PORT || 3000
const fs = require('fs')

function serverStaticFiles(res, path, contentType, responseCode = 200) {
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            res.end('505 - внутрення ошибка')
        }
        res.writeHead(responseCode,{'Content-Type': 'text/plain'} )
        res.end(data)
    })
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()
    switch (path) {
        case '':
            serverStaticFiles(res, '/public/home.html', 'text/html')
            break
        case '/about':
            serverStaticFiles(res, '/public/about.html', 'text/html')
            break
        case '/img/logo.png':
            serverStaticFiles(res, '/public/img/logo.png', 'image/png')
            break
        default:
            serverStaticFiles(res, '/public/home.html', 'text/html')
            break
    }

})

server.listen(port, () => console.log(`Сервер запущен на порту ${port}; ` + ' нажмите CTRL+С для выхода....'))
