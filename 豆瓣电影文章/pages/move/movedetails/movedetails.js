// pages/move/movedetails/movedetails.js
const app=getApp();
const douban=app.globalData.doubanUrl;
import utils from "../../../utils/utils"
var http =utils.http;
var star=utils.star;
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var title =options.title;
    var id =options.id;
    var url='https://douban.uieee.com/v2/movie/'+id
    var url2='https://douban.uieee.com/v2/movie/subject/'+id
    // console.log(url)
   
    wx.showLoading({
      title: "数据加载中..."
    });
    http(url,this.handleDate);
    http(url2,this.handleDate2);
    wx.setNavigationBarTitle({
      title
    });
  },
  handleDate(res){
    var alt_title1=res.data.alt_title.split("/")[0];
    var country=res.data.attrs.country[0];
    var year=res.data.attrs.year[0];
    var count=res.data.tags[0].count;
    var count2=res.data.tags[1].count;
    var alt_title2=res.data.title;
    var average=res.data.rating.average;
   
    var director=res.data.attrs.director[0].split(" ")[0];
    // var cast=res.data.attrs.cast[0].split(" ")[0];
    var arr=res.data.attrs.cast;
    var ar =[];
   arr.forEach(ele=>{
       ar.push(ele.split(" ")[0])
   })
   var newarr1=ar.join(" / ");
   var arr2=res.data.tags;
   var a=[];
   arr2.forEach(ele=>{
       a.push(ele.name)
   })
   var newarr2=a.join(" 、 ");
   var summary=res.data.summary;
   var image=res.data.image;
    // console.log(res)
    // console.log(image)
    
    wx.hideLoading();
    this.setData({
      image,
      alt_title1,
      country,
      year,
      count,
      count2,
      alt_title2,
      average,
   
      director,
      newarr1,
      newarr2,
      summary
    })
   },
   handleDate2(res){
     var stars=star(res.data.rating.stars);
    //  console.log(stars)
     var con=res.data.casts
     var list=[];
     con.forEach(ele=>{
       var li={};
       li.name=ele.name;
       li.image=ele.avatars.small;

       list.push(li)
     })
    //  console.log(list)
    this.setData({
      list,
      stars
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