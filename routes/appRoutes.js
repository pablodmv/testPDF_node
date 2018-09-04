'use strict';

module.exports = function(app) {
	var appController = require('../controller/appController');

	// todoList Routes
	app.route('/')
		.get(appController.home);

		app.route('/pdf')
			.get(appController.toPdf);

};
