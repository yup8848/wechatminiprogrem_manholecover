# wechatminiprogrem_manholecover
##智能井盖微信小程序

登录界面	用户授权按钮，首次登录提示输入用户信息（姓名和手机号）上传到服务器。
	![image](https://github.com/yup8848/wechatminiprogrem_manholecover/assets/53653523/8deb7e25-de59-4974-bafc-c55f8fe73405)
  
  ![image](https://github.com/yup8848/wechatminiprogrem_manholecover/assets/53653523/eb61365c-6a0e-4179-8790-2c339f336004)

  ![image](https://github.com/yup8848/wechatminiprogrem_manholecover/assets/53653523/4c870fab-840a-4c05-bb1a-1101e76bcca3)


 
站点（运维监测）	所有站点信息，增删改
	导航栏可以进入新建项目列表，这个建立的项目应该包括所有一批的采购设备（服务器数据库，有这个项目名称，扫SN码的所有设备存于数据库这个项目名称列表下）
	扫SN码安装的设备全在这个新建的项目下。列表显示已上报的设备信息，可进入详细查看。
	从服务器获得的这个新建项目的所有安装设备的信息（安装信息，运维信息），一个设备一条安装信息（位置，站点编码等），一个运维信息（温度角度电量报警状态等）
	可以通过“编码，名称，地址”等方式搜索筛选该项目运维设备信息的查看
 ![image](https://github.com/yup8848/wechatminiprogrem_manholecover/assets/53653523/c0e978f3-3ed5-43cf-ac78-9f76b3a062a2)

 
扫码（设备安装）	录入扫码设备，获取定位（子页面），拍照上传，上传服务器新建的项目数据库下
	扫码按钮，SN码、产品名称、型号自动填入；站点编码输入框；拍照按钮；保存按钮。
 ![image](https://github.com/yup8848/wechatminiprogrem_manholecover/assets/53653523/75b627ee-89f2-484e-8700-a4e7de2f783e)

	手动数据安装位置信息，自动定位获取位置信息填入输入框
 ![image](https://github.com/yup8848/wechatminiprogrem_manholecover/assets/53653523/28fa6b01-f89b-4d5f-9285-223419c5487c)

地图	获取服务器项目设备定位，刷新请求最新设备数据
![image](https://github.com/yup8848/wechatminiprogrem_manholecover/assets/53653523/ebf35aeb-3a78-4197-a256-822662243f09)

	搜索框，可输入站点、地址、SN码；地图显示站点位置；上方栏可进行站点搜索，地址搜索，SN码搜索等。
	从服务器的这个新建项目数据库中获取所有运维的信息，分类显示在地图上
	个人中心，个人信息和微信解绑功能
	个人信息界面，登录时数据上传到服务器和存在本地的信息
![image](https://github.com/yup8848/wechatminiprogrem_manholecover/assets/53653523/45ae0f30-9191-4c7e-8169-01133d116bef)

