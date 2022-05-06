// Load an image.
var image = ee.Image('LANDSAT/LC08/C02/T1_TOA/LC08_044034_20140318');

// Define the visualization parameters.
var vizParams = {
    bands: ['B5', 'B4', 'B3'],
    min: 0,
    max: 0.5,
    gamma: [0.95, 1.1, 1]
};