$(document).ready(function() {
// перевірка коректності вводу всіх даних
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    function isEmailValid(value) {
        return EMAIL_REGEXP.test(value);
    }

    function checkInputsData(checkInput) {
        let elements = $(checkInput);
        let resCheck = true;
        for (let i = 0; i < elements.length; i++) {
            let valID = elements[i].getAttribute('id');
            if (elements[i].value !== '') {
                $('.callbackForm__input label[for=' + valID + '] span').css('display', 'none');
                let valEl = elements[i].value;
                // tell
                if (valID === 'callbackForm__tel') {

                    for (let x = 0; x < valEl.length; x++) {
                        if (valEl[x] === '_') {
                            $('.callbackForm__input label[for=' + valID + '] span').css('display', 'inline-block');
                            resCheck = false;
                        } else $('.callbackForm__input label[for=' + valID + '] span').css('display', 'none');
                    }
                }
                // email
                if (valID === 'callbackForm__email') {
                    if (!isEmailValid(valEl)) {
                        $('.callbackForm__input label[for=' + valID + '] span').css('display', 'inline-block');
                        resCheck = false;
                    } else $('.callbackForm__input label[for=' + valID + '] span').css('display', 'none');
                }
            } else {
                $('.callbackForm__input label[for=' + valID + '] span').css('display', 'inline-block');
                resCheck = false;
            }
        }
        return resCheck;
    }

    function checkInputsDataContact(checkInput) {
        let elements = $(checkInput);
        let resCheck = true;
        for (let i = 0; i < elements.length; i++) {
            let valID = elements[i].getAttribute('id');
            if (elements[i].value !== '') {
                $('#' + valID + ' ~ span').css('display', 'none');
                let valEl = elements[i].value;
                // tell
                if (valID === 'callbackForm__tel') {

                    for (let x = 0; x < valEl.length; x++) {
                        if (valEl[x] === '_') {
                            $('#' + valID + ' ~ span').css('display', 'inline-block');
                            resCheck = false;
                        } else $('#' + valID + ' ~ span').css('display', 'none');
                    }
                }
                // email
                if (valID === 'callbackForm__email') {
                    if (!isEmailValid(valEl)) {
                        $('#' + valID + ' ~ span').css('display', 'inline-block');
                        resCheck = false;
                    } else $('#' + valID + ' ~ span').css('display', 'none');
                }
            } else {
                $('#' + valID + ' ~ span').css('display', 'inline-block');
                resCheck = false;
            }
        }
        return resCheck;
    }

    $('.callbackForm__button button').click(function () {
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
                url: 'files/mail/mail.php',
                type: 'post',
                dataType: 'html',
                data: {
                    typeMess: typeThisMess,
                    Name: arrDataForm[0],
                    Phone: arrDataForm[1],
                    Email: arrDataForm[2],
                    Massage: arrDataForm[3]
                },
                success: function (data) {

                }
            });
            $('.checkInput').val('');
        }

    });

    $('.form-btn button').click(function () {
        if (checkInputsDataContact('.checkInput2')) {
            document.getElementById("maskCallbackBut").click();
            let arrDataForm = [
                $('#contact-name').val(),
                $('#callbackForm__tel').val(),
                $('#contact-email').val(),
                $('#contact-message').val(),
            ];
            let typeThisMess = 'contactForm';
            $.ajax({
                url: 'files/mail/mail.php',
                type: 'post',
                dataType: 'html',
                data: {
                    typeMess: typeThisMess,
                    Name: arrDataForm[0],
                    Phone: arrDataForm[1],
                    Email: arrDataForm[2],
                    Massage: arrDataForm[3]
                },
                success: function (data) {

                }
            });
            $('.checkInput2').val('');
        }
    });

});