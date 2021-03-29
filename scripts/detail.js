var map;

$(function() {
    var id = parseId(window.location.search);
    console.log('id', id);

    getDetail(id);

    //showMap();
})

/**
 * 지도 적용하기
 */
function showMap() {
    map = new google.maps.Map(document.getElementById('map'), { 
        zoom:12,
        center: {
            lat:33.3617,
            lng:126.5292
        }
    })
}

/**
 * 상세보기 페이지 API 호출
 */
function getDetail(id) {
    var url = 'https://javascript-basic.appspot.com/locationDetail';

    $.getJSON(url, {
        id:id
    }, function(r) {
        console.log(r);
        $('.detail-header-name').html(r.name);
        $('.detail-header-city-name').html(r.cityName);
        $('.detail-desc-text').html(r.desc);


        /**
         * galleria - 이미지들 넣어주기 
         */
        var $gallery = $('#detail-images');
        var images = r.subImageList;

        for( var i = 0; i < images.length; i++ ) {
            var $image = $('<img src="' + images[i] + '"/>');
            $gallery.append($image); // #detail-images 끝에 콘텐츠 추가
        }

        Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#detail-images');

    });
}

/**
 * ?id=0 파싱
 */
function parseId(str) {
    var s = str.substring(1);
    var args = s.split('&');

    for(var i = 0; i < args.length; i++) {
        var arg = args[i];
        var tokens = arg.split('=');

        if(tokens[0] === 'id')
            return tokens[1];
    }
    return null;
}





