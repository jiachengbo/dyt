(function () {
  'use strict';

  angular
    .module('core.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });

    // Redirect to 404 when route not found
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $injector.get('$state').transitionTo('not-found', null, {
        location: false
      });
    });
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/modules/core/client/views/home.client.view.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('not-found', {
        url: '/not-found',
        templateUrl: '/modules/core/client/views/404.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Not Found'
        }
      })
      .state('bad-request', {
        url: '/bad-request',
        templateUrl: '/modules/core/client/views/400.client.view.html',
        controller: 'ErrorController',
        controllerAs: 'vm',
        params: {
          message: function ($stateParams) {
            return $stateParams.message;
          }
        },
        data: {
          ignoreState: true,
          pageTitle: 'Bad Request'
        }
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: '/modules/core/client/views/403.client.view.html',
        data: {
          ignoreState: true,
          pageTitle: 'Forbidden'
        }
      })
      .state('index1', {
        url: '/index1',
        templateUrl: '/modules/core/client/views/index1.html',
        controller: 'Index1Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '主页'
        }
      })
      .state('basic', {
        url: '/basic',
        templateUrl: '/modules/core/client/views/basic.html',
        controller: 'BasicController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '基础信息'
        }
      })
      .state('keywork', {
        url: '/keywork',
        templateUrl: '/modules/core/client/views/keywork.html',
        controller: 'KeyWorkController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '重点工作动态'
        }
      })
      .state('quanhui', {
        url: '/quanhui',
        templateUrl: '/modules/core/client/views/quanhuijingshen.html'
        // controller: 'KeyWorkController',
        // controllerAs: 'vm',
        // data: {
        //   ignoreState: true,
        //   pageTitle: '重点工作动态'
        // }
      })
      .state('jiaoliu', {
        url: '/jiaoliu',
        templateUrl: '/modules/core/client/views/jiaoliu.html',
        controller: 'JiaoLiuController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '互动交流'
        }
      })
      .state('partybuild', {
        url: '/partybuild',
        templateUrl: '/modules/core/client/views/partybuild.html',
        controller: 'PartyBuildController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '区域化党建'
        }
      })
      .state('partymap', {
        url: '/partymap',
        templateUrl: '/modules/core/client/views/partymap.html',
        controller: 'PartyMapController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党建地图'
        }
      })
      .state('keyworkdangri', {
        url: '/keyworkdangri',
        templateUrl: '/modules/core/client/views/keyworkdangri.html',
        controller: 'KeyWorkDangRiController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '项目详情'
        }
      })
      .state('weijiamoshi', {
        url: '/weijiamoshi',
        templateUrl: '/modules/core/client/views/weijiazhidu.html',
        controller: 'weijiazhiduController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '项目详情'
        }
      })
      .state('partyInter', {
        url: '/partyInter',
        templateUrl: '/modules/core/client/views/partyInter.html',
        controller: 'PartyInterController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '入党流程'
        }
      })
      .state('partyGX', {
        url: '/partyGX',
        templateUrl: '/modules/core/client/views/partygx.html',
        controller: 'PartyGXInterController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '在线申请'
        }
      })
      .state('partyMY', {
        url: '/partyMY',
        templateUrl: '/modules/core/client/views/partymoney.html',
        controller: 'PartyMYInterController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '在线缴费'
        }
      })
      .state('partyDQ', {
        url: '/partyDQ',
        templateUrl: '/modules/core/client/views/partyDQ.html',
        controller: 'PartyDQController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党旗'
        }
      })
      .state('partyDZ', {
        url: '/partyDZ',
        templateUrl: '/modules/core/client/views/partyDZ.html',
        controller: 'PartyDZController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党章'
        }
      })
      .state('partyZS-1', {
        url: '/partyZS-1',
        templateUrl: '/modules/core/client/views/partyZS-1.html',
        controller: 'PartyZS1Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '基本知识'
        }
      })
      .state('partyZS-2', {
        url: '/partyZS-2',
        templateUrl: '/modules/core/client/views/partyZS-2.html',
        controller: 'PartyZS2Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党员组织关系'
        }
      })
      .state('partyZS-3', {
        url: '/partyZS-3',
        templateUrl: '/modules/core/client/views/partyZS-3.html',
        controller: 'PartyZS3Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党的组织生活'
        }
      })
      .state('partyZS-4', {
        url: '/partyZS-4',
        templateUrl: '/modules/core/client/views/partyZS-4.html',
        controller: 'PartyZS4Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党的组织生活'
        }
      })
      .state('partyZS-5', {
        url: '/partyZS-5',
        templateUrl: '/modules/core/client/views/partyZS-5.html',
        controller: 'PartyZS5Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党的组织生活'
        }
      })
      .state('partyDH', {
        url: '/partyDH',
        templateUrl: '/modules/core/client/views/partyDH.html',
        controller: 'PartyDHController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党徽'
        }
      })
      .state('partyGC', {
        url: '/partyGC',
        templateUrl: '/modules/core/client/views/partyGC.html',
        controller: 'PartyGCController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '创新发展'
        }
      })
      .state('partyGC-1', {
        url: '/partyGC-1',
        templateUrl: '/modules/core/client/views/partyGC-1.html',
        controller: 'PartyGC1Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '体育强国'
        }
      })
      .state('partyGC-2', {
        url: '/partyGC-2',
        templateUrl: '/modules/core/client/views/partyGC-2.html',
        controller: 'PartyGC2Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '青年红色筑梦之旅'
        }
      })
      .state('partyGC-3', {
        url: '/partyGC-3',
        templateUrl: '/modules/core/client/views/partyGC-3.html',
        controller: 'PartyGC3Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '青年红色筑梦之旅'
        }
      })
      .state('partyGC-5', {
        url: '/partyGC-5',
        templateUrl: '/modules/core/client/views/partyGC-5.html',
        controller: 'PartyGC5Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '在陕西'
        }
      })
      .state('partyGC-6', {
        url: '/partyGC-6',
        templateUrl: '/modules/core/client/views/partyGC-6.html',
        controller: 'PartyGC6Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '加强联系专家'
        }
      })
      .state('woman-0', {
        url: '/woman-0',
        templateUrl: '/modules/core/client/views/woman-0.html',
        controller: 'WomanController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-1', {
        url: '/woman-1',
        templateUrl: '/modules/core/client/views/woman-1.html',
        controller: 'Woman1Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-2', {
        url: '/woman-2',
        templateUrl: '/modules/core/client/views/woman-2.html',
        controller: 'Woman2Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-3', {
        url: '/woman-3',
        templateUrl: '/modules/core/client/views/woman-3.html',
        controller: 'Woman3Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-4', {
        url: '/woman-4',
        templateUrl: '/modules/core/client/views/woman-4.html',
        controller: 'Woman4Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-5', {
        url: '/woman-5',
        templateUrl: '/modules/core/client/views/woman-5.html',
        controller: 'Woman5Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-6', {
        url: '/woman-6',
        templateUrl: '/modules/core/client/views/woman-6.html',
        controller: 'Woman6Controller',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-7', {
        url: '/woman-7',
        templateUrl: '/modules/core/client/views/woman-7.html',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-8', {
        url: '/woman-8',
        templateUrl: '/modules/core/client/views/woman-8.html',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-9', {
        url: '/woman-9',
        templateUrl: '/modules/core/client/views/woman-9.html',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-10', {
        url: '/woman-10',
        templateUrl: '/modules/core/client/views/woman-10.html',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-11', {
        url: '/woman-11',
        templateUrl: '/modules/core/client/views/woman-11.html',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-12', {
        url: '/woman-12',
        templateUrl: '/modules/core/client/views/woman-12.html',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-13', {
        url: '/woman-13',
        templateUrl: '/modules/core/client/views/woman-13.html',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('woman-14', {
        url: '/woman-14',
        templateUrl: '/modules/core/client/views/woman-14.html',
        data: {
          ignoreState: true,
          pageTitle: '妇联'
        }
      })
      .state('partyxq', {
        url: '/partyxq',
        templateUrl: '/modules/core/client/views/partyxq.html',
        controller: 'PartyxqController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '项目详情'
        }
      })
      .state('partydt', {
        url: '/partydt',
        templateUrl: '/modules/core/client/views/partydongtai.html',
        controller: 'PartyDTController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党建动态'
        }
      })

      .state('partydtxq', {
        url: '/partydtxq',
        templateUrl: '/modules/core/client/views/partydtxq.html',
        controller: 'PartydtxqController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党建动态详情'
        }
      })
      .state('tongzhi', {
        url: '/tongzhi',
        templateUrl: '/modules/core/client/views/tongzhigunali.html',
        controller: 'tongzhiController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '通知公告'
        }
      })
      .state('tongzhixq', {
        url: '/tongzhixq',
        templateUrl: '/modules/core/client/views/tongzhixq.html',
        controller: 'tongzhiXQController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '通知详情'
        }
      })
      .state('djwgh', {
        url: '/djwgh',
        templateUrl: '/modules/core/client/views/dangjianwgh.html',
        controller: 'DangJianWGHController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '党建网格化'
        }
      })
      // .state('minqingE', {
      //   url: '/minqingE',
      //   templateUrl: '/modules/core/client/views/minqingyizhan.html',
      //   controller: 'MinqingEController',
      //   controllerAs: 'vm',
      //   data: {
      //     ignoreState: true,
      //     pageTitle: '民情驿站'
      //   }
      // })
      .state('jiedaodongtai', {
        url: '/jiedaodongtai',
        templateUrl: '/modules/core/client/views/jiedaodongtai.html',
        controller: 'jiedaoDTController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '街道动态'
        }
      })
      .state('keyworkxq', {
        url: '/keyworkxq',
        templateUrl: '/modules/core/client/views/keyworkxq.html',
        controller: 'KeyWorkXqController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '重点工作动态详情二级'
        }
      })
      .state('xiaqu', {
        url: '/xiaqu',
        templateUrl: '/modules/core/client/views/xiaqu.html',
        controller: 'XiaQuController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '辖区信息'
        }
      })
      .state('xiaquxq', {
        url: '/xiaquxq',
        templateUrl: '/modules/core/client/views/xiaquxq.html',
        controller: 'XiaQuXqController',
        controllerAs: 'vm',
        params: {
          unit: '武警医院社区',
          id: 1
        },
        data: {
          ignoreState: true,
          pageTitle: '辖区详情信息'
        }
      })
      .state('tuanwei', {
        url: '/tuanwei',
        templateUrl: '/modules/core/client/views/tuanwei.html',
        controller: 'TuanWeiController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '团委模块'
        }
      })
      .state('tuanweixq', {
        url: '/tuanweixq',
        templateUrl: '/modules/core/client/views/tuanweixq.html',
        controller: 'TuanWeiXqController',
        controllerAs: 'vm',
        params: {
          id: 1,
          type: '蒲公英'
        },
        data: {
          ignoreState: true,
          pageTitle: '团委详情模块'
        }
      })
      .state('fulian', {
        url: '/fulian',
        templateUrl: '/modules/core/client/views/fulian.html',
        controller: 'FuLianController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '妇联信息'
        }
      })
      .state('fulianxq', {
        url: '/fulianxq',
        templateUrl: '/modules/core/client/views/fulianxq.html',
        controller: 'FuLianXqController',
        controllerAs: 'vm',
        params: {
          id: 1
        },
        data: {
          ignoreState: true,
          pageTitle: '妇联详情信息'
        }
      })
      .state('study', {
        url: '/study',
        templateUrl: '/modules/core/client/views/study.html',
        controller: 'StudyController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '学习动态'
        }
      })
      .state('studyxq', {
        url: '/studyxq',
        templateUrl: '/modules/core/client/views/studyxq.html',
        controller: 'StudyXqController',
        controllerAs: 'vm',
        params: {
          id: 0
        },
        data: {
          ignoreState: true,
          pageTitle: '学习动态详情'
        }
      })
      .state('xianfenmofan', {
        url: '/xianfenmofan',
        templateUrl: '/modules/core/client/views/xianfenmofan.html',
        controller: 'XianFenController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '先锋模范'
        }
      })
      .state('gonghui', {
        url: '/gonghui',
        templateUrl: '/modules/core/client/views/gonghui.html',
        controller: 'GongHuiController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '工会模块'
        }
      })
      .state('gonghuixq', {
        url: '/gonghuixq',
        templateUrl: '/modules/core/client/views/gonghuixq.html',
        controller: 'GongHuiXqController',
        controllerAs: 'vm',
        params: {
          id: 1
        },
        data: {
          ignoreState: true,
          pageTitle: '工会模块'
        }
      })
      .state('baidumap', {
        url: '/baidumap',
        templateUrl: '/modules/core/client/views/partymapceshi.html',
        controller: 'baidumapController',
        controllerAs: 'vm'
        // params: {
        //   id: 1
        // },
        // data: {
        //   ignoreState: true,
        //   pageTitle: '工会模块'
        // }
      })
      .state('mingqingmap', {
        url: '/mingqingmap',
        templateUrl: '/modules/core/client/views/mingqingmap.html',
        controller: 'mingqingMapController',
        controllerAs: 'vm',
        params: {
          id: 1
        },
        data: {
          ignoreState: true,
          pageTitle: '民情地图'
        }
      })
      .state('mingqmapxq', {
        url: '/mingqmapxq',
        templateUrl: '/modules/core/client/views/mingqmapxq.html',
        controller: 'mingqMapxqController',
        controllerAs: 'vm',
        params: {
          unit: '八一社区'
        },
        data: {
          ignoreState: true,
          pageTitle: '民情地图详情'
        }
      })
      .state('topvoicexq', {
        url: '/topvoicexq',
        templateUrl: '/modules/core/client/views/topvoicexq.html',
        controller: 'TopVoiceXqController',
        controllerAs: 'vm',
        params: {
          id: 1
        },
        data: {
          ignoreState: true,
          pageTitle: '高层声音详情'
        }
      })
      .state('gonghujg', {
        url: '/gonghujg',
        templateUrl: '/modules/core/client/views/gonghuijg.html'
        // controller: 'PtAdminController',
        // controllerAs: 'vm',
        // data: {
        //   ignoreState: true,
        //   pageTitle: '普通管理员'
        // }
      })
      .state('tuanweijg', {
        url: '/tuanweijg',
        templateUrl: '/modules/core/client/views/tuanweijg.html'
        // controller: 'PtAdminController',
        // controllerAs: 'vm',
        // data: {
        //   ignoreState: true,
        //   pageTitle: '普通管理员'
        // }
      })
      .state('fulianjg', {
        url: '/fulianjg',
        templateUrl: '/modules/core/client/views/fulianjg.html'
        // controller: 'PtAdminController',
        // controllerAs: 'vm',
        // data: {
        //   ignoreState: true,
        //   pageTitle: '普通管理员'
        // }
      })
      .state('liangxue', {
        url: '/liangxue',
        templateUrl: '/modules/core/client/views/liangxueyizuo.html',
        controller: 'liangxueController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('yidang', {
        url: '/yidang',
        templateUrl: '/modules/core/client/views/yidang.html',
        controller: 'yidangController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('jicengdt', {
        url: '/jicengdt',
        templateUrl: '/modules/core/client/views/jicengdongtaixq.html',
        controller: 'jicengdtController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '基层动态'
        },
        params: {
          keyworkid: 1,
          typeId: 1
        }
      })
      .state('liangxuexq', {
        url: '/liangxuexq',
        templateUrl: '/modules/core/client/views/liangxuexq.html',
        controller: 'liangxuexqController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '两学详情'
        },
        params: {
          keyworkid: 1,
          typeId: 1
        }
      })
      .state('gonghui0', {
        url: '/gonghui0',
        templateUrl: '/modules/core/client/views/gonghui-0.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui1', {
        url: '/gonghui1',
        templateUrl: '/modules/core/client/views/gonghui-1.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui2', {
        url: '/gonghui2',
        templateUrl: '/modules/core/client/views/gonghui-2.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui3', {
        url: '/gonghui3',
        templateUrl: '/modules/core/client/views/gonghui-3.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui4', {
        url: '/gonghui4',
        templateUrl: '/modules/core/client/views/gonghui-4.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui5', {
        url: '/gonghui5',
        templateUrl: '/modules/core/client/views/gonghui-5.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui6', {
        url: '/gonghui6',
        templateUrl: '/modules/core/client/views/gonghui-6.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui7', {
        url: '/gonghui7',
        templateUrl: '/modules/core/client/views/gonghui-7.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui8', {
        url: '/gonghui8',
        templateUrl: '/modules/core/client/views/gonghui-8.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui9', {
        url: '/gonghui9',
        templateUrl: '/modules/core/client/views/gonghui-9.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('gonghui10', {
        url: '/gonghui10',
        templateUrl: '/modules/core/client/views/gonghui-10.html',
        data: {
          ignoreState: true,
          pageTitle: '工会政策法规'
        }
      })
      .state('tuanwei0', {
        url: '/tuanwei0',
        templateUrl: '/modules/core/client/views/GQT-0.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei1', {
        url: '/tuanwei1',
        templateUrl: '/modules/core/client/views/GQT-1.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei2', {
        url: '/tuanwei2',
        templateUrl: '/modules/core/client/views/GQT-2.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei3', {
        url: '/tuanwei3',
        templateUrl: '/modules/core/client/views/GQT-3.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei4', {
        url: '/tuanwei4',
        templateUrl: '/modules/core/client/views/GQT-4.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei5', {
        url: '/tuanwei5',
        templateUrl: '/modules/core/client/views/GQT-5.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei6', {
        url: '/tuanwei6',
        templateUrl: '/modules/core/client/views/GQT-6.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei7', {
        url: '/tuanwei7',
        templateUrl: '/modules/core/client/views/GQT-7.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei8', {
        url: '/tuanwei8',
        templateUrl: '/modules/core/client/views/GQT-8.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei9', {
        url: '/tuanwei9',
        templateUrl: '/modules/core/client/views/GQT-9.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei10', {
        url: '/tuanwei10',
        templateUrl: '/modules/core/client/views/GQT-10.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei11', {
        url: '/tuanwei11',
        templateUrl: '/modules/core/client/views/GQT-11.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei12', {
        url: '/tuanwei12',
        templateUrl: '/modules/core/client/views/GQT-12.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei13', {
        url: '/tuanwei13',
        templateUrl: '/modules/core/client/views/GQT-13.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('tuanwei14', {
        url: '/tuanwei14',
        templateUrl: '/modules/core/client/views/GQT-14.html',
        data: {
          ignoreState: true,
          pageTitle: '团的信息'
        }
      })
      .state('superadmin', {
        url: '/superadmin',
        templateUrl: '/modules/core/client/views/superadmin.html',
        controller: 'SuperAdminController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '超级管理员'
        }
      })
      .state('ptadmin', {
        url: '/ptadmin',
        templateUrl: '/modules/core/client/views/ptadmin.html',
        controller: 'PtAdminController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '普通管理员'
        }
      })
      .state('homeback', {
        url: '/homeback',
        templateUrl: '/modules/core/client/views/homeback.html',
        controller: 'HomeBackController',
        controllerAs: 'vm',
        data: {
          ignoreState: true,
          pageTitle: '后台界面UI'
        }
      })
      .state('study1-0', {
        url: '/study1-0',
        templateUrl: '/modules/core/client/views/study1-0.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study1-1', {
        url: '/study1-1',
        templateUrl: '/modules/core/client/views/study1-1.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study1-2', {
        url: '/study1-2',
        templateUrl: '/modules/core/client/views/study1-2.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study1-3', {
        url: '/study1-3',
        templateUrl: '/modules/core/client/views/study1-3.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study1-4', {
        url: '/study1-4',
        templateUrl: '/modules/core/client/views/study1-4.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study1-5', {
        url: '/study1-5',
        templateUrl: '/modules/core/client/views/study1-5.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study2-0', {
        url: '/study2-0',
        templateUrl: '/modules/core/client/views/study2-0.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study2-1', {
        url: '/study2-1',
        templateUrl: '/modules/core/client/views/study2-1.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study2-2', {
        url: '/study2-2',
        templateUrl: '/modules/core/client/views/study2-2.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study2-3', {
        url: '/study2-3',
        templateUrl: '/modules/core/client/views/study2-3.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study2-4', {
        url: '/study2-4',
        templateUrl: '/modules/core/client/views/study2-4.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study2-5', {
        url: '/study2-5',
        templateUrl: '/modules/core/client/views/study2-5.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study3-0', {
        url: '/study3-0',
        templateUrl: '/modules/core/client/views/study3-0.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study3-1', {
        url: '/study3-1',
        templateUrl: '/modules/core/client/views/study3-1.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study3-2', {
        url: '/study3-2',
        templateUrl: '/modules/core/client/views/study3-2.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study3-3', {
        url: '/study3-3',
        templateUrl: '/modules/core/client/views/study3-3.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study3-4', {
        url: '/study3-4',
        templateUrl: '/modules/core/client/views/study3-4.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('study3-5', {
        url: '/study3-5',
        templateUrl: '/modules/core/client/views/study3-5.html',
        data: {
          ignoreState: true,
          pageTitle: '两学一做'
        }
      })
      .state('shisanjie', {
        url: '/shisanjie',
        templateUrl: '/modules/core/client/views/shisanjie.html',
        data: {
          ignoreState: true,
          pageTitle: '精准扶贫'
        }
      })
      .state('jingzhunfupin', {
        url: '/fupin',
        templateUrl: '/modules/core/client/views/jingzhunfupin.html',
        data: {
          ignoreState: true,
          pageTitle: '精准扶贫'
        }
      })
      .state('minqingyizhan', {
        url: '/minqingyizhan',
        templateUrl: '/modules/core/client/views/minqingyizhan.html',
        data: {
          ignoreState: true,
          pageTitle: '民情驿站'
        }
      })
      .state('lingtouyan', {
        url: '/lingtouyan',
        templateUrl: '/modules/core/client/views/lingtouyan.html',
        data: {
          ignoreState: true,
          pageTitle: '领头雁'
        }
      })
    ;
  }
}());
