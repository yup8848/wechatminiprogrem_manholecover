// app.js
App({
  globalData: {
    projects: [], // 存储所有项目的数组
    currentProject: null, // 当前项目
    "baseUrl": "http://qz5mic.natappfree.cc",
    shouldExecuteScanCode: true,//QR扫码切换
    name: '',//用户输入的用户名
    phoneNumber: '',//用户输入的电话号码
  },
  // 全局方法，用于新建项目
  createProject(projectName) {
    const existingProjects = wx.getStorageSync('projects') || [];
                    // 检查是否已存在相同名称的项目
    const existingProject = existingProjects.find(project => project.projectName === projectName);
    if (existingProject) {
      this.setCurrentProject(existingProject);
    } else {
    const newProject = {
      projectName: projectName,
      dataCollection: [],
    };
    // 添加到 projects 数组
    existingProjects.push(newProject);
    // 存储到本地缓存
    wx.setStorageSync('projects', existingProjects);
  
    // this.globalData.projects.push(newProject);
    this.setCurrentProject(newProject);
           }
  },

  // 全局方法，用于设置当前项目
  setCurrentProject(project) {
    this.globalData.currentProject = project;
  },

  // 全局方法，用于向当前项目添加数据
  addDataToCurrentProject(data) {
    const currentProject = this.globalData.currentProject;
    if (currentProject) {
      // 假设数据格式包含 lng 和 lat 字段,这里用了缓存的数据mapPosition的key值
      const newData = {
      // lng: data.data[5].lng || null,
      // lat: data.data[5].lat || null,
      SN_QRcode_data:data
    };
      currentProject.dataCollection.push(newData);
      // 更新 projects 数组中对应项目的 dataCollection 
      const existingProjects = wx.getStorageSync('projects') || [];
      const existingProjectIndex = existingProjects.findIndex(project => project.projectName === currentProject.projectName);
      if (existingProjectIndex !== -1) {
        existingProjects[existingProjectIndex].dataCollection = currentProject.dataCollection;
        wx.setStorageSync('projects', existingProjects);
      }
      console.log('数据添加成功', currentProject);
    } else {
      console.error('当前项目不存在');
    }
  },

   
  
  onLaunch:function (options) {

  },

  

 








})
