	(function() {

	"use strict";
  
	var app = {
		
		init: function() {

			//=== Main visible ===\\
			this.mainVisible();

			//=== lazy loading effect ===\\


			//=== Cookie ===\\
			this.cookieCheck();

			this.setUpListeners();

			//=== Custom scripts ===\\
			this.btnHover();
			this.appendMfBg();
			this.formingHrefTel();
			this.contentTable();
			this.clockCountDown();
			this.inputChangeFile();

			//=== Plugins ===\\


		},
 
		setUpListeners: function() {

			//=== Cookie ===\\
			$(".mc-btn").on("click", this.cookieSet);

			//=== Ripple effect for buttons ===\\
			$(".ripple").on("click", this.btnRipple);

			//=== Header search ===\\
			// Header search open
			$(".header-search-ico-search").on("click", this.headerSearchOpen);
			// Header search close \\
			$(".header-search-ico-close").on("click", this.headerSearchClose);
			// Header search close not on this element \\
			$(document).on("click", this.headerSearchCloseNotEl);

			//=== Header lang ===\\
			// Header lang open
			$(".header-lang-current").on("click", this.headerLangOpen);
			// Header lang close not on this element \\
			$(document).on("click", this.headerLangCloseNotEl);

			//=== Header mobile/tablet navbar ===\\
			// Header navbar toggle \\
			$(".header-navbar-btn").on("click", this.headerNavbarToggle);
			// Header navbar close not on this element \\
			$(document).on("click", this.headerNavbarNotEl);

			//=== Mobile/tablet main menu ===\\
			// Main menu toogle \\
			$(".main-mnu-btn").on("click", this.MainMenuToggle);
			// Main menu submenu toogle \\
			$(".mmm-btn").on("click", this.MainMenuSubmenuToggle);
			// Main menu close not on this element \\
			$(document).on("click", this.MainMenuCloseNotEl);

			//=== Side toggle ===\\
			$(".side-open").on("click", this.sideOpen);
			$(document).on("click", ".side-close, .side-visible", this.sideClose);

			//=== Tab ===\\
			$(".tabs-nav li").on("click", this.tab);

			//=== Accordion ===\\
			$(".accordion-trigger").on("click", this.accordion);

			//=== Sidebar category item ===\\
			$(".sidebar-cat-item-has-child > a").on("click", this.sidebarCatItemToggle);

			//=== UI elements ===\\
			$(".ui-nav li").on("click", this.ui);
			
			//=== Form field ===\\
			$(".form-field").each(this.inputEach);
			$(".form-field-input")
				.on("focus", this.inputFocus)
				.on("keyup change", this.inputKeyup)
				.on("blur", this.inputBlur);

			//=== Button top ===\\
			$(document).on("click", '.btn-top', this.btnTop);
			$(window).on("scroll", this.btnTopScroll);

			$(document).on("click", '.scroll-to', this.scrollTo);
			
		},

		//=== Body visible ===\\
		mainVisible: function() {

			$(".main").addClass("main-visible");

		},

		//=== Cookie ===\\
		COOKIENAME: 'pathsoft-cookie',
		COOKIEDURATION: 1000,
		COOKIEEXDAYS: 30,
		cookieCheck: function() {

			var cookieMessage = $(".cookie-message");

			if(!this.getCookie(this.COOKIENAME)) {
				setTimeout(function() {
					cookieMessage.addClass("open");
				}, this.COOKIEDURATION);
			}

		},
		cookieSet: function() {

			app.setCookie(app.COOKIENAME, 'enabled', app.COOKIEEXDAYS);
			$(this).closest(".cookie-message").removeClass('open');

		},
		setCookie: function(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + d.toUTCString();
			document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
		},
		getCookie: function(name) {
			var matches = document.cookie.match(new RegExp(
				"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
			return matches ? decodeURIComponent(matches[1]) : undefined;
		},

		appendMfBg: function() {

			$("body").append('<div class="mf-bg"></div>');

		},



		btnTop: function() {
			
			$('html, body').animate({scrollTop: 0}, 1000, function() {
				$(this).removeClass("active");
			});

		},

		btnTopScroll: function() {
			
			var btnTop = $('.btn-top');
			
			if ($(this).scrollTop() > 700) {

				btnTop.addClass("active");

			} else {

				btnTop.removeClass("active");
				
			}

		},

		scrollTo: function() {

			$('html, body').animate({scrollTop: $($(this).attr('data-scroll-to')).position().top}, 1000);

		},

		ui: function() {

			var _this = $(this),
				index = _this.index(),
				nav = _this.parent(),
				tabs = _this.closest(".ui"),
				items = tabs.find(".ui-item");

			if (!_this.hasClass("active")) {

				items
					.eq(index)
					.add(_this)
					.addClass("active")
					.siblings()
					.removeClass("active");

				nav
					.trigger("detach.ScrollToFixed")
					.scrollToFixed({
						marginTop: $(".header-fixed").outerHeight() + 20,
						zIndex: 2,
						limit: $(".footer").offset().top - nav.outerHeight() - 40,
						preAbsolute: function() { $(this).css({"opacity": 0, "visability": "hidden"}); },
						postUnfixed: function() { $(this).css({"opacity": 1, "visability": "visible"}); },
						postAbsolute: function() { $(this).css({"opacity": 1, "visability": "visible"}); },
					});

				if ($(document).scrollTop() > 0) {
					$("html, body").animate({ scrollTop: 0 }, 500);
				}
			
			}

		},

		//=== Tab ===\\
		tab: function() {

			var _this = $(this),
				index = _this.index(),
				tabs = _this.closest(".tabs"),
				items = tabs.find(".tabs-item");

			if (!_this.hasClass("active")) {

				items
					.eq(index)
					.add(_this)
					.addClass("active")
					.siblings()
					.removeClass("active");
			
			}

		},

		//=== Accordion ===\\
		accordion: function(e) {

			e.originalEvent.preventDefault();

			var _this = $(this),
				item = _this.closest(".accordion-item"),
				container = _this.closest(".accordion"),
				items = container.find(".accordion-item"),
				content = item.find(".accordion-content"),
				otherContents = container.find(".accordion-content"),
				duration = 300;

			if (!item.hasClass("active")) {
				items.removeClass("active");
				item.addClass("active");
				otherContents.stop(true, true).slideUp(duration);
				content.stop(true, true).slideDown(duration);
			} else {
				content.stop(true, true).slideUp(duration);
				item.removeClass("active");
			}

		},

		//=== Header search ===\\
		headerSearchOpen: function() {

			$(this).closest(".header-search").addClass("open");

		},
		headerSearchClose: function() {

			$(this).closest(".header-search").removeClass("open");

		},
		headerSearchCloseNotEl: function(e) {

			if($(".header-search").hasClass("open")) {
				if ($(e.originalEvent.target).closest(".header-search").length) return;
				$(".header-search").removeClass("open");
				e.originalEvent.stopPropagation();
			}

		},
		
		//=== Header lang ===\\
		headerLangOpen: function() {

			$(this).parent().toggleClass("open");

		},
		headerLangCloseNotEl: function(e) {
			
			if($(".header-lang").hasClass("open")) {
				if ($(e.originalEvent.target).closest(".header-lang").length) return;
				$(".header-lang").removeClass("open");
				e.originalEvent.stopPropagation();
			}

		},

		//=== Mobile/tablet main menu ===\\
		MainMenuToggle: function() {

			var _this = $(this),
				_body = $("body"),
				headerH = _this.closest(".header").outerHeight(),
				mnu = $(".mob-main-mnu"),
				offsetTop = $(".header-fixed").offset().top;
				
			mnu.css("padding-top", headerH);
			$(this).toggleClass("active");

			_body.toggleClass("mob-main-mnu-open").scrollTop(offsetTop);
				
			if(_body.hasClass("mob-main-mnu-open")) {
				$(".mf-bg").addClass("visible mm");
			} else {
				$(".mf-bg").removeClass("visible mm");
			}

		},
		MainMenuSubmenuToggle: function() {

			var _this = $(this),
				item = _this.parent(),
				content = item.find(".mmsm");

			item.toggleClass("open");
			content.slideToggle();

		},
		MainMenuCloseNotEl: function(e) {

			if($("body").hasClass("mob-main-mnu-open")) {
				if ($(e.originalEvent.target).closest(".mob-main-mnu, .main-mnu-btn").length) return;
				$("body").removeClass("mob-main-mnu-open");
				$(".main-mnu-btn").removeClass("active");
				$(".mf-bg").removeClass("visible mm");
				e.originalEvent.stopPropagation();
			}

		},

		//=== Header mobile/tablet navbar ===\\
		headerNavbarToggle: function() {

			$(this).parent().toggleClass("open");

		},
		headerNavbarNotEl: function(e) {

			if ($(e.originalEvent.target).closest(".header-navbar").length) return;
			$(".header-navbar").removeClass("open");
			e.originalEvent.stopPropagation();

		},

		//=== Side toggle ===\\
		sideOpen: function(e) {

			e.originalEvent.preventDefault();

			var side = $($(this).attr("data-side"));

			if(side.length) {

				side.toggleClass("open");
				if(!e.currentTarget.classList.contains("psnav-item")) {
					$(".mf-bg").toggleClass("visible side-visible");
				}

			}

		},
		sideClose: function() {

			$(".side, .sidebar-filters").removeClass("open");
			$(".mf-bg").removeClass("visible side-visible");

		},

		//=== Form input ===\\
		inputEach: function() {

			var _this = $(this),
				val = _this.find(".form-field-input").val();

			if (val === "") {
				_this.removeClass("focus");
			} else {
				_this.addClass("focus");
			}

		},
		inputFocus: function() {

			var _this = $(this),
				wrappInput = _this.parent();

			wrappInput.addClass("focus");

		},
		inputKeyup: function() {

			var _this = $(this),
				val = _this.val(),
				wrappInput = _this.parent();

			if (val === "" && !_this.is(":focus")) {
				wrappInput.removeClass("focus");
			} else {
				wrappInput.addClass("focus");
			}

		},
		inputBlur: function() {

			var _this = $(this),
				val = _this.val(),
				wrappInput = _this.parent();

			if(val === "") {
				wrappInput.removeClass("focus"); 
			}

		},
		inputChangeFile: function() {

			$('.form-field-file input[type=file]').on("change", function(e) {
				var _this = $(this),
					container = _this.closest(".form-field-file"),
					text = container.find(".form-field-input-file");
				text.text(e.target.files[0].name);
			});

		},

		//=== Ripple effect for buttons ===\\
		btnRipple: function(e) {
			
			var _this = $(this),
				offset = $(this).offset(),
				positionX = e.originalEvent.pageX - offset.left,
				positionY = e.originalEvent.pageY - offset.top;
			_this.append("<div class='ripple-effect'>");
			_this
				.find(".ripple-effect")
				.css({
					left: positionX,
					top: positionY
				})
				.animate({
					opacity: 0
				}, 1500, function() {
					$(this).remove();
				});

		},

		btnHover: function() {

			var btns = document.querySelectorAll(".btn, .el-ripple"),
				btn = [];

			btns.forEach(function(element, index) {

				var span = document.createElement("span"); 
				span.className = "el-ripple-circle";
				element.appendChild(span);

				// If The span element for this element does not exist in the array, add it.
				if (!btn[index])
				btn[index] = element.querySelector(".el-ripple-circle");

				element.addEventListener("mouseenter", function(e) {	
					btnHandler(element, index, e);			
				});

				element.addEventListener("mouseleave", function(e) {
					btnHandler(element, index, e);
				});
				
			});

			const btnHandler = function(element, index, e) {

				let offset = element.getBoundingClientRect(),
					left = e.pageX - offset.left - window.scrollX,
					top = e.pageY - offset.top - window.scrollY;

				btn[index].style.left = left + "px";
				btn[index].style.top = top + "px";

			}

		},

		//=== Forming href for phone ===\\
		formingHrefTel: function() {

			var linkAll = $('.formingHrefTel'),
				joinNumbToStringTel = 'tel:';

			$.each(linkAll, function () {
				var _this = $(this),
					linkValue = _this.text(),
					arrayString = linkValue.split("");

				for (var i = 0; i < arrayString.length; i++) {
					var thisNunb = app.isNumber(arrayString[i]);
					if (thisNunb === true || (arrayString[i] === "+" && i === 0)) {
						joinNumbToStringTel += arrayString[i];
					}
				}

				_this.attr("href", function () {
					return joinNumbToStringTel;
				});
				joinNumbToStringTel = 'tel:'

			});

		},

		isNumber: function(n) {

			return !isNaN(parseFloat(n)) && isFinite(n);

		},

		//=== Sidebar category item ===\\
		sidebarCatItemToggle: function(e) {

			e.originalEvent.preventDefault();

			var item = $(this).parent(),
				ul = item.find("> ul");

			item.toggleClass("open");
			ul.slideToggle();

		},
		
		//=== Content table responsive ===\\
		contentTable: function() {

			var contentTable = $(".content");
			if(contentTable.length) {
				
				$.each(contentTable.find("table"), function() {
					$(this).wrap("<div class='table-responsive-outer'></div>").wrap("<div class='table-responsive'></div>");
				});
				
			}

		},

		//=== Clock count down ===\\
		clockCountDown: function() {

			if($("#countdown").length) {
				this.clock("countdown", $("#countdown").attr("data-dedline"));
			}

		},
		getTimeRemaining: function(endtime) {

			var t = Date.parse(endtime) - Date.parse(new Date()),
				seconds = Math.floor((t / 1000) % 60),
				minutes = Math.floor((t / 1000 / 60) % 60),
				hours = Math.floor((t / (1000 * 60 * 60)) % 24),
				days = Math.floor(t / (1000 * 60 * 60 * 24));

			return {
				total: t,
				days: days,
				hours: hours,
				minutes: minutes,
				seconds: seconds
			};

		},
		clock: function(id, endtime) {

			var clock = document.getElementById(id),
				daysSpan = clock.querySelector(".days"),
				hoursSpan = clock.querySelector(".hours"),
				minutesSpan = clock.querySelector(".minutes"),
				secondsSpan = clock.querySelector(".seconds");

			function updateClock() {
				var t = app.getTimeRemaining(endtime);

				if (t.total <= 0) {
					document.getElementById("countdown").classList.add("hidden");
					document.getElementById("deadline-message").classList.add("visible");
					clearInterval(timeinterval);
					return true;
				}

				daysSpan.innerHTML = t.days;
				hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
				minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
				secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
			}

			updateClock();
			var timeinterval = setInterval(updateClock, 1000);

		},

		//=== Custom alert ===\\
		customAlert: function(text, duration, alertInfo) {

			var alerts = $(".alerts"),
				body = $("body"),
				alertClass = "",
				alertIco = "info";
			
			if (!alerts.length) {
				body.append('<div class="alerts"></div>');
			}
			$(".alert").remove();

			if (alertInfo === "success") {
				alertClass = "alert-success";
				alertIco = "check";
			} else if (alertInfo === "danger") {
				alertClass = "alert-danger";
				alertIco = "error";
			} else if (alertInfo === "warning") {
				alertClass = "alert-warning";
				alertIco = "warning";
			} else if (alertInfo == "default") {
				alertClass = "alert-default";
				alertIco = "info";
			}

			if (!$("." + alertClass + "").length) {
				$(".alerts").append(
				'<div class="alert ' +
					alertClass +
					'" data-duration-hide="' +
					duration +
					'"> <div class="alert-ico"> <i class="material-icons md-22">' +
					alertIco +
					'</i> </div> <div class="alert-text">' +
					text +
					"</div> </div>"
				);

				setTimeout(function() {
					$("." + alertClass + "").remove();
				}, duration);
			}

			$(document).on("click", ".alert-close", function() {
				$(this)
				.closest(".alert")
				.remove();
			});

		},

		//=== Plugins ===\\


		
	}
 
	app.init();
 
}());