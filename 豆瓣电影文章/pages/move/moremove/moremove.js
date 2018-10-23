// pages/move/moremove/moremove.js
import utils from"../../../utils/utils";
var http=utils.http;
var star=utils.star;
const app=getApp();
const douban=app.globalData.doubanUrl;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    start:0,
    // 定义movies的数据是否为空
    isEmpty:true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    });
console.log(options);
    var title =options.title;
    var type =options.type;
    var url=douban+type;
    http(url,this.handleData);
    /* 设置标题 */
    wx.setNavigationBarTitle({
      title
    });
    this.setData({
      type,
    })
  },
  handleData(res){
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
      // isEmpty定义movies是否为空
      if(this.data.isEmpty){
        this.setData({
          movies,
          title,
          isEmpty:false
        })   
      }else{
        this.setData({
          movies:this.data.movies.concat(movies)
        })
      }
    wx.hideLoading();
   },
   onReachBottom: function (){
    var type = this.data.type;
    this.data.start+=20;
    var start = this.data.start;
    var url = `${douban}${type}?start=${start}&count=20`;
    http(url,this.handleData);
    //下拉触发加载
    wx.showLoading({
      title:"加载数据"
    });
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
 

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})