/*
 * Lenis scroll
*/
app.scroll = {
	lenis: {},
	inited: false,
	init() {
		let _this = this;

		_this.lenis = new Lenis({
			lerp:0.02
		});

		_this.lenis.on('scroll', (e) => {
			if (window.ScrollTrigger && typeof window.ScrollTrigger == 'function') {
				ScrollTrigger.update();
			}
		});
		function raf(time) {
			_this.lenis.raf(time)
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		if (window.gsap && typeof window.gsap == 'object') {
			gsap.ticker.add((time)=>{
				_this.lenis.raf(time * 1000);
			});
		}

		_this.inited = true;
	},
}