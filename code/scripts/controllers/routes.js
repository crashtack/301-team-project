//first thing on page load, is to load data
page('/', mainController.loadInitialContent);
page('/list', listController.index, theMap.initAutocomplete);
page('/information/:id', infoController.index, theMap.initAutocomplete);

page();
