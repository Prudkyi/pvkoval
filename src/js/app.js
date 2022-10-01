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

    /* маска номеру */

    $('#callbackForm__tel').mask('+38 (999) 999-99-99');

    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            var range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };


    $('input[type="tel"]').click(function(){
        $(this).setCursorPosition(4);  // set position number
    });

    /* кнопка відправити */

    // перевірка вводу всіх даних
    function checkInputs (checkInput)
    {
        let elements = $(checkInput);
        for (let i = 0; i < elements.length; i++)
        {
            if (elements[i].value !== '')
            {
                if (elements[i].getAttribute('id') === 'callbackForm__tel')
                {
                    let valTel = elements[i].value;
                    let last = valTel.toString().slice(-1);
                    if (last === '_') return false;
                }
            }
            else return false;

            if ( i === (elements.length - 1) ) return true;

        }
    }

    $('.checkInput').keyup(function(){
        let formBut = $('.callbackForm__button button');
        if (checkInputs ('.checkInput'))
        {
            formBut.addClass('callbackForm__Ok');
            formBut.removeClass('callbackForm__Nok');
        }
        else
        {
            formBut.addClass('callbackForm__Nok');
            formBut.removeClass('callbackForm__Ok')
        }
    });

    // перевірка коректності вводу всіх даних
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    function checkInputsData (checkInput)
    {
        let elements = $(checkInput);
        let resCheck = true;
        for (let i = 0; i < elements.length; i++)
        {
            let valID = elements[i].getAttribute('id');
            if (elements[i].value !== '')
            {
                $('.callbackForm__input label[for=' + valID + '] span').css('display', 'none');
                let valEl = elements[i].value;
                // tell
                if (valID === 'callbackForm__tel')
                {

                    for (let x = 0; x < valEl.length; x++)
                    {
                        if (valEl[x] === '_')
                        {
                            $('.callbackForm__input label[for=' + valID + '] span').css('display', 'inline-block');
                            resCheck = false;
                        }
                        else $('.callbackForm__input label[for=' + valID + '] span').css('display', 'none');
                    }
                }
                // email
                if (valID === 'callbackForm__email')
                {
                    if (!isEmailValid(valEl))
                    {
                        $('.callbackForm__input label[for=' + valID + '] span').css('display', 'inline-block');
                        resCheck = false;
                    }
                    else $('.callbackForm__input label[for=' + valID + '] span').css('display', 'none');
                }
            }
            else {
                $('.callbackForm__input label[for=' + valID + '] span').css('display', 'inline-block');
                resCheck = false;
            }
        }
        return resCheck;
    }

    function checkInputsDataContact (checkInput)
    {
        let elements = $(checkInput);
        let resCheck = true;
        for (let i = 0; i < elements.length; i++)
        {
            let valID = elements[i].getAttribute('id');
            if (elements[i].value !== '')
            {
                $('#' + valID + ' ~ span').css('display', 'none');
                let valEl = elements[i].value;
                // tell
                if (valID === 'callbackForm__tel')
                {

                    for (let x = 0; x < valEl.length; x++)
                    {
                        if (valEl[x] === '_')
                        {
                            $('#' + valID + ' ~ span').css('display', 'inline-block');
                            resCheck = false;
                        }
                        else $('#' + valID + ' ~ span').css('display', 'none');
                    }
                }
                // email
                if (valID === 'callbackForm__email')
                {
                    if (!isEmailValid(valEl))
                    {
                        $('#' + valID + ' ~ span').css('display', 'inline-block');
                        resCheck = false;
                    }
                    else $('#' + valID + ' ~ span').css('display', 'none');
                }
            }
            else {
                $('#' + valID + ' ~ span').css('display', 'inline-block');
                resCheck = false;
            }
        }
        return resCheck;
    }

    $('.callbackForm__button button').click(function (){
        if (checkInputsData('.checkInput')) document.getElementById("maskCallbackBut").click();
        $('.checkInput').val('');
    });

    $('.form-btn button').click(function (){
        if (checkInputsDataContact('.checkInput2')) document.getElementById("maskCallbackBut").click();
        $('.checkInput2').val('');
    });

    /**************!!!!!!!************ Стилі елементів в контенті */

    // списки в контенті
    $(".section .content ul li").prepend("<i class=\"material-icons md-24\">check</i>");
    // закладки (тег цитати)
    $(".section .content blockquote").prepend("<i class=\"material-icons md-32\">bookmark</i>");
    // списки в інформаційних блоках для посилань
    $(".prdkInfoBlock ul li").prepend("<i class=\"material-icons md-24\">link</i>");

    /* Випадающе меню */

    let checkOpenAddMenu = false;
    $('.addMenu').on('click', function (){
        if (!checkOpenAddMenu)
        {
            $('.addMenu__wrap').show(300);
            checkOpenAddMenu = true;
        }
        else {
            $('.addMenu__wrap').hide(300);
            checkOpenAddMenu = false;
        }
    });

    /* Мінімальна висота головного контента     */
    let heightFooter = $('footer').height();
    let heightHeader = $('header').height();
    let heightWindow = $(document).height();

    let sumMainHeightEl = heightFooter + heightHeader;
    let sumMinHeightContent = heightWindow - sumMainHeightEl;

    $('#oneSection').css('min-height', sumMinHeightContent + 'px');






});





