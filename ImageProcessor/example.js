/* function */
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
  var axisWidth = xMax - xMin;
  var axisHeight = yMax - yMin;
  var deltaX = (width - gap*2) / axisWidth;
  var deltaY = (height - gap*2) / axisHeight;

  var ctx = cvs.getContext('2d');
  ctx.lineWidth = linewidth;
  ctx.strokeStyle = color;

  // 开始绘制
  ctx.beginPath();
  ctx.moveTo((x[0]-xMin)*deltaX+gap, height - (y[0]-yMin)*deltaY - gap);
  //console.log(0+':'+((x[0]-xMin)*deltaX+gap)+','+(height - (y[0]-yMin)*deltaY-gap));
  for (var i = 1; i < x.length; i++) {
    ctx.lineTo((x[i]-xMin)*deltaX+gap, height - (y[i]-yMin)*deltaY-gap);
    //console.log(i+':'+((x[i]-xMin)*deltaX+gap)+','+(height - (y[i]-yMin)*deltaY - gap));
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
img.src = '0.jpg';
//当图像数据加载完成时，执行函数

  //创建一个Canvas元素，用于绘制图像
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  
  //将图像绘制到Canvas上
  ctx.drawImage(img, 0, 0);
  
  //获取Canvas中的图像数据
  var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  var data = imageData.data;
  
  //创建一个用于存储灰度分布的数组
  var grayDistribution = new Array(256).fill(0);
  var grayLevel = new Array(256).fill(0,1,255);
  //计算灰度分布
  for (var i = 0; i < data.length; i += 4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var gray = Math.round((r + g + b) / 3);
    grayDistribution[gray]++;
  }

  var grayDist = new Array(256);
  var m = max(grayDistribution);
  for (var i = 0; i < 256; i++) {
    grayDist[i] = grayDistribution[i]/m*100;
  }
  //打印灰度分布
  console.log(grayDistribution);
  //plot(grayLevel, grayDistribution, canvas1);



  // 创建Canvas元素
var canvas1 = document.createElement('canvas');
canvas1.width = 400;
canvas1.height = 400;
document.body.appendChild(canvas1);

plot(grayLevel, grayDist, canvas1);

//设置图像路径，加载图像数据







