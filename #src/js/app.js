'use strict';

//=include ../../node_modules/jquery/dist/jquery.js
//=include ../../node_modules/device.js/dist/device.umd.js

//=include ../../node_modules/swiper/swiper-bundle.js

//=include ../../node_modules/jquery-form-styler/dist/jquery.formstyler.js

//=include ../modules/scroll-into-view-if-needed/functions.js

//=include ../modules/fancybox/fancybox.js

/*! jquery.cookie v1.4.1 | MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?a(require("jquery")):a(jQuery)}(function(a){function b(a){return h.raw?a:encodeURIComponent(a)}function c(a){return h.raw?a:decodeURIComponent(a)}function d(a){return b(h.json?JSON.stringify(a):String(a))}function e(a){0===a.indexOf('"')&&(a=a.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return a=decodeURIComponent(a.replace(g," ")),h.json?JSON.parse(a):a}catch(b){}}function f(b,c){var d=h.raw?b:e(b);return a.isFunction(c)?c(d):d}var g=/\+/g,h=a.cookie=function(e,g,i){if(void 0!==g&&!a.isFunction(g)){if(i=a.extend({},h.defaults,i),"number"==typeof i.expires){var j=i.expires,k=i.expires=new Date;k.setTime(+k+864e5*j)}return document.cookie=[b(e),"=",d(g),i.expires?"; expires="+i.expires.toUTCString():"",i.path?"; path="+i.path:"",i.domain?"; domain="+i.domain:"",i.secure?"; secure":""].join("")}for(var l=e?void 0:{},m=document.cookie?document.cookie.split("; "):[],n=0,o=m.length;o>n;n++){var p=m[n].split("="),q=c(p.shift()),r=p.join("=");if(e&&e===q){l=f(r,g);break}e||void 0===(r=f(r))||(l[q]=r)}return l};h.defaults={},a.removeCookie=function(b,c){return void 0===a.cookie(b)?!1:(a.cookie(b,"",a.extend({},c,{expires:-1})),!a.cookie(b))}});

/*
 * Cheg UI 3.0.0
*/
const app = {
	settings: {
		winWidth: 0,
		winHeight: 0,

		sbWidth: 0,

		scrollOffset: function() {
			return $('.header').outerHeight();
		},
		scrollPos: 0,
		popupOpened: false,
		scrollLockPos: 0,

		animDuration: 400,

		appLoaded: false,

		menuOpened: false,
	},
	deviceIs: device.device,

	/*
	 * Checking if matches media query
	*/
	matches(query) {
		return window.matchMedia(`(${query})`).matches
	},

	/*
	 * Scroll to hash on page laod
	*/
	toHash() {
		if (window.location.hash) {
			app.scrollTo(window.location.hash, {
				offset: app.settings.scrollOffset()
			});

			window.location.hash = '';
		}
	},

	/*
	 * Back/Forward
	*/
	history: {
		back() {

		},
		forward() {

		},
	},

	/*
	 * Intro
	*/
	intro(block) {
		let slider = block.find('.intro__slider'),
			sliderS,
			opts = {
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 500,
				// autoplay: {
				// 	delay:5000,
				// 	disableOnInteraction: false
				// },
				loop: true,
				parallax:true,
				init: true,
				grabCursor:true,
				pagination: {
					el: block.find('.ui-dots').get(0),
					clickable: true,
					bulletActiveClass: 'active',
					renderBullet: function(i, className) {
						return '<button class="ui-dots__item ' + className + '" type="button"></button>';
					}
				}
			};

		sliderS = new Swiper(slider.get(0), opts);

		block.data('introInit', true);
	},

	/*
	 * Try
	*/
	try(block) {
		let slider = block.find('.try__slider'),
			sliderS,
			opts = {
				slidesPerView: 1,
				spaceBetween: 30,
				speed: 500,
				loop: true,
				init: true,
				grabCursor:true,
				navigation: {
					nextEl: block.find('.ui-nav__item--n').get(0),
					prevEl: block.find('.ui-nav__item--p').get(0),
				},
				breakpoints: {
					1: {
						spaceBetween: 15,
						slidesPerView: 2,
					},
					400: {
						spaceBetween: 20,
						slidesPerView: 2,
					},
					768: {
						spaceBetween: 20,
						slidesPerView: 3,
					},
					1024: {
						spaceBetween: 20,
						slidesPerView: 4,
					},
					1280: {
						spaceBetween: 30,
						slidesPerView: 4,
					}
				}
			};

		sliderS = new Swiper(slider.get(0), opts);

		block.data('tryInit', true);
	},

	/*
	 * Catalog
	*/
	catalog(block) {
		let items = block.find('.catalog__list-item');

		items.on('mouseenter', function() {
			block.addClass('hover');
			$(this).addClass('hover');
		}).on('mouseleave', () => {
			block.removeClass('hover');
			items.removeClass('hover');
		});

		block.data('catalogInit', true);
	},

	/*
	 * Product
	*/
	product: {
		init(block) {
			let _this = this;

			_this.main(block);

			block.find('.product__gallery').each(function() {
				_this.gallery($(this));
			});

			block.data('productInit', true);
		},
		main(block) {
			let imgs = block.find('.product__imgs-item');

			imgs.each(function(i) {
				$(this).attr('id', 'img' + i);
				block.find('.product__vdots-in').append(`
					<button class="ui-dots__item" data-prod-scroll="#img${i}"></button>
				`);
			});

			let vDots = block.find('[data-prod-scroll]'),
				vDotsScr = false;

			vDots.on('click', function() {
				vDotsScr = true;

				let off = block.find('.product__back').outerHeight();

				vDots.removeClass('active');
				$(this).addClass('active');

				app.scrollTo($(this).attr('data-prod-scroll'), {
					offset: app.settings.scrollOffset() + off - 2
				});

				setTimeout(function() {
					vDotsScr = false;
				}, 1100);
			});

			$(window).on('scroll', function() {
				if (app.matches('min-width:600px') && !vDotsScr) {
					imgs.each(function() {
						let img = $(this),
							pos = img.offset().top;

						if (($(window).scrollTop() + $(window).height() * .5) > pos) {
							vDots.removeClass('active');

							block.find(`[data-prod-scroll="#${img.attr('id')}"`).addClass('active');
						}
					});
				}
			});

			let slider = block.find('.product__imgs'),
				sliderS,
				opts = {
					slidesPerView: 1,
					spaceBetween: 20,
					speed: 500,
					loop: true,
					autoHeight:true,
					init: true,
					grabCursor:true,
					pagination: {
						el: block.find('.product__hdots .ui-dots').get(0),
						clickable: true,
						bulletActiveClass: 'active',
						renderBullet: (i, className) => {
							return '<button class="ui-dots__item ' + className + '" type="button"></button>';
						}
					}
				},
				inited = false;

			$(window).on('resize', () => {
				if (app.matches('min-width:600px')) {
					if (inited) {
						sliderS.destroy(true);
	
						block.find('.product__imgs-list').removeClass('swiper-wrapper');
						block.find('.product__imgs-item').removeClass('swiper-slide');
	
						inited = false;
					}
				} else {
					if (!inited) {
						block.find('.product__imgs-list').addClass('swiper-wrapper');
						block.find('.product__imgs-item').addClass('swiper-slide');
		
						sliderS = new Swiper(slider.get(0), opts);
	
						inited = true;
					}
				}
			}).trigger('resize');
		},
		gallery(block) {
			let slider = block.find('.product__gallery-slider'),
				sliderS,
				opts = {
					slidesPerView: 1,
					spaceBetween: 0,
					speed: 500,
					loop: true,
					autoHeight:true,
					init: true,
					grabCursor:true,
					pagination: {
						el: block.find('.ui-dots').get(0),
						clickable: true,
						bulletActiveClass: 'active',
						renderBullet: (i, className) => {
							return '<button class="ui-dots__item ' + className + '" type="button"></button>';
						}
					}
				};

			sliderS = new Swiper(slider.get(0), opts);
		},
		review(rev) {
			let text = rev.find('.product__review-text'),
				more = rev.find('.product__review-more a');

			more.on('click', () => {
				rev.addClass('full');
			});

			$(window).on('resize', () => {
				if (!rev.hasClass('full')) {
					let css = window.getComputedStyle(text.get(0)),
						lines = +css.getPropertyValue('--lines'),
						lh = parseInt(css.getPropertyValue('line-height'));
	
					rev.addClass('sizing');
	
					if (text.outerHeight() > lines * lh) {
						rev.addClass('cut');
					} else {
						rev.removeClass('cut');
					}
	
					rev.removeClass('sizing');
				}
			});

			rev.data('reviewInit', true);
		}
	},

	/*
	 * Custom select
	*/
	select(block) {
		let sel = block.find('select');

		sel.styler({

		});
	},

	/*
	 * Category
	*/
	category(block) {
		let slider = block.find('.category__products-slider'),
			sliderS,
			opts = {
				slidesPerView: 1,
				spaceBetween: 0,
				speed: 500,
				loop: true,
				parallax:true,
				init: true,
				grabCursor:true,
				pagination: {
					el: block.find('.ui-dots').get(0),
					clickable: true,
					bulletActiveClass: 'active',
					renderBullet: function(i, className) {
						return '<button class="ui-dots__item ' + className + '" type="button"></button>';
					}
				}
			};

		sliderS = new Swiper(slider.get(0), opts);

		block.data('categoryInit', true);
	},

	/*
	 * Buy
	*/
	buy(block) {
		let list = block.find('.buy__list'),
			map,
			inp = block.find('.buy__search input');

		$.each(buy, function(i) {
			let item = buy[i];

			list.append(`
				<div class="ui-grid__col buy__item" data-item="${i}">
					<div class="buy__item-name">
						${item.name}
					</div>
					<div class="buy__item-text">
						${item.text}
					</div>
				</div>
			`);
		});

		let items = block.find('.buy__item');

		items.on('click', function() {
			block.trigger('centerItem', [+$(this).attr('data-item')]);
		});

		inp.on('change input keyup paste', function() {
			let val = $(this).val().trim().toLowerCase();

			if (val && val !== '') {
				items.each(function(i) {
					let text = $(this).find('.buy__item-text').text().toLowerCase();
	
					if (!text.includes(val)) {
						$(this).addClass('hide');
					} else {
						$(this).removeClass('hide');
					}
				});
			} else {
				items.removeClass('hide');
				list.scrollTop(0);
			}
		});

		block.on('centerItem', (e, id) => {
			items.removeClass('active');

			block.find(`.buy__item[data-item="${id}"]`).addClass('active').get(0).scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'start'
			});
		});
		
		let moveMap = () => {
			var moveX = app.matches('min-width:768px') ? 200 : 0
			
			var pixelCenter = map.getGlobalPixelCenter();

			pixelCenter = [
				pixelCenter[0] - moveX,
				pixelCenter[1]
			];

			var geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());

			// var geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());

			map.setCenter(geoCenter);
		}

		ymaps.ready(function() {
			map = new ymaps.Map(block.find('.buy__map').attr('id'), {
				center: buy[0].coords,
				zoom: 16,
				controls: ['zoomControl', 'typeSelector', 'fullscreenControl', 'routeButtonControl']
			});
	
			$.each(buy,function(i) {
				var item = buy[i];
	
				var mapPlacemark = new ymaps.Placemark(item.coords, {
					hintContent:`
						<div class="buy__map-hint">
							<div>${item.text}</div>
						</div>
					`
				}, {
					preset: 'islands#darkOrangeCircleDotIcon',
					iconColor: '#000'
				});

				mapPlacemark.events.add('click', function (e) {
					block.trigger('centerItem', [i]);
				});

				block.on('centerItem', (e, id) => {
					if (id == i) {
						mapPlacemark.options.set({
							iconColor: '#E29B4E'
						});
					} else {
						mapPlacemark.options.set({
							iconColor: '#000'
						});
					}
				});
	
				map.geoObjects.add(mapPlacemark);
			});
	
			map.controls.add(new ymaps.control.ZoomControl({
				options: {
					position: {
						left:'auto',
						right:20,
						top: 60,
					},
					adjustMapMargin: true
				}
			}));
			//map.behaviors.disable('scrollZoom');
	
			if (buy.length > 1) {
				map.setBounds(map.geoObjects.getBounds());
				map.setZoom(map.getZoom()-1);
			}

			moveMap();

			block.on('centerItem', (e, id) => {
				map.setCenter(buy[id].coords, 17);

				moveMap();
			});
		});

		block.data('buyInit', true);
	},

	lang: {
		yatranslate: {
			/* Original language */
			lang: 'ru',
			/* The language we translate into on the first visit */
			/* Язык, на который переводим при первом посещении */
			// langFirstVisit: 'ru',
		},
		init() {
			let _this = this;

			if (_this.yatranslate.langFirstVisit && !localStorage.getItem('yt-widget')) {
				/* Если установлен язык перевода для первого посещения и в localStorage нет yt-widget */
				/* If the translation language is installed for the first visit and in localStorage no yt-widget */
				_this.setLang(_this.yatranslate.langFirstVisit);
			}
		
			// Подключаем виджет yandex translate
			// Connecting the yandex translate widget
			let script = document.createElement('script');
			script.src = `https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=${_this.yatranslate.lang}&widgetTheme=light&autoMode=false`;
			document.getElementsByTagName('head')[0].appendChild(script);
		
			// Получаем и записываем язык на который переводим
			// We get and write down the language into which we translate
			let code = _this.getCode();
		
			// Показываем текущий язык в меню
			// Show the current language in the menu
			_this.htmlHandler(code);
		
			// Вешаем событие клик на флаги
			// We hang the event click on the flags
			_this.eventHandler('click', 'a[data-lang]', function (el) {
				_this.setLang(el.getAttribute('data-lang'));
				// Перезагружаем страницу
				// Reloading the page
				window.location.reload();
			});

			$('.header__lang-trigger').on('click', function() {
				$(this).closest('.header__lang').toggleClass('active');
			});

			$(document).on('click', (e) => {
				if (!$(e.target).closest('.header__lang').length) {
					$('.header__lang').removeClass('active');
				}
			});
		},

		setLang(lang) {
			// Записываем выбранный язык в localStorage объект yt-widget 
			// Writing the selected language to localStorage 
			localStorage.setItem('yt-widget', JSON.stringify({
				"lang": lang,
				"active": true
			}));
		},

		getCode() {
			let _this = this;
			// Возвращаем язык на который переводим
			// Returning the language to which we are translating
			return (localStorage["yt-widget"] != undefined && JSON.parse(localStorage["yt-widget"]).lang != undefined) ? JSON.parse(localStorage["yt-widget"]).lang : _this.yatranslate.lang;
		},

		htmlHandler(code) {
			// Получаем язык на который переводим и производим необходимые манипуляции с DOM
			// We get the language to which we translate and produce the necessary manipulations with DOM 
			let el = $(`.header__lang-item[data-lang="${code}"]`);

			$('.header__lang-trigger .header__lang-item').html(el.text());

			el.addClass('active');
		},

		eventHandler(event, selector, handler) {
			document.addEventListener(event, function (e) {
				let el = e.target.closest(selector);
				if (el) handler(el);
			});
		},

		googleTranslateConfig: {
			/* Original language */
			lang: "ru",

			/* The language we translate into on the first visit*/
			/* Язык, на который переводим при первом посещении */
			/* langFirstVisit: 'en', */

			/* Если скрипт не работает или работает неправильно, раскомментируйте и укажите основной домен в свойстве domain */
			/* If the script does not work or does not work correctly, uncomment and specify the main domain in the domain property */
			/* domain: "Get-Web.Site" */
		},

		TranslateWidgetIsLoaded() {
			let _this = this;
			_this.TranslateInit(_this.googleTranslateConfig)
		},

		googleTranslateLoad() {
			// let _this = this;

			// /* Подключаем виджет google translate */
			// /* Connecting the google translate widget */
			// let script = document.createElement('script');
			// script.src = `//translate.google.com/translate_a/element.js?cb=app.lang.TranslateInit(app.lang.googleTranslateConfig)`;
			// document.getElementsByTagName('head')[0].appendChild(script);

			// script.onload = () => {
			// 	console.log('loaded');
			// 	_this.TranslateInit(_this.googleTranslateConfig);
			// }
		},

		TranslateInit(config) {
			let _this = this;

			if (config.langFirstVisit && !$.cookie("googtrans")) {
				/* Если установлен язык перевода для первого посещения и куки не назначены */
				/* If the translation language is installed for the first visit and cookies are not assigned */
				_this.TranslateCookieHandler('/auto/' + config.langFirstVisit);
			}
		
			let code = _this.TranslateGetCode(config);
		
			_this.TranslateHtmlHandler(code);
		
			if (code == config.lang) {
				/* Если язык по умолчанию, совпадает с языком на который переводим, то очищаем куки */
				/* If the default language is the same as the language we are translating into, then we clear the cookies */
				_this.TranslateCookieHandler(null, config.domain);
			}
		
			/* Инициализируем виджет с языком по умолчанию */
			/* Initialize the widget with the default language */
			new google.translate.TranslateElement({
				pageLanguage: config.lang,
				multilanguagePage: true, // Your page contains content in more than one languages
			}, 'google_translate_element');
		
			/* Вешаем событие  клик на флаги */
			/* Assigning a handler to the flags */
			$('[data-lang]').on('click', function () {
				_this.TranslateCookieHandler(
					'/auto/' + $(this).attr('data-lang'),
					config.domain
				);
				/* Перезагружаем страницу */
				/* Reloading the page */
				window.location.reload();
			});

			$('.header__lang-trigger').on('click', function() {
				$(this).closest('.header__lang').toggleClass('active');
			});
		},

		TranslateGetCode(config) {
			let _this = this;
			/* Если куки нет, то передаем дефолтный язык */
			/* If there are no cookies, then we pass the default language */
			let lang =
				$.cookie("googtrans") != undefined && $.cookie("googtrans") != "null"
					? $.cookie("googtrans")
					: config.lang;
			return lang.match(/(?!^\/)[^\/]*$/gm)[0];
		},

		TranslateCookieHandler(val, domain) {
			let _this = this;
			
			/* Записываем куки /язык_который_переводим/язык_на_который_переводим */
			/* Writing down cookies /language_for_translation/the_language_we_are_translating_into */
			$.cookie('googtrans', val, {
				domain: document.domain,
				path: '/'
			});
			$.cookie('googtrans', val, {
				domain: "." + document.domain,
				path: '/'
			});
		
			if (domain == 'undefined') return;
			/* записываем куки для домена, если он назначен в конфиге */
			/* Writing down cookies for the domain, if it is assigned in the config */
			$.cookie('googtrans', val, {
				domain: domain,
				path: '/'
			});
		
			$.cookie('googtrans', val, {
				domain: "." + domain,
				path: '/'
			});
		},

		TranslateHtmlHandler(code) {
			let _this = this;
			
			/* Получаем язык на который переводим и производим необходимые манипуляции с DOM */
			/* We get the language to which we translate and produce the necessary manipulations with DOM */
			$('[data-lang="' + code + '"]').addClass('active');
		}
	}
};
	
//=include ../modules/cheg.units/functions.js

//=include ../modules/cheg.scrollto/functions.js

//=include ../modules/cheg.tabs/functions.js
//=include ../modules/cheg.accordions/functions.js

//=include ../modules/cheg.scrolllock/functions.js
//=include ../modules/cheg.popups/functions.js

//=include ../modules/cheg.menu/functions.js

//=include ../modules/cheg.waypoint/functions.js

//=include ../modules/cheg.checkwebp/functions.js

/*
 * Init
*/
app.init = () => {
	// * Units
	app.units.all();

	// * Tabs
	$('.ui-tabs').not('.custom').each(function () {
		if (!$(this).data('tabsInit')) {
			app.tabs.init($(this));
		}
	});
	app.tabs.bind();

	// * Popups
	$('.popup').each(function () {
		if (!$(this).data('popupsInit')) {
			app.popups.init($(this));
		}
	});
	app.popups.bind();

	// * Intro
	$('.intro').each(function () {
		if (!$(this).data('introInit')) {
			app.intro($(this));
		}
	});

	// * Try
	$('.try').each(function () {
		if (!$(this).data('tryInit')) {
			app.try($(this));
		}
	});

	// * Category
	$('.category__item').each(function () {
		if (!$(this).data('categoryInit')) {
			app.category($(this));
		}
	});

	// * Buy
	$('.buy__block').each(function () {
		if (!$(this).data('buyInit')) {
			app.buy($(this));
		}
	});

	// * Catalog
	$('.catalog__list').each(function () {
		if (!$(this).data('catalogInit')) {
			app.catalog($(this));
		}
	});

	// * Product
	$('.product').each(function () {
		if (!$(this).data('productInit')) {
			app.product.init($(this));
		}
	});

	// * Product reviews
	$('.product__review').each(function () {
		if (!$(this).data('reviewInit')) {
			app.product.review($(this));
		}
	});

	// * Custom select
	$('.ui-select').each(function () {
		if (!$(this).data('selectInit')) {
			app.select($(this));
		}
	});
}

app.deviceIs.addClasses(document.documentElement);

$.fancybox.defaults.backFocus = false;
$.fancybox.defaults.hash = false;
$.fancybox.defaults.beforeShow = () => {
	app.scrollLock();
};
$.fancybox.defaults.afterClose = () => {
	app.scrollLock('unlock');
};

(function () {
	app.deviceIs.touch ? $('html').addClass('touch') : $('html').addClass('no-touch');

	app.settings.winWidth = $(window).width();
	app.settings.winHeight = $(window).height();
	app.settings.scrollPos = $(window).scrollTop();

	// * Init
	app.init();
	app.lang.init();
	// app.lang.googleTranslateLoad();

	//app.popups.open('review-thx');

	// * Menu binds
	app.menu.bind();

	$(document).on('click', '.search-open', () => {
		let search = $('.search');

		if (!search.hasClass('active')) {
			search.addClass('active');

			search.find('.search__form-inp input').trigger('focus');

			app.settings.menuOpened ? app.menu.close() : null;
		} else {
			search.removeClass('active');
		}
	});


	if (app.deviceIs.desktop) {
		$(window).on('resize', function () {
			app.units.all();
		});
	} else {

	}

	if (app.deviceIs.mobile || app.deviceIs.tablet) {
		$(window).on('orientationchange', function () {
			app.units.vh();
		}).on('resize', function () {
			app.units.mobile();
		});
	}

	$(window).on('resize', function () {
		app.settings.winWidth = $(window).width();
		app.settings.winHeight = $(window).height();
		app.settings.scrollPos = $(window).scrollTop();

		app.settings.menuOpened ? app.menu.close() : null;
	}).on('scroll', function () {
		app.settings.scrollPos = $(window).scrollTop();
	}).trigger('resize').trigger('scroll');

	// * Scroll to element
	$(document).on('click', 'a[href^="#"], [data-scrollto]', function (e) {
		e.preventDefault();
		let el = $(this).attr('href') || $(this).attr('data-scrollto');

		app.scrollTo(el, {
			offset: app.settings.scrollOffset()
		});
	});
})(jQuery);

$(window).on('load', function () {
	setTimeout(function () {
		// * hide preloader
		$('.preloader').fadeOut(1000, function () {
			$(this).remove();
		});
		$('.app').addClass('app--loaded');
		app.settings.appLoaded = true;
		$(window)
			.trigger('app.loaded')
			.trigger('scroll')
			.trigger('resize');
	}, 300);

	// * Lenis scroll
	if (window.Lenis && typeof window.Lenis == 'function' && !app.scroll.inited) {
		app.scroll.init();
	}

	// * Scroll to hash on page laod
	app.toHash();
});