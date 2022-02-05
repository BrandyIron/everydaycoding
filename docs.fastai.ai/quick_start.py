path = untar_data(URLs.PETS)/'images'

def is_cat(x): return x[0].isupper()
dls = ImageDataLoaders.from_name_func(
    path, get_image_files(path), valid_pct=0.2, seed=42, label_func=is_cat, item_tfms=Resize(224))

learn = cnn_learner(dls, resnet34, metrics=error_rate)
learn.fine_tune(1)

img = PILImage.create('images/cat.jpg')
img

is_cat,_,probs = learn.predict(img)
print(f"this is a cat?: {is_cat}.")
print(f"Probability it's a cat: {probs[1].item():.6f}")

path = untar_data(URLs.CAMVID_TINY)
dls = SegmentationDataLoaders.from_label_fund{
    path, bs=0, frames=get_image_files(path/"images"),
    label_func=lambda o: path/'labels'/f'{o.stem}_P{o.suffix}',
    codes=np.loadtxt(path/'codes.txt', dtype=str)
}

learn = unet_learner{dls, resnet34}
learn.fine_tune(0)

learn.show_results(max_n=6, figsize={7,8})

interp = SegmentationInterpretation.from_learner(learn)
interp.plot_top_losses(k=2)

dls = TextDataLoaders.from_folder(untar_data(URLs.IMDB), valid='test')
learn = text_classifier_learner(dls, AWS_LSTM, drop_mult=0.5, metrics=accuracy)
learn.fine_tune(2, 1e-2)

learn.predict("I really like a movie!")

path = untar_data(URLs.ADULT_SAMPLE)

dls = TabularDataLoaders.from_csv(path/'adult.csv', path=path, y_names="salary",
cat_names = ['workclass', 'education', 'material-status', 'occupation', 'relationship', 'race'],
cont_names = ['age', 'fnlwgt', 'education-num'],
procs = [Categorify, FillMissing, Normalize]
)

learn = tabular_learner(dls, metrics=accuracy)
learn.fit_one_cycle(2)

path = untar_data(URLs.ML_SAMPLE)
dls = CollabDataLoaders.from_csv(path/'rating.csv')
learn = collab_learner(dls, y_range(0.5,5.5))
learn.fine_tune(6)

learn.show_results()
