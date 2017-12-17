(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyMapController', PartyMapController);
  PartyMapController.$inject = ['$scope', 'Authentication', '$window', 'partymapService', 'communityService', 'partyorgmapService', '$state', '$rootScope', '$timeout'];
  function PartyMapController($scope, Authentication, $window, partymapService, communityService, partyorgmapService, $state, $rootScope, $timeout) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.id = '0';
    communityService.query().$promise.then(function (data) {
      vm.community = data;
    });

    function getorgmap(id) {
      partyorgmapService.query({comid: id}).$promise.then(function (data) {
        var myDate = new Date();
        vm.mapdatas = [
          {
            'leixin': 1,
            'lat': 34.235161,
            'lon': 108.968682,
            'company_name': '省委',
            'phone': '',
            'name': '',
            'address': '',
            'icon': '/modules/core/client/img/image/map/shengwei.png'
          },
          {
            leixin: 1,
            lat: 34.23193,
            lon: 108.972284,
            company_name: '大雁塔街道办事处',
            phone: '',
            name: '',
            address: '',
            icon: '/modules/core/client/img/image/map/dtyjdbsc.png'
          },
          {
            leixin: 1,
            lat: 34.231385,
            lon: 108.981654,
            company_name: '大雁塔党群服务中心',
            phone: '',
            name: '',
            address: '',
            icon: '/modules/core/client/img/image/map/fwzx.png'
          },
          {
            leixin: 1,
            lat: 34.2245560421,
            lon: 108.9705816717,
            company_name: '大雁塔',
            phone: '',
            name: '',
            address: '',
            icon: '/modules/core/client/img/image/map/dcn.png'
          }
        ];
        var year = myDate.getFullYear();
        vm.mapdata = data;
        for (vm.i = 0; vm.i < data.length; vm.i++) {
          var mapobj = {};
          var urlimg = '';
          console.log(data[vm.i].company_type);
          if (data[vm.i].company_type === '1') {
            urlimg = 'city';
          } else if (data[vm.i].company_type === '2') {
            urlimg = 'feigong';
          } else if (data[vm.i].company_type === '3') {
            urlimg = 'nongcun';
          } else if (data[vm.i].company_type === '4') {
            urlimg = 'jiedao';
          } else if (data[vm.i].company_type === '5') {
            urlimg = 'shequ';
          }
          mapobj.leixin = 1;
          mapobj.lat = parseFloat(data[vm.i].latitude);
          mapobj.lon = parseFloat(data[vm.i].longitude);
          mapobj.phone = data[vm.i].concat_phone;
          mapobj.secretary = data[vm.i].secretary;
          mapobj.name = data[vm.i].name;
          mapobj.address = data[vm.i].concat_address;
          mapobj.abstract = data[vm.i].abstract;
          mapobj.icon = '/modules/core/client/img/image/map/' + urlimg + '.png';
          vm.mapdatas.push(mapobj);
        }
        $scope.mapOpts = vm.mapdatas;
        map(15, $scope.mapOpts);
      });
    }

    // 百度地图API
    function map(a, opt) {
      vm.map = new $window.BMap.Map('allmap', {minZoom: 15}); //初始化地图，规定最小缩放
      // vm.map = new $window.BMap.Map('allmap', 15);//自由缩放
      vm.map.centerAndZoom(new $window.BMap.Point(108.980961, 34.227858), 15);
      // 鼠标缩放
      vm.map.enableScrollWheelZoom(true);
      var Polygon = new $window.BMap.Polygon([
        new $window.BMap.Point(108.980674, 34.275004),
        new $window.BMap.Point(108.913408, 34.274049),
        new $window.BMap.Point(108.907372, 34.212933),
        new $window.BMap.Point(108.897886, 34.177102),
        new $window.BMap.Point(108.981536, 34.169217),
        new $window.BMap.Point(109.061737, 34.180925),
        new $window.BMap.Point(109.074097, 34.227977),
        new $window.BMap.Point(109.071223, 34.282401),
        new $window.BMap.Point(108.980674, 34.275004),
        new $window.BMap.Point(108.9619176, 34.22358115),
        new $window.BMap.Point(108.9619176, 34.222436),
        new $window.BMap.Point(108.9629261, 34.2224100610),
        new $window.BMap.Point(108.9628024, 34.2177688396),
        new $window.BMap.Point(108.956775, 34.2116190000),
        new $window.BMap.Point(108.958921, 34.210794),
        new $window.BMap.Point(108.958947, 34.210297),
        new $window.BMap.Point(108.961061, 34.210279),
        new $window.BMap.Point(108.963754, 34.2104740000),
        new $window.BMap.Point(108.963518, 34.2115840000),
        new $window.BMap.Point(108.963915, 34.211948),
        new $window.BMap.Point(108.967208, 34.212507),
        new $window.BMap.Point(108.967166, 34.213856),
        new $window.BMap.Point(108.968415, 34.213896),
        new $window.BMap.Point(108.968716, 34.2138610000),
        new $window.BMap.Point(108.969075, 34.212374),
        new $window.BMap.Point(108.969558, 34.212357),
        new $window.BMap.Point(108.969582, 34.2137980000),
        new $window.BMap.Point(108.969658, 34.2145350000),
        new $window.BMap.Point(108.969926, 34.215178),
        new $window.BMap.Point(108.970291, 34.2159190000),
        new $window.BMap.Point(108.970398, 34.216336),
        new $window.BMap.Point(108.970601, 34.216686),
        new $window.BMap.Point(108.970912, 34.2173150000),
        new $window.BMap.Point(108.9783918, 34.22315973),
        new $window.BMap.Point(108.9785798, 34.22401573),
        new $window.BMap.Point(108.9791478, 34.22398873),
        new $window.BMap.Point(108.9799148, 34.22458373),
        new $window.BMap.Point(108.9799148, 34.22673073),
        new $window.BMap.Point(108.9816711, 34.2265706193),
        new $window.BMap.Point(108.9817091, 34.22705862),
        new $window.BMap.Point(108.9835761, 34.22705462),
        new $window.BMap.Point(108.9836511, 34.2273156193),
        new $window.BMap.Point(108.9837991, 34.22728462),
        new $window.BMap.Point(108.9837401, 34.22818062),
        new $window.BMap.Point(108.9824361, 34.22918762),
        new $window.BMap.Point(108.9830851, 34.22955562),
        new $window.BMap.Point(108.9846891, 34.22845562),
        new $window.BMap.Point(108.9850061, 34.2287476193),
        new $window.BMap.Point(108.9867491, 34.22951562),
        new $window.BMap.Point(108.9872101, 34.22884562),
        new $window.BMap.Point(108.9875751, 34.22868162),
        new $window.BMap.Point(108.9881281, 34.2279056193),
        new $window.BMap.Point(108.9887391, 34.2282466193),
        new $window.BMap.Point(108.9890771, 34.2277236193),
        new $window.BMap.Point(108.9903271, 34.22833062),
        new $window.BMap.Point(108.9904451, 34.22817562),
        new $window.BMap.Point(108.9908051, 34.22834862),
        new $window.BMap.Point(108.9925868, 34.22814506),
        new $window.BMap.Point(108.9927048, 34.22783506),
        new $window.BMap.Point(108.9934988, 34.22783506),
        new $window.BMap.Point(108.9939438, 34.22785706),
        new $window.BMap.Point(108.9939548, 34.22805706),
        new $window.BMap.Point(108.9945338, 34.22800306),
        new $window.BMap.Point(108.9947538, 34.22861906),
        new $window.BMap.Point(108.9962028, 34.22875606),
        new $window.BMap.Point(108.9961598, 34.22913806),
        new $window.BMap.Point(108.9978018, 34.22936406),
        new $window.BMap.Point(108.9976568, 34.22970606),
        new $window.BMap.Point(108.9990118, 34.2295600624),
        new $window.BMap.Point(108.9996118, 34.22969706),
        new $window.BMap.Point(108.9995958, 34.2300030624),
        new $window.BMap.Point(109.0013658, 34.23009606),
        new $window.BMap.Point(109.0013578, 34.23032306),
        new $window.BMap.Point(109.0007389, 34.2310916),
        new $window.BMap.Point(109.0034303, 34.23214063),
        new $window.BMap.Point(109.0088753, 34.23472663),
        new $window.BMap.Point(109.0069653, 34.23935663),
        new $window.BMap.Point(109.0062793, 34.23913563),
        new $window.BMap.Point(109.0057643, 34.2405896310),
        new $window.BMap.Point(109.0008579, 34.2385026),
        new $window.BMap.Point(109.0000749, 34.2384486),
        new $window.BMap.Point(108.9997639, 34.2386265986),
        new $window.BMap.Point(108.995199, 34.245671),
        new $window.BMap.Point(108.971515, 34.235879),
        new $window.BMap.Point(108.962847, 34.235841),
        new $window.BMap.Point(108.9628219, 34.23379599),
        new $window.BMap.Point(108.9615779, 34.23375199),
        new $window.BMap.Point(108.9615889, 34.23256299),
        new $window.BMap.Point(108.9621999, 34.2325189913),
        new $window.BMap.Point(108.9622649, 34.23182699),
        new $window.BMap.Point(108.9628329, 34.23178299),
        new $window.BMap.Point(108.9628097, 34.22773804),
        new $window.BMap.Point(108.9596176, 34.2276774861),
        new $window.BMap.Point(108.9596496, 34.22600049),
        new $window.BMap.Point(108.9617147, 34.22602604),
        new $window.BMap.Point(108.9617467, 34.22533404),
        new $window.BMap.Point(108.9628627, 34.22532504),
        new $window.BMap.Point(108.9628307, 34.2235330421),
        new $window.BMap.Point(108.9619176, 34.22358115)
      ], {strokeColor: 'none', fillColor: '#aaa', strokeOpacity: 0, fillOpacity: 0.8});  //创建多边形
      vm.map.addOverlay(Polygon);
      var polyline1 = new $window.BMap.Polyline([
        new $window.BMap.Point(108.9619176, 34.22358115),
        new $window.BMap.Point(108.9619176, 34.222436),
        new $window.BMap.Point(108.9629261, 34.2224100610),
        new $window.BMap.Point(108.9628024, 34.2177688396),
        new $window.BMap.Point(108.956775, 34.2116190000),
        new $window.BMap.Point(108.958921, 34.210794),
        new $window.BMap.Point(108.958947, 34.210297),
        new $window.BMap.Point(108.961061, 34.210279),
        new $window.BMap.Point(108.963754, 34.2104740000),
        new $window.BMap.Point(108.963518, 34.2115840000),
        new $window.BMap.Point(108.963915, 34.211948),
        new $window.BMap.Point(108.967208, 34.212507),
        new $window.BMap.Point(108.967166, 34.213856),
        new $window.BMap.Point(108.968415, 34.213896),
        new $window.BMap.Point(108.968716, 34.2138610000),
        new $window.BMap.Point(108.969075, 34.212374),
        new $window.BMap.Point(108.969558, 34.212357),
        new $window.BMap.Point(108.969582, 34.2137980000),
        new $window.BMap.Point(108.969658, 34.2145350000),
        new $window.BMap.Point(108.969926, 34.215178),
        new $window.BMap.Point(108.970291, 34.2159190000),
        new $window.BMap.Point(108.970398, 34.216336),
        new $window.BMap.Point(108.970601, 34.216686),
        new $window.BMap.Point(108.970912, 34.2173150000),
        new $window.BMap.Point(108.9783918, 34.22315973),
        new $window.BMap.Point(108.9785798, 34.22401573),
        new $window.BMap.Point(108.9791478, 34.22398873),
        new $window.BMap.Point(108.9799148, 34.22458373),
        new $window.BMap.Point(108.9799148, 34.22673073),
        new $window.BMap.Point(108.9816711, 34.2265706193),
        new $window.BMap.Point(108.9817091, 34.22705862),
        new $window.BMap.Point(108.9835761, 34.22705462),
        new $window.BMap.Point(108.9836511, 34.2273156193),
        new $window.BMap.Point(108.9837991, 34.22728462),
        new $window.BMap.Point(108.9837401, 34.22818062),
        new $window.BMap.Point(108.9824361, 34.22918762),
        new $window.BMap.Point(108.9830851, 34.22955562),
        new $window.BMap.Point(108.9846891, 34.22845562),
        new $window.BMap.Point(108.9850061, 34.2287476193),
        new $window.BMap.Point(108.9867491, 34.22951562),
        new $window.BMap.Point(108.9872101, 34.22884562),
        new $window.BMap.Point(108.9875751, 34.22868162),
        new $window.BMap.Point(108.9881281, 34.2279056193),
        new $window.BMap.Point(108.9887391, 34.2282466193),
        new $window.BMap.Point(108.9890771, 34.2277236193),
        new $window.BMap.Point(108.9903271, 34.22833062),
        new $window.BMap.Point(108.9904451, 34.22817562),
        new $window.BMap.Point(108.9908051, 34.22834862),
        new $window.BMap.Point(108.9925868, 34.22814506),
        new $window.BMap.Point(108.9927048, 34.22783506),
        new $window.BMap.Point(108.9934988, 34.22783506),
        new $window.BMap.Point(108.9939438, 34.22785706),
        new $window.BMap.Point(108.9939548, 34.22805706),
        new $window.BMap.Point(108.9945338, 34.22800306),
        new $window.BMap.Point(108.9947538, 34.22861906),
        new $window.BMap.Point(108.9962028, 34.22875606),
        new $window.BMap.Point(108.9961598, 34.22913806),
        new $window.BMap.Point(108.9978018, 34.22936406),
        new $window.BMap.Point(108.9976568, 34.22970606),
        new $window.BMap.Point(108.9990118, 34.2295600624),
        new $window.BMap.Point(108.9996118, 34.22969706),
        new $window.BMap.Point(108.9995958, 34.2300030624),
        new $window.BMap.Point(109.0013658, 34.23009606),
        new $window.BMap.Point(109.0013578, 34.23032306),
        new $window.BMap.Point(109.0007389, 34.2310916),
        new $window.BMap.Point(109.0034303, 34.23214063),
        new $window.BMap.Point(109.0088753, 34.23472663),
        new $window.BMap.Point(109.0069653, 34.23935663),
        new $window.BMap.Point(109.0062793, 34.23913563),
        new $window.BMap.Point(109.0057643, 34.2405896310),
        new $window.BMap.Point(109.0008579, 34.2385026),
        new $window.BMap.Point(109.0000749, 34.2384486),
        new $window.BMap.Point(108.9997639, 34.2386265986),
        new $window.BMap.Point(108.995199, 34.245671),
        new $window.BMap.Point(108.971515, 34.235879),
        new $window.BMap.Point(108.962847, 34.235841),
        new $window.BMap.Point(108.9628219, 34.23379599),
        new $window.BMap.Point(108.9615779, 34.23375199),
        new $window.BMap.Point(108.9615889, 34.23256299),
        new $window.BMap.Point(108.9621999, 34.2325189913),
        new $window.BMap.Point(108.9622649, 34.23182699),
        new $window.BMap.Point(108.9628329, 34.23178299),
        new $window.BMap.Point(108.9628097, 34.22773804),
        new $window.BMap.Point(108.9596176, 34.2276774861),
        new $window.BMap.Point(108.9596496, 34.22600049),
        new $window.BMap.Point(108.9617147, 34.22602604),
        new $window.BMap.Point(108.9617467, 34.22533404),
        new $window.BMap.Point(108.9628627, 34.22532504),
        new $window.BMap.Point(108.9628307, 34.2235330421),
        new $window.BMap.Point(108.9619176, 34.22358115)
      ], {strokeColor: '#77aa00', strokeWeight: 5, strokeOpacity: 0.8});  //创建多边形
      vm.map.addOverlay(polyline1);
      // vm.map.addEventListener("click", function (e) {
      //   alert(e.point.lng + "," + e.point.lat);
      // });
      var top_left_control = new $window.BMap.ScaleControl({anchor: $window.BMAP_ANCHOR_TOP_LEFT});// 左上角，添加比例尺
      var top_left_navigation = new $window.BMap.NavigationControl();  //左上角，添加默认缩放平移控件
      var mapType1 = new $window.BMap.MapTypeControl({mapTypes: [$window.BMAP_NORMAL_MAP, $window.BMAP_HYBRID_MAP]});//2D图，卫星图
//        var mapType2 = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT});//2D 卫星图 3D图
      var geolocationControl = new $window.BMap.GeolocationControl(); //添加定位
      function add_control() {
        vm.map.addControl(top_left_control);    // 左上角，添加比例尺
        vm.map.addControl(top_left_navigation);//左上角，添加默认缩放平移控件
//            map.addControl(mapType2);          //添加2D 卫星图 3D图
//            map.setCurrentCity("西安");        //由于有3D图，需要设置城市哦
        vm.map.addControl(geolocationControl); //添加 右下角定位
        vm.map.addControl(mapType1);         //添加2D图，卫星图
      }

      add_control();
      function addMarker(icon, point, sContent) {  // 创建图标对象
        var myIcon = new $window.BMap.Icon(icon, new $window.BMap.Size(32, 32), {
          // 图标中央下端的尖角位置。
          // 指定定位位置。
          // 当标注显示在地图上时，其所指向的地理位置距离图标左上
          // 角各偏移10像素和25像素。您可以看到在本例中该位置即是
          anchor: new $window.BMap.Size(10, 25)
          // 设置图片偏移。
          // 当您需要从一幅较大的图片中截取某部分作为标注图标时，您
          // 需要指定大图的偏移位置，此做法与css sprites技术类似。
          //imageOffset: new $window.BMap.Size(0, 0 - index * 25)   // 设置图片偏移
        });
// 创建标注对象并添加到地图
        var marker = new $window.BMap.Marker(point, {icon: myIcon});
        vm.map.addOverlay(marker);
        if (!myIcon.imageUrl.match('shengwei') && !myIcon.imageUrl.match('dtyjdbsc') && !myIcon.imageUrl.match('fwzx') && !myIcon.imageUrl.match('dcn')) {
          marker.setAnimation($window.BMAP_ANIMATION_BOUNCE);
        }
        var optss = {
          width: 450,     // 信息窗口宽度
          height: 300,  // 信息窗口高度
          title: '', // 信息窗口标题申
          enableMessage: true//设置允许信息窗发送短息
        };
        marker.addEventListener('click', function () {
          vm.infoWindow = new $window.BMap.InfoWindow(sContent, optss);// 创建信息窗口对象
          // map.centerAndZoom(point, 19);
          vm.map.openInfoWindow(vm.infoWindow, point);
        });
      }

      console.log(opt);
      for (var i = 0; i < opt.length; i++) {
        // var map = new $window.BMap.Map("map");
        var point = new $window.BMap.Point(opt[i].lon, opt[i].lat); //经度 lon 纬度 lat
        // map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注
        var icon = opt[i].icon;
        var sContent = '';
        if (opt[i].leixin === 1) {
          if (i < 4) {
            sContent = `<h1>${opt[i].company_name}</h1>`;
          } else {
            sContent = `<p>${opt[i].name}</p>
                             <p><span>书记：</span>${opt[i].secretary}</p>
                            <p><span>电话：</span>${opt[i].phone}</p>
                            <p><span>地址：</span>${opt[i].address}</p>
                             <div class="nae">
                             <h1>简介</h1>
                             <p>${opt[i].abstract}</p>
</div>
`;
          }

        } else {
          sContent = `<img style='float:left;margin:4px' id='imgDemo' src='image/index/1499224191238.png' width='139' height='145' title='天安门'/>
                             <p>原因：${opt[i].resson}</p>
                            <p>电话：${opt[i].mand}</p>
                            <p>名字：${opt[i].name}</p>
                            <p>年龄：${opt[i].age}</p>
                            <p>类型：${opt[i].type}</p>`;

        }
        addMarker(icon, point, sContent);
      }
    }

    getorgmap(0);
    vm.mapshuju = function (num) {
      var optss = {
        width: 450,     // 信息窗口宽度
        height: 350,     // 信息窗口高度
        title: '', // 信息窗口标题申
        enableMessage: true//设置允许信息窗发送短息
      };
      num = num + 4;
      var sContent;
      sContent = `<p>${vm.mapdatas[num].name}</p>
      <p><span>书记：</span>${vm.mapdatas[num].secretary}</p>
      <p><span>电话：</span>${vm.mapdatas[num].phone}</p>
      <p><span>地址：</span>${vm.mapdatas[num].address}</p>
      <div class="nae">
        <h1>简介</h1>
        <p>${vm.mapdatas[num].abstract}</p>
        </div>
        `;
      vm.infoWindow = new $window.BMap.InfoWindow(sContent, optss);// 创建信息窗口对象
      // map.centerAndZoom(point, 19);
      var point = new $window.BMap.Point(vm.mapdatas[num].lon, vm.mapdatas[num].lat);
      vm.map.openInfoWindow(vm.infoWindow, point);
    };
  }
}());
