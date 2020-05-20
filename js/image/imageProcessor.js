// image processor

// time: 2020-05-20

/*********** RGBA Image Object ***********/
function RGBAImage (width, height, data) {
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
	this.type = 'RGBAImage';
	this.width = width;
	this.height = height;
	this.data = new Uint8Array(width*height*4);
	data && this.data.set(data);
};

RGBAImage.prototype.getPixel = function (row, column) {
	var pos = (row*this.width + column)*4;
	return new Color (
		this.data[pos],
		this.data[pos+1],
		this.data[pos+2],
		this.data[pos+3]
	);
};

RGBAImage.prototype.setPixel = function (row, column, color) {
	var pos = (row*this.width + column)*4;
	this.data[pos]   = color.r;
	this.data[pos+1] = color.g;
	this.data[pos+2] = color.b;
	this.data[pos+3] = color.a;
	this.imread = function (img, cvs) {
	var w = img.width;
	var h = img.height;
	
	// resize the canvas for drawing the image
	cvs.width = w;
	cvs.height = h;
	var ctx = cvs.getContext('2d');
	
	ctx.drawImage(img, 0, 0);
	var imgData = ctx.getImageData(0, 0, w, h);
	var newImage = new RGBAImage(w, h, imgData);
	
	// clear up the old image and canvas
	imgData = null;
	ctx.clearRect(0, 0, w, h);
	return newImage;
};
};

RGBAImage.imread = function (img, cvs) {
	var w = img.width;
	var h = img.height;
	
	// resize the canvas for drawing the image
	cvs.width = w;
	cvs.height = h;
	var ctx = cvs.getContext('2d');
	
	ctx.drawImage(img, 0, 0);
	var imgData = ctx.getImageData(0, 0, w, h);
	var newImage = new RGBAImage(w, h, imgData);
	
	// clear up the old image and canvas
	imgData = null;
	ctx.clearRect(0, 0, w, h);
	return newImage;
};

RGBAImage.prototype.imread = function (img, cvs) {
	var w = img.width;
	var h = img.height;
	
	// resize the canvas for drawing the image
	cvs.width = w;
	cvs.height = h;
	var ctx = cvs.getContext('2d');
	
	ctx.drawImage(img, 0, 0);
	var imgData = ctx.getImageData(0, 0, w, h);
	var newImage = new RGBAImage(w, h, imgData);
	
	// clear up the old image and canvas
	imgData = null;
	ctx.clearRect(0, 0, w, h);
	return newImage;
};
	
RGBAImage.prototype.toImageData = function (ctx) {
	var imgData = ctx.createImageData(this.width, this.height);
	imgData.data.set(this.data);
	return imgData;
};

RGBAImage.prototype.render = function (cvs) {
	canvas.width = this.width;
	canvas.height = this.height;
	context.putImageData(this.toImageData(context, 0, 0));
};

/*************** Color Object ***************/
function Color (r, g, b, a) {
	if (arguments.lenth !== 4) {
		this.r = this.g = this.b = this.a = 0;
	} else {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	};
};

Color.prototype.setColor = function (that) {
	if (that != null && that.constructor === Color) {
		this.r = that.r;
		this.g = that.g;
		this.b = that.b;
		this.a = that.a;
	} else {
		return null;
	}
};
	
/*************** Image Loader ****************/
function ImageLoader () {
	this.result = undefined;
	this.loadImage = function (imgsrc, cvs) {
		var that = this;
		var img = new Image();
		img.onload = function () {
			that.result = RGBAImage.imread(img, cvs);
			that.result.render(cvs);
		};
		img.src = imgsrc;
	};
};