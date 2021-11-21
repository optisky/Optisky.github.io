class Point:
    def __init__(self, x, y, z=0):
        self.x, self.y, self.z = x, y, z

class Line:
    def __init__(self, x0, y0, x1, y1, z0=0, z1=0):
        self.x0, self.y0, self.z0 = x0, y0, z0
        self.x1, self.y1, self.z1 = x1, y1, z1
    def __str__(self):
        return 'x0=' + str(self.x0) + ', y0=' + str(self.y0) + '; ' \
               'x1=' + str(self.x1) + ', y1=' + str(self.y1)

class Curve:
    def __init__(self, x, y, z=0):
        self.x, self.y, self.z = x, y, z
        
