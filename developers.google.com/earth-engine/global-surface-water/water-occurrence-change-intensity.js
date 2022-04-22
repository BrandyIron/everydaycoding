var change = gsw.select("change_abs");

var VIS_CHANGE = {
    min: -50,
    max: 50,
    palette: ['red', 'black', 'limegreen']
};

Map.setCenter(-74.4557, -8.4289, 11);  // Ucayali River, Peru)
Map.addLayer({
    eeObject: change,
    visParams: VIS_CHANGE,
    name: 'occurrence change intensity'
});

