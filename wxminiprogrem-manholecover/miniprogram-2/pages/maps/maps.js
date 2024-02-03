// pages/maps/maps.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    //正常异常数据分类
    selectorArray: ['正常', '异常'],
    selectorIndex: 0,
    //距离范围分类
    select: false,//显示距离选择条框
    showDistanceCircle:false,
    tihuoWay: '距离', 
    scale: 16,//地图缩放显示
    //地图初始加载显示位置
    latitude: 28.226153,  
    longitude:  113.104519,
    addmissage: '选的位置',
    stitle:'湖南智能运护',
    markers: [],
    mapScale:10,
    inputValue: '',
    positionName: '',
    //controls控件 是左下角圆圈小图标,用户无论放大多少,点这里可以立刻回到当前定位(控件（更新一下,即将废弃，建议使用 cover-view 代替）)
    //地图当前定位
    currentLatitude: 28.226153, 
    currentLongitude: 113.104519,
    circleRadius: 500, // 单位：米
    circles: [],
    controls: [{
      id: 1,
      iconPath: '/images/controls.png',
      position: {
        left: 310,
        top: 400 - 10,
        width: 20,
        height: 20
      },
      clickable: true
    }],
    distanceArr: []//当前定位与每个站点之间距离的矩阵
  },



  // 点击下拉显示框
  bindShowMsg() {
    this.setData({
      select: !this.data.select,
      tihuoWay:'距离',
      
    
    });
  },
  // 点击下拉列表
  mySelect(e) {
    this.setData({
      tihuoWay: e.currentTarget.dataset.name,
      // select: false
      showDistanceCircle:!this.data.showDistanceCircle
    });
if (this.data.showDistanceCircle) {

  switch (e.currentTarget.dataset.name) {
    case '1km':
      this.setData({
        mapScale:14,
        circleRadius:1000
      });
      this.getLocation();
      this.drawCircle();
      break;
    case '3km':
      this.setData({
        mapScale:13,
        circleRadius:3000
       });
       this.getLocation();
       this.drawCircle();
      break;
    case '5km':
      this.setData({
        mapScale:12,
        circleRadius:5000
       });
       this.getLocation();
       this.drawCircle();
      break;
    case '10km':
      this.setData({
        mapScale:11,
        circleRadius:10000
       });
       this.getLocation();
       this.drawCircle();
      break;
    case '10+km':
      this.setData({
        mapScale:10,
        circleRadius:15000
       });
       this.getLocation();
       this.drawCircle();
      break;
    default:
      this.setData({
        mapScale:15,
        circleRadius:0
       });
       this.getLocation();
       this.drawCircle();
  };

} else {
  this.setData({
    select:false,
    tihuoWay:'距离',
    circles:[]
  })
}
   

  },


   // 获取当前位置
   getLocation: function () {
    const that = this;
    wx.getLocation({
      type: 'gcj02', // 使用国测局坐标系
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        that.setData({
          currentLatitude: latitude,
          currentLongitude: longitude,
        });
        that.setMapCenter();
      },
      fail(err) {
        console.error('获取位置失败', err);
      }
    });
  },

  // 设置地图中心
  setMapCenter: function () {
    const mapContext = wx.createMapContext('myMap');
    mapContext.moveToLocation();
  },

  //画出圆形区域
  drawCircle: function () {
    const { currentLatitude, currentLongitude, circleRadius } = this.data;
    const circles = [{
      latitude: currentLatitude,
      longitude: currentLongitude,
      color: '#FF0000AA', // 圆形颜色，带透明度
      fillColor: '#7cb5ec88', // 圆形内部填充颜色，带透明度
      radius: circleRadius,
      strokeWidth: 1, // 边框宽度
    }];
    this.setData({ circles: circles });
  },





  //pickerChange 函数监听下拉框选择的变化
  pickerChange: function (e) {
    this.setData({
      selectorIndex: e.detail.value,
    });
  },



  
  





  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options) {
     // 加载地理位置数据并在地图上显示
     this.loadAndDisplayMarkers();
     

  },





  //请求地理数据，加载地理位置数据并在地图上显示
  loadAndDisplayMarkers: function () {
   // 定义请求地址
   const apiUrl = app.globalData.baseUrl + '/sysPosition/list';
   
   // 发起GET请求
   wx.request({
     url: apiUrl,
     method: 'GET',
     success: (res) =>  {
       // 请求成功的回调函数
       // 在这里处理从服务器获取到的数据
       console.log('请求成功', res);
       // 假设服务器返回的数据是一个包含多个经纬度的数组
       const positions = res.data;
       // 将数据存储到本地
       wx.setStorageSync('mapPositions', positions);
       const storedPositions = wx.getStorageSync('mapPositions');
   
       if (storedPositions && storedPositions.data.length > 0) {
         const allMarkers = storedPositions.data.map((position, index) => {
           return {
             id: index,
             latitude: position.lat,
             longitude: position.lng,
             title: `位置${index + 1}`,
             width: 24,  
             height: 30,
             positionName: position.name ,
           };
         });
   
          // 计算地图中心点，可调整
          const centerLatitude = storedPositions.data.reduce((sum, position) => sum + position.lat, 0) / storedPositions.data.length;
          const centerLongitude = storedPositions.data.reduce((sum, position) => sum + position.lng, 0) / storedPositions.data.length;

          this.setData({
           latitude: centerLatitude,
           longitude: centerLongitude,
           markers: allMarkers
         });
         

       } else {
         console.log('本地暂无存储的地理位置数据或数组为空');
       }
     },
   });
  },

  //pickerChange 函数监听下拉框选择的变化,id偶未异奇为正
pickerChange: function (e) {
  this.setData({
    selectorIndex: e.detail.value,
  });
  const storedPositions = wx.getStorageSync('mapPositions');
  const filteredData_even = storedPositions.data.filter((item, index) => index % 2 === 1)
  const filteredData_odd = storedPositions.data.filter((item, index) => index % 2 === 0)
  //模拟异常数据id为偶数的为异常，进行筛选
  if (this.data.selectorIndex==1 && storedPositions.data.length > 0) {
    console.log("正常0，异常1：当前结果是",this.data.selectorIndex)
    console.log("filteredData_even:",filteredData_even)
    const filterMarkers = filteredData_even.map((position, index) => {
       // id偶数是异常
        return {
          id: position.id + 1,
          latitude: position.lat,
          longitude: position.lng,
          title: `位置${position.id + 2}`,
          width: 24,  
          height: 30,
          positionName: position.name ,
        };
        
    });

    // 计算地图中心点，可调整
    const centerLatitude = filteredData_even.reduce((sum, position) => sum + position.lat, 0) / filteredData_even.length;
    const centerLongitude = filteredData_even.reduce((sum, position) => sum + position.lng, 0) / filteredData_even.length;

    this.setData({
     latitude: centerLatitude,
     longitude: centerLongitude,
     markers: filterMarkers
   });




  }
  if (this.data.selectorIndex==0 && storedPositions.data.length > 0) {
    console.log("正常0，异常1：当前结果是",this.data.selectorIndex)
    console.log("filteredData_odd:",filteredData_odd)
    const filterMarkers = filteredData_odd.map((position, index) => {
       // id奇数是正常的
        return {
          id: position.id +1,
          latitude: position.lat,
          longitude: position.lng,
          title: `位置${position.id + 2 }`,
          width: 24,  
          height: 30,
          positionName: position.name ,
        };    
      
    });

// 计算地图中心点，可调整
const centerLatitude = filteredData_odd.reduce((sum, position) => sum + position.lat, 0) / filteredData_odd.length;
const centerLongitude = filteredData_odd.reduce((sum, position) => sum + position.lng, 0) / filteredData_odd.length;

this.setData({
 latitude: centerLatitude,
 longitude: centerLongitude,
 markers: filterMarkers
});

  }
},
  
  //输入框筛选数据并居中显示
  inputChange: function (e) {
    // 监听输入框变化
    this.setData({
      inputValue: e.detail.value
    });
  },

  search: function () {
    // 根据输入的 ID 或名称搜索对应的标记点
    const { inputValue, markers } = this.data;
    const targetMarker = markers.find(marker => {
      return marker.title.includes(inputValue) || marker.positionName.includes(inputValue);
    });
 
 
    if (targetMarker) {
      // 找到对应标记点，更新地图中心点
      this.setData({
        latitude: targetMarker.latitude,
        longitude: targetMarker.longitude,
        mapScale:15,
      });
    } else {
      console.log('未找到匹配的标记点');
      wx.showToast({
        title: '未找到匹配的标记点成功',
        icon:'error',
        duration: 2000
      })
    }        
  },
 
   markerTap: function (e) {
     console.log('点击了标记点', e.markerId+1);
     // 在这里你可以添加点击标记点后的逻辑
      // 更新文本框内容为完整数据集信息
      const storedPositions = wx.getStorageSync('mapPositions');
      const contentStringPosition = JSON.stringify(storedPositions.data[e.markerId])
      wx.showModal({
        title: '站点的详细数据信息',
        content: contentStringPosition,
        showCancel: false,
      });
   },

   // 点击图片触发的函数
   moveToCurrentLocation: function () {
    // 获取地图上下文
    const mapContext = wx.createMapContext('myMap'); 
    // 使用微信小程序的定位 API 获取当前位置
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success: (res)=> {
        //计算当前定位点与站点坐标之间的距离
        console.log("currentLoacation:",res.latitude,res.longitude)
        const distances = this.calculateAndCategorizeDistances(res.latitude, res.longitude);
        console.log(distances);
        this.setData({
          currentLatitude: res.latitude, 
          currentLongitude:res.longitude,
          distanceArr:distances
        });
        // 将地图中心设置为当前位置
        wx.createMapContext('myMap').includePoints({
          points: [{
            latitude: res.latitude,
            longitude: res.longitude,
          }],
        });
        const mapContext = wx.createMapContext('myMap');
        // 将地图中心设置为当前位置
        mapContext.moveToLocation();
    

      }
    });






  },


  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function(options) {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:function() {
 
  
  },



//计算当前位置与各站点之间直线距离
calculateAndCategorizeDistances: function (currentLatitude, currentLongitude) {
  const storedPositions = wx.getStorageSync('mapPositions');
  const allMarkers = storedPositions.data.map((position, index) => {
    return {
      id: index,
      latitude: position.lat,
      longitude: position.lng,
      title: `位置${index + 1}`,
      width: 24,  
      height: 30,
      positionName: position.name ,
    };
  });
  const markers = allMarkers;
  
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径（单位：千米）
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function categorizeDistance(distance) {
    if (distance <= 1) {
      return '1km';
    } else if (distance <= 3) {
      return '3km';
    } else if (distance <= 5) {
      return '5km';
    } else if (distance <= 10) {
      return '10km';
    } else {
      return 'Beyond 10km';
    }
  }




  const results = [];

  for (const marker of markers) {
    const distance = calculateDistance(
      currentLatitude,
      currentLongitude,
      marker.latitude,
      marker.longitude

    );
    const category = categorizeDistance(distance);

    results.push({
      marker,
      distance: distance.toFixed(2),
      category
    });
  }
  return results;
},


  // 导航事件
  navigateToDestination: function () {
    const { currentLocation, destination } = this.data;
    wx.openLocation({
      latitude: destination.lat,
      longitude: destination.lng,
      scale: 18,
      name: '目标位置',
      address: '目标位置地址',
      success: function(res) {
        console.log('打开地图成功', res);
      },
      fail: function(err) {
        console.error('打开地图失败', err);
      }
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