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
	this.data = new Uint8Array(weight*height*4);
	data && this.data.set(data);
	
	this.getPixel = function (row, column) {
		var pos = (row*this.width + column)*4;
		return new Color (
			this.data[pos],
			this.data[pos+1],
			this.data[pos+2],
			this.data[pos+3]
		);
	};
	
	this.setPixel = function (row, column, color) {
		var pos = (row*this.width + column)*4;
		this.data[pos]   = color.r;
		this.data[pos+1] = color.g;
		this.data[pos+2] = color.b;
		this.data[pos+3] = color.a;
	};
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
	
	this.setColor = function (that) {
		if (that != null && that.constructor === Color) {
			this.r = that.r;
			this.g = that.g;
			this.b = that.b;
			this.a = that.a;
		} else {
			return null;
		}
	};
};
	