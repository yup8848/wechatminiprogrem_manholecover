// pages/personalCenter/personalCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '王某某',
    avatarUrl: '/images/avatar.png',
    phoneNumber: '123456789',
  },


  unbindWechat() {
    // 在这里编写解绑微信的逻辑，比如清除用户信息，跳转到登录页面等
    
    this.setData({
      username: 'John Doe',
      avatarUrl: '/images/avatar.png',
      phoneNumber: '123456789',
    });
    wx.reLaunch({
      url: '/pages/login/login',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 从本地存储中读取userInfo数据
    const userInfo = wx.getStorageSync('userInfo');
    const requestData_userlogininfo = wx.getStorageSync('requestData_userlogininfo');

    // 如果userInfo中有avatarUrl属性，则更新页面数据
    if (userInfo && userInfo.avatarUrl) {
      this.setData({
        avatarUrl: userInfo.avatarUrl
      });
    };


    // 如果requestData_userlogininfo中有wxid,phone属性，则更新页面数据
    if (requestData_userlogininfo && requestData_userlogininfo.wxid && requestData_userlogininfo.phone) {
    const app = getApp();
    this.setData({
      // username: requestData_userlogininfo.wxid,
      // phoneNumber:requestData_userlogininfo.phone,
      username:app.globalData.name,
      phoneNumber:app.globalData.phoneNumber,


    });
  };







  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
    
  
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