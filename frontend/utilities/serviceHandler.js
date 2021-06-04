import HTMLTag from "./HTMLTag.js";

export function makeRequest(endpoint,requestType,requestHeaders,requestData,successCallback,errorCallback){
    console.log(requestData)
    $.ajax({
        url:"http://localhost:6969" + endpoint,
        type:requestType,
        timeout: 500,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data:requestData,
        timeout:15000,
        headers:JSON.parse(requestHeaders),
        success:successCallback,
        //error:errorCallback
        error:onAjaxFail
    })
}

export function onAjaxFail(){
    alert('Server not found');
}

export function onRequestFailed(message){
    const div = new HTMLTag('div').addClass('reqError').prepend(document.body);
    new HTMLTag('p').setText(message).append(div);
    new HTMLTag('button').setText('OK').append(div).onclick(()=>{
        const div = document.querySelector('.reqError');
        document.body.removeChild(div);
    })
}

