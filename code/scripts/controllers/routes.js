//first thing on page load, is to load data
page('/', mainController.loadInitialContent);
page('/list', listController.index);
page('/info/:id', infoController.index);

page();
