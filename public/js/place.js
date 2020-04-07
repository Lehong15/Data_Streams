$(document).ready(function() {
    $("#alert").css("height", "40px")
    $("#alert").prop("class", "text-danger")
    $("#top").css("height", "40px")
    if(localStorage.getItem("place")) {
        $("#places_input").val(localStorage.getItem("place"))
        palceSearch();
        localStorage.removeItem("place")
    }
})

$("#places_input").click(function() {
    if($("#places_input").prop("placeholder") != "") {
        let key = $("#places_input").prop("placeholder")
        $("#places_input").val(key)
        $("#places_input").prop("placeholder", "")
    }
})

$("#palce_search").click(palceSearch)

function palceSearch() {
    let value = $("#places_input").val()
    let reg = /\s/g
    value = value.replace(reg, "")
    if(value == "" || value.length == 1) {
        $("#alert").text("输入不能为空，不能为一个字！")
    }else if(value === '中国'){
        $("#places_display").html(`<p>中国（中國）</p>`)
        $("#places_display").animate({
                        opacity: '0.7',
                        height: '10%',
                        width: '100%',
                })
        $("#places_display p").css({"width":"100%", "float": "left", "text-align": "center", "font-size": "30px"})
        // 百度地图API功能
        var map = new BMap.Map("allmap");    // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.395645, 39.929986), 4);  // 初始化地图,设置中心点坐标和地图级别
        //添加地图类型控件
        map.addControl(new BMap.MapTypeControl({
            mapTypes:[
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
            ]}));     
        map.setCurrentCity("");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    }
    else{
        $("#alert").text("")
        $.get(`http://localhost:3000/place/1?wd=${value}`, function(data) {
            var size = 4;
            if($.isEmptyObject(data)) {
                $("#places_display").animate({
                        opacity: '0.7',
                        height: '10%',
                        width: '100%',
                })
                $("#places_display").html(`<p>未查询到"${value}"的相关信息！</p>`)
                $("#places_display p").css({"width":"100%", "float": "left", "text-align": "center", "font-size": "24px"})
            }else {
                if(data.label === undefined) {
                    $("#places_display").animate({
                        opacity: '0.7',
                        height: '10%',
                        width: '100%',
                    })
                    if (data.city == '') {
                        size = 8;
                        $("#places_display").html(`<p>${data.country}</p><p>${data.province}</p>`)
                        $("#places_display p").css({"width":"50%", "float": "left", "text-align": "center","font-size": "24px"})
                    } else if (data.county == '') {
                        size = 10;
                        $("#places_display").html(`<p>${data.country}</p><p>${data.province}</p><p>${data.city}</p>`)
                        $("#places_display p").css({"width":"33%", "float": "left", "text-align": "center","font-size": "22px"})
                    } else {
                        size = 12;
                        $("#places_display").html(`<p>${data.country}</p><p>${data.province}</p><p>${data.city}</p><p>${data.county}</p>`)
                        $("#places_display p").css({"width":"25%", "float": "left", "text-align": "center","font-size": "19px"})
                    }
                }else {
                    $("#places_display").animate({
                        opacity: '0.7',
                        height: '8%',
                        width: '100%',
                    })
                    size = 10;
                    $("#places_display").html(`<p>${data.country}</p><p>${data.label}</p>`)
                    $("#places_display p").css({"width":"50%", "float": "left", "text-align": "center", "font-size": "24px"})
                }
            }

            var long, lat;
            if (data.long != undefined) {
                long = data.long;
            } else {
                long = 103.838224;
            }

            if (data.lat != undefined) {
                lat = data.lat;
            } else {
                lat = 36.067468;
            }
            // 百度地图API功能
            var map = new BMap.Map("allmap");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(long, lat), size);  // 初始化地图,设置中心点坐标和地图级别
            map.setCurrentCity("");   
            //添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
                mapTypes:[
                    BMAP_NORMAL_MAP,
                    BMAP_HYBRID_MAP
                ]}));     
            map.setCurrentCity("");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);
            addMarker(points);     //开启鼠标滚轮缩放
        })
    }
}