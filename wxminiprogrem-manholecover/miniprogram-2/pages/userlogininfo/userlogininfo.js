// pages/userlogininfo/userlogininfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phoneNumber: '',

  },

  // Handle input for name
  inputName: function (e) {
    this.setData({
      name: e.detail.value,
    });
   
  },
   // Handle input for phone number
   inputPhoneNumber: function (e) {
    const inputValue = e.detail.value;
    const numericRegex = /^[0-9]*$/;
    const numericLength = /^\d{11}$/;
    if (numericRegex.test(inputValue)&&numericLength.test(inputValue)) {
      // If the input is a valid number, update the phoneNumber in the data
      this.setData({
        phoneNumber: inputValue,
      });
    } else {
      // If the input is not a valid number, you can choose to handle it accordingly
      wx.showToast({
        title: '请输入有效的电话号码',
        icon: 'none',
      });
      // Optionally, you can clear the input or take other actions
      this.setData({
        phoneNumber: '',
      });

    }
  },

   // Submit user information to the server
   submitUserInfo: function () {
    const {  name, phoneNumber } = this.data;
    console.log('name, phoneNumber',name,phoneNumber)
    // 设置全局变量
    app.globalData.name = name;
    app.globalData.phoneNumber = phoneNumber;


    // Check if name and phone number are not empty
    if (!name.trim() || !phoneNumber.trim()) {
      console.log(" name and phone number are not empty")
      wx.showToast({
        title: '姓名和手机号不能为空',
        icon: 'none',
        duration: 1000,
      });
      return;
    }

    // Construct the request data
    const requestData = {
      wxid: name,
      phone: phoneNumber,
    };

    wx.setStorageSync('requestData_userlogininfo', requestData);

    // Make a POST request to upload user information
    wx.request({
      url: app.globalData.baseUrl + '/sysUser/wxdetail',
      method: 'POST',
      header: {
        'content-type': 'application/json',
      },
      data: requestData,
      success: (res) => {
        console.log('用户信息name&phone_POST请求成功:', res);
        wx.switchTab({
          url: '/pages/home/home',
        });
        // Handle the server response as needed
        // For example, show a success message or navigate to another page
        wx.showToast({
          title: '信息提交成功',
          icon: 'success',
          duration: 2000,
          complete: function () {
            // Navigate to another page or perform other actions
            wx.switchTab({
              url: '/pages/home/home',
            });
          },
        });
      },
      fail: (res) => {
        console.error('POST请求失败:', res);
        // Handle the failure scenario
        wx.showToast({
          title: '信息提交失败，请重试',
          icon: 'none',
        });
      },
    });
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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