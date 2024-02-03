
const app = getApp();
// pages/QRcode/QRcode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    snCodeText: '请扫码获得SN码',
    equipmentName:'',//设备信息中扫码输入获取sn码和设备名称信息
    //--------------------------分割线--------------------------//
    siteName: '', // 用于存储用户输入的站点名称
    siteCode: '',
    remarks: "",//备注
    imagePath: '',// 存储图片的临时路径
    uploadedPhotos:[],//保存上传路径的照片
    canExecuteOnShow: true,//保障选择图片不会调用onShow内的函数
    chosenImageSrc:['/images/addcamera.png','/images/addcamera.png','/images/addcamera.png','/images/addcamera.png','/images/addcamera.png'],
     // 存放定位信息
     locationInfo: {
      latitude: 0,
      longitude: 0,
      address: "请等待地图定位地址"
    },
  },

  // 扫码icon点击保存按钮触发的函数
  saveData: function() {
    const snCode = this.data.snCodeText;
    // 将扫码结果存储到本地
    wx.setStorage({
      key: 'snCode',
      data: snCode,
      success: function() {
        console.log('扫码结果已保存');
      },
      fail: function() {
        console.error('保存失败');
      },
    });
  },

   // 站点名称输入框内容改变时触发
   bindSiteNameInput: function (e) {
    this.setData({
      siteName: e.detail.value
    });
  },

  bindSiteCodeInput: function (e) {
    // 将用户输入的站点编码保存到data中
    this.setData({
      siteCode: e.detail.value
    });
  },
    
    

   // 图标点击事件
   uploadPhoto: function (event) {
     console.log("触发照片的点击")
     const photoIndex = event.currentTarget.dataset.index;
     // 打印当前选择的是哪个照片，photo-index的值
       console.log('photo-index:', photoIndex);
      // 设置标志位为false，阻止onShow执行
    this.setData({
      canExecuteOnShow: false
    });
    let that = this;
    wx.chooseMedia({
      mediaType: ['image'],
      success: function (res) {
      // 处理选择成功的情况
        console.log("图片选择成功",res);
        // 在这里调用保存到本地的方法
        // 获取临时文件路径
      var tempFilePath = res.tempFiles[0].tempFilePath;
      console.log('tempFilePath:',tempFilePath);
      // 更新data中的chosenImageSrc
      const chosenImageSrc = that.data.chosenImageSrc;
      chosenImageSrc[photoIndex] = tempFilePath;
      that.setData({
        chosenImageSrc: chosenImageSrc
      });
        
      // 获取当前页面的uploadedPhotos数组
    const uploadedPhotos = that.data.uploadedPhotos || [];
      // 将新的照片路径添加到数组中
      uploadedPhotos.push({
        index: photoIndex,
        path: tempFilePath
      });
      // 将更新后的数组存储回去
      wx.setStorageSync('uploadedPhotos', uploadedPhotos);
      },
      fail: function (res) {
        // 处理选择失败的情况
        console.error(res);
      },
      cancel: function (res){
        console.log('取消上传图片了')
        wx.reLaunch({
          url: '/pages/home/home',
        })
      },
    });
  },



  








  // 输入备注
  inputRemarks: function (e) {
    this.setData({
      remarks: e.detail.value
    });
  },




  



  // 点击保存按钮时触发
  saveToLocal: function () {
    // 保存用户输入的站点名称和编码到本地存储
    wx.setStorageSync('siteName', this.data.siteName);
    wx.setStorageSync('siteCode', this.data.siteCode);
    wx.setStorageSync('remarks', this.data.remarks);
    // 将上传的照片路径保存到本地缓存中
    wx.setStorageSync('uploadedPhotos',this.data.uploadedPhotos);
    // 将获取的地址信息保存到本地缓存中
     wx.setStorageSync('locationInfo.address',this.data.locationInfo.address);

    // 提示保存成功
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    });
  },








  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {

     // 获取地理位置
     this.getLocation();

  },

  // 点击图标获取地理位置
  getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        const latitude = res.latitude;
        const longitude = res.longitude;

      // 更新页面数据
      this.setData({
        locationInfo: {
          latitude: latitude,
          longitude: longitude,
          address: "新的地址" 
        }
      });

        // 这里可以调用逆地址解析API获取具体地址
        this.reverseGeocoding(latitude, longitude);
      },
      fail: (error) => {
        console.error('获取地理位置失败', error);
        // 获取失败时判断是否是用户拒绝了权限
        if (error.errMsg === 'getLocation:fail auth deny') {
          // 引导用户前往设置页面开启地理位置权限
          wx.showToast({
            title: '请前往设置页面开启地理位置权限',
            icon: 'none',
            duration: 2000
          });
        };
        this.setData({
          locationInfo: {
            latitude: 0,
            longitude: 0,
            address: "获取地理位置失败"
          }
        });
      }
    });
  },


    // 点击图标触发的事件
    onMarkerTap: function () {
      // 重新获取位置信息
      this.getLocation();
    },

  // 逆地址解析，将经纬度转换为具体地址
  reverseGeocoding: function (latitude, longitude) {
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        location: `${latitude},${longitude}`,
        key: 'DGJBZ-TFIWT-KK4X6-LHNRR-LWLYJ-2TFMO', // 腾讯地图API密钥
        get_poi: 1
      },
      success: (res) => {
        console.log("res:",res)
        const address = res.data.result.address;
        // 更新页面数据
        this.setData({
          'locationInfo.latitude': latitude,
          'locationInfo.longitude': longitude,
          'locationInfo.address': address
        });
      },
      fail: (error) => {
        console.error('逆地址解析失败', error);
      }
    });
  },

  // 输入框内容改变时触发的事件
  inputLocation: function (e) {
    // 这里可以处理输入框内容改变时的逻辑
    console.log('输入框内容改变', e.detail.value);
  },

  onTabItemTap(item) {
    // 当点击 tabBar 时触发
    console.log('点击 tabBar', item);
    this.scanCode();
  },


 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function (options) {
    // if (getApp().globalData.shouldExecuteScanCode&&this.data.canExecuteOnShow) {
    //   console.log("这里是onShow")
    //   this.scanCode();
    //   getApp().globalData.shouldExecuteScanCode = false;
    // }else {
    //   // 重置标志位，以便下次onShow能够执行
    //   this.setData({
    //     canExecuteOnShow: true
    //   });
    // }

  },



  scanCode: function () {
    const that = this;
    // 调用微信小程序的扫码接口
    wx.scanCode({
      success: (res) => {
        console.log("扫码结果:",res.result); // 扫码成功后的回调，可以获取到扫码结果
        const snCode = res.result; 
        let parts = snCode.split(' ');
        let snCodeText = parseInt(parts[0]);
        let equipmentName = parts.slice(1).join(' ');
        that.setData({
          snCodeText: snCodeText,
          equipmentName:equipmentName,
        });
        wx.setStorageSync('SN_QRcode_data', res.result) ;
        const SN_QRcode_cachedData = wx.getStorageSync('SN_QRcode_data');
        // 将缓存的数据添加到当前项目的dataCollection中               
        app.addDataToCurrentProject(SN_QRcode_cachedData) ;
       
      },
      fail: (res) => {
        wx.reLaunch({
          url: '/pages/home/home',
        })
      // 扫码失败的回调  console.error(res); 
 
      },
      cancel: function (res){
        console.log('取消扫码了')
        wx.reLaunch({
          url: '/pages/home/home',
        })
      },

      complete: () => {
        getApp().globalData.shouldExecuteScanCode = true;
      },
    });
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