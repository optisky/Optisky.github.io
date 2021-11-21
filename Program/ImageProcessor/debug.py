import DrawBasicGeoElem
import Image
import BaseGeoElem

img = Image.Image()
img.createImage(1500, 1500, (255, 255, 255))
x = []
y = []
y1 = []
for i in range(0, 1500, 5):
    x.append(i)
    y.append(int(((i-750)/30)**2))
    y1.append(int(((i-751)/30)**2))
##print(x)
##print(y)
curve = BaseGeoElem.Curve(x,y)
curve1 = BaseGeoElem.Curve(x,y1)
DrawBasicGeoElem.drawCurve(img, curve, [0,0,0])
DrawBasicGeoElem.drawCurve(img, curve1, [0, 0, 0])
img.write('b')
