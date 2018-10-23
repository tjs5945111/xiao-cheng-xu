function http(url, callback, type) {
    wx.request({
        url,
        header: {
            'Content-Type': 'json'
        },
        success: function (res) {
            callback(res,type);
        }
    });
}

function star(stars) {
    var value = stars.slice(0, 1);
    var arr = [];
    for (let i = 0; i < 5; i++) {
        if (i < value) {
            arr.push(1);
        } else {
            arr.push(0);
        }
    }
    return arr;
}
function sliceTitle(title){
    if(title.length>6){
        title = title.slice(0,6)+"...";
    }
    return title;
}
function handleCasts(casts){
   var arr = [];
   casts.forEach(ele=>{
       arr.push(ele.name);
   })
   var newArr = arr.join("/");
   return newArr;
}
function handleGenres(genres){
   var genres = genres.join("、");
   return genres;
}
export default {
    http,
    star,
    sliceTitle,
    handleCasts,
    handleGenres
}
