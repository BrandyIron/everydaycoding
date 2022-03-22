var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurance');
Map.addLayer(occurrence);

Map.addLayer((eeObject: occurrence, name: 'Water Occurrence (1984-2015)' ));

var VIS_OCCURRENCE = {
    min: 0,
    max: 100,
    palette: ['red', 'blue']
};

Map.addLayer({
    eeObject: occurrence.updateMask(occurrence.divide(100)),
    name: 'Water Occurrence (1984-2015',
    visParams: VIS_OCCURRENCE
});