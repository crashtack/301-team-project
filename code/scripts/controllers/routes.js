//first thing on page load, is to load data
page('/', mainController.loadInitialContent);
page('/list', listController.index, permitLocations.permitsNearLocation, listView.showTenPermits);
page('/information/:id', infoController.index);

page();
