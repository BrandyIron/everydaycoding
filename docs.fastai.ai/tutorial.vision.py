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

files[0].name
pat = r'^(.*)_¥d.jpg'
dls = ImageDataLoaders.from_name_re(path, files, pat, item_tfms=Resize(224))
dls.show_batch()

dls = ImageDataLoaders.from_name_re(path, files, pat, item_tfms=Resize(460, batch_tfms=aug_transforms(size=224)))
dls.show_batch()

learn = cnn.learner(dls, resnet34, metrics=error_rate)
learn.lr.find()
learn.fine_tune(2, 3e-3)
learn.show_results()

interp = Interpretation.from_leaner(learn)
interp.plot_top_losses(9, figsize=(15, 10))

path = untar_data(URLs.PASCAL_2007)
path.ls()

df = pd.read_csv(path/'train.csv')
df.head()

dls = ImageDataLoaders.from_df(df, path, folder='train', valid_col='is_valid', label_delim=' ', item_tfms=Resize(460), batch_tfms=aug_trans(size=224))
dls.show_batch()

f1_macro = F1ScoreMulti(thresh=0.5, average='macro')