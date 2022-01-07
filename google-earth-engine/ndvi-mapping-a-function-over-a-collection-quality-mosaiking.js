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
