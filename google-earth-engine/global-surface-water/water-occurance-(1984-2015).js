var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurance = gsw.select('occurance');
Map.addLayer(occurance);