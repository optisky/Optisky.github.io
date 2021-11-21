#######################
# Author: hechong
# Date: 2021-11-20
# Desc: Read and write a bmp file
# Reference: https://www.cnblogs.com/wainiwann/p/7086844.html
# Data includes bmp file header, bitmap information, color palette, and bitmap data
#
# bmp file header 14 Bytes in length
# 0x0000: bfType (2B), bmp file type. default: 66 77 (B M)
# 0x0002: bfSize (4B), file size (which means header information)
# 0x0006: bfReserved1 (2B), reserved bits = 0
# 0x0008: bfReserved2 (2B), reserved bits = 0
# 0x000A: bfOffBits (4B), offset to actual image data
#
# bitmap image header, usually 40 Bytes in length
# 0x000E: bfSize (4B), size of bitmap header (usually 40B)
# 0x0012: width (4B)
# 0x0016: height (4B)
# 0x001A: biPlane (2B), always = 1
# 0x001C: BPP (2B), bits per pixel. 1, 4, 8, 16, 24, or 32
# 0x001E: biCompression (4B), 0 for BI_RGB (no compression)
# 0x0022: biSizeImage (4B), size of actual image data, it could be 0 if BI_RGB is selected. 
#         biSizeImage = regWidth*height*BPP/8, regWidth=4*ceil(BPP*width/32). regWidth is the lowest multiple of 4
# 0x0026: horizontal resolutions (4B)
# 0x002A: vertical resolutions (4B)
# 0x002E: biClrUsed (4B), color index used
# 0x0032: biClrImportant (4B), all important if 0
#############################

IMAGE_DIGIT = 0
IMAGE_ALPHABET = 1
IMAGE_alphabet = 2

class Image:
                     
    def __init__(self, filename='', verification=False,debug=False):
        self.size = 0
        self.__offset = 54
        self.width = 0
        self.height = 0
        self.R = 0
        self.G = 0
        self.B = 0
        self.BPP = 24
        self.bytesPerPixel = self.BPP//8
        self.bytesPerRow = 0
        self.endBytesGap = 0
        self.os = self.__offset
    
        if filename:
            with open(filename, 'rb') as imgFile:
                imgInfo = imgFile.read()
            if imgInfo[0] == 66 and imgInfo[1] == 77: # Header: BM --> BMP
                self.readBMP(filename, verification)
            if debug:
                debugFilename = createFilename(filename + '_debug') + '.txt'
                with open(debugFilename, 'a') as debugFile:
                    for i in range(len(imgInfo)):
                        debugFile.write(str(imgInfo[i])+' ')
    def __str__(self):
        if self.height <= 100:
            redInfoStr = 'R = [\n'
            greenInfoStr = 'G = [\n'
            blueInfoStr = 'B = [\n'
            
            for r in range(self.height):
                for c in range(self.width):
                    redInfoStr = redInfoStr + str(self.R[r][c]) + ' '
                    greenInfoStr = greenInfoStr + str(self.G[r][c]) + ' '
                    blueInfoStr = blueInfoStr + str(self.B[r][c]) + ' '
                redInfoStr += '\n'
                greenInfoStr += '\n'
                blueInfoStr += '\n'
            redInfoStr += ']'
            greenInfoStr += ']'
            blueInfoStr += ']'
            return redInfoStr + '\n\n' + greenInfoStr + '\n\n' + blueInfoStr
        else:
            return 'Exceeds 100 lines'
    
    def readBMP(self, filename, verification=False):
        print('BMP FILE')
        if verification:
            with open(filename, 'rb') as imgFile:
                imgInfo = imgFile.read()
            with open(filename + '_verification.txt', 'a') as verFile:
                for i in range(len(imgInfo)):
                    verFile.write(str(imgInfo[i]) + ' ')
            return
        with open(filename, 'rb') as imgFile:
            imgInfo = imgFile.read()
            self.size = imgDWORD2num(imgInfo[2:6])
            self.__offset = imgDWORD2num(imgInfo[10:14])
            self.width = imgDWORD2num(imgInfo[18:22])
            self.height = imgDWORD2num(imgInfo[22:26])
            self.BPP = imgDWORD2num(imgInfo[28:30])
            self.bytesPerPixel = self.BPP//8
            bitsPerRow = self.BPP*self.width 
            self.bytesPerRow = 4*(bitsPerRow//32+1) if bitsPerRow/32-bitsPerRow//32!=0 else bitsPerRow//8
            self.endBytesGap = self.bytesPerRow - self.bytesPerPixel*self.width
            self.R = [[0 for col in range(self.width)] for row in range(self.height)]
            self.G = [[0 for col in range(self.width)] for row in range(self.height)]
            self.B = [[0 for col in range(self.width)] for row in range(self.height)]
            row = self.height - 1
            col = 0
            #print(self.endBytesGap)
            #print('row', len(self.R[0]), 'col', len(self.R))
            print(str(self.width) + 'x' + str(self.height))
            print('FILE SIZE: ' + str(self.size) + ' Bytes')
            #print(self.__offset, len(imgInfo))
            i = self.__offset
            while i < len(imgInfo)-self.endBytesGap:
                if col == self.width:
                    row -= 1
                    col = 0
                    i += self.endBytesGap
                self.B[row][col] = imgInfo[i]
                self.G[row][col] = imgInfo[i+1]
                self.R[row][col] = imgInfo[i+2]
                #print('i:',i, '//row', row, ', col', col, imgInfo[i], imgInfo[i+1], imgInfo[i+2])
                col += 1
                i += self.bytesPerPixel
    def createImage(self, width, height, bgColor=(0,0,0)):
        self.width = width
        self.height = height
        self.R = [[bgColor[0] for col in range(self.width)] for row in range(self.height)]
        self.G = [[bgColor[1] for col in range(self.width)] for row in range(self.height)]
        self.B = [[bgColor[2] for col in range(self.width)] for row in range(self.height)]
            
    def write(self, filename='1'):
        bmpHeader = b'\x42\x4D'
        self.height = len(self.R)
        self.width = len(self.R[0])
        self.BPP = 24
        self.__offset = 54
        bitsPerRow = self.BPP*self.width
        self.bytesPerRow = 4*(bitsPerRow//32+1) if bitsPerRow/32-bitsPerRow//32!=0 else bitsPerRow//8
        biSizeImage = self.bytesPerRow*self.height
        self.size = self.__offset + biSizeImage
        bmpHeader = bmpHeader + num2binaryStr(self.size, 4) + b'\x00\x00\x00\x00' + num2binaryStr(self.__offset, 4) + \
                    b'\x28\x00\x00\x00' + num2binaryStr(self.width, 4) + num2binaryStr(self.height, 4) + b'\x01\x00' + \
                    num2binaryStr(self.BPP, 2) + b'\x00\x00\x00\x00' + num2binaryStr(biSizeImage, 4) + \
                    b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00'

        filename = createFilename(filename)+'.bmp'
        with open(filename, 'ab') as imageFile:
            imageFile.write(bmpHeader)
            
            self.endBytesGap = self.bytesPerRow - self.bytesPerPixel*self.width
            for row in range(self.height-1, -1, -1):
                for col in range(0, self.width, 1):
                    imageFile.write(num2binaryStr(self.B[row][col]) + num2binaryStr(self.G[row][col]) + num2binaryStr(self.R[row][col]))
                    if col == self.width - 1:
                        for i in range(self.endBytesGap):
                            imageFile.write(b'\x00')
        print('File have been saved in', filename)

        
                
def imgDWORD2num(dword)->int:
    hexStr = '0x'
    for i in range(len(dword)-1, -1, -1):
        hexStr += hex(dword[i])[2:]
    return int(hexStr, 16)

def num2binaryStr(num, byteCount=1, encodingMethod='ISO-8859-1'):
    if num > int('0x'+'FF'*byteCount, 16):
        return False
    if byteCount == 1:
        return chr(num).encode(encodingMethod)
    num = hex(num)[2:]
    biStr = b''
    for i in range(byteCount):
        if len(num) == 0:
            biStr += b'\x00'
        elif len(num) <= 2 and len(num) > 0:
            biStr += chr(int(num, 16)).encode(encodingMethod)
            num = ''
        else:
            numTemp = num[-2:]
            num = num[:-2]
            biStr += chr(int(numTemp, 16)).encode(encodingMethod)
    return biStr
        
def createFilename(filename, increasingItem=IMAGE_DIGIT, prefix='(', postfix=')'):
    #TO BE OPTIMIZED FOR THE CASE THAT i > 9 OR i >'Z' OR i > 'z'
    import os.path
    if increasingItem == IMAGE_DIGIT:
        increaseValue = 49 # ord('1') = 48
    elif increasingItem == IMAGE_ALPHABET:
        increaseValue = 65 # ord('A') = 65
    elif increasingItem == IMAGE_alphabet:
        increaseValue = 97 # ord('a') = 97
    else:
        return "UNKNOW_INCREASING_ITEM"
    newFilename = filename
    while os.path.isfile(newFilename+'.bmp'):
        newFilename = filename + prefix + chr(increaseValue) + postfix
        increaseValue += 1
    return newFilename
    

#img = Image()
