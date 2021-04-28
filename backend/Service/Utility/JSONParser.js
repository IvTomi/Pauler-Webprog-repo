function combineJSON(json1,json2){
    let json = JSON.parse("{}")
    for(var key in json1){
        //json1[key] = json2[key]
        json[key] = json1[key]
    }
    for(var key2 in json2){
        //json1[key] = json2[key]
        json[key2] = json2[key2]
    }
    return json;
}

module.exports = {
    combineJSON:combineJSON
}