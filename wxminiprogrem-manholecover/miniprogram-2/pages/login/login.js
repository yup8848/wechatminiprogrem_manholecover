// pages/login/login.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showModalOnHomeLoad: false, // 默认为 false，表示在 home 页面加载时显示模态框
    code:'',
  },



  // 获取用户信息
  getUserProfile: function (e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        const userInfo = res.userInfo;
        const encryptedData = res.encryptedData;
        const iv = res.iv;
        console.log("encryptedData&&iv:",encryptedData,iv)


        // 获取用户昵称和头像信息
        const { nickName, avatarUrl } = userInfo;
        console.log("userInfo(nickName, avatarUrl):",userInfo)
        // 发送 POST 请求
        this.sendUserInfoToServer(userInfo);

        // 可以将用户信息存储到本地，或发送到服务器进行登录验证等操作
        // 例如：存储到本地
        wx.setStorageSync('userInfo', userInfo);

        // 跳转到其他页面，或进行其他操作
        wx.navigateTo({
          url: '/pages/userlogininfo/userlogininfo',
        })
      },
      fail: (res) => {
        console.log(res);
      },
    });
  },

  
    // 小程序登录
    userLogin:function (e) {
      //调用 wx.login 获取登录凭证code
     let that = this
      wx.login({
        success (res) {
          if (res.code) {
            that.setData({
              code:res.code
            })
            //发起网络请求
            console.log(" wx.login发起网络请求"),
            wx.request({
              url: app.globalData.baseUrl + '/Wxmini/login',
              method: 'POST', 
              data: {
                appid: 'wx62c19a65d8733102',
                secret: '09fa70815eca3de75c5216acd3b241cb',
                js_code:res.code,
                grant_type: 'authorization_code',
              },
              success: (res) => {
                console.log("wx.login发起网络请求res&code:", res)
              }
            })
     
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },





 // 发送用户信息到服务器
 sendUserInfoToServer: function (userInfo) {
  const apiUrl = app.globalData.baseUrl + '/Wxmini/login';
  const requestData = {
    appid: 'wx62c19a65d8733102',
    secret: '09fa70815eca3de75c5216acd3b241cb',
    js_code: this.data.code,
    grant_type: 'authorization_code',
    userInfo: userInfo,
  };
  wx.request({
    url: apiUrl,
    method: 'POST',
    header: {
      'content-type': 'application/json', // 设置为 JSON 格式
    },
    data: requestData,
    success: (res) => {
      console.log('用户信息nickname&avartar到服务器Server response:', res.data);

      // 在这里可以处理服务器的响应，根据实际需求进行处理
    },
    fail: (res) => {
      console.error('Request to server failed:', res);
    },
  });
},

// '登录授权'按钮处理逻辑
handleLogin: function () {
  this.userLogin();
  this.getUserProfile();
  
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
    // this.userLogin();

    let isFirstLoad = wx.getStorageSync('isFirstLoad');
    if(!isFirstLoad)
     wx.showModal({
       title: '授权登录',
       content: '请点击授权登录，现在登录？',
       cancelText: '取消',
       confirmText: '前往',
       success: (res) => {
         if (res.confirm) {
           // User clicked '前往', redirect to the login page
          //  wx.reLaunch({
          //    url: '/pages/login/login'
          //  });
         } else if (res.cancel) {
           // User clicked '取消', handle accordingly or leave it empty
          //  wx.exitMiniProgram({
          //    success: function (res) {
          //      console.log('User clicked 取消, MiniProgram exited');
          //    }
          //  });
          wx.reLaunch({
            url: '/pages/home/home.js',
          })
         }
       }
     });
     wx.setStorageSync('isFirstLoad', true);





     
  },
  


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})