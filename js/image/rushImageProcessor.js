// rush image processor

/*********** Image Object ***********/
function RGBImage(img) {
	/* 
		0          column          width
		  ——————————————————————————>
		  |                       |
		  |					      |
		  |                       |
	  row |         image         |
	      |                       |
		  |                       |
		  |                       |
		  |—————————————————————————
		height
	
	is transform to array
		[ 0 0 0 0     0 0 0 0      ······]
		  -------     -------
		  R G B Alpha
		  pixel (0,0) pixel (0,1)
	*/
	
	this.gradImgData = function (imag) {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		context.drawImage(imag, 0, 0);
		context.onload = function() {
			var imgd = context.getImageData(0, 0, imag.width, imag.height).data;
			canvas.parentNode.removeChild(canvas);
			return imgd;
		}
	}
	this.imgData = this.gradImgData(img);
	this.width = img.width;
	this.height = img.height;
}

/********** Color Object ***********/
function Color (r, g, b, a) {
	if (arguments.length == 3) {
		a = 0;
	}
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
}

function imread(src) {
	var imgtag = new Image();
	imgtag.src = src;
	document.body.appendChild(imgtag);
	var isImageOnload = false;
	var count = 0;
	imgtag.onload = function () {
		isImageOnload = true;
		
	};
	while (!isImageOnload) {console.log(count++);}
	var img = new RGBImage(imgtag);
	imgtag.parentNode.removeChild(imgtag);
	console.log(img.width);
	return img;
}

RGBImage.prototype.getPixel = function (row, column) {
	var pos = (this.width*row + column)*4;
	return Color(
				 this.imgData[pos],    // r component
				 this.imgData[pos+1],  // g component
				 this.imgData[pos+2],  // b component
				 this.imgData[pos+3]   // alpha component
				);
}

RGBImage.prototype.setPixel = function (row, column, c) {
	var pos = (this.width*row + column)*4;
	this.imgData[pos] = c.r;     // r component
	this.imgData[pos+1] = c.g;   // g component
	this.imgData[pos+2] = c.b;   // b component
	this.imgData[pos+3] = c.a;   // alpha component
}

/*
function imshow(img) {
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.drawImage(img,
*/