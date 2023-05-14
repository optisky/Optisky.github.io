/* function */
function regularizeCanvasByImage(img, canvas, widthLimit=500, heightLimit=500) {
  var imgHeight = img.height;
  var imgWidth = img.width;
  var canvasHeight = canvas.height;
  var canvasWidth = canvas.width;
  if (imgHeight >= imgWidth) {
    if (imgHeight <= heightLimit) {
      canvas.height = imgHeight;
      canvas.width = imgWidth;
      return;
    } else {
      canvas.height = heightLimit;
      canvas.width = parseInt(imgWidth/imgHeight*heightLimit)+1;
      return;
    }
  } else {
    if (imgWidth <= widthLimit) {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      return;
    } else {
      canvas.width = widthLimit;
      canvas.height = parseInt(imgHeight/imgWidth*widthLimit)+1;
      return;
    }
  }
}

function addCanvasBorder(canvas, linewidth=1, color='#000000') {
  var width = canvas.width;
  var height = canvas.height;
  var ctx = canvas.getContext('2d');
  ctx.lineWidth = linewidth;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.lineTo(0, 0);
  ctx.stroke();
}

function max(arr) {
  return Math.max.apply(null, arr);
}

function min(arr) {
  return Math.min.apply(null, arr);
}

function plot(x, y, cvs, gap=10, linewidth=2, color='blue') {
  var width = cvs.width;
  var height = cvs.height;
  var xMax = max(x);
  var xMin = min(x);
  var yMax = max(y);
  var yMin = min(y);
  var axisWidth = xMax - xMin; console.log('axisWdidth: '+axisWidth);
  var axisHeight = yMax - yMin;
  var deltaX = (width - gap*2) / axisWidth; console.log('delta_x',deltaX)
  var deltaY = (height - gap*2) / axisHeight;

  var ctx = cvs.getContext('2d');
  ctx.lineWidth = linewidth;
  ctx.strokeStyle = color;

  // 开始绘制
  ctx.beginPath();
  ctx.moveTo((x[0]-xMin)*deltaX+gap, height - (y[0]-yMin)*deltaY - gap);
  console.log(0+':'+((x[0]-xMin)*deltaX+gap)+','+(height - (y[0]-yMin)*deltaY-gap));
  for (var i = 1; i < x.length; i++) {
    ctx.lineTo((x[i]-xMin)*deltaX+gap, height - (y[i]-yMin)*deltaY-gap);
    console.log(i+':'+((x[i]-xMin)*deltaX+gap)+','+(height - (y[i]-yMin)*deltaY - gap));
  }
  ctx.stroke();
}

function ezplot(x,y,canvas) {
  var ctx = canvas.getContext('2d');
  var height = canvas.height;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x[0], height - y[0]);
  for (var i = 1; i < x.length; ++i) {
      ctx.lineTo(x[i], height - y[i]);
  }
  ctx.stroke();
}



//创建一个Image对象，用于加载图像数据
var img = new Image();
img.src = 'pic.jpg';
//当图像数据加载完成时，执行函数
img.onload = function() {
  //创建一个Canvas元素，用于绘制图像
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.height = img.height;
  canvas.width = img.width;
  
  //document.body.appendChild(canvas);
  //将图像绘制到Canvas上 
  //regularizeCanvasByImage(img, canvas, 500, 500);
  ctx.drawImage(img, 0, 0);
  
  //获取Canvas中的图像数据
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  
  //创建一个用于存储灰度分布的数组
  var r = new Array(256).fill(0);
  var g = new Array(256).fill(0);
  var b = new Array(256).fill(0);
  var grayLevel = new Array(256);
  //计算灰度分布
  for (var i = 0; i < data.length; i += 4) {
    r[data[i]]++;
    g[data[i + 1]]++;
    b[data[i + 2]]++;
  }

  var rDist = new Array(256);
  var gDist = new Array(256);
  var bDist = new Array(256);
  var m = max(Array(max(r), max(g), max(b)));
  for (var i = 0; i < 256; i++) {
    rDist[i] = r[i]/m*100;
    gDist[i] = g[i]/m*100;
    bDist[i] = b[i]/m*100;
    grayLevel[i] = i;
  }
  //打印灰度分布
  //console.log(grayDistribution);
  //plot(grayLevel, grayDistribution, canvas1);



  // 创建Canvas元素
var canvas1 = document.createElement('canvas');
canvas1.width = 400;
canvas1.height = 400;
document.body.appendChild(canvas1);
addCanvasBorder(canvas1);

console.log(r);
console.log(g);
console.log(b);

plot(grayLevel, rDist, canvas1, 10, 2, '#ff0000');
plot(grayLevel, gDist, canvas1, 10, 2, color='#00ff00');
plot(grayLevel, bDist, canvas1, 10, 2, color='#0000ff');

//设置图像路径，加载图像数据
}






