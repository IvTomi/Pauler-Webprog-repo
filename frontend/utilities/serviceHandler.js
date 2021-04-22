
export function makeRequest(endpoint,requestType,requestHeaders,requestData,successCallback,errorCallback){
    $.ajax({
        url:"http://localhost:6969" + endpoint,
        type:requestType,
        timeout: 500,
        data:JSON.parse(requestData),
        headers:JSON.parse(requestHeaders),
        success:successCallback,
        error:errorCallback
    })
}
