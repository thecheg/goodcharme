/*
 * Menu
*/
app.menu = {
	// * Bind
	bind() {
		let _this = this;
		// * Click on burger
		$(document).on('click', '.ui-toggle', function () {
			!app.settings.menuOpened ? _this.open() : _this.close();
		});
	},

	// * Open menu
	open() {
		$('.app').addClass('app--menu');

		$('.search').removeClass('active');

		if (app.matches('max-width:1023px')) {
			app.scrollLock();
		}

		app.settings.menuOpened = true;
	},
	
	// * Close menu
	close() {
		$('.app').removeClass('app--menu');
		app.scrollLock('unlock');

		app.settings.menuOpened = false;
	}
}