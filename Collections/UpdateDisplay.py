import os
if os.path.exists('Display.html'):
    os.remove('Display.html')
with open('Display.html', 'a+', encoding='utf-8') as html:
    html.write(r"""<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display-Related articles</title>
</head>
<body>""")
    files = os.listdir(r'Display')
    dirList = []
    for i in range(len(files)):
        if os.path.isdir(r'Display/'+files[i]):
            if files[i][0] != '.':
                dirList.append(files[i])
        else:
            print(files[i])
            html.write(r'<a href="./Display/'+files[i]+r'">'+files[i][:-4]+'</a></br>\n')
    for i in range(len(dirList)):
        files = os.listdir(r'Display/'+dirList[i])
        for j in range(len(files)):
            print(files[j])
            html.write(r'<a href="./Display/'+dirList[i]+r'/'+files[j]+r'">'+files[j][:-4]+'</a></br>\n')
    html.write(r'</body>')
