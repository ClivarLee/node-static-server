let path = require('path');
let fs = require('fs');
let regJs = /\.js$/;
let regCss = /\.css$/;
let regImg = /\.(jpg|png|gif)$/;


exports.static = function (res ,pathname) {
  let basePath = path.resolve(__dirname, '../client');
  if (pathname === '/' || pathname === '/index.html') {
    responseHtml(res, pathname, basePath);
    return;
  }

  if (regJs.test(pathname)) {
    responseJs(res, pathname);
    return
  }
  if (regCss.test(pathname)) {
    responseCss(res, pathname);
    return
  }
  if (regImg.test(pathname)) {
    responseImage(res, pathname);
    return
  }
};

let responseHtml = function (res) {
  let htmlContent = '';
  let fileName = path.resolve(__dirname, '../client/index.html');
  fs.readFile(fileName, function (err, data) {
    if (err) {
      return errMsg(res, err)
    }
    htmlContent = data
    res.writeHead(200, {'Content-type': 'text-html'});
    res.write(htmlContent);
    res.end();
  })
}

let responseJs = function (res, pathname) {
  let fileName = path.resolve(__dirname, '../client' + pathname);
  let scriptData = '';
  fs.readFile(fileName, function (err, data) {
    if (err) {
      return errMsg(res, err)
    }
    scriptData = data
    res.writeHead(200, {'Content-type': 'application/x-javascript'})
    res.write(scriptData);
    res.end();
  })
}

let responseCss = function (res, pathname) {
  let cssData = '';
  let fileName = path.resolve(__dirname, '../client' + pathname);
  fs.readFile(fileName, function (err, data) {
    if (err) {
      return errMsg(res, err);
    }
    cssData = data;
    res.writeHead(200, {'Content-type': 'text/css'});
    res.write(cssData);
    res.end();
  })
}

let responseImage = function (res, pathName) {
  let imageData = ''
  let imageName = path.resolve(__dirname, '../client'+ pathName)
  fs.readFile(imageName, function (err, data) {
    if (err) {
      return errMsg(res, err);
    }
    const imgType = path.extname(pathName).replace('.', '')
    imageData += data;
    res.writeHead(200, {'Content-type': `image/${ imgType }` })
    
    const imgStream = fs.createReadStream(imageName);
    imgStream.on('data', function (data) {
      res.write(data)
    })
    imgStream.on('end', function () {
      res.end()
    })
  })
}
let errMsg = function (res, err) {
  res.writeHead(404, {'Content-Type': 'text-plain'});
  res.write('404 not found' + err.message);
  res.end();
};
