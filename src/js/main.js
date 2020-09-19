window.addEventListener('DOMContentLoaded', function() {
    const tabs = require('./modules/tabs'),
          modal = require('./modules/modal'),
          timer = require('./modules/timer'),
          cards = require('./modules/cards'),
          calc = require('./modules/calcCall'),
          forms = require('./modules/forms'),
          slider = require('./modules/slider-carousel');

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slider();
});
