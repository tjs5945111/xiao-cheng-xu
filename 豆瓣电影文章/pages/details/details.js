// pages/details/details.js
const loacal = require("../../data/local");
//创建一个音乐实例
const audio = wx.getBackgroundAudioManager();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    list: [],
    isplay: false,
    collected:false,
    shared:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    wx.setNavigationBarTitle({
      title:"文章详情"
    });
    var key = options.id;
    // console.log(key)
    var self = this;
    var postList = loacal.postList;
    var list = []; 
    var temp = {};
    temp.author = postList[key].author;
    temp.dateTime = postList[key].dateTime;
    temp.detail = postList[key].detail;
    temp.musicurl = postList[key].music.url;
    temp.musiccoverImg = postList[key].music.coverImg;
    temp.imgSrc = postList[key].imgSrc;
    temp.avatar = postList[key].avatar;
    temp.title = postList[key].title;
    //数据下的id
    temp.id = postList[key].postId;
    list.push(temp);
    this.setData({
      postId:key,
      postList,
      list,
    });
    
    // 音乐暂停监听(页面加载时如果音乐为暂停状态改变音乐的状态图标)
    audio.onPause(() => {
      // console.log(1)
      this.setData({
        isplay: false
      })
    app.globalData.g_isPlay = false;
    app.globalData.g_currentId = null;
    });
    // 音乐播放监听(页面加载时如果音乐为播放状态改变音乐的状态图标)
    audio.onPlay(() => {
      // console.log(2)
      this.setData({
        isplay: true
      })
    app.globalData.g_isPlay = true;
    // 进入页面点击播放将id传到外部的局部变量中 退出当前页面换一个页面进入不会触发该事件
    app.globalData.g_currentId = self.data.list[0].id;
    });
    wx.onBackgroundAudioStop((result) => {
          // console.log(3)
          self.setData({
            isplay: false
          });
          app.globalData.g_currentId = null;
        });
     
    // this.onMusic();
    if (app.globalData.g_isPlay && app.globalData.g_currentId == key) {
      this.setData({
        isplay: true
      });
    }
        /* 1.有缓存则取值,没有缓存则创建缓存 */
        let allCollected = wx.getStorageSync('allCollected');
        if(allCollected){
          let storageCollected = allCollected[key];
          this.setData({
            collected:storageCollected
          })
        }else{
          let allCollected = {
          };
          allCollected[key]=false;
          wx.setStorageSync('allCollected', allCollected);
        }
       
  },
  playmusic() {
    var url = this.data.list[0].musicurl;
    // console.log(url)
    if (this.data.isplay) {
      wx.stopBackgroundAudio();  // 停止音频
      // audio.onPause();
      this.setData({
        isplay: false
      })
    } else {
      wx.playBackgroundAudio();     //播放音频
      // audio.onPlay();
      audio.src = url;
      this.setData({
        isplay: true
      })
    }
  },
  onCollect(){
    /* 2.更新缓存 */
    var allCollected = wx.getStorageSync('allCollected');
    var storageCollected = allCollected[this.data.postId];
    storageCollected = !storageCollected;
    allCollected[this.data.postId] = storageCollected;
    wx.setStorageSync("allCollected", allCollected);
    /* 3.更新收藏的状态 */
    this.setData({
      collected:storageCollected
    })
},
onShare(){
  wx.showActionSheet({
    itemList: ["分享到微信","分享到微博","分享到朋友圈"],
    itemColor: '#0477A9',
    success:res=>{
      console.log(res.tapIndex);
      this.setData({
        shared:true
      })
    },
    fail:err=>{
      this.setData({
        shared:false
      })
    }
  })
},
 

  //进入页面是根据音乐的播放状态来改变音乐状态图标
  // onMusic() {
  //   var self = this;
  //   //监听音乐播放事件（点击后触发的事件）

  //   wx.onBackgroundAudioPlay((result) => {
  //     // console.log(1)
  //     this.setData({
  //       isplay: true
  //     });
  //     app.globalData.g_isPlay = true;
  //     //进入页面点击播放将id传到外部的局部变量中 退出当前页面换一个页面进入不会触发该事件
  //     app.globalData.g_currentId = self.data.list[0].id;
  //   });
  //   wx.onBackgroundAudioPause((result) => {
  //     // console.log(2)
  //     this.setData({
  //       isplay: false
  //     })
  //     app.globalData.g_isPlay = false;
  //     app.globalData.g_currentId = null;
  //   });
  //   wx.onBackgroundAudioStop((result) => {
  //     // console.log(3)
  //     self.setData({
  //       isplay: false
  //     });
  //     app.globalData.g_currentId = null;
  //   });
  // },

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