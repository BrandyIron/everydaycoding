var loadedImage = ee.Image('JAXA/ALOS/AW3D30/V2_2');

var first = ee.ImageCollection('COPERNICS/S2_SR').filterBounds(ee.Geometry.Point(-70.48, 43.3631)).firstDate('2019-01-01', '2019-12-31').sort('CLOUDY_PIXEL_PERCENTAGE').first();
Map.centerObject(first, 11);
Map.addLayer(first, {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'first');
