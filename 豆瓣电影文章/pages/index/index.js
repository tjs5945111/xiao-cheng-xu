//index.js
//获取应用实例
const app = getApp()
Page({
  data:{
    list:[],
    count:0,
    show:false
  },
  onLoad(){
    var self=this;
    wx.request({
      // url: 'https://www.easy-mock.com/mock/5bac6e450132334db716717d/test/test',
      url: `https://douban.uieee.com/v2/movie/top250?start${self.data.count}&count=${self.data.count+20}`,
      header: {
        'Content-Type': 'json'
      },
      success: function(res) {
      //  var dat=res.data;
        var data=res.data.subjects;
        // var data=res.data.data;
        // self.setData({
        //   data,
        // });
        // console.log(res)
        // console.log(data);
       
        // temp.title=;
        var list=[];
        for(let key in data){
          var temp={};
    //  console.log(data[key]);
        temp.title=data[key].title;
        temp.images=data[key].images.small;
        temp.average=data[key].rating.average;
        list.push(temp);
        } 
        //console.log(list)
         self.setData({
          list,
//页面加载时取消加载图标
        show:true
        });
      }
    });
  },
//当页面滑到最底部时触发的事件（请求数据部分和上面的onload里面的求一样）
  onReachBottom: function () {
// 到底部下拉加载时最上方显示加载图标
    wx.showNavigationBarLoading();
    var self=this;
    // console.log(this.data.count)
    self.setData({
     count:self.data.count+20,
            });
            // console.log(this.data.count)
    // console.log(this.data.list);
  //  var count =20;
   wx.request({
    url: `https://douban.uieee.com/v2/movie/top250?start${self.data.count}&count=${self.data.count+20}`,
     header: {
      'Content-Type': 'json'
    },
     success: function(res){
      //  console.log(res);

      var data=res.data.subjects;
      var list=[];
        for(let key in data){
          var temp={};
        // console.log(data[key]);
        temp.title=data[key].title;
        temp.images=data[key].images.small;
        temp.average=data[key].rating.average;
        list.push(temp);
        } 
        self.setData({
         list,
//页面加载时取消加载图标
        show:true
        });
 // 当加载完毕时取消顶部加载图标
        wx.hideNavigationBarLoading()
     }
   })
  }
});