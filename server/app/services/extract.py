import yolov5
import os
import gdown
from PIL import Image
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg

config = Cfg.load_config_from_name('vgg_transformer')
config['cnn']['pretrained']=False
config['device'] = 'cpu'
detector = Predictor(config)

local_path = 'app/services/weights'
output = os.path.join(local_path, "best.pt")

if not os.path.isdir(local_path):
    os.mkdir(local_path)
elif not len(os.listdir(local_path)) > 0:
    id = "1SFou-w2JHsIxznyAJUMthvZlHTpEmGne"
    gdown.download(id=id, output=output, quiet=False)

model = yolov5.load(output)
model.conf = 0.5 
# img = ''

# infr_results = model(img)
# results = infr_results.crop() 
# processed_results = []

# for res in results:
#     im, label = Image.fromarray(res['im']), res['label'].split()[0]
#     s = detector.predict(im)
#     s = s.replace("."," ") if label == "TenKhachHang" else s.replace(".","")
    
#     result_dict = {
#         'text': s,
#         'label': label
#     }
#     processed_results.append(result_dict)

def extract(img):
    infr_results = model(img)
    results = infr_results.crop() 
    processed_results = {}

    for res in results:
        im, label = Image.fromarray(res['im']), res['label'].split()[0]
        s = detector.predict(im)
        s = s.replace("."," ") if label == "TenKhachHang" else s.replace(".","")
        processed_results[label] = s

    return processed_results

def ocr_inference(path_img):
    img = Image.open(path_img)
    s = detector.predict(img)
    return s