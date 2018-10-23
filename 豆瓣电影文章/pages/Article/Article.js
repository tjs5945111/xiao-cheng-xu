// pages/Article/Article.js
var loacal = require("../../data/local")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    imgUrl: [
      { src: "/images/post/bl.png",id:1 },
      { src: "/images/post/crab.png",id:0 },
      { src: "/images/post/sls.png",id:2 }
    ],
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title:"文章"
    });
    var self = this;
    var postList = loacal.postList;
    var list = [];
    for (let key in postList) {
      var temp = {};
      temp.time = postList[key].date;
      temp.title = postList[key].title;
      temp.imgUrltop = postList[key].avatar;
      temp.imgUrlsrc = postList[key].imgSrc;
      temp.collection = postList[key].collection;
      temp.reading = postList[key].reading;
      temp.postId = postList[key].postId;
      list.push(temp);
      this.setData({
        postList,
        list,
      });
    }
    // console.log(this.data.title)
  },
  handClick(event){
    var id=event.currentTarget.dataset.id;
    //console.log(event.currentTarget.dataset.id)
    wx.navigateTo({
      url:"/pages/details/details?id="+id
  });
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