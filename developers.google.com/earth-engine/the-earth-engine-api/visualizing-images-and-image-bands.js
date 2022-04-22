// Instantiate an image with the Image constructor.
var image = ee.Image('CGIAR/SRTM90_V4');

// Zoom to a location.
Map.setCenter(-112.8598, 36.2841, 9); // Center on the Grand Canyon

// Display the image on the map.
Map.addLayer(image);

print('SRTM image', image);

Map.addLayer(image, {min: 0, max: 3000}, 'custom visualization');

Map.addLayer(image, {min: 0, max: 3000, palette: ['blue', 'green', 'red']}, 'custom palette')
