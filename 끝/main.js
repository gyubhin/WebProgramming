var marker_s, marker_e;
var totalMarkerArr = [];
var drawInfoArr = [];
var resultdrawArr = [];
var map, marker;
var start, end;

function initTmap() {
    // 지도 생성
    map = new Tmapv2.Map("map_div", {
        center: new Tmapv2.LatLng(35.13399576311834, 129.1055538706261), //부경대쪽
        width: "80%",
        height: "500px",
        zoom: 17,
        zoomControl: true,
        scrollwheel: true
    });

    marker_s = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(36.000000000010, 129.9999999999),
        icon: 'https://tmapapi.tmapmobility.com/upload/tmap/marker/pin_r_b_s.png',
        iconSize: new Tmapv2.Size(24, 38),
        map: map
    });

    marker_e = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(36, 130),
        icon: "https://tmapapi.tmapmobility.com/upload/tmap/marker/pin_b_b_e.png",
        iconSize: new Tmapv2.Size(24, 38),
        map: map
    });

    map.addListener("click", function (event) {
        if (!start) {
            start = event.latLng;
            marker_s.setPosition(start);
        } else if (!end) {
            end = event.latLng;
            marker_e.setPosition(end);
            calculateRoute();
        } else {
            resetMarkers();
            start = event.latLng;
            marker_s.setPosition(start);
        }
    });
}

function addMarker(position, iconUrl) {
    if (marker) {
        marker.setMap(null);
    }
    marker = new Tmapv2.Marker({
        position: position,
        icon: iconUrl,
        iconSize: new Tmapv2.Size(24, 38),
        map: map
    });
}

function drawLine(arrPoint) {
    var polyline_ = new Tmapv2.Polyline({
        path: arrPoint,
        strokeColor: "#DD0000",
        strokeWeight: 6,
        map: map
    });
    resultdrawArr.push(polyline_);
}

function calculateRoute() {
    if (!start || !end) {
        return;
    }

    var startX = start.lng();
    var startY = start.lat();
    var endX = end.lng();
    var endY = end.lat();

    var headers = {};
    headers["appKey"] = "Hz2FRQ7V1LaHuZxpL92Fn7UPuG3RndEq1ENh2wA6";

    $.ajax({
        method: "POST",
        headers: headers,
        url: "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",
        async: false,
        data: {
            "startX": startX,
            "startY": startY,
            "endX": endX,
            "endY": endY,
            "reqCoordType": "WGS84GEO",
            "resCoordType": "EPSG3857",
            "startName": "출발지",
            "endName": "도착지"
        },
        success: function (response) {
            var resultData = response.features;
            var totalDistance = resultData[0].properties.totalDistance;

            
            var slowSpeed = 0.9; 
            var normalSpeed = 1.3; 
            var fastSpeed = 1.8; 
            var runningSpeed = 2.2; 

           
            var slowTime = (totalDistance / slowSpeed / 60).toFixed(0) + "분";
            var normalTime = (totalDistance / normalSpeed / 60).toFixed(0) + "분";
            var fastTime = (totalDistance / fastSpeed / 60).toFixed(0) + "분";
            var runningTime = (totalDistance / runningSpeed / 60).toFixed(0) + "분";
            
            var tDistance;
            if (totalDistance >= 1000) {
                tDistance = (totalDistance / 1000).toFixed(1) + "km";
            } else {
                tDistance = totalDistance.toFixed(0) + "m";
            }
            
            var resultHTML = `
            <div class="result-container">
                <p><strong>여유로운 걸음</strong></p>
                <p><strong>소요 시간:</strong> ${slowTime}</p>
            </div>
            <div class="result-container">
                <p><strong>총 거리:</strong> ${tDistance}</p>
                <p><strong>보통 걸음 소요 시간:</strong> ${normalTime}</p>
            </div>
            <div class="result-container">
                <p><strong>빠른 걸음</strong></p>
                <p><strong>소요 시간:</strong> ${fastTime}</p>
            </div>
            <div class="result-container">
                <p><strong>달리기</strong></p>
                <p><strong>소요 시간:</strong> ${runningTime}</p>
            </div>
        `;
    
            $("#result").html(resultHTML);
            if (resultdrawArr.length > 0) {
                for (var i in resultdrawArr) {
                    resultdrawArr[i].setMap(null);
                }
                resultdrawArr = [];
            }

            if (totalMarkerArr.length > 0) {
                for (var i in totalMarkerArr) {
                    totalMarkerArr[i].setMap(null);
                }
                totalMarkerArr = [];
            }

            drawInfoArr = [];

            for (var i in resultData) {
                var geometry = resultData[i].geometry;
                var properties = resultData[i].properties;

                if (geometry.type == "LineString") {
                    for (var j in geometry.coordinates) {
                        var latlng = new Tmapv2.Point(
                            geometry.coordinates[j][0],
                            geometry.coordinates[j][1]
                        );
                        var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                        var convertChange = new Tmapv2.LatLng(
                            convertPoint._lat,
                            convertPoint._lng
                        );
                        drawInfoArr.push(convertChange);
                    }
                } else {
                    var markerImg = "";
                    var pType = "";
                    var size;

                    if (properties.pointType == "S") {
                        markerImg = "https://tmapapi.tmapmobility.com/upload/tmap/marker/pin_r_b_s.png";
                        pType = "S";
                        size = new Tmapv2.Size(24, 38);
                    } else if (properties.pointType == "E") {
                        markerImg = "https://tmapapi.tmapmobility.com/upload/tmap/marker/pin_b_b_e.png";
                        pType = "E";
                        size = new Tmapv2.Size(24, 38);
                    } else {
                        markerImg = "http://topopen.tmap.co.kr/imgs/point.png";
                        pType = "P";
                        size = new Tmapv2.Size(8, 8);
                    }

                    var latlon = new Tmapv2.Point(
                        geometry.coordinates[0],
                        geometry.coordinates[1]
                    );
                    var convertPoint = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlon);

                    var routeInfoObj = {
                        markerImage: markerImg,
                        lng: convertPoint._lng,
                        lat: convertPoint._lat,
                        pointType: pType
                    };

                    var marker_p = new Tmapv2.Marker({
                        position: new Tmapv2.LatLng(
                            routeInfoObj.lat,
                            routeInfoObj.lng
                        ),
                        icon: routeInfoObj.markerImage,
                        iconSize: size,
                        map: map
                    });

                    totalMarkerArr.push(marker_p);
                }
            }
            drawLine(drawInfoArr);

            start = null;
            end = null;
        },
        error: function (request, status, error) {
            console.log("code:" + request.status + "\n"
                + "message:" + request.responseText + "\n"
                + "error:" + error);
        }
    });
}

function resetMarkers() {
    if (resultdrawArr.length > 0) {
        for (var i in resultdrawArr) {
            resultdrawArr[i].setMap(null);
        }
        resultdrawArr = [];
    }
    marker_s.setPosition(new Tmapv2.LatLng(36.000000000010, 129.9999999999));
    marker_e.setPosition(new Tmapv2.LatLng(36, 130));
}
