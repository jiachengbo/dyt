(function () {
  'use strict';

  angular
    .module('core')
    .controller('XiaQuXqController', XiaQuXqController);
  XiaQuXqController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'GetStreetMemberService', 'GetCommMemberService', 'GetPartyBuildService', '$window', 'partydtService'];
  function XiaQuXqController($scope, $rootScope, $state, $stateParams, GetStreetMemberService, GetCommMemberService, GetPartyBuildService, $window, partydtService) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.persondata = [
      {
        name: '八一社区',
        person: [
          {
            name: '芦苇',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/bayi/luwei.jpg'
          },
          {
            name: '张江艳',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/bayi/zhangjiangyan.png'
          },
          {
            name: '赵春英',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/bayi/zhaochunying.png'
          }
        ]
      },
      {
        name: '铁一村',
        person: [
          {
            name: '朱培建',
            duty: '书记',
            photo: '/modules/core/client/img/image/commPerson/tieyicun/zhupeijian.png'
          },
          {
            name: '朱  斌',
            duty: '副书记',
            photo: '/modules/core/client/img/image/commPerson/tieyicun/zhubin.png'
          },
          {
            name: '张惠荣',
            duty: '支 委',
            photo: '/modules/core/client/img/image/commPerson/tieyicun/zhanghuirong.png'
          },
          {
            name: '权建国',
            duty: '支 委',
            photo: '/modules/core/client/img/image/commPerson/tieyicun/quanjianguo.png'
          },
          {
            name: '罗兴民',
            duty: '支 委',
            photo: '/modules/core/client/img/image/commPerson/tieyicun/luoxingmin.png'
          }
        ]
      },
      {
        name: '武警医院社区',
        person: [
          {
            name: '安黎',
            duty: '书记',
            photo: '/modules/core/client/img/image/commPerson/wujingyiyuan/anli.jpg'
          },
          {
            name: '刘文娟',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/wujingyiyuan/liuwenjuan.jpg'
          },
          {
            name: '张安利',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/wujingyiyuan/zhanganli.png'
          }
        ]
      },
      {
        name: '西勘社区',
        person: [
          {
            name: '牛军',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/xikan/niujun.png'
          },
          {
            name: '白海妮',
            duty: '委员',
            photo: '/modules/core/client/img/image/commPerson/xikan/baihaini.jpg'
          },
          {
            name: '刘晓珍',
            duty: '委员',
            photo: '/modules/core/client/img/image/commPerson/xikan/liuxiaozhen.jpg'
          }
        ]
      },
      {
        name: '交大财经社区',
        person: [
          {
            name: '张周堂',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/jiaodacaijing/zhangzhoutang.png'
          },
          {
            name: '贺建仁',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/jiaodacaijing/hejianren.png'
          },
          {
            name: '杨莉',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/jiaodacaijing/yangli.png'
          }
        ]
      },
      {
        name: '翠华北路社区',
        person: [
          {
            name: '梁军',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/cuihuabei/liangjun.png'
          },
          {
            name: '马明',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/cuihuabei/maming.jpg'
          },
          {
            name: '毛建斌',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/cuihuabei/maojianbin.jpg'
          }
        ]
      },
      {
        name: '翠华南路社区',
        person: [
          {
            name: '王晓明',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/cuihuanan/wangxiaoming.JPG'
          },
          {
            name: '苏楠',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/cuihuanan/sunan.jpg'
          },
          {
            name: '吴利',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/cuihuanan/wuli.jpg'
          }
        ]
      },
      {
        name: '大雁塔村',
        person: [
          {
            name: '鲁伍零',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/dayantacun/luwuling.png'
          },
          {
            name: '田建设',
            duty: '支部委员',
            photo: '/modules/core/client/img/image/commPerson/dayantacun/tianjianshe.png'
          },
          {
            name: '古春林',
            duty: '支部委员',
            photo: '/modules/core/client/img/image/commPerson/dayantacun/guchunlin.png'
          }
        ]
      },
      {
        name: '大雁塔社区',
        person: [
          {
            name: '倪莹娟',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/dayanta/niyingjuan.jpg'
          },
          {
            name: '鲁小兵',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/dayanta/luxiaobing.jpg'
          },
          {
            name: '周玙玙',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/dayanta/zhouyuyu.jpg'
          }
        ]
      },
      {
        name: '观音庙村',
        person: [
          {
            name: '陈华明',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/guanyinmiao/chenhuaming.jpg'
          },
          {
            name: '陈建安',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/guanyinmiao/chenjianan.jpg'
          },
          {
            name: '张小仲',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/guanyinmiao/zhangxiaozhong.jpg'
          }
        ]
      },
      {
        name: '海珀紫庭社区',
        person: [
          {
            name: '罗 琼',
            duty: '书记',
            photo: '/modules/core/client/img/image/commPerson/haiboziting/luoqiong.jpg'
          },
          {
            name: '赵 静',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/haiboziting/zhaojing.jpg'
          },
          {
            name: '任 飞',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/haiboziting/renfei.jpg'
          }
        ]
      },
      {
        name: '后村社区',
        person: [
          {
            name: '刘栋恋',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/houcun/liudonglian.jpg'
          },
          {
            name: '刘天本',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/houcun/liutianben.jpg'
          },
          {
            name: '梁磊',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/houcun/lianglei.jpg'
          }
        ]
      },
      {
        name: '建苑社区',
        person: [
          {
            name: '李朵',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/jianyuan/liduo.jpg'
          },
          {
            name: '张俭',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/jianyuan/zhangjian.jpg'
          },
          {
            name: '晏燕',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/jianyuan/yanyan.jpg'
          }
        ]
      },
      {
        name: '西安科技大学社区',
        person: [
          {
            name: '刘仓礼',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/keda/liucangli.jpg'
          },
          {
            name: '王政军',
            duty: '党支部委员',
            photo: '/modules/core/client/img/image/commPerson/keda/wangzhengjun.jpg'
          },
          {
            name: '姜玲',
            duty: '党支部委员',
            photo: '/modules/core/client/img/image/commPerson/keda/jiangling.jpg'
          }
        ]
      },
      {
        name: '青龙社区',
        person: [
          {
            name: '李桂君',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/qinglong/liguijun.jpg'
          },
          {
            name: '孙强',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/qinglong/sunqiang.jpg'
          },
          {
            name: '李伟',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/qinglong/liwei.jpg'
          }
        ]
      },
      {
        name: '省委社区',
        person: [
          {
            name: '肖亮',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/shengwei/xiaoliang.jpg'
          },
          {
            name: '王梅',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/shengwei/wangmei.jpg'
          },
          {
            name: '史眉歌',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/shengwei/shimeige.jpg'
          }
        ]
      },
      {
        name: '太平堡村',
        person: [
          {
            name: '韩志军',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/taipingbaocun/hanzhijun.jpg'
          },
          {
            name: '韩永福',
            duty: '支部委员',
            photo: '/modules/core/client/img/image/commPerson/taipingbaocun/hanyongfu.jpg'
          }
        ]
      },
      {
        name: '铁二村',
        person: [
          {
            name: '孙家群',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/tieercun/sunjiaqun.jpg'
          },
          {
            name: '文利贤',
            duty: '支部副书记',
            photo: '/modules/core/client/img/image/commPerson/tieercun/wenlixian.jpg'
          }
        ]
      },
      {
        name: '铁一院社区',
        person: [
          {
            name: '王圣英',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/tieyiyuan/wangshengying.png'
          },
          {
            name: '王德峰',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/tieyiyuan/wangdefeng.png'
          },
          {
            name: '裴婷婷',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/tieyiyuan/peitingting.png'
          }
        ]
      },
      {
        name: '王家村',
        person: [
          {
            name: '何平选',
            duty: '村支书',
            photo: '/modules/core/client/img/image/commPerson/wangjiacun/hepingxuan.jpg'
          },
          {
            name: '王满利',
            duty: '村副支书',
            photo: '/modules/core/client/img/image/commPerson/wangjiacun/wangmanli.jpg'
          },
          {
            name: '王有成',
            duty: '支部委员',
            photo: '/modules/core/client/img/image/commPerson/wangjiacun/wangyoucheng.jpg'
          },
          {
            name: '王芹英',
            duty: '支部委员',
            photo: '/modules/core/client/img/image/commPerson/wangjiacun/wangqingying.jpg'
          },
          {
            name: '陆小爱',
            duty: '支部委员',
            photo: '/modules/core/client/img/image/commPerson/wangjiacun/luxiaoai.jpg'
          }
        ]
      },
      {
        name: '西延路社区',
        person: [
          {
            name: '王战峰',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/xiyanlu/wangzhanfeng.png'
          },
          {
            name: '马军',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/xiyanlu/majun.png'
          },
          {
            name: '王志鸣',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/xiyanlu/wangzhiming.png'
          }
        ]
      },
      {
        name: '西影社区',
        person: [
          {
            name: '赵麟',
            duty: '书记',
            photo: '/modules/core/client/img/image/commPerson/xiying/zhaolin.jpg'
          },
          {
            name: '肖军',
            duty: '委员',
            photo: '/modules/core/client/img/image/commPerson/xiying/xiaojun.jpg'
          },
          {
            name: '余晨晖',
            duty: '委员',
            photo: '/modules/core/client/img/image/commPerson/xiying/yuchenhui.jpg'
          }
        ]
      },
      {
        name: '兴科社区',
        person: [
          {
            name: '郭 蓓',
            duty: '支部书记',
            photo: '/modules/core/client/img/image/commPerson/xingke/guobei.jpg'
          },
          {
            name: '慕佩霞',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/xingke/mupeixia.jpg'
          },
          {
            name: '范亚飞',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/xingke/fanyafei.jpg'
          }
        ]
      },
      {
        name: '雁塔路社区',
        person: [
          {
            name: '王珍珍',
            duty: '党支部书记',
            photo: '/modules/core/client/img/image/commPerson/yantalu/wangzhenzhen.png'
          },
          {
            name: '穆臻',
            duty: '党支部委员',
            photo: '/modules/core/client/img/image/commPerson/yantalu/muzhen.png'
          },
          {
            name: '王一涵',
            duty: '党支部委员',
            photo: '/modules/core/client/img/image/commPerson/yantalu/wangyihan.png'
          }
        ]
      },
      {
        name: '雁西社区',
        person: [
          {
            name: '张芸衔',
            duty: '党支部书记/副主任',
            photo: '/modules/core/client/img/image/commPerson/yanxi/zhangyunxian.png'
          },
          {
            name: '孙清泉',
            duty: '组织委员',
            photo: '/modules/core/client/img/image/commPerson/yanxi/sunqingquan.png'
          },
          {
            name: '马达',
            duty: '宣传委员',
            photo: '/modules/core/client/img/image/commPerson/yanxi/mada.png'
          }
        ]
      }
    ];
    vm.unit = $stateParams.unit;
    vm.types = $stateParams.id;
    if (vm.unit.slice(-1) === '村') {
      vm.type = '村信息';
    } else {
      vm.type = '社区信息';
    }
    var units = angular.element(document.querySelectorAll('#streed>.col-md-12>div'));
    for (var i = 0; i < units.length - 2; i++) {
      angular.element(units[i]).css('display', 'none');
      if (units[i].childNodes[1].innerText === vm.unit) {
        angular.element(units[i]).css('display', 'block');
      }
    }
    for (var j = 0; j < vm.persondata.length; j++) {
      if (vm.persondata[j].name === vm.unit) {
        vm.photos = vm.persondata[j].person;
      }
    }
    // if (vm.unit === '八一社区') {
    //
    // } else if (vm.unit === '翠华北路社区') {
    //
    // } else if (vm.unit === '翠华南路社区') {
    //
    // } else if (vm.unit === '大雁塔社区') {
    //
    // } else if (vm.unit === '海珀紫庭社区') {
    //
    // } else if (vm.unit === '后村社区') {
    //
    // } else if (vm.unit === '建苑社区') {
    //
    // } else if (vm.unit === '交大财经社区') {
    //
    // } else if (vm.unit === '科大社区') {
    //
    // } else if (vm.unit === '青龙社区') {
    //
    // } else if (vm.unit === '省委社区') {
    //
    // } else if (vm.unit === '铁一院社区') {
    //
    // } else if (vm.unit === '武警医院社区') {
    //
    // } else if (vm.unit === '西勘社区') {
    //
    // } else if (vm.unit === '西延路社区') {
    //
    // } else if (vm.unit === '西影社区') {
    //
    // } else if (vm.unit === '兴科社区') {
    //
    // } else if (vm.unit === '雁塔路社区') {
    //
    // } else if (vm.unit === '雁西社区') {
    //
    // }
    // GetStreetMemberService.query().$promise.then(function (data) {
    //   vm.streetMemberArr = [];
    //   for (var i = 0; i < 4; i++) {
    //     vm.streetMemberArr.push(data[i]);
    //   }
    // });
    // GetCommMemberService.query().$promise.then(function (data) {
    //   vm.commMemberArr = [];
    //   for (var i = 0; i < 4; i++) {
    //     vm.commMemberArr.push(data[i]);
    //   }
    // });
    // GetPartyBuildService.query().$promise.then(function (data) {
    //   vm.partyBuildArr = [];
    //   for (var i = 0; i < 4; i++) {
    //     vm.partyBuildArr.push(data[i]);
    //   }
    // });

    // vm.dangjian = function (type) {
    //   vm.types = type;
    //   getcount(vm.types);
    //   getdata(vm.types, 0);
    // };
    vm.num = 1;
    vm.shouye = function ($event) {
      getdata(vm.types, 0);
      vm.num = 1;
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.weiye = function ($event) {
      getdata(vm.types, (vm.yeshu - 1) * 8);
      vm.num = vm.yeshu;
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.shangye = function ($event) {
      vm.num = $window.parseInt(vm.num);
      if (isNaN(vm.num)) {
        $window.alert('请填写数字');
      } else {
        if (vm.num < 1) {
          vm.num = 1;
        } else if (vm.num > vm.yeshu) {
          vm.num = vm.yeshu;
        } else {
          vm.num = vm.num - 1;
          if (vm.num < 1) {
            vm.num = 1;
          }
        }
        getdata(vm.types, (vm.num - 1) * 8);
      }
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.xiaye = function ($event) {
      vm.num = $window.parseInt(vm.num);
      if (isNaN(vm.num)) {
        $window.alert('请填写数字');
      } else {
        if (vm.num < 1) {
          vm.num = 1;
        } else if (vm.num > vm.yeshu) {
          vm.num = vm.yeshu;
        } else {
          vm.num = vm.num + 1;
          if (vm.num > vm.yeshu) {
            vm.num = vm.yeshu;
          }
        }
        getdata(vm.types, (vm.num - 1) * 8);
      }
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    vm.tiao = function ($event) {
      vm.num = $window.parseInt(vm.num);
      if (isNaN(vm.num)) {
        $window.alert('请填写数字');
      } else {
        if (vm.num < 1) {
          vm.num = 1;
        } else if (vm.num > vm.yeshu) {
          vm.num = vm.yeshu;
        }
        getdata(vm.types, (vm.num - 1) * 8);
      }
      angular.element(document.querySelector('.pageactive')).removeClass('pageactive');
      $event.target.className = 'pageactive';
    };
    function getdata(types, num) {
      partydtService.query({comm: types, limit: num}).$promise.then(function (data) {
        vm.dongtai = data;
      });
    }
    function getcount(types) {
      partydtService.query({count: 1, comm: types}).$promise.then(function (data) {
        vm.count = data[0].num;
        vm.yeshu = Math.ceil(vm.count / 8);
      });
    }
    getcount(vm.types);
    getdata(vm.types, 0);

  }
}());
