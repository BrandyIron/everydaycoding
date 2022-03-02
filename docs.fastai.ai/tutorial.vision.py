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
fl_marco.name = 'F1(marco)'
f1_samples = F1ScoreMulti(thresh=0.5, average='samples')
f1_samples.name = 'F1(samples)'
learn = cnn_learner(dls, resnet50, metrics=[partial(accuracy_multi, thresh=0.5), f1_marco, f1_samples])
learn.lr_find()
learn.fine_tune(2, 3e-2)
learn.show_results()
learn.predict(path/'train/000005.jpg')
interp = Interpretation.from_learner(learn)
interp.plot_top_losses(9)

df.head()

pascal = DataBlock(blocks=(ImageBlock, MultiCategoryBlock), splitter=ColSplitter('is_valid'), get_x=ColReader('fname', pref=str(path/'train') + os.path.sep), get_y=ColReader('labels', label_delim=' '), item_tfms = Resize(468), batch_tfms=aug_transforms(size=224))
dls = pascal.dataloaders(df)
dls.show_batch(max_n=9)

path = untar_data(URLs.CAMVID_TINY)
path.ls()
codes = np.loadtxt(path/'codes.txt', dtype=str)
codes
fnames = get_image_files(path/"images")
fnames[0]
(path/"labels").ls()[0]
def label_func(fn): return path/"labels"/f"{fn.stem}_P{fn.suffix}"
dls = SegmentationDataLoaders.from_label_func(
    path, bs=8, fnames = fnames, label_func = label_func, codes = codes
)
dls.show_batch(max_n=6)

learn = unet_learner(dls, resnet34)
learn.fine_tune(6)
learn.show_results(max_n=6, figsize=(7,8))
interp = SegmentationInterpretation.from_learner(learn)
interp.plot_top_losses(k=3)

camvid = DataBlock(blocks=(ImageBlock, MaskBlock(codes)), 
    get_items = get_image_files, 
    get_y = label_func, 
    splitter = RandomSplitter(), 
    batch_tfms = aug_transforms(size=120, 160))
dls = camvid.dataloaders(path/"images", path=path, bs=8)
dls.show_batch(max_n=6)

path = untar_data(URLs.BIWI_HEAD_POSE)
path.ls()
img_files = get_image_files(path)
def img2pose(x): return Path(f'{str(x)[:-7]}pose.txt')
img2pose(img_files[0])

im = PILImage.create(img_files[0])
im.shape
im.to_thumb(160)
cal = np.genfromtxt(path/'01'/'rgb.cal', skip_footer=6)
def get_ctr(f):
    ctr = np.genfromtxt(img2pose(f), skip_header=3)
    c1 = ctr[0] * cal[0][0]/ctr[2] + cal[0][2]
    c2 = ctr[1] * cal[1][1]/ctr[2] + cal[1][2]
    return tensor([c1, c2])
