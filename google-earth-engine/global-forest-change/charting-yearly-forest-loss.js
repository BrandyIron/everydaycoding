// Load country boundaries from LSIB.
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
// Get a feature collection with just the Congo feature.
var congo = countries.filter(ee.Filter.eq('country_go', 'CF'));

// Get the loss image.
// This dataset is updated uearly, so we get the latest version.
var gfc2017 = ee.Image('UMD/hansen/global_forest_change_2017_v1_5');
var lossImage = gfc2017.select(['loss']);
var lossAreaImage = lossImage.multiply(ee.Image.pixelArea());

var lossYear = gfc2017.select(['lossyear']);
var lossByYear = lossAreaImage.addBands(lossYear).reduceRegion({
    reducer: ee.Reducer.sum().group({
        groupField: 1
    }),
    geometry: congo,
    scale: 30,
    maxPixels: 1e9
});
print(lossByYear);