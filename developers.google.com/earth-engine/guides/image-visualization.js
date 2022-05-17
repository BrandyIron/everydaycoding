// Load an image.
var image = ee.Image('LANDSAT/LC08/C02/T1_TOA/LC08_044034_20140318');

// Define the visualization parameters.
var vizParams = {
    bands: ['B5', 'B4', 'B3'],
    min: 0,
    max: 0.5,
    gamma: [0.95, 1.1, 1]
};

// Center the map and display the image.
Map.setCenter(-122.1899, 37.5010, 10);
Map.addLayer(image, vizParams, 'false color composite');

// Load an image.
var image = ee.Image('LANDSAT/LC08/C02/T1_TOA/LC08_044034_20140318');

// Create an NDWI image, define visualization parameters and display.
var ndwi = image.normalizeDifference(['B3', 'B5']);
var ndwiViz = {min: 0.5, max: 1, palette: ['00FFFF', '0000FF']};
Map.addLayer(ndwi, ndwiViz, 'NDWI', false);

// Mask the non-watery parts of the image, where NDWI < 0.4.
var ndwiMasked = ndwi.updateMask(ndwi.gte(0.4));
Map.addLayer(ndwiMasked, ndwiViz, 'NDWI masked');

// Create visualization layers.
var imageRGB = image.visualize({bands: ['B5', 'B4', 'B3'], max: 0.5});
var ndwiRGB = ndwiMasked.visualize({
    min: 0.5,
    max: 1,
    palette: ['00FFFF', '0000FF']
});

// Mosaic the visualization layers and dislay (or export).
var mosaic = ee.ImageCollection([imageRGB, ndwiRGB]).mosaic();
Map.addLayer(mosaic, {}, 'mosaic');

// Create a circle by drawing a 20000 meter buffer around a point.
var roi = ee.Geometry.Point([-122.4481, 37.7599]).buffer(20000);

// Display a clipped version of the mosaic.
Map.addLayer(mosaic.clip(roi), null, 'mosaic clipped');

// Load 2012 MODIS land cover and select the IGBP classification
var cover = ee.Image('MODIS/051/MCD12Q1/2012_01_01').select('Land_Cover_Type_1');

// Define a palette for the 18 distinct land cover classes.
var igbpPalette = [
    'aec3d4', // water
    '152106', '225129', '369b47', '30eb5b', '387242', // forest
    '6a2325', 'c3aa69', 'b76031', 'd9903d', '91af40',  // shrub, grass
    '111149', // wetlands
    'cdb33b', // croplands
    'cc0013', // urban
    '33280d', // crop mosaic
    'd7cdcc', // snow and ice
    'f7e084', // barren
    '6f6f6f'  // tundra
];

// Specify the min and max labels and the color palette matching the labels.
Map.setCenter(-99.229, 40.413, 5);
Map.addLayer(cover, {min: 0, max: 17, palette: igbpPalette}, 'IGBP classification');

var cover = ee.Image('MODIS/051/MCD12Q1/2012_01_01').select('Land_Cover_Type_1');

// Define an SLD style of discrete intervals to apply to the image.
var sld_intervals = 
'<RasterSymbolizer>' +
  '<ColorMap type="intervals" extended="false">' +
    '<ColorMapEntry color="#aec3d4" quantity="0" label="Water"/>' +
    '<ColorMapEntry color="#152106" quantity="1" label="Evergreen Needleleaf Forest"/>' +
    '<ColorMapEntry color="#225129" quantity="2" label="Evergreen Broadleaf Forest"/>' +
    '<ColorMapEntry color="#369b47" quantity="3" label="Deciduous Needleleaf Forest"/>' +
    '<ColorMapEntry color="#30eb5b" quantity="4" label="Deciduous Broadleaf Forest"/>' +
    '<ColorMapEntry color="#387242" quantity="5" label="Mixed Deciduous Forest"/>' +
    '<ColorMapEntry color="#6a2325" quantity="6" label="Closed Shrubland"/>' +
    '<ColorMapEntry color="#c3aa69" quantity="7" label="Open Shrubland"/>' +
    '<ColorMapEntry color="#b76031" quantity="8" label="Woody Savanna"/>' +
    '<ColorMapEntry color="#d9903d" quantity="9" label="Savanna"/>' +
    '<ColorMapEntry color="#91af40" quantity="10" label="Grassland"/>' +
    '<ColorMapEntry color="#111149" quantity="11" label="Permanent Wetland"/>' +
    '<ColorMapEntry color="#cdb33b" quantity="12" label="Cropland"/>' +
    '<ColorMapEntry color="#cc0013" quantity="13" label="Urban"/>' +
    '<ColorMapEntry color="#33280d" quantity="14" label="Crop, Natural Veg. Mosaic"/>' +
    '<ColorMapEntry color="#d7cdcc" quantity="15" label="Permanent Snow, Ice"/>' +
    '<ColorMapEntry color="#f7e084" quantity="16" label="Barren, Desert"/>' +
    '<ColorMapEntry color="#6f6f6f" quantity="17" label="Tundra"/>' +
  '</ColorMap>' +
'</RasterSymbolizer>';
Map.addLayer(cover.sldStyle(sld_intervals), {}, 'IGBP classfication styled');