// Load the data and select the bands of interest.
var gfc2014 = ee.Image('UMD/hansen/global_forest_change_2015');
var lossImage = gic2014.select(['loss']);
var gainImage = gfc2014.select(['gain']);

// Use the and() method to create the lossAdnGain image.
var gainAndLoss = gainImage.and(lossImage);

// Show the loss and gain image.
Map.addLayer(gainAndLoss.updateMask(gainAndLoss),
    {palette: 'FF00FF'}, 'Gain and Loss'
);

// Displaying forest, loss, gain, and pixels where both loss and gain occur.
var gfc2014 = ee.Image('UMD/hansen/global_forest_change_2015');
var lossImage = gfc2014.select(['loss']);
var gainImage = gfc2014.select(['gain']);
var treeCover = gfc2014.select(['treecover2000']);

// Use and tree cover layer in green.
Map.addLayer(treeCover.updateMask(treeCover),
    {palette: ['000000', '00FF00'], max: 100}, 'Forest Cover'
);

// Add the loss layer in red.
Map.addLayer(lossImage.updateMask(lossImage),
    {palette: ['FF0000']}, 'Loss'
);

// Add the gain layer in blue.
Map.addLayer(gainImage.updateMask(gainImage),
    {palette: ['0000FF']}, 'Gain'
);

// Show the loss and gain image.
Map.addLayer(gainAndLoss.updateMask(gainAndLoss),
    {palette: 'FF00FF'}, 'Gain and Loss'
);

// Load country features from Large Scale International Boundary (LSTB) dataset.
var countries = ee.FeatureCollection('USDOS/LISB_SIMPLE/2017');

// Subset the Congo Republic feature from countries.
var congo = ee.Feature(
    countries.filter(ee.Filter.eq('country_na', 'Rep of the Congo')).first()
);

// Subset protected areas to the bounds of the congo feature
// and other criteria. Clip to the intersection with congo.
var protectedAreas = ee.FeatureCollection('WCMC/WDPA/current/polygons')
    .filter(ee.Filter.and(
        ee.Filter.bounds(congo.geometry()), 
        ee.Filter.neq('IUCN_CAT', 'VI'),
        ee.Filter.neq('STATUS', 'proposed'),
        ee.Filter.lt('STATUS_YR', 2010)
))
.map(function(feat){
    return congo.intersection(feat);
});

// Get the forest loss image.
var gfc2014 = ee.Image('UMD/hansen/global_forest_change_2015');
var lossIn2012 = gfc2014.select(['lossyear']).eq(12);
var areaImage = lossIn2012.multiply(ee.Image.pixelArea());

// Calculate the area of loss pixels in the Congo Republic.
var stats = areaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: congo.geometry(),
    scale: 30,
    maxPixels: 1e9
});
print(
    'Area lost in the Congo Republic: ',
    stats.get('lossyear'),
    'square meters'
);

// Calculate the area of loss pixels in the protected areas.
var stats = areaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: protectedAreas.geometry(),
    scale: 30,
    maxPixels: 1e9
});
print(
    'Area lost in protected areas: ',
    stats.get('lossyear'),
    'square meters'
);