// pages/userlogininfo/userlogininfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phoneNumber: '',
    openId:'',
    userId:null ,
  },


  


  inputName: function (e) {
    this.setData({
      name: e.detail.value,
    });
  },

   inputPhoneNumber: function (e) {
    const inputValue = e.detail.value;
    const numericRegex = /^[0-9]*$/;
    const numericLength = /^\d{11}$/;
    if (numericRegex.test(inputValue)&&numericLength.test(inputValue)) {
      this.setData({
        phoneNumber: inputValue,
      });
    } else {
      wx.showToast({
        title: '请输入有效的电话号码',
        icon: 'none',
      });
      this.setData({
        phoneNumber: '',
      });
    }
  },

   submitUserInfo: function () {
    const {  name, phoneNumber } = this.data;
    console.log('name, phoneNumber',name,phoneNumber)
    // 设置全局变量
    app.globalData.name = name;
    app.globalData.phoneNumber = phoneNumber;
    if (!name.trim() || !phoneNumber.trim()) {
      wx.showToast({
        title: '姓名和手机号不能为空',
        icon: 'none',
        duration: 1000,
      });
      return;
    }
  
    // 从缓存中获取数据
    wx.getStorage({
      key: 'wxLogin',
      success: (res)=> {
        const openid = res.data.openid;
        const userId = res.data.userId;
        this.setData({
          openId: openid,
          userId:userId,
        });
        console.log('成功获取到userId:', this.data.userId  );
        wx.request({
          url: app.globalData.baseUrl + '/iot/welllid/bindUserInfo',
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded',   
          },
          data:{
            phone:phoneNumber,
            realName:name,
            userId:this.data.userId,
          },
          success: (res) => {
            console.log('用户信息name&phone_POST请求成功:', res);
            wx.switchTab({
              url: '/pages/home/home',
            });
            wx.showToast({
              title: '信息提交成功',
              icon: 'success',
              duration: 2000,
              complete: function () {
                wx.switchTab({
                  url: '/pages/home/home',
                });
              },
            });
          },
          fail: (res) => {
            console.error('POST请求失败:', res);
            wx.showToast({
              title: '信息提交失败，请重试',
              icon: 'none',
            });
          },
        }); 
      },
      fail: function (err) {
        // 缓存中没有找到对应的数据
        console.log('获取openid失败：', err);
      }
    });

    const requestData = {
      realName: name,
      phone: phoneNumber,
      userId:this.data.userId,
      
    };
    wx.setStorageSync('requestData_userlogininfo', requestData);
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userId = options.userId;
    this.setData({
      userId:userId
    })
    getApp().globalData.userId = userId;
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