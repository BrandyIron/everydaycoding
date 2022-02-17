from fastai.vision.all import *

path = untar_data(URLs.PETS)
path.ls()

files = get_image_files(path/"images")
len(files)

def label_fund(f): return f[0].isupper()

dls = ImageDataLoaders.from_name_func(path, files, label_func, item_tfms=Resize(224))
dls.show_batch()

learn = cnn.learner(dls, resnet34, metrics=error_rate)
learn.fine_tune(1)

learn.predict(files[0])

learn.show_results()