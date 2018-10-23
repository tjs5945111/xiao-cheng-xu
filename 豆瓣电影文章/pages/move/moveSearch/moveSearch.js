// pages/move/moveSearch/moveSearch.js
import utils from"../../../utils/utils";
var http=utils.http;
var star=utils.star;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    value:null
  },
  onConfirm(e){
    wx.showLoading({
      title: "数据加载中..."
    });
  // console.log(e.detail.value)
  var count=e.detail.value;
  var url=`https://douban.uieee.com/v2/movie/search?q=${count}`;
  http(url,this.handleData);
  },
  handleData(res){
  //  console.log(res)
  var title =res.data.title;
  var subjects=res.data.subjects;
  var movies=[];
  subjects.forEach(ele => {
    var average=ele.rating.average;
    var stars=star(ele.rating.stars);
    var title=ele.title;
    var imgUrl=ele.images.small;
    var id=ele.id;
    var temp={
      average,
      stars,
      title,
      imgUrl,
      id
    };
    movies.push(temp);
  });
  this.setData({movies});
  wx.hideLoading();
     },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  moveDetails(res) {
    // console.log(res)
    var id = res.currentTarget.dataset.id;
    var title = res.currentTarget.dataset.title;
    // console.log(title)
    wx.navigateTo({
      url: '/pages/move/movedetails/movedetails?id='+id+"&title="+title,
    })
  },
  onForm(e){
    // console.log(e.detail.value);
    var value=e.detail.value.search;
    var url=`https://douban.uieee.com/v2/movie/search?q=${value}`;
    http(url,this.handleData);
  },
  onFocus(){
    this.setData({
      isShow:true
    })
  },
  onBlur(){
    this.setData({
      isShow:false
    })
  },
  onClick(){
    this.setData({
      value:""
    })
  }
})