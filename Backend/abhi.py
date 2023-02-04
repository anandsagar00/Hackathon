import cv2
import matplotlib.pyplot as plt
from deepface import DeepFace
import numpy as np
import os
from moviepy.editor import VideoFileClip
import pandas as pd


path = r"Backend\uploads"
path1= r"Backend\thief"
storepath=r"Frontend\src\Components\Images"
storepath1=r"Frontend\src\Components\imagesThief"
dbpath=r"Backend\intermediate"
dbpath1=r"Backend\thief_data"

def prediction_and_write(imgpath1):
    fps=imagegenerator()
    imgpath= r"Backend\uploads\\" + imgpath1[0]
    dbpath=dbpath
    storepath="Frontend\src\Components\Images"
    remove(storepath)
    
    recognition = DeepFace.find(
        img_path=imgpath, db_path=r"Backend\intermediate", enforce_detection=False)
    n = 1
    arr=[]
    for i in recognition[0].identity:
        pred_img = cv2.imread(i)
        x=i.replace(dbpath,'')
        x=x.replace(r".jpg",'')
        x=x.replace(r'/','')
        x=int(int(x)/fps)
        arr.append(x)
        grayf = cv2.cvtColor(pred_img, cv2.COLOR_BGR2RGB)
        resizedf = cv2.resize(grayf, (100, 100))
        normalized = resizedf/255
        reshapedf = np.reshape(normalized, (100, 100, 3))
        img=imgpath1[0].replace(".jpeg",'')
        name = storepath+"\\"+ img +"_"+str(x)+".jpg"
        plt.imsave(name, reshapedf)
    os.remove(imgpath)
    os.chdir(r"C:\Users\hp\OneDrive\Desktop\Blr Hackathon\Frontend\src\Components\Images")
    lst=os.listdir()
    i=0
    while i<len(lst)-1:
        os.remove(lst[i])
        i=i+1
    os.chdir(r"C:\Users\hp\OneDrive\Desktop\Blr Hackathon")
    remove(dbpath)

def infinite_run():
    while (1):
        path = r"Backend\uploads"
        if (len(os.listdir(path)) == 0 and len(os.listdir(path1))==0):
            count=1
        elif (len(os.listdir(path)) != 0):
            r=os.listdir(path)
            remove(storepath)
            prediction_and_write(r)
        elif(len(os.listdir(path1))!=0):
            r=os.listdir(path1)
            remove(storepath1)
            prediction_and_write_thief(r)
            
def remove(path):
    matter=os.listdir(path)
    for i in matter:
        if(i=="representations_vgg_face.pkl"):
            continue
        i=path+"\\"+i
        os.remove(i)


def imagegenerator():
    cam=VideoFileClip(r"Backend\Video\WhatsApp Video 2023-02-04 at 6.23.15 PM.mp4")
    dur=int(cam.duration)
    cam = cv2.VideoCapture(r"Backend\Video\WhatsApp Video 2023-02-04 at 6.23.15 PM.mp4")
    currentframe = 1
    while (True):
        ret, frame = cam.read()
        if ret:
            name = r"Backend\intermediate\\" + str(currentframe) + '.jpg'
            plt.imsave(name, frame)
            currentframe += 1
        else:
            break
    cam.release()
    fps=int(currentframe/dur)
    cv2.destroyAllWindows()
    print(dur)
    print(currentframe)
    print(fps)
    return fps

def textfilegen(recognition):
    df=pd.DataFrame(recognition[0])
    no=df.shape[0]
    text_file = open(r"Backend\test.txt", "w")
    for k in range(no):
        y=df['identity'][k]
        new_str = ""
        i=1
        for c in reversed(y):
            if c == '/':
                break
                i=i+1
            elif i>4:
                new_str= new_str+c
                i=i+1
            else:
                i=i+1
        txt = new_str[::-1]
        text_file.write(txt+"\n")
    text_file.close()

def prediction_and_write_thief(imagepath1):
    imgpath=path1 + "\\" + imagepath1[0]
    dbpath=dbpath1
    strpath=storepath1
    recognition = DeepFace.find(
        img_path= imgpath, db_path=dbpath, enforce_detection=False)
    n = 1
    for i in recognition[0].identity:
        pred_img = cv2.imread(i)
        grayf = cv2.cvtColor(pred_img, cv2.COLOR_BGR2RGB)
        resizedf = cv2.resize(grayf, (100, 100))
        normalized = resizedf/255
        reshapedf = np.reshape(normalized, (100, 100, 3))
        name = strpath+"\\" + str(n)+ ".jpg"
        n=n+1
        plt.imsave(name, reshapedf)
    os.remove(imgpath)
    textfilegen(recognition)


infinite_run()


