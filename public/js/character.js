$(document).ready(function() {
    $("#alert").css({"height": "40px"}).prop("class", "text-danger")
    $("#top").css({"height": "40px"})
    $("#info").css({"height": "100px", "padding": "30px 0px", "text-align": "center"})
    if(localStorage.getItem("poem_ch")) {
        $("#ch_input").prop("placeholder", localStorage.getItem("poem_ch"))
        $("#ch_input").val(localStorage.getItem("poem_ch"))
        search()
        $("#ch_input").prop("placeholder", "")
        localStorage.removeItem("poem_ch")
    }else {
        $("#ch_input").val("")
    }
    if(localStorage.getItem("character")) {
        $("#ch_input").prop("placeholder", localStorage.getItem("character"))
        $("#ch_input").val(localStorage.getItem("character"))
        search()
        $("#ch_input").prop("placeholder", "")
        localStorage.removeItem("character")
    }else {
        $("#ch_input").val("")
    }
})

$("#ch_input").click(function() {
    if($("#ch_input").prop("placeholder") != "") {
        let key = $("#ch_input").prop("placeholder")
        $("#ch_input").val(key)
        $("#ch_input").prop("placeholder", "")
    }
})

$("#ch_search").click(search)

function search() {
    let value = $("#ch_input").val()
    let reg = /\s/g
    value = value.replace(reg, "")
    if(value == "") {
        $("#alert").text("输入不能为空！")
    }else {
        $("#alert").text("")
        $("#info").html(`<p>正在搜索“<font color="#1e90ff">${value}</font>”, 请稍等...</p>`)
        $.get(`http://tdye123.picp.net:12757/character/1?wd=${value}`, function(data) {
            $("#info").hide()
            if(data[0] === undefined) {
                $("#ch_display").html(`<p>找不到与“${value}”有关的信息！</p>`)
                $("#ch_display p").css("text-align", "center")
            }else {
                let html = ""
                for(let i = 0; i < data.length; i ++) {
                    html += `<div class="panel panel-success">
                                <div class="panel-heading">
                                    <h4>${data[i].name}</h4>
                                </div>
                                <div class="panel-body">
                                    <p><b>性别</b>：${data[i].gender}</p>
                                    <p><b>朝代</b>：<a onclick="send_dyna('${data[i].dynasty}')">${data[i].dynasty}</a></p>
                                    <p><b>生</b>：${data[i].birth}</p>
                                    <p><b>卒</b>：${data[i].death}</p>`
                    for(let j = 0; j < data[i].alias.length; j ++) {
                        html += `<p><b>${data[i].alias[j].AliasType}</b>：${data[i].alias[j].AliasName}</p>`
                    }
                    let address = ""
                    let str = ""
                    for(let j = 0; j < data[i].address.length; j ++) {
                        if(data[i].address[j].address6 == "") {
                            if(data[i].address[j].address5 == "") {
                                if(data[i].address[j].address4 == "") {
                                    if(data[i].address[j].address3 == "") {
                                        if(data[i].address[j].address2 == "") {
                                            if(data[i].address[j].address1 == "") {
                                                str = ""
                                            }else {
                                                str = `<a onclick="send_dyna('${data[i].address[j].address1}')">${data[i].address[j].address1}</a>`
                                            }
                                        }else {
                                            str = `<a onclick="send_place('${data[i].address[j].address1}')">${data[i].address[j].address1}</a>\
                                            <a onclick="send_dyna('${data[i].address[j].address2}')">${data[i].address[j].address2}</a>` 
                                        }
                                    }else {
                                        str = `<a onclick="send_place('${data[i].address[j].address1}')">${data[i].address[j].address1}</a>\
                                        <a onclick="send_place('${data[i].address[j].address2}')">${data[i].address[j].address2}</a>\
                                        <a onclick="send_dyna('${data[i].address[j].address3}')">${data[i].address[j].address3}</a>`
                                    }
                                }else {
                                    str = `<a onclick="send_place('${data[i].address[j].address1}')">${data[i].address[j].address1}</a>\
                                    <a onclick="send_place('${data[i].address[j].address2}')">${data[i].address[j].address2}</a>\
                                    <a onclick="send_place('${data[i].address[j].address3}')">${data[i].address[j].address3}</a>\
                                    <a onclick="send_dyna('${data[i].address[j].address4}')">${data[i].address[j].address4}</a>`
                                }
                            }else {
                                str = `<a onclick="send_place('${data[i].address[j].address1}')">${data[i].address[j].address1}</a>\
                                    <a onclick="send_place('${data[i].address[j].address2}')">${data[i].address[j].address2}</a>\
                                    <a onclick="send_place('${data[i].address[j].address3}')">${data[i].address[j].address3}</a>\
                                    <a onclick="send_place('${data[i].address[j].address4}')">${data[i].address[j].address4}</a>\
                                    <a onclick="send_dyna('${data[i].address[j].address5}')">${data[i].address[j].address5}</a>`
                            }
                        }else {
                            str = `<a onclick="send_place('${data[i].address[j].address1}')">${data[i].address[j].address1}</a>\
                                    <a onclick="send_place('${data[i].address[j].address2}')">${data[i].address[j].address2}</a>\
                                    <a onclick="send_place('${data[i].address[j].address3}')">${data[i].address[j].address3}</a>\
                                    <a onclick="send_place('${data[i].address[j].address4}')">${data[i].address[j].address4}</a>\
                                    <a onclick="send_place('${data[i].address[j].address5}')">${data[i].address[j].address5}</a>\
                                    <a onclick="send_dyna('${data[i].address[j].address6}')">${data[i].address[j].address6}</a>`
                        }
                        if(j >= 1) {
                            address += `&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp${str}<br>`
                        }else {
                            address += `${str}<br>`
                        }
                    }
                    html += `<p><b>籍贯</b>：${address}</p>`

                    let texts = '';
                    let str1 = '';
                    for (var k = 0; k < data[i].texts.length; k ++) {
                        str1 = `<a onclick="send_work('${data[i].texts[k].TextName}')">${data[i].texts[k].TextName}</a>&emsp;`

                        texts += str1;

                    }
                    html += `<p><b>作品</b>：${texts}`

                 
                    html += `<input type="button" class="form-control" value="人物关系" onclick="clickBubbble('${data[i].name}', ${i})">
                            </div></div>`
                }
                $("#ch_display").html(html)
                $(".panel-heading").css("text-align", "center")
            }
        })
    }
}

function clickBubbble (data, i) {
    localStorage.setItem("name", data)
    localStorage.setItem("name_id", i)
    $(window).prop("location", "bubble.html")
}

function send_place (place) {
    localStorage.setItem("place", place)
    $(window).prop("location", "place.html")
}

function send_dyna (dyna) {
    localStorage.setItem("ch_dyna", dyna)
    $(window).prop("location", "dynasty.html")
}

function send_work (work) {
    localStorage.setItem("work", work);
    $(window).prop("location", "work.html");
}