var MARKER_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; //지도에 마커생성 
var map;
var markers = {};

$(function() {
    var myTrips = Cookies.getJSON('MYTRIPS');

    if(!myTrips) 
        myTrips = [];

    showMap();
    generateMyTripList(myTrips);
});


/**
 * 쿠키에서 저장한 값 목록으로 빼주기
 * @param list 
 */
function generateMyTripList(list) {
    var bounds = new google.maps.LatLngBounds();
    var $list = $('#mytrip-list');

    for(var i = 0; i < list.length; i++) {
        var myTrip = list[i];

        //지도에 마커 생성
        var pos = {
            lat: myTrip.x,
            lng: myTrip.y
        }       
        var markerLabel = MARKER_LABELS[i];
        //

        var $item = $('#mytrip-item-template').clone().removeAttr('id');
        $item.data('id', myTrip.id);
        $item.find('.item-name').html(markerLabel + '. ' + myTrip.name);
        $item.find('.item-city-name').html(myTrip.cityName);

        //목록에서 여행지 제거
        $item.find('.item-remove').click(function() {
            console.log($(this)); //span에 copy- copyselector 확인하여 li찾기
            
            var $elem = $(this).closest('.mytrip-item'); //프엔 특성상 레이아웃 언제 바뀔지 모르므로, closest와 클래스 이용
            var id = $elem.data('id');

            $elem.remove();
            // 여행지제거 후 마커 제거
            markers[id].setMap(null);
            markers[id] = null;

            /**
             * 삭제한걸 쿠키에 저장
             */
            var newList = removeFromList(list, id);
            Cookies.set('MYTRIPS', newList);
            //
        });
        

        $list.append($item);

        // 두개이상 지도에 마커 생성
        var marker = new google.maps.Marker({
            position: pos,
            label: markerLabel,
            map: map
        });
        // 여행지제거 후 마커 제거
        markers[myTrip.id] = marker;
        
        bounds.extend(pos);
    }
    map.fitBounds(bounds);
    //
}


/**
 * 삭제한걸 쿠키에 저장
 * @param list 
 * @param id 
 */

function removeFromList(list, id) {
    var index = -1;

    for( var i = 0; i < list.length; i++) {
        if(list[i].id === id) {
            index = i;
            break;
        }
    }
    if( index !== -1) {
        list.splice(index, 1);
    }
    return list;
}

/**
 * 지도 보여주기 
 */
function showMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {
            lat: 33.3617,
            lng: 126.5292
        }
    });
}

