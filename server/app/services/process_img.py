import base64
from PIL import Image
from io import BytesIO
import os

def save(b64_img, save_path = 'app/services/uploads', filename= 'upload.jpg' ):
    # Remove the data URL prefix
    b64_img = b64_img.split(',')[-1]

    # Decode the Base64 string into bytes
    image_bytes = base64.b64decode(b64_img)

    # Create a BytesIO object to work with PIL
    image_buffer = BytesIO(image_bytes)

    # Open the image using PIL
    image = Image.open(image_buffer)
    image = image.convert('RGB')
    image.save(os.path.join(save_path, filename))

    return os.path.join(save_path, filename)