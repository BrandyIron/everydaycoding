var loadedImage = ee.Image('JAXA/ALOS/AW3D30/V2_2');

var first = ee.ImageCollection('COPERNICS/S2_SR').filterBounds(ee.Geometry.Point(-70.48, 43.3631)).firstDate('2019-01-01', '2019-12-31').sort('CLOUDY_PIXEL_PERCENTAGE').first();
Map.centerObject(first, 11);
Map.addLayer(first, {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'first');

var uri = 'gs://gcp-public-data-landsat/LC08/01/001/002/' +
'LC08_L1GT_001002_20160817_20170322_01_T2/' +
'LC08_L1GT_001002_20160817_20170322_01_T2_B5.TIF';

var cloudImage = ee.Image.loadGeoTIFF(uri);
print(cloudImage);

// Create a constant image.
var image1 = ee.Image(1);
print(image1);

// Concatenate two images into one multi-band image.
var image2 = ee.Image(2);
var image3 = ee.Image.cat([image1, image2]);
print(image3);

// Create a multi-band image from a list of constants.
var multiband = ee.Image([1, 2, 3]);
print(multiband);

