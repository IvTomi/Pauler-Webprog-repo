/**
 * 
 * @param {*} n Hányadik elem legyen kiemelve
 * @param {*} list A lista az az elem, amelyik tartalmazza az elemeket, és nem az elemek listája
 */
 function changeHighlithed(n,list){
    const selecters = list.children;
    if(n<selecters.length){
        const selected = selecters[n];
        for(let selecter of selecters){
            selecter.setAttribute('class','normal');
        }
        selected.setAttribute('class','selected');
    }
}

export default changeHighlithed;