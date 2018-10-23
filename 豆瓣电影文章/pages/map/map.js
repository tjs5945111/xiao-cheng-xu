// pages/map/map.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude:30.689160,  //纬度
    longitude:114.372640, //经度
    circles:[{      //目标区域的圆形圈
      latitude:30.689160,  //纬度
      longitude:114.372640, //经度
      fillColor:"#8DE25055",
      radius:30
    }],
//给目标位置一个图片
    markers: [{
      iconPath: "/images/tab/12.png",
      latitude:30.689160,  //纬度
      longitude:114.372640, //经度
      width: 30,
      height: 30,
      id:0,
//给目标地点一个标注信息
      label:{
        content:"湖北大学知行学院",
        color:"#EE5E7B",
        borderWidth:1,
        borderColor:"#EE5E78",
        borderRadius:5,
        padding:5,
      },
//冒泡事件（点击显示信息的信息配置）
      callout:{
        content:"欢迎来到湖北大学知行学院",
        color:"#EE5E7B",
        borderWidth:1,
        borderColor:"#EE5E78",
        borderRadius:5,
        padding:5,
      }
    }],
  },
//调用冒泡事件
  marker(){
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 wx.setNavigationBarTitle({
      title:"地图"
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