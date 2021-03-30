$(function() {
    generateYears($('#sel-birth'));

    var birthSelect = $('#sel-birth').selectmenu();//select box 제이쿼리 UI
    birthSelect.selectmenu("menuWidget").addClass('overflow'); // selectmenu함수에서 menuWidget문자열 인자로 넣어주면 목록엘리먼트를 리턴하게 함. 스타일 overflow지정 

    $('#form-register').submit(function(e) {
        e.preventDefault();

        $(this).find('.txt-warning').empty().hide();
        //this: 폼, .txt-warning의 엘리먼트를 찾아 값을 지우고 숨겨줌

        var email = $('#inp-email').val(); //이메일

        if (!validateEmail(email)) {
            $('#inp-email').next().html('잘못된 형식입니다.').show();
            return;
        }
    
        var password = $('#inp-password').val(); //비밀번호

        if (!validatePassword(password)) {
            $('#inp-password').next().html('대문자와 숫자가 포함된 최소 8자의 문자열이어야 합니다.').show();
            return;
        }

        var confirm = $('#inp-confirm').val(); //비밀번호확인

        if(password !== confirm) {
            $('#inp-confirm').next().html('비밀번호와 일치하지 않습니다').show();
            return;
        }
        
        var gender = $('input[name="gender"]:checked').val(); //성별

        if(!gender) {
            $('#sel-birth').siblings('txt-warning').html('필수 항목입니다.').show();
            return;
        }
        
        var birth = $('#sel-birth').val();

        if (!birth) {
            $('#sel-birth').siblings('.txt-warning').html('필수 항목입니다.').show();
            return;
        }

        var accept = $('#inp-accept:checked').val(); //약관동의

        if(!accept) {
            $('#inp-accept').next().next().html('필수 항목 입니다.').show();
            return;
        }

        submit(email, password, gender, birth);
    });

    $('#btn-back').click(function() {
        document.location.href = 'index.html';
    });

})

/**
 * 이메일 유효성 검사 정규식 
 * @param  email 
 */
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * select box 연도
 * @param  $select 
 */
function generateYears($select) {
    for(var i = 1970; i <= 2010; i++) {
        $select.append('<option value = "' + i + '">' + i + '</option>');
    }
}

/**
 * 비밀번호 유효성 검사 정규식
 * @param password 
 */
function validatePassword(password) {
    var re = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
    return re.test(password);
  }


/**
 * 서버로 폼 전송하기 (서버 호출)
 */
function submit(email, password, gender, birth) {
    var params = {
        email: email,
        password: password,
        gender: gender,
        birth : birth
    };

    $.post('some-api-url', params, function(r) {
        console.log(r);
    });
}