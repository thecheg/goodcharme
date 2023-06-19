/*
 * Animations on scroll
*/
app.onscroll = (block) => {
	let thres = +block.attr('data-onscroll-t') || 0.25;

	new IntersectionObserver(([el]) => {
		if (el.isIntersecting && !$(el).hasClass('onscroll--in') && app.settings.appLoaded) {
			setTimeout(function() {
				$(el.target).addClass('onscroll--in').trigger('onscroll.in');
			},300);

			return;
		}
	}, {
		root: document,
		rootMargin: '0px 0px',
		threshold: app.matches('min-width:600px') ? thres : 0,
	}).observe(block.get(0));
	
	block.data('onscrollInit', true);
}