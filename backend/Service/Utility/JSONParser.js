function combineJSON(json1,json2){
    for(var key in json2){
        json1[key] = json2[key]
    }
    return json1;
}

module.exports = {
    combineJSON:combineJSON
}