/*
 * Scroll lock
*/
app.scrollLock = (type) => {
	if (type == 'unlock') { // * unlock
		app.deviceIs.ios ? $(window).scrollTop(app.settings.scrollLockPos) : null;

		$('.app').removeClass('app--fixed');

		if (window.Lenis && typeof window.Lenis == 'function' && app.scroll.inited) {
			app.scroll.lenis.start();
		}
	} else { // * lock
		app.settings.scrollLockPos = $(window).scrollTop();

		$('.app').addClass('app--fixed');

		if (window.Lenis && typeof window.Lenis == 'function' && app.scroll.inited) {
			app.scroll.lenis.stop();
		}
	}
}