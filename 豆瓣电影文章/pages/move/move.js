// pages/move/move.js
const app=getApp();
const douban=app.globalData.doubanUrl;
import utils from "../../utils/utils"
var http =utils.http;
var star=utils.star;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    "in_theaters":{},
    "coming_soon":{},
    "top250":{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"电影"
    });
    wx.showLoading({
      title: "数据加载中..."
    });
    var count="?start=0&count=3";
    var inTheatersUrl=douban+"in_theaters"+count;
    var comingSoon=douban+"coming_soon"+count;
    var top250=douban+"top250"+count;
    // console.log(options)
    http(inTheatersUrl,this.handleDate,"in_theaters");
    http(comingSoon,this.handleDate,"coming_soon");
    http(top250,this.handleDate,"top250");
   
  },
   handleDate(res,type){
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
    var readyData={};
    readyData[type]={
      movies,
      title,
      type
    };
    this.setData(readyData);
    wx.hideLoading();
   },
   searchMore(){
     wx.navigateTo({
       url: '/pages/move/moveSearch/moveSearch',
     })
   },
   moreMove(res){
    //  console.log(res)
     var type=res.currentTarget.dataset.type;
     var title=res.currentTarget.dataset.title;
    wx.navigateTo({
      url: '/pages/move/moremove/moremove?type='+type+"&title="+title,
    })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})