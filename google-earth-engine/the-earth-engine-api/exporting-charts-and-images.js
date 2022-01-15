// Import the Landsat 8 TOA image collection.
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');

// Map a function over the Landsat 8 TOA collection to add and NDVI band.
var withNDVI = l8.map(function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
});

// Create a chart.
var chart = ui.Chart.image.series({
  imageCollection: withNDVI.select('NDVI'),
  region: roi,
  reducer: ee.Reducer.first(),
  scale: 30
}).setOptions({title: 'NDVI over time'});

// Display the chart in the console.
print(chart);

var cloudlessNDVI = l8.map(function(image) {
  // Get a cloud score in [0, 100].
  var cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  
  // Create a mask of cloudy pixels from an arbitrary threshold.
  var mask = cloud.lte(20);
  
  // Compute NDVI.
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  
  // Return the masked image with and NDVI band.
  return image.addBands(ndvi).updateMask(mask);
});

print(ui.Chart.image.series({
  imageCollection: cloudlessNDVI.select('NDVI'),
  region: roi,
  reducer: ee.Reducer.first(),
  scale: 30
}).setOptions({title: 'Cloud-masked NDVI over time'}));

var greenset = cloudlessNDVI.qualityMosaic('NDVI');

// Create a 3-band, 8-bit, color-IR composite to export.
var visualization = greenest.visualize({
  bands: ['B5', 'B4', 'B3'],
  max: 0.4
});

// Create a task that you can launch from the Task tab.
Export.image.toDrive({
  image: visualization,
  description: 'Greenest_pixel_composite',
  scale: 30
});