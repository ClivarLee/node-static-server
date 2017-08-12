var queryString = require('querystring');
var path = require('path');
var fs = require('fs');
var regJs = /\.js$/;
var regCss = /\.css$/;
var regImg = /\.(jpg|png)$/


exports.static = function (res ,pathname) {
  var basePath = path.resolve(__dirname, '../client');
  if (pathname === '/' || pathname === '/index.html') {
    responseHtml(res, pathname, basePath)
    return;
  }
  console.log(pathname, regJs.test(pathname))
  if (regJs.test(pathname)) {
    responseJs(res, pathname)
    return
  }
  if (regCss.test(pathname)) {
    responseCss(res, pathname)
    return
  }
  if (regImg.test(pathname)) {
    responseImage(res, pathname);
    return
  }
  res.writeHead(200, {'Content-type': 'text/plain'});
  res.write('你好');
  res.end()
};

var responseHtml = function (res) {
  var htmlContent = '';
  var fileName = path.resolve(__dirname, '../client/index.html');
  fs.readFile(fileName, function (err, data) {
    if (err) {
      return errMsg(res, err)
    }
    htmlContent += data
    res.writeHead(200, {'Content-type': 'text-html'});
    res.write(htmlContent);
    res.end();
  })
}

var responseJs = function (res, pathname) {
  var fileName = path.resolve(__dirname, '../client' + pathname);
  var scriptData = '';
  fs.readFile(fileName, function (err, data) {
    if (err) {
      return errMsg(res, err)
    }
    scriptData += data
    res.writeHead(200, {'Content-type': 'application/x-javascript'})
    res.write(scriptData);
    res.end();
  })
}

var responseCss = function (res, pathname) {
  var cssData = '';
  console.log(pathname)
  var fileName = path.resolve(__dirname, '../client' + pathname);
  fs.readFile(fileName, function (err, data) {
    if (err) {
      return errMsg(res, err);
    }
    cssData += data;
    console.log(cssData)
    res.writeHead(200, {'Content-type': 'text/css'});
    res.write(cssData);
    res.end();
  })
}

var responseImage = function (res, pathName) {
  var imageData = ''
  var imageName = path.resolve(__dirname, '../client'+ pathName)
  fs.readFile(imageName, function (err, data) {
    if (err) {
      return errMsg(res, err);
    }
    imageData += data;
    res.writeHead(200, {'Content-type': 'image/png'})
    res.write(imageData.toString());
    res.end();
  })
}
var errMsg = function (res, err) {
  res.writeHead(404, {'Content-Type': 'text-plain'});
  res.write('404 not found' + err.message);
  res.end();
};
