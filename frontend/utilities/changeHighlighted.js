/**
 * 
 * @param {*} n Hányadik elem legyen kiemelve
 * @param {*} list A lista az az elem, amelyik tartalmazza az elemeket, és nem az elemek listája
 */
 function changeHighlithed(n,list){
    const selecters = list.children;
    if(-1<n && n<selecters.length){
        const selected = selecters[n];
        for(let selecter of selecters){
            selecter.setAttribute('class','normal');
        }
        selected.setAttribute('class','selected');
    }
    else if(n===-1){
        for(let selecter of selecters){
            selecter.setAttribute('class','normal');
        }
    }
}

export default changeHighlithed;