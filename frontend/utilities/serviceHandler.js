
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
        error:errorCallback
    })
}
