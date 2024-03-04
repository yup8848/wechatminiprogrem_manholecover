// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: 'John Doe',
    avatarUrl: '/images/avatar.png',
    phoneNumber: '123456789',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
      // 获取应用实例
      const app = getApp();
      this.setData({
        username:app.globalData.name,
        phoneNumber:app.globalData.phoneNumber
      })

      // 获取全局变量的值
      const name = app.globalData.name;
      const phoneNumber = app.globalData.phoneNumber;
      

  },




    // 保存按钮点击事件
    saveChanges: function () {
    const app = getApp();
    // 获取当前页面的 name 和 phoneNumber
    const newName = this.data.username;
    const newPhoneNumber = this.data.phoneNumber;

    // 检查值是否发生变化
    if (app.globalData.name !== newName || app.globalData.phoneNumber !== newPhoneNumber) {
      // 更新全局变量
      app.globalData.name = newName;
      app.globalData.phoneNumber = newPhoneNumber;

  
      // 缓存到本地
      wx.setStorageSync('requestData_userlogininfo', {
        wxid: newName,
        phone: newPhoneNumber
      });

      // 提示保存成功或其他操作
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      });

      wx.navigateTo({
        url: '/pages/personalCenter/personalCenter?username=newName&phoneNumber=phoneNumber',
      })



    } else {
      // 提示没有变化或其他操作
      wx.showToast({
        title: '没有变化',
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 输入框值变化事件
  onNameChange: function (e) {
    this.setData({
      username: e.detail.value
    });
  },

  onPhoneNumberChange: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    });
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









