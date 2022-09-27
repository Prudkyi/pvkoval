window.addEventListener('scroll', e => {
    document.body.style.cssText = `--scrollTop: ${this.scrollY}px`
})

// jQuery HTML Ready
$(document).ready(function() {

    /* динміка меню */
    var lastScrollTop = 0;
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            $('.header').removeClass('fixed');
        } else {
            $('.header').addClass('fixed');
        }
        lastScrollTop = st;
    });

    /* мобільне меню */

    let nav__btn = $('.nav__btn i'),
        navMob   = $('.navmob'),
        openNavMob = false,
        heightNavMob = navMob.height(),
        heightNav = $('header').height(),
        iconClosed = 'bi bi-x-lg',
        iconMenu = 'bi bi-list';

    let resHeightNav = heightNav + heightNavMob;

    navMob.animate({top: "-"+heightNavMob+"px"}, 300);



    nav__btn.on('click', function (){
        navMob.css('display', 'flex')
        if (!openNavMob)
        {
            $(this).attr('class', iconClosed);
            navMob.animate({top: heightNav+"px"}, 300);
            openNavMob = true;
        }
        else
        {
            $(this).attr('class', iconMenu);
            navMob.animate({top: "-"+resHeightNav+"px"}, 300);
            openNavMob = false;
        }
    });

    $(document).mouseup( function(e){ // событие клика по веб-документу
        var div = $( ".header" ); // тут указываем ID элемента
        if ( !div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0 ) { // и не по его дочерним элементам
            if (openNavMob)
            {
                nav__btn.attr('class', iconMenu);
                navMob.animate({top: "-"+resHeightNav+"px"}, 300);
                openNavMob = false;
            }
        }
    });



});





