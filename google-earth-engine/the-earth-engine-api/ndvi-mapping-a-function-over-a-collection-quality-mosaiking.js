// Define a point of interest. Use the UI Drawing Tools to import a point
// geometry and name it "point" or set the point coordinate with the 
// ee.Geometry.Point() function as demonstrated here.
var point = ee.Geometry.Point([-122, 37]);

// Import the Landsat 8 TOA image collection.
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');

// Get the least cloudy image in 2015.
var image = ee.Image(
  l8.filterBounds(point)
  .filterDate('2015-01-01', '2015-12-31')
  .sort('CLOUD-COVER')
  .first()
  );

// Compute the Normalized Difference Vegetation Index (NDVI).
var nir = image.select('B5');
var red = image.select('B4');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');

var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');

// Display the result.
Map.centerObject(image, 9);
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, ndviParams, 'NDVI Image');

var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};

// Test the addNDVI function on a single image.
var ndvi = addNDVI(image).select('NDVI');

var withNDVI = l8.map(addNDVI);

// Make a "greenest" pixel composite.
var greenest = withNDVI.qualityMosaic('NDVI');

// Display the result.
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
Map.addLayer(greenest, visParams, 'Greenest pixel composite');


