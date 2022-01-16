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