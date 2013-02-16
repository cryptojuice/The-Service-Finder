import glob
import PIL
from PIL import Image

search_dir = '/home/nrobin01/Dev/the-service-finder/public/'

img_list = glob.glob(search_dir + '*.jpg')

for i in range(len(img_list)):
  img_list[i] = img_list[i].replace(search_dir, '')


def resizeImage(imageName, basewidth):
  img = Image.open(imageName)
  wpercent = (basewidth / float(img.size[0]))
  hsize = int(float(img.size[1]) * float(wpercent))
  img = img.resize((basewidth, hsize), PIL.Image.ANTIALIAS)
  img.save("small_" + imageName)

for i in range(len(img_list)):
  resizeImage(img_list[i], 140)
  
  
  


