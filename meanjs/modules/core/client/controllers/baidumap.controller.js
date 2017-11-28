(function () {
  'use strict';

  angular
    .module('core')
    .controller('baidumapController', baidumapController);
  baidumapController.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope', 'communityService', 'partymapService', '$timeout'];
  function baidumapController($scope, Authentication, $window, partybuildService, $state, $rootScope, communityService, partymapService, $timeout) {
    var vm = this;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
    communityService.query().$promise.then(function (data) {
      vm.community = data;
    });
    function getmap(id) {
      partymapService.query({comid: id}).$promise.then(function (data) {
        vm.mapdata = data[0];
        vm.mapdatas = [
          {
            'leixin': 0,
            'lat': 34.235161,
            'lng': 108.968682,
            'company_name': '省委',
            'phone': '',
            'name': '',
            'address': '',
            'icon': '/modules/core/client/img/image/map/shengwei.png'
          },
          {
            leixin: 0,
            lat: 34.23193,
            lng: 108.972284,
            company_name: '大雁塔街道办事处',
            phone: '',
            name: '',
            address: '',
            icon: '/modules/core/client/img/image/map/dtyjdbsc.png'
          },
          {
            leixin: 0,
            lat: 34.231385,
            lng: 108.981654,
            company_name: '大雁塔党群服务中心',
            phone: '',
            name: '',
            address: '',
            icon: '/modules/core/client/img/image/map/fwzx.png'
          },
          {
            leixin: 0,
            lat: 34.2245560421,
            lng: 108.9705816717,
            company_name: '大雁塔',
            phone: '',
            name: '',
            address: '',
            icon: '/modules/core/client/img/image/map/dcn.png'
          }
        ];
        var myDate = new Date();
        var year = myDate.getFullYear();
        var data1 = data[1];
        var arr = [];
        for (var i in data1) {
          if (data1[i].lat) {
            arr.push(data1[i]);
          }
        }
        console.log(data1, arr);
        for (vm.i = 0; vm.i < arr.length; vm.i++) {
          var mapobj = {};
          mapobj.leixin = 0;
          mapobj.lat = parseFloat(arr[vm.i].lat);
          mapobj.lng = parseFloat(arr[vm.i].lng);
          mapobj.resson = arr[vm.i].difficultreason;
          mapobj.photos = arr[vm.i].photos;
          mapobj.tel = arr[vm.i].tel;
          mapobj.mand = arr[vm.i].difficultdemand;
          mapobj.name = arr[vm.i].name;
          mapobj.type = arr[vm.i].persontypename;
          mapobj.age = year - $window.parseInt(arr[vm.i].identityid.substring(6, 10));
          mapobj.icon = '/modules/core/client/img/image/map/' + arr[vm.i].persontype + '.png';
          vm.mapdatas.push(mapobj);
        }
        $scope.mapOpts = vm.mapdatas;
      });
    }

    // 百度地图API
    function map(a, opt) {
      var map = new $window.BMap.Map('allmap', {minZoom: a}); //初始化地图，规定最小缩放
      map.centerAndZoom(new $window.BMap.Point(108.980961, 34.227858), a);
      var Polygon = new $window.BMap.Polygon([
        new $window.BMap.Point(108.980602, 34.246421),
        new $window.BMap.Point(108.94661, 34.246361),
        new $window.BMap.Point(108.946394, 34.227619),
        new $window.BMap.Point(108.946682, 34.209291),
        new $window.BMap.Point(108.979452, 34.209052),
        new $window.BMap.Point(109.015168, 34.208992),
        new $window.BMap.Point(109.0156, 34.229709),
        new $window.BMap.Point(109.015097, 34.246123),
        new $window.BMap.Point(108.980602, 34.246421),
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
      ], {strokeColor: 'none', fillColor: 'rgb(246,246,246)', strokeOpacity: 0, fillOpacity: 0.8});  //创建多边形
      map.addOverlay(Polygon);
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
      map.addOverlay(polyline1);
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
        map.addOverlay(marker);
        var optss = {
          width: 400,     // 信息窗口宽度
          height: 150,     // 信息窗口高度
          title: '', // 信息窗口标题申
          enableMessage: true//设置允许信息窗发送短息
        };
        marker.addEventListener('click', function () {
          var infoWindow = new $window.BMap.InfoWindow(sContent, optss);// 创建信息窗口对象
          // map.centerAndZoom(point, 19);
          map.openInfoWindow(infoWindow, point);
        });
      }

      for (var i = 0; i < opt.length; i++) {
        // var map = new $window.BMap.Map("map");
        var point = new $window.BMap.Point(opt[i].lng, opt[i].lat); //经度 lng 纬度 lat
        // map.centerAndZoom(point, 15);  // 编写自定义函数，创建标注
        var icon = opt[i].icon;
        var sContent = '';
        if (opt[i].leixin === 1) {
          sContent = `<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>支部名称:${opt[i].name}</p>
                             <p>单位名称：${opt[i].company_name}</p>
                            <p>电话：${opt[i].phone}</p>
                            <p>地址：${opt[i].address}</p>`;
        } else {
          if (i < 4) {
            sContent = `<h1>${opt[i].company_name}</h1>`;
          } else {
            sContent = `<img style='float:left;margin:4px' id='imgDemo' src='${opt[i].photos}' width='139' height='145' />
                             <p>原因：${opt[i].resson}</p>
                            <p>困难需求：${opt[i].mand}</p>
                            <p>名字：${opt[i].name}</p>
                            <p>电话：${opt[i].tel}</p>
                            <p>年龄：${opt[i].age}</p>
                            <p>类型：${opt[i].type}</p>`;
          }


        }
        addMarker(icon, point, sContent);
      }
      // var polyline1 = new $window.BMap.Polyline([
      //   new $window.BMap.Point(108.9619176, 34.22358115),
      //   new $window.BMap.Point(108.9619176, 34.222436),
      //   new $window.BMap.Point(108.9629261, 34.2224100610),
      //   new $window.BMap.Point(108.9628024, 34.2177688396),
      //   new $window.BMap.Point(108.956775, 34.2116190000),
      //   new $window.BMap.Point(108.958921, 34.210794),
      //   new $window.BMap.Point(108.958947, 34.210297),
      //   new $window.BMap.Point(108.961061, 34.210279),
      //   new $window.BMap.Point(108.963754, 34.2104740000),
      //   new $window.BMap.Point(108.963518, 34.2115840000),
      //   new $window.BMap.Point(108.963915, 34.211948),
      //   new $window.BMap.Point(108.967208, 34.212507),
      //   new $window.BMap.Point(108.967166, 34.213856),
      //   new $window.BMap.Point(108.968415, 34.213896),
      //   new $window.BMap.Point(108.968716, 34.2138610000),
      //   new $window.BMap.Point(108.969075, 34.212374),
      //   new $window.BMap.Point(108.969558, 34.212357),
      //   new $window.BMap.Point(108.969582, 34.2137980000),
      //   new $window.BMap.Point(108.969658, 34.2145350000),
      //   new $window.BMap.Point(108.969926, 34.215178),
      //   new $window.BMap.Point(108.970291, 34.2159190000),
      //   new $window.BMap.Point(108.970398, 34.216336),
      //   new $window.BMap.Point(108.970601, 34.216686),
      //   new $window.BMap.Point(108.970912, 34.2173150000),
      //   new $window.BMap.Point(108.9783918, 34.22315973),
      //   new $window.BMap.Point(108.9785798, 34.22401573),
      //   new $window.BMap.Point(108.9791478, 34.22398873),
      //   new $window.BMap.Point(108.9799148, 34.22458373),
      //   new $window.BMap.Point(108.9799148, 34.22673073),
      //   new $window.BMap.Point(108.9816711, 34.2265706193),
      //   new $window.BMap.Point(108.9817091, 34.22705862),
      //   new $window.BMap.Point(108.9835761, 34.22705462),
      //   new $window.BMap.Point(108.9836511, 34.2273156193),
      //   new $window.BMap.Point(108.9837991, 34.22728462),
      //   new $window.BMap.Point(108.9837401, 34.22818062),
      //   new $window.BMap.Point(108.9824361, 34.22918762),
      //   new $window.BMap.Point(108.9830851, 34.22955562),
      //   new $window.BMap.Point(108.9846891, 34.22845562),
      //   new $window.BMap.Point(108.9850061, 34.2287476193),
      //   new $window.BMap.Point(108.9867491, 34.22951562),
      //   new $window.BMap.Point(108.9872101, 34.22884562),
      //   new $window.BMap.Point(108.9875751, 34.22868162),
      //   new $window.BMap.Point(108.9881281, 34.2279056193),
      //   new $window.BMap.Point(108.9887391, 34.2282466193),
      //   new $window.BMap.Point(108.9890771, 34.2277236193),
      //   new $window.BMap.Point(108.9903271, 34.22833062),
      //   new $window.BMap.Point(108.9904451, 34.22817562),
      //   new $window.BMap.Point(108.9908051, 34.22834862),
      //   new $window.BMap.Point(108.9925868, 34.22814506),
      //   new $window.BMap.Point(108.9927048, 34.22783506),
      //   new $window.BMap.Point(108.9934988, 34.22783506),
      //   new $window.BMap.Point(108.9939438, 34.22785706),
      //   new $window.BMap.Point(108.9939548, 34.22805706),
      //   new $window.BMap.Point(108.9945338, 34.22800306),
      //   new $window.BMap.Point(108.9947538, 34.22861906),
      //   new $window.BMap.Point(108.9962028, 34.22875606),
      //   new $window.BMap.Point(108.9961598, 34.22913806),
      //   new $window.BMap.Point(108.9978018, 34.22936406),
      //   new $window.BMap.Point(108.9976568, 34.22970606),
      //   new $window.BMap.Point(108.9990118, 34.2295600624),
      //   new $window.BMap.Point(108.9996118, 34.22969706),
      //   new $window.BMap.Point(108.9995958, 34.2300030624),
      //   new $window.BMap.Point(109.0013658, 34.23009606),
      //   new $window.BMap.Point(109.0013578, 34.23032306),
      //   new $window.BMap.Point(109.0007389, 34.2310916),
      //   new $window.BMap.Point(109.0034303, 34.23214063),
      //   new $window.BMap.Point(109.0088753, 34.23472663),
      //   new $window.BMap.Point(109.0069653, 34.23935663),
      //   new $window.BMap.Point(109.0062793, 34.23913563),
      //   new $window.BMap.Point(109.0057643, 34.2405896310),
      //   new $window.BMap.Point(109.0008579, 34.2385026),
      //   new $window.BMap.Point(109.0000749, 34.2384486),
      //   new $window.BMap.Point(108.9997639, 34.2386265986),
      //   new $window.BMap.Point(108.995199, 34.245671),
      //   new $window.BMap.Point(108.971515, 34.235879),
      //   new $window.BMap.Point(108.962847, 34.235841),
      //   new $window.BMap.Point(108.9628219, 34.23379599),
      //   new $window.BMap.Point(108.9615779, 34.23375199),
      //   new $window.BMap.Point(108.9615889, 34.23256299),
      //   new $window.BMap.Point(108.9621999, 34.2325189913),
      //   new $window.BMap.Point(108.9622649, 34.23182699),
      //   new $window.BMap.Point(108.9628329, 34.23178299),
      //   new $window.BMap.Point(108.9628097, 34.22773804),
      //   new $window.BMap.Point(108.9596176, 34.2276774861),
      //   new $window.BMap.Point(108.9596496, 34.22600049),
      //   new $window.BMap.Point(108.9617147, 34.22602604),
      //   new $window.BMap.Point(108.9617467, 34.22533404),
      //   new $window.BMap.Point(108.9628627, 34.22532504),
      //   new $window.BMap.Point(108.9628307, 34.2235330421),
      //   new $window.BMap.Point(108.9619176, 34.22358115)
      // ], {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 1});  //创建多边形
      // map.addOverlay(polyline1);
    }

    getmap(0);
    $timeout(function () {
      map(15, $scope.mapOpts);
    }, 1000);
    vm.chaxun = function (id) {
      getmap(id);
      $timeout(function () {
        map(15, $scope.mapOpts);
      }, 1000);
    };
  }
}());
