Page({
  data: {
    currentLocation: { // 当前位置经纬度
      lat: 25.11,
      lng: 118.91,
    },
    destination: { // 目标位置经纬度
      lat: 24.11,
      lng: 118.91,
    },
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
});
