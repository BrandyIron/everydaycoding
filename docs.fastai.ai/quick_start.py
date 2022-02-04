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
