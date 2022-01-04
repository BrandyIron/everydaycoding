
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.5};

var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var landsat2016 = l8.filterDate('2016-01-01', '2016-12-31');
Map.addLayer(landsat2016, visParams, 'l8 collection');

// Get the median over time, in each band, in each pixel.
var median = l8.filterDate('2016-01-01', '2016-12-31').median();

// Make a handy variable of visualization parameters.
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};

// Display the median composite.
Map.addLayer(median, visParams, 'median');

