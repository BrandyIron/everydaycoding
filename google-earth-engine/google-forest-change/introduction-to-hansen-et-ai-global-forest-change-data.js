var gfc2014 = ee.Image('UMD/hansen/global_forest_change_2015');
Map.addLayer(gfc2014);

Map.addLayer(gfc2014, {bands: ['treecover2000']}, 'treecover2000');

Map.addLayer(gfc2014, {bands: ['last_b50', 'last_b40', 'last_b30']}, 'false_color');

Map.addLayer(gfc2014, {bands: ['loss', 'treecover2000', 'gain']}, 'green');

Map.addLayer(gfc2014, {
  bands: ['loss', 'treecover2000', 'gain'],
  max: [1, 255, 1]
}, 'forest cover, loss, gain');

Map.addLayer(gfc2014, {
  bands: ['treecover2000'],
  palette: ['000000', '00FF00']
}, 'forest cover palette');

Map.addLayer(gfc2014, {
    bands: ['treecover2000'],
    palette: ['000000', '00FF00'],
    max: 100
}, 'forest cover percent');

Map.addLayer(gfc2014.mask(gfc2014), {
  bands: ['treecover2000'],
  palette: ['000000', '00FF00'],
  max: 100
}, 'forest cover masked');

var treeCover = gfc2014.select(['treecover2000']);
var lossImage = gfc2014.select(['loss']);
var gainImage = gfc2014.select(['gain']);

// Add the tree cover layer in green.
Map.addLayer(treeCover.updateMask(treeCover),
  {palette: ['000000', '00FF00'], max: 100}, 'Forest Cover');

// Add the loss layer in red.
Map.addLayer(lossImage.updateMask(lossImage),
  {palette: ['FF0000']}, 'Loss');

// Add the gain layer in blue.
Map.addLayer(gainImage.updateMask(gainImage),
  {palette: ['0000FF']}, 'Gain');