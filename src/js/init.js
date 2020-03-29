 // Initialize the plugin
const selectItems = document.querySelector('.select-items');
const ps = new PerfectScrollbar(selectItems);

var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [0, 50],
    connect: true,
    range: {
        'min': 0,
        'max': 100
    }
});
