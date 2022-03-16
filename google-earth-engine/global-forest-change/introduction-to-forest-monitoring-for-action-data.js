// Converting dates from milliseconds to seconds.
var start = ee.Date('2012-01-01').millis().divide(1000);
var end = ee.Date('2013-01-01').millis().divide(1000);

// Load the FORMA 500 dataset.
var forma = ee.Image('FORMA/FORMA_500m');

// Create a binary layer from the dates of interest
var forma2012 = forma.gte(start).and(forma.lte(end));

Map.setCenter(15.87, -0.391, 7);
Map.addLayer(
    forma2012.mask(forma2012),
    {palette: ['FF0000']},
    'FORMA alerts in 2012'
);