// jQuery HTML Ready
$(document).ready(function() {

    /* динміка меню */
    let lastScrollTop = 0;
    $(window).scroll(function(event){
        let st = $(this).scrollTop();
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
        if (checkInputsData('.checkInput')) {
            document.getElementById("maskCallbackBut").click();
            let arrDataForm = [
                $('#callbackForm__pib').val(),
                $('#callbackForm__tel').val(),
                $('#callbackForm__email').val(),
                $('#callbackForm__text').val(),
            ];
            let typeThisMess = 'callback';
            $.ajax({
                url: '../files/mail/mail.php',
                type: 'post',
                dataType: 'html',
                data: { typeMess: typeThisMess, Name : arrDataForm[0], Phone : arrDataForm[1], Email : arrDataForm[2], Massage : arrDataForm[3]},
                success: function(data){

                }
            });
            $('.checkInput').val('');
        }

    });

    $('.form-btn button').click(function (){
        if (checkInputsDataContact('.checkInput2'))
        {
            document.getElementById("maskCallbackBut").click();
            let arrDataForm = [
                $('#contact-name').val(),
                $('#callbackForm__tel').val(),
                $('#contact-email').val(),
                $('#contact-message').val(),
            ];
            let typeThisMess = 'contactForm';
            $.ajax({
                url: '../files/mail/mail.php',
                type: 'post',
                dataType: 'html',
                data: { typeMess: typeThisMess, Name : arrDataForm[0], Phone : arrDataForm[1], Email : arrDataForm[2], Massage : arrDataForm[3]},
                success: function(data){

                }
            });
            $('.checkInput2').val('');
        }
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


    /* Читати типи файлів і вставити потрібний тип розширення */
    function getFileExtension(name)
    {
        let found = name.lastIndexOf('.') + 1;
        return (found > 0 ? name.substr(found) : "");
    }
    // модальне вікно
    $('.modalWindows__content__files a').each(function(i,elem) {
        let elClass = $(this).attr('href');
        let resultEx = getFileExtension(elClass);
        if (resultEx == "png" || resultEx == "jpg" || resultEx == "jpeg" || resultEx == "gif")
        {
            $(this).addClass('prdk_icon_img');
        }
        else if (resultEx == 'pdf')
        {
            $(this).addClass('prdk_icon_pdf');
        }
        else if (resultEx == 'doc' || resultEx == 'docx')
        {
            $(this).addClass('prdk_icon_doc');
        }
        else if (resultEx == 'xlsx')
        {
            $(this).addClass('prdk_icon_exel');
        }
        else {
            $(this).addClass('prdk_icon_file');
        }
    });

    // лист файлів в "документи"
    $('.documents__item a').each(function(i,elem) {
        let elClass = $(this).attr('href');
        let resultEx = getFileExtension(elClass);
        if (resultEx == "png" || resultEx == "jpg" || resultEx == "jpeg" || resultEx == "gif")
        {
            $(this).prev().addClass('prdk_icon_img');
        }
        else if (resultEx == 'pdf')
        {
            $(this).prev().addClass('prdk_icon_pdf');
        }
        else if (resultEx == 'doc' || resultEx == 'docx')
        {
            $(this).prev().addClass('prdk_icon_doc');
        }
        else if (resultEx == 'xlsx')
        {
            $(this).prev().addClass('prdk_icon_exel');
        }
        else {
            $(this).prev().addClass('prdk_icon_file');
        }
    });

});

// GSAP Анімація

/********** HOME ********************/
let timeLine = gsap.timeline();
let timeLine2 = gsap.timeline();
let timeLine3 = gsap.timeline();
let timeLine4 = gsap.timeline();
let timeLine5 = gsap.timeline();
let timeLine6 = gsap.timeline();
let timeLine7 = gsap.timeline();

// top img
timeLine.from('.topImg__title', {opacity: 0, y: 50, duration: 0.7})
        .from('.topImg__desc', {opacity: 0, y: 50, duration: 0.7}, "-=0.7")


// why US
timeLine2.from( ".whu-us-el" , { opacity: 0, y: 200, duration: 0.7 });

ScrollTrigger.create({
    animation: timeLine2,
    trigger: '.whu-us',
    start: 'top center',
    end: 'bottom',
});
// services
timeLine3.from( ".services-el" , { opacity: 0, y: 200, duration: 0.5 });

ScrollTrigger.create({
    animation: timeLine3,
    trigger: '.services-animation',
    start: 'top center',
    end: 'bottom',
});

// text
timeLine4.from( ".textBlock-el" , { opacity: 0, y: 200, duration: 0.5 });

ScrollTrigger.create({
    animation: timeLine4,
    trigger: '.textBlock',
    start: 'top center',
    end: 'bottom',
});

// question
timeLine5.from( ".question-el" , { opacity: 0, x: 700, duration: 1 });

ScrollTrigger.create({
    animation: timeLine5,
    trigger: '.question',
    start: 'top center',
    end: 'bottom',
});


// scrol left bl 1
timeLine6.from( ".scrollLeft-el-1" , { opacity: 0, x: -700, duration: 1 });
ScrollTrigger.create({
    animation: timeLine6,
    trigger: '.scrollLeft-1',
    start: 'top center',
    end: 'bottom',
});
// scroll right bl 1
timeLine7.from( ".scrollRight-el-1" , { opacity: 0, x: 700, duration: 1 });
ScrollTrigger.create({
    animation: timeLine7,
    trigger: '.scrollRight-1',
    start: 'top center',
    end: 'bottom',
});


















