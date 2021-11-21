import BaseGeoElem
import Image

def drawLine(canvas, line, colour, linewidth=1):
    colourType = type(colour)
    if colourType == tuple:
        pass
    elif colourType == list:
        colour = tuple(colour)
    elif colourType == set:
        colour = tuple(colour)
    else:
        print('Undefined! colour is a tuple, a list, or a set with elements of float [0,1] or int [0, 255]')
        return
    if len(colour) != 3:
        print ('Colour must be a tuple with 3 elements (R, G, B)')
        return
    if type(colour[0]) == float:
        colour = (int(colour[0]*255), int(colour[1]*255), int(colour[2]*255))
    x0, y0, x1, y1 = line.x0, line.y0, line.x1, line.y1
    #print(x0, y0, x1, y1)
    if x0 < 0: x0 = 0
    if y0 < 0: y0 = 0
    if x1 >= canvas.width: x1 = canvas.width-1
    if y1 >= canvas.height: y1 = canvas.height-1
    canvas.R[y0][x0], canvas.G[y0][x0], canvas.B[y0][x0] = colour
    canvas.R[y1][x1], canvas.G[y1][x1], canvas.B[y1][x1] = colour
    
    if x0 == x1:
        ymin, ymax = min(y0, y1), max(y0, y1)
        for y in range(ymin, ymax+1):
            canvas.R[y][x0], canvas.G[y][x0], canvas.B[y][x0] = colour
    else:
        k = (y1-y0)/(x1-x0)
        for x in range(x0+1, x1, 1):
            y = int(k*x + y1 - k*x1)
            if y < 0 or y >= canvas.height:
                break
            #print(x, y)
            canvas.R[y][x], canvas.G[y][x], canvas.B[y][x] = colour

def drawCurve(canvas, curve, colour, linewidth=1):
    colourType = type(colour)
    if colour == tuple:
        pass
    elif colourType == list:
        colour = tuple(colour)
    elif colourType == set:
        colour = tuple(colour)
    else:
        return 'Undefined! colour is a tuple, a list, or a set with elements of float [0,1] or int [0, 255]'
    if len(colour) != 3:
        return 'Colour must be a tuple with 3 elements (R, G, B)'
    if type(colour[0]) == float:
        colour = (int(colour[0]*255), int(colour[1]*255), int(colour[2]*255))
    #print(len(curve.x))
    for i in range(len(curve.x)-1):
        line = BaseGeoElem.Line(curve.x[i], curve.y[i], curve.x[i+1], curve.y[i+1])
       # print(line)
        drawLine(canvas, line, colour, linewidth)
