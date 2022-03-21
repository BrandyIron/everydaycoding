var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurance');
Map.addLayer(occurrence);

Map.addLayer((eeObject: occurrence, name: 'Water Occurrence (1984-2015)' ));