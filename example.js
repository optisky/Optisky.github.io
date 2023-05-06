
//创建一个Image对象，用于加载图像数据
var img = new Image();

//当图像数据加载完成时，执行函数
img.onload = function() {
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

  //计算灰度分布
  for (var i = 0; i < data.length; i += 4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var gray = Math.round((r + g + b) / 3);
    grayDistribution[gray]++;
  }

  //打印灰度分布
  console.log(grayDistribution);
};

//设置图像路径，加载图像数据
img.src = '0.jpg';

