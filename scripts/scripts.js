$(function() {
    // header 부분 설정 
    $(window).scroll(function() { // 브라우저 창의 스크롤을 처리하는 함수
        var top = $(window).scrollTop(); // 현재 브라우저 창의 상하 스크롤 값

        if( top > 0) 
            $('#header').addClass('inverted');
        else
            $('#header').removeClass('inverted');
    });
    $(window).trigger('scroll');
    //

    // 날짜 입력 달력 제이쿼리 
    var dpFrom = $('#from').datepicker({
        minDate:0,
        dateFormat:'yy-mm-dd'
    });

    dpFrom.datepicker('setDate', new Date());

    var dpTo = $('#to').datepicker({
        minDate:0,
        dateFormat:'yy-mm-dd',
        onSelect:function() { //사용자가 특정 날짜를 선택했을 때 호출
            dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
            //dpTo날짜의 minDate 옵션값을 dpFrom날짜의 현재날짜로 설정
        }
    });

    dpTo.datepicker('setDate', 4);
    //

    // 검색 버튼 눌렀을 때 
    $('#form-search').submit(function(e) {
        e.preventDefault();

        var from = $('#from').val();
        var to = $('#to').val();

        search(from, to);
    });
    //
});

/**
 * 여행지 목록 API 
 */
function search(from, to) {
    var url = 'https://javascript-basic.appspot.com/searchLocation';

    $.getJSON(url, {
        from: from,
        to: to
        }, function(r) {
            var $list = $('#list-panel');

            for( var i = 0; i < r.length; i++) {
                var data = r[i];
                var $item = createListItem(data);

                $list.append($item);
            }
        $('#list-bg').show();
    });
}

/**
 * 목록 템플릿 엘리먼트에 들어갈 항목 생성
 */
function createListItem(data) { //data는 API에서 리턴된 배열의 각 항목
    var $tmpl = $('#list-item-template').clone().removeAttr('id');

    $tmpl.find('.list-item-image').attr('src', data.titleImageUrl);
    $tmpl.find('.list-item-name').html(data.name);
    $tmpl.find('.list-item-city-name').html(data.cityName);

    /**
     * 엘리먼트에 클릭 이벤트 핸들러 연결 -상세보기
     */
    $tmpl.click(function(e) {
        var url = 'detail.html?id=' + data.id; //여행지를 구분할 수 있는 키
        window.location = url;
    });

    return $tmpl;
}
