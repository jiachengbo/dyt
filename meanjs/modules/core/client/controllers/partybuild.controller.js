(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyBuildController', PartyBuildController);
  PartyBuildController.$inject = ['$scope', 'InterFlowService', '$window', 'partybuildService', 'partyjiaoliuService', 'communityService', '$state', '$rootScope', '$log', 'partydtService', '$uibModal'];
  function PartyBuildController($scope, InterFlowService, $window, partybuildService, partyjiaoliuService, communityService, $state, $rootScope, $log, partydtService, $uibModal) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.img = '/modules/core/client/img/image/partybuild/2.png';

    vm.wg = false;
    vm.showPic = function (num) {
      if (num === 1) {
        vm.img = '/modules/core/client/img/image/partybuild/1.png';
        vm.wg = false;
      } else if (num === 2) {
        vm.img = '/modules/core/client/img/image/partybuild/2.png';
        vm.wg = false;
      } else if (num === 3) {
        vm.img = '/modules/core/client/img/image/partybuild/3.png';
        vm.wg = false;
      } else if (num === 4) {
        vm.img = '/modules/core/client/img/image/partybuild/4.png';
        vm.wg = true;
      }
    };
    vm.openjgModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/core/client/views/shequwg.html',
        controller: 'shequwgController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: resarg
      });
    };
    vm.arr = [
      {
        community: '八一社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '芦苇',
            'sex': '女',
            'birthday': '1979.1',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区副主任、委员',
            'address': '西影路336号',
            'tel': '85243120'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '赵艳艳',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区',
            'address': '西影路316号',
            'tel': '85243120'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '苏鲜亮',
            'sex': '男',
            'birthday': '1957.8',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区居监会委员',
            'address': '西影路336号',
            'tel': '85243120'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '张江燕',
            'sex': '女',
            'birthday': '1988.2',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区书记',
            'address': '丈八东路489号',
            'tel': '85243120'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '何苗',
            'sex': '女',
            'birthday': '1986.11',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区主任',
            'address': '西影路316号',
            'tel': '85243120'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '苑惠宁',
            'sex': '女',
            'birthday': '1975.4',
            'nation': '汉',
            'edu': '大学',
            'workunit': '无',
            'address': '西影路36号',
            'tel': '85243120'
          }
        ]
      },
      {
        community: '八一社区',
        grid: '第二网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '康苏娅',
            'sex': '女',
            'birthday': '1968.11',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区委员',
            'address': '西影路25号',
            'tel': '85243120'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '梁华',
            'sex': '女',
            'birthday': '1981.5',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区',
            'address': '观音庙村',
            'tel': '85243120'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王爱霞',
            'sex': '女',
            'birthday': '1958.3',
            'nation': '汉',
            'edu': '大学',
            'workunit': '退休',
            'address': '西影路411号',
            'tel': '85243120'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '李琳',
            'sex': '女',
            'birthday': '1952.4',
            'nation': '汉',
            'edu': '大学',
            'workunit': '退休',
            'address': '西影路411号',
            'tel': '85243120'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '耶正利',
            'sex': '男',
            'birthday': '1967.5',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区副主任',
            'address': '西影路派出所',
            'tel': '85243120'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '胡优民',
            'sex': '男',
            'birthday': '1960.11',
            'nation': '汉',
            'edu': '大学',
            'workunit': '无',
            'address': '西影路336号',
            'tel': '85243120'
          }
        ]
      },
      {
        community: '八一社区',
        grid: '第三网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '张小英',
            'sex': '女',
            'birthday': '1979.4',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区委员',
            'address': '西影路25号',
            'tel': '85243120'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '常毅',
            'sex': '男',
            'birthday': '1962.9',
            'nation': '回',
            'edu': '大学',
            'workunit': '西北有色地研院',
            'address': '西影路25号',
            'tel': '85243120'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '田沛君',
            'sex': '男',
            'birthday': '1967.10',
            'nation': '汉',
            'edu': '大学',
            'workunit': '无',
            'address': '西影路25号',
            'tel': '85243120'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '郝萍',
            'sex': '女',
            'birthday': '1958.2',
            'nation': '汉',
            'edu': '大学',
            'workunit': '退休',
            'address': '西影路25号',
            'tel': '85243120'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '胡军',
            'sex': '男',
            'birthday': '1969.5',
            'nation': '汉',
            'edu': '大学',
            'workunit': '无',
            'address': '西影路336号',
            'tel': '85243120'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '杜卫国',
            'sex': '女',
            'birthday': '1954.10',
            'nation': '汉',
            'edu': '大学',
            'workunit': '退休',
            'address': '西影路396号',
            'tel': '85243120'
          }
        ]
      },
      {
        community: '八一社区',
        grid: '第四网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '汪小英',
            'sex': '女',
            'birthday': '1969.2',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区委员',
            'address': '西影路25号',
            'tel': '85243120'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '张晓敏',
            'sex': '女',
            'birthday': '1986.2',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区专职',
            'address': '芙蓉东路69号',
            'tel': '85243120'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王燕',
            'sex': '女',
            'birthday': '1958.10',
            'nation': '汉',
            'edu': '大学',
            'workunit': '退休',
            'address': '西影路316号',
            'tel': '85243120'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '赵春英',
            'sex': '女',
            'birthday': '1967.4',
            'nation': '汉',
            'edu': '大学',
            'workunit': '八一社区委员',
            'address': '西影路316号',
            'tel': '85243120'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '黄东浩',
            'sex': '男',
            'birthday': '1967.9',
            'nation': '汉',
            'edu': '大学',
            'workunit': '无',
            'address': '西影路25号',
            'tel': '85243120'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '穆如南',
            'sex': '男',
            'birthday': '1938.11',
            'nation': '汉',
            'edu': '大学',
            'workunit': '退休',
            'address': '西影路316号',
            'tel': '85243120'
          }
        ]
      },
      {
        community: '翠华北路社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '王瑞娜',
            'sex': '女',
            'birthday': '1962.10',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华北路主任',
            'address': '育才路2号',
            'tel': '85239322'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '王群力',
            'sex': '男',
            'birthday': '1957.9',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华北路副主任',
            'address': '长安大学3区11号楼',
            'tel': '85224276'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '和  潇',
            'sex': '女',
            'birthday': '1992.8',
            'nation': '汉',
            'edu': '大专',
            'workunit': '计生专干',
            'address': '雁塔区世家星城',
            'tel': '85239322'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '毛建斌',
            'sex': '男',
            'birthday': '1977.5',
            'nation': '汉',
            'edu': '本科',
            'workunit': '社区支部委员',
            'address': '长安大学翠华路住宅区14号楼',
            'tel': '85239322'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '李建军',
            'sex': '男',
            'birthday': '1968.8',
            'nation': '汉',
            'edu': '本科',
            'workunit': '育才路派出所民警',
            'address': '翠华路333号',
            'tel': '85581437'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '谢清华',
            'sex': '女',
            'birthday': '1986.10',
            'nation': '汉',
            'edu': '本科',
            'workunit': '劳保协管',
            'address': '翠华路393号',
            'tel': '85239322'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '赵小刚',
            'sex': '男',
            'birthday': '1969.5',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '国防工办 后勤主任',
            'address': '翠华路107号',
            'tel': '13379033397'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '张戈',
            'sex': '男',
            'birthday': '1975.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '国防工办',
            'address': '翠华路107号',
            'tel': '13772065824'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '何迎春',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '中专',
            'workunit': '翠华南路社区 ',
            'address': '西影路407号',
            'tel': '18792960963'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第二网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '王晓明',
            'sex': '男',
            'birthday': '1967.7',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '邮电四所  物业副主任 ',
            'address': '翠华路107号',
            'tel': '15594625712'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '王晓明',
            'sex': '男',
            'birthday': '1967.7',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '邮电四所  物业副主任 ',
            'address': '翠华路107号',
            'tel': '15594625712'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '韩玲',
            'sex': '女',
            'birthday': '1976.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 ',
            'address': '小寨东路5号',
            'tel': '13379222504'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第三网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '俞文',
            'sex': '男',
            'birthday': '1968.5',
            'nation': '汉',
            'edu': '本科',
            'workunit': '陕西省翠华路老干所 ',
            'address': '康复路1号',
            'tel': '15388606762'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '何迎春',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '中专',
            'workunit': '翠华南路社区 ',
            'address': '西影路407号',
            'tel': '18792960963'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第四网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '恩威',
            'sex': '女',
            'birthday': '1971.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区  委员',
            'address': '纬二街甲字65号',
            'tel': '18991933787'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '达里京',
            'sex': '男',
            'birthday': '1972.3',
            'nation': '汉',
            'edu': '大专',
            'workunit': '陕西省行政学院   ',
            'address': '纬二街甲字65号',
            'tel': '15591883768'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '韩玲',
            'sex': '女',
            'birthday': '1976.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 ',
            'address': '小寨东路5号',
            'tel': '13379222504'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第五网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '吴咏梅',
            'sex': '女',
            'birthday': '1976.2',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区  委员',
            'address': '翠华路108号',
            'tel': '18220553357'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '李俊武',
            'sex': '男',
            'birthday': '1975.6',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔小学    ',
            'address': '翠华路111号',
            'tel': '13991237105'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '何迎春',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '中专',
            'workunit': '翠华南路社区 ',
            'address': '西影路407号',
            'tel': '18792960963'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第六网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '吴利',
            'sex': '女',
            'birthday': '1968.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区  委员',
            'address': '翠华路103号',
            'tel': '13571979658'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '周建和',
            'sex': '男',
            'birthday': '1959.3',
            'nation': '汉',
            'edu': '本科',
            'workunit': '陕师大附中     ',
            'address': '翠华路103号',
            'tel': '13096988833'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '韩玲',
            'sex': '女',
            'birthday': '1976.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 ',
            'address': '小寨东路5号',
            'tel': '13379222504'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第七网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '孟羽',
            'sex': '女',
            'birthday': '1988.3',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区  副主任',
            'address': '雁南一路',
            'tel': '17792256497'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '贺蓬勃',
            'sex': '男',
            'birthday': '1975.10',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '八十五中学 办公室主任',
            'address': '翠华路112号',
            'tel': '13201767577'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '何迎春',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '中专',
            'workunit': '翠华南路社区 ',
            'address': '西影路407号',
            'tel': '18792960963'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第八网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区  委员',
            'address': '翠华路107号',
            'tel': '17792256497'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '文勤娃',
            'sex': '男',
            'birthday': '1955.10',
            'nation': '汉',
            'edu': '大专',
            'workunit': '退休',
            'address': '翠华路104号',
            'tel': '13201767577'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '韩玲',
            'sex': '女',
            'birthday': '1976.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 ',
            'address': '翠华路107号',
            'tel': '18792960963'
          }
        ]
      },
      {
        community: '翠华南路社区',
        grid: '第九网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '陈虹',
            'sex': '女',
            'birthday': '1983.3',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区  委员',
            'address': '小寨东路4号',
            'tel': '18629085812'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '张德山',
            'sex': '男',
            'birthday': '1947.5',
            'nation': '汉',
            'edu': '大专',
            'workunit': '退休',
            'address': '小寨东路4号',
            'tel': '13892801005'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王海娟',
            'sex': '女',
            'birthday': '1976.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区 计生专干',
            'address': '东仓门23号',
            'tel': '13572995200'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '苏楠',
            'sex': '女',
            'birthday': '1989.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '翠华南路社区 委员',
            'address': '翠华路107号',
            'tel': '15091545363'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '杨婧',
            'sex': '女',
            'birthday': '1983.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '翠华南路社区',
            'address': '翠华路226号',
            'tel': '15229390980'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '何迎春',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '中专',
            'workunit': '翠华南路社区 ',
            'address': '西影路407号',
            'tel': '18792960963'
          }
        ]
      },
      {
        community: '大雁塔社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '杨  萍',
            'sex': '女',
            'birthday': '1973.08',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔社区委员',
            'address': '东仪路',
            'tel': '13088992606'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '李美娟',
            'sex': '女',
            'birthday': '1982.10',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大观园物业部',
            'address': '芙蓉西路',
            'tel': '63630860'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '杨  萍',
            'sex': '女',
            'birthday': '1973.08',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔社区委员',
            'address': '东仪路',
            'tel': '13088992606'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '秦志诚',
            'sex': '男',
            'birthday': '1964.11',
            'nation': '汉',
            'edu': '大专',
            'workunit': '军队自主择业',
            'address': '大观园',
            'tel': '13474660586'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '房天文',
            'sex': '男',
            'birthday': '1983.06',
            'nation': '汉',
            'edu': '本科',
            'workunit': '西影路派出所',
            'address': '西延路',
            'tel': '18091815127'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '李美娟',
            'sex': '女',
            'birthday': '1982.10',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大观园物业部 ',
            'address': '芙蓉西路',
            'tel': '63630860'
          }
        ]
      },
      {
        community: '大雁塔社区',
        grid: '第二网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '鲁小兵',
            'sex': '男',
            'birthday': '1968.07',
            'nation': '汉',
            'edu': '高中',
            'workunit': '大雁塔社区委员',
            'address': '雁鸣小区',
            'tel': '13572214607'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '田  伟',
            'sex': '男',
            'birthday': '1975.09',
            'nation': '汉',
            'edu': '大专',
            'workunit': '景区公司',
            'address': '西晁村',
            'tel': '13087515875'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王  丽',
            'sex': '女',
            'birthday': '1982.06',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔社区',
            'address': '西延路',
            'tel': '18089283293'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '郭绍和',
            'sex': '男',
            'birthday': '1987.11',
            'nation': '汉',
            'edu': '硕士',
            'workunit': '陕西文都教育有限公司',
            'address': '西影路',
            'tel': '13474682355'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '周玙玙',
            'sex': '女',
            'birthday': '1991.04',
            'nation': '汉',
            'edu': '本科',
            'workunit': '大雁塔社区',
            'address': '玄武东路',
            'tel': '15686252309'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '田  伟',
            'sex': '男',
            'birthday': '1975.09',
            'nation': '汉',
            'edu': '大专',
            'workunit': '景区公司 ',
            'address': '西晁村',
            'tel': '13087515875'
          }
        ]
      },
      {
        community: '大雁塔社区',
        grid: '第三网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '周艳霞',
            'sex': '女',
            'birthday': '1963.04',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔社区副主任',
            'address': '科大南院',
            'tel': '15902939298'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '田  伟',
            'sex': '男',
            'birthday': '1975.09',
            'nation': '汉',
            'edu': '大专',
            'workunit': '景区公司',
            'address': '西晁村',
            'tel': '13087515875'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '李  欣',
            'sex': '女',
            'birthday': '1971.05',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔社区',
            'address': '西延路',
            'tel': '18729388205'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '茹鑫涛',
            'sex': '男',
            'birthday': '1986.01',
            'nation': '汉',
            'edu': '本科',
            'workunit': '寒窑遗址公园主管',
            'address': '雁引路',
            'tel': '15398081358'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '赵  毅',
            'sex': '男',
            'birthday': '1963.07',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔派出所',
            'address': '西影路',
            'tel': '13389297311'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '田  伟',
            'sex': '男',
            'birthday': '1975.09',
            'nation': '汉',
            'edu': '大专',
            'workunit': '景区公司 ',
            'address': '西晁村',
            'tel': '13087515875'
          }
        ]
      },
      {
        community: '大雁塔社区',
        grid: '第四网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '倪莹娟',
            'sex': '女',
            'birthday': '1983.09',
            'nation': '汉',
            'edu': '本科',
            'workunit': '大雁塔社区书记兼主任',
            'address': '太元路',
            'tel': '17791430595'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '杨  建',
            'sex': '男',
            'birthday': '1972.10',
            'nation': '汉',
            'edu': '大专',
            'workunit': '皇家花园物业部',
            'address': '环塔路',
            'tel': '85533705'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '周艳霞',
            'sex': '女',
            'birthday': '1963.04',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔社区副主任',
            'address': '科大南院',
            'tel': '15902939298'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '鲁小兵',
            'sex': '男',
            'birthday': '1968.07',
            'nation': '汉',
            'edu': '高中',
            'workunit': '大雁塔社区委员',
            'address': '雁鸣小区',
            'tel': '13572214607'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '赵  毅',
            'sex': '男',
            'birthday': '1963.07',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔派出所',
            'address': '西影路',
            'tel': '13389297311'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '杨  建',
            'sex': '男',
            'birthday': '1972.10',
            'nation': '汉',
            'edu': '大专',
            'workunit': '皇家花园物业部 ',
            'address': '环塔路',
            'tel': '85533705'
          }
        ]
      },
      {
        community: '大雁塔社区',
        grid: '第五网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '高抗战',
            'sex': '男',
            'birthday': '1961.06',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔社区副主任',
            'address': '翠华路',
            'tel': '13991893428'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '王景艳',
            'sex': '女',
            'birthday': '1965.07',
            'nation': '汉',
            'edu': '大专',
            'workunit': '频谱所',
            'address': '慈恩西路',
            'tel': '1372159188'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '王景艳',
            'sex': '女',
            'birthday': '1965.07',
            'nation': '汉',
            'edu': '大专',
            'workunit': '频谱所',
            'address': '慈恩西路',
            'tel': '1372159188'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '汪月月',
            'sex': '女',
            'birthday': '1982.12',
            'nation': '汉',
            'edu': '硕士',
            'workunit': '大雁塔社区',
            'address': '西影路',
            'tel': '15229023056'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '颜  晗',
            'sex': '男',
            'birthday': '1967.09',
            'nation': '汉',
            'edu': '本科',
            'workunit': '西影路派出所',
            'address': '西影路',
            'tel': '18691887879'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '王景艳',
            'sex': '男',
            'birthday': '1965.07',
            'nation': '汉',
            'edu': '大专',
            'workunit': '频谱所 ',
            'address': '慈恩西路',
            'tel': '1372159188'
          }
        ]
      },
      {
        community: '大雁塔社区',
        grid: '第六网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '倪莹娟',
            'sex': '女',
            'birthday': '1961.06',
            'nation': '汉',
            'edu': '本科',
            'workunit': '大雁塔社区书记兼主任',
            'address': '太元路',
            'tel': '17791430595'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '虎惠丽',
            'sex': '女',
            'birthday': '1965.07',
            'nation': '汉',
            'edu': '本科',
            'workunit': '御花园物业部',
            'address': '雁引路',
            'tel': '85516674'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '周艳霞',
            'sex': '女',
            'birthday': '1965.07',
            'nation': '汉',
            'edu': '大专',
            'workunit': '大雁塔社区',
            'address': '科大南院',
            'tel': '15902939298'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '鲁小兵',
            'sex': '男',
            'birthday': '1982.12',
            'nation': '汉',
            'edu': '高中',
            'workunit': '大雁塔社区',
            'address': '雁鸣小区',
            'tel': '13572214607'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '赵  毅',
            'sex': '男',
            'birthday': '1967.09',
            'nation': '汉',
            'edu': '本科',
            'workunit': '大雁塔派出所',
            'address': '西影路',
            'tel': '13389297311'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '虎惠丽',
            'sex': '女',
            'birthday': '1965.07',
            'nation': '汉',
            'edu': '本科',
            'workunit': '御花园物业部 ',
            'address': '雁引路',
            'tel': '85516674'
          }
        ]
      },
      {
        community: '海珀紫庭社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '张添',
            'sex': '女',
            'birthday': '1990.09.15',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭 社区居委会 副主任',
            'address': '西斜七路太白小区',
            'tel': '18792661094'
          },
          {
            'num': 2,
            'gridduty': '1号楼楼栋长',
            'name': '贾春楠',
            'sex': '女',
            'birthday': '1988.10.14',
            'nation': '汉',
            'edu': '专科',
            'workunit': '海珀紫庭社区居委会委员',
            'address': '西影路风景区家属院',
            'tel': '15771752670'
          },
          {
            'num': 3,
            'gridduty': '2号楼楼栋长',
            'name': '严惠兰',
            'sex': '女',
            'birthday': '1964.02.09',
            'nation': '汉',
            'edu': '高中',
            'workunit': '海珀紫庭社区工作人员',
            'address': '西影路26号院省建三公司家属院',
            'tel': '13379204630'
          },
          {
            'num': 4,
            'gridduty': '3号楼楼栋长',
            'name': '侯才',
            'sex': '男',
            'birthday': '1966.11.06',
            'nation': '汉',
            'edu': '大专',
            'workunit': '乐和公馆物业工作人员',
            'address': '灞桥区广安路',
            'tel': '17791683758'
          },
          {
            'num': 5,
            'gridduty': '中心户长',
            'name': '马海霞',
            'sex': '女',
            'birthday': '1979.10.17',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区居委会委员',
            'address': '乐和城小区',
            'tel': '18089243021'
          },
          {
            'num': 6,
            'gridduty': '党建工作专员',
            'name': '张阳',
            'sex': '女',
            'birthday': '1988.01.25',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '海珀紫庭社区党支部委员 ',
            'address': '西安市明德一路城南翡翠小区',
            'tel': '15891787396'
          },
          {
            'num': 7,
            'gridduty': '社区治理专员',
            'name': '赵静',
            'sex': '女',
            'birthday': '1985.11.04',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区居委会主任',
            'address': '曲江中海东郡小区',
            'tel': '15349289391'
          },
          {
            'num': 8,
            'gridduty': '为民服务专员',
            'name': '张添',
            'sex': '女',
            'birthday': '1990.09.15',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭 社区居委会 副主任 ',
            'address': '西斜七路太白小区',
            'tel': '18792661094'
          }
        ]
      },
      {
        community: '海珀紫庭社区',
        grid: '第二网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '肖飒',
            'sex': '女',
            'birthday': '1992.04.12',
            'nation': '汉',
            'edu': '专科',
            'workunit': '海珀紫庭社区居委会副主任',
            'address': '紫雁朗庭小区',
            'tel': '13571986338'
          },
          {
            'num': 2,
            'gridduty': '1-8号楼楼栋长',
            'name': '刘丹',
            'sex': '女',
            'birthday': '1991.05.16',
            'nation': '汉',
            'edu': '专科',
            'workunit': '海珀紫庭社区居委会委员',
            'address': '西延路宝枫佳苑',
            'tel': '18629652629'
          },
          {
            'num': 3,
            'gridduty': '9-12号楼楼栋长',
            'name': '邱玉菊',
            'sex': '女',
            'birthday': '1970.06.23',
            'nation': '汉',
            'edu': '高中',
            'workunit': '海珀紫庭社区工作人员',
            'address': '西影路26号省建三公司家属院',
            'tel': '15591839385'
          },
          {
            'num': 4,
            'gridduty': '15-19号楼楼栋长',
            'name': '焦博',
            'sex': '男',
            'birthday': '1994.10.01',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭小区物业主管',
            'address': '西安市长安区引镇',
            'tel': '18792942619'
          },
          {
            'num': 5,
            'gridduty': '20号楼楼栋长',
            'name': '陈攀如',
            'sex': '女',
            'birthday': '1985.11.08',
            'nation': '汉',
            'edu': '中专',
            'workunit': '陕西唐英实业有限公司（海珀紫庭20号楼）总经理',
            'address': '西安市土门翡丽城',
            'tel': '13474110011'
          },
          {
            'num': 6,
            'gridduty': '中心户长',
            'name': '马海霞',
            'sex': '女',
            'birthday': '1979.10.17',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区居委会委员',
            'address': '乐和城小区',
            'tel': '18089243021'
          },
          {
            'num': 7,
            'gridduty': '党建工作专员',
            'name': '张阳',
            'sex': '女',
            'birthday': '1988.01.25',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '海珀紫庭社区 党支部成员',
            'address': '西安市明德一路城南翡翠小区',
            'tel': '15891787396'
          },
          {
            'num': 8,
            'gridduty': '社区治理专员',
            'name': '赵静',
            'sex': '女',
            'birthday': '1985.11.04',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区 居委会主任',
            'address': '曲江中海东郡小区',
            'tel': '15349289391'
          },
          {
            'num': 9,
            'gridduty': '为民服务专员',
            'name': '张添',
            'sex': '女',
            'birthday': '1990.09.15',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区 居委会副主任 ',
            'address': '西斜七路太白小区',
            'tel': '18792661094'
          }
        ]
      },
      {
        community: '海珀紫庭社区',
        grid: '第三网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '马海霞',
            'sex': '女',
            'birthday': '1979.10.17',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区居委会委员',
            'address': '乐和城小区',
            'tel': '18089243021'
          },
          {
            'num': 2,
            'gridduty': '1号楼楼栋长',
            'name': '王永宏',
            'sex': '男',
            'birthday': '1975.10.15',
            'nation': '汉',
            'edu': '本科',
            'workunit': '乐和城小区居民',
            'address': '乐和城小区',
            'tel': '13399218926'
          },
          {
            'num': 3,
            'gridduty': '3号楼楼栋长',
            'name': '郭永宁',
            'sex': '男',
            'birthday': '1985.10.02',
            'nation': '汉',
            'edu': '本科',
            'workunit': '乐和城小区物业主管',
            'address': '乐和城小区',
            'tel': '13891893614'
          },
          {
            'num': 4,
            'gridduty': '中心户长',
            'name': '马海霞',
            'sex': '女',
            'birthday': '1979.10.17',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区居委会委员',
            'address': '乐和城小区',
            'tel': '18089243021'
          },
          {
            'num': 5,
            'gridduty': '党建工作专员',
            'name': '张阳',
            'sex': '女',
            'birthday': '1988.01.25',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '海珀紫庭社区党支部成员',
            'address': '明德一路城南翡翠小区',
            'tel': '15891787396'
          },
          {
            'num': 6,
            'gridduty': '社区治理专员',
            'name': '赵静',
            'sex': '女',
            'birthday': '1985.11.04',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区居委会主任',
            'address': '曲江中海东郡小区',
            'tel': '15349289391'
          },
          {
            'num': 7,
            'gridduty': '为民服务专员',
            'name': '张添',
            'sex': '女',
            'birthday': '1990.09.15',
            'nation': '汉',
            'edu': '本科',
            'workunit': '海珀紫庭社区居委会副主任',
            'address': '西斜七路太白小区',
            'tel': '18792661094'
          }
        ]
      },
      {
        community: '西影社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '赵麟',
            'sex': '男',
            'birthday': '1963.3',
            'nation': '汉',
            'edu': '本科',
            'workunit': '西影社区书记兼主任',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 2,
            'gridduty': '一号楼长',
            'name': '赵秀珍',
            'sex': '女',
            'birthday': '1947.10',
            'nation': '汉',
            'edu': '小学',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 3,
            'gridduty': '二号楼长',
            'name': '鬲君娣',
            'sex': '女',
            'birthday': '1949.8',
            'nation': '汉',
            'edu': '初中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 4,
            'gridduty': '四号楼长',
            'name': '张景英',
            'sex': '女',
            'birthday': '1950.6',
            'nation': '汉',
            'edu': '初中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 5,
            'gridduty': '五号楼长',
            'name': '曹静敏',
            'sex': '女',
            'birthday': '1969.11',
            'nation': '汉',
            'edu': '高中',
            'workunit': '社区',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 6,
            'gridduty': '七号楼长',
            'name': '王淑惠',
            'sex': '女',
            'birthday': '1942.8',
            'nation': '汉',
            'edu': '小学',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 7,
            'gridduty': '八号楼长',
            'name': '单翠薇',
            'sex': '女',
            'birthday': '1950.5',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 8,
            'gridduty': '九号楼长',
            'name': '焦传青',
            'sex': '女',
            'birthday': '1954.9',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 9,
            'gridduty': '十一号楼长',
            'name': '吴田珍',
            'sex': '女',
            'birthday': '1956.10',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 10,
            'gridduty': '十二号楼长',
            'name': '张松玲',
            'sex': '女',
            'birthday': '1956.6',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 11,
            'gridduty': '十三号楼长',
            'name': '孙洁',
            'sex': '女',
            'birthday': '1954.6',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 12,
            'gridduty': '十四号楼长',
            'name': '赵淑英',
            'sex': '女',
            'birthday': '1949.5',
            'nation': '汉',
            'edu': '初中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 13,
            'gridduty': '十五号楼长',
            'name': '赵淑英',
            'sex': '女',
            'birthday': '1956.10',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 14,
            'gridduty': '十六号楼长',
            'name': '方萍',
            'sex': '女',
            'birthday': '1954.6',
            'nation': '汉',
            'edu': '初中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 15,
            'gridduty': '十七号楼长',
            'name': '薛敏',
            'sex': '女',
            'birthday': '1954.5',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 16,
            'gridduty': '十八号楼长',
            'name': '贺素萍',
            'sex': '女',
            'birthday': '1955.12',
            'nation': '汉',
            'edu': '初中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          },
          {
            'num': 17,
            'gridduty': '十九号楼长',
            'name': '贺素萍',
            'sex': '女',
            'birthday': '1955.12',
            'nation': '汉',
            'edu': '初中',
            'workunit': '退休',
            'address': '西影社区',
            'tel': '85538978'
          }
        ]
      },
      {
        community: '兴科社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '付阳',
            'sex': '女',
            'birthday': '1987.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '兴科社区党支部书记兼社区主任',
            'address': '航天城小区',
            'tel': '18629389168'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '范亚飞',
            'sex': '男',
            'birthday': '1985.11',
            'nation': '汉',
            'edu': '本科',
            'workunit': '兴科社区委员',
            'address': '海伦国际小区',
            'tel': '13649295186'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '李景华',
            'sex': '女',
            'birthday': '1970.8',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区委员',
            'address': '水木兰亭小区',
            'tel': '18602974163'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '唐丽蔷',
            'sex': '女',
            'birthday': '1989.8',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '兴科社区专职',
            'address': '铁设院小区',
            'tel': '15091329077'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '董雪',
            'sex': '女',
            'birthday': '1985.12',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区专职',
            'address': '铁路庙村',
            'tel': '13152442534'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '邓丽佳',
            'sex': '女',
            'birthday': '1956.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区委员',
            'address': '盐湖研究所',
            'tel': '13227061124'
          }
        ]
      },
      {
        community: '兴科社区',
        grid: '第二网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '慕佩霞',
            'sex': '女',
            'birthday': '1974.12',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区党支部宣传委员兼副主任',
            'address': '钻探所家属院',
            'tel': '15229289980'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '王亚绘',
            'sex': '女',
            'birthday': '1969.5',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区委员',
            'address': '西影路61号',
            'tel': '13088951115'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '常西文',
            'sex': '女',
            'birthday': '1967.3',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区委员',
            'address': '铁一村',
            'tel': '13359242676'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '唐丽蔷',
            'sex': '女',
            'birthday': '1989.8',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '兴科社区专职',
            'address': '铁设院小区',
            'tel': '15091329077'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '董雪',
            'sex': '女',
            'birthday': '1985.12',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区专职',
            'address': '铁路庙村',
            'tel': '13152442534'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '邓丽佳',
            'sex': '女',
            'birthday': '1956.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区委员',
            'address': '盐湖研究所',
            'tel': '13227061124'
          }
        ]
      },
      {
        community: '兴科社区',
        grid: '第三网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '郭蓓',
            'sex': '女',
            'birthday': '1970.9',
            'nation': '汉',
            'edu': '本科',
            'workunit': '兴科社区党支部书记兼社区主任',
            'address': '西影路2号',
            'tel': '13720630393'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '赵婷',
            'sex': '女',
            'birthday': '1974.3',
            'nation': '汉',
            'edu': '高中',
            'workunit': '兴科社协管',
            'address': '铁一村',
            'tel': '13359285604'
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '李景华',
            'sex': '女',
            'birthday': '1970.8',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区委员',
            'address': '水木兰亭小区',
            'tel': '18602974163'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '唐丽蔷',
            'sex': '女',
            'birthday': '1989.8',
            'nation': '汉',
            'edu': '研究生',
            'workunit': '兴科社区专职',
            'address': '铁设院小区',
            'tel': '15091329077'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '董雪',
            'sex': '女',
            'birthday': '1985.12',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区专职',
            'address': '铁路庙村',
            'tel': '13152442534'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '邓丽佳',
            'sex': '女',
            'birthday': '1956.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '兴科社区委员',
            'address': '盐湖研究所',
            'tel': '13227061124'
          }
        ]
      },
      {
        community: '雁塔路社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '肖建安',
            'sex': '男',
            'birthday': '1957.12',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁塔路社区委员',
            'address': '乐游路8号',
            'tel': '18009258489 '
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '王宗卷',
            'sex': '男',
            'birthday': '1962.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '曲江大队',
            'address': '西影路605号',
            'tel': '13991210351 '
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '李伟巍',
            'sex': '男',
            'birthday': '1972.1',
            'nation': '汉',
            'edu': '本科',
            'workunit': '外事车队',
            'address': '雁塔南路369号',
            'tel': '15339255077 '
          },
          {
            'num': 4,
            'gridduty': '楼栋长',
            'name': '刘军',
            'sex': '男',
            'birthday': '1965.6',
            'nation': '汉',
            'edu': '中专',
            'workunit': '西影路派出所',
            'address': '雁塔分局丁白小区',
            'tel': '88220413'
          },
          {
            'num': 5,
            'gridduty': '中心户长',
            'name': '杨霞霞',
            'sex': '女',
            'birthday': '1983.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社',
            'address': '乐游路3号',
            'tel': '1375908372'
          },
          {
            'num': 6,
            'gridduty': '党建工作专员',
            'name': '穆臻',
            'sex': '女',
            'birthday': '1988.5',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社区副主任',
            'address': '乐游路31号',
            'tel': '18792951205'
          },
          {
            'num': 7,
            'gridduty': '社区治理专员',
            'name': '王会刚',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁塔路社区协管',
            'address': '西影路48号西勘小区',
            'tel': '18092178350'
          },
          {
            'num': 8,
            'gridduty': '为民服务专员',
            'name': '刘波',
            'sex': '女',
            'birthday': '1989.11',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社区专职',
            'address': '南二环256号铁路新村',
            'tel': '18792925085'
          }
        ]
      },
      {
        community: '雁塔路社区',
        grid: '第二网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '梁建义',
            'sex': '男',
            'birthday': '1959.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁塔路社区委员',
            'address': '乐游路3号',
            'tel': '15229317108'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '常锦荣',
            'sex': '男',
            'birthday': '1961.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '第一人民医院后勤',
            'address': '乐游路付1号',
            'tel': '13072902616'
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '程玉庆',
            'sex': '男',
            'birthday': '1956.6',
            'nation': '汉',
            'edu': '高中',
            'workunit': '西安饭庄门卫',
            'address': '乐游路9号',
            'tel': '15291983004'
          },
          {
            'num': 4,
            'gridduty': '楼栋长',
            'name': '任院超',
            'sex': '男',
            'birthday': '1972.11',
            'nation': '汉',
            'edu': '大专',
            'workunit': '沙坡检察',
            'address': '蓝田',
            'tel': '13772082539'
          },
          {
            'num': 5,
            'gridduty': '中心户长',
            'name': '杨霞霞',
            'sex': '女',
            'birthday': '1983.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社',
            'address': '乐游路3号',
            'tel': '1375908372'
          },
          {
            'num': 6,
            'gridduty': '党建工作专员',
            'name': '穆臻',
            'sex': '女',
            'birthday': '1988.5',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社区副主任',
            'address': '乐游路31号',
            'tel': '18792951205'
          },
          {
            'num': 7,
            'gridduty': '社区治理专员',
            'name': '王会刚',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁塔路社区协管',
            'address': '西影路48号西勘小区',
            'tel': '18092178350'
          },
          {
            'num': 8,
            'gridduty': '为民服务专员',
            'name': '刘波',
            'sex': '女',
            'birthday': '1989.11',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社区专职',
            'address': '南二环256号铁路新村',
            'tel': '18792925085'
          }
        ]
      },
      {
        community: '雁塔路社区',
        grid: '第三网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '曹文华',
            'sex': '女',
            'birthday': '1965.10',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁塔路社区委员',
            'address': '雁塔路99号',
            'tel': '18066591226'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '刘永刚',
            'sex': '男',
            'birthday': '1974.6',
            'nation': '汉',
            'edu': '本科',
            'workunit': '陕西质量监督所物业办',
            'address': '未央区凤城十路',
            'tel': '13991224569'
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '张建安',
            'sex': '男',
            'birthday': '1968.1',
            'nation': '汉',
            'edu': '大专',
            'workunit': '情报所后勤处',
            'address': '雁塔路99号',
            'tel': '1509132938'
          },
          {
            'num': 4,
            'gridduty': '楼栋长',
            'name': '刘玉英',
            'sex': '女',
            'birthday': '1939.7',
            'nation': '汉',
            'edu': '初中',
            'workunit': '五金交电家委会主任',
            'address': '雁塔路133号',
            'tel': '15209183117'
          },
          {
            'num': 5,
            'gridduty': '中心户长',
            'name': '杨霞霞',
            'sex': '女',
            'birthday': '1983.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社',
            'address': '乐游路3号',
            'tel': '1375908372'
          },
          {
            'num': 6,
            'gridduty': '党建工作专员',
            'name': '穆臻',
            'sex': '女',
            'birthday': '1988.5',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社区副主任',
            'address': '乐游路31号',
            'tel': '18792951205'
          },
          {
            'num': 7,
            'gridduty': '社区治理专员',
            'name': '王会刚',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁塔路社区协管',
            'address': '西影路48号西勘小区',
            'tel': '18092178350'
          },
          {
            'num': 8,
            'gridduty': '为民服务专员',
            'name': '刘波',
            'sex': '女',
            'birthday': '1989.11',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社区专职',
            'address': '南二环256号铁路新村',
            'tel': '18792925085'
          }
        ]
      },
      {
        community: '雁塔路社区',
        grid: '第四网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '候明祯',
            'sex': '女',
            'birthday': '1975.2',
            'nation': '汉',
            'edu': '高中',
            'workunit': '雁塔路社区委员',
            'address': '未央区名京九合院',
            'tel': '1819258339'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '万里',
            'sex': '男',
            'birthday': '1969.6',
            'nation': '汉',
            'edu': '大专',
            'workunit': '科学器材房产科',
            'address': '乐游路8号',
            'tel': '15319488732'
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '牛建国',
            'sex': '男',
            'birthday': '1964.5',
            'nation': '汉',
            'edu': '高中',
            'workunit': '科荣花园经理',
            'address': '莲湖区兰英小城',
            'tel': '13891822177'
          },
          {
            'num': 4,
            'gridduty': '楼栋长',
            'name': '薛强',
            'sex': '男',
            'birthday': '1964.5',
            'nation': '汉',
            'edu': '中专',
            'workunit': '考古所专员',
            'address': '西影路533号',
            'tel': '13572558520'
          },
          {
            'num': 5,
            'gridduty': '中心户长',
            'name': '杨霞霞',
            'sex': '女',
            'birthday': '1983.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社',
            'address': '乐游路3号',
            'tel': '1375908372'
          },
          {
            'num': 6,
            'gridduty': '党建工作专员',
            'name': '穆臻',
            'sex': '女',
            'birthday': '1988.5',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社区副主任',
            'address': '乐游路31号',
            'tel': '18792951205'
          },
          {
            'num': 7,
            'gridduty': '社区治理专员',
            'name': '王会刚',
            'sex': '女',
            'birthday': '1977.4',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁塔路社区协管',
            'address': '西影路48号西勘小区',
            'tel': '18092178350'
          },
          {
            'num': 8,
            'gridduty': '为民服务专员',
            'name': '刘波',
            'sex': '女',
            'birthday': '1989.11',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁塔路社区专职',
            'address': '南二环256号铁路新村',
            'tel': '18792925085'
          }
        ]
      },
      {
        community: '雁西社区',
        grid: '第一网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '张平',
            'sex': '男',
            'birthday': '1968.4',
            'nation': '汉',
            'edu': '高中',
            'workunit': '雁西社区委员',
            'address': '太阳小区',
            'tel': '13991338766'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '左文',
            'sex': '男',
            'birthday': '1965.6',
            'nation': '汉',
            'edu': '高中',
            'workunit': '太阳食品厂',
            'address': '太阳小区',
            'tel': '13072933650'
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '刘志安',
            'sex': '男',
            'birthday': '1955.2',
            'nation': '汉',
            'edu': '高中',
            'workunit': '自由职业',
            'address': '太阳小区',
            'tel': '13629287072'
          },
          {
            'num': 4,
            'gridduty': '楼栋长',
            'name': '田玉娥',
            'sex': '女',
            'birthday': '1957.7',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '太阳小区',
            'tel': '13038598112'
          },
          {
            'num': 5,
            'gridduty': '楼栋长',
            'name': '牛连山',
            'sex': '男',
            'birthday': '1956.12',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '太阳小区',
            'tel': '13772511387'
          },
          {
            'num': 6,
            'gridduty': '楼栋长',
            'name': '王树森',
            'sex': '男',
            'birthday': '1963.12',
            'nation': '汉',
            'edu': '高中',
            'workunit': '自由职业',
            'address': '太阳小区',
            'tel': '13909233739'
          },
          {
            'num': 7,
            'gridduty': '楼栋长',
            'name': '陈平安',
            'sex': '男',
            'birthday': '1954.6',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '太阳小区',
            'tel': '13032960864'
          },
          {
            'num': 8,
            'gridduty': '中心户长',
            'name': '姚娟',
            'sex': '女',
            'birthday': '1979.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '正和小区',
            'tel': '18691842949'
          },
          {
            'num': 9,
            'gridduty': '党建工作专员',
            'name': '张芸衔',
            'sex': '女',
            'birthday': '1988.12',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区党支部书记',
            'address': '金裕小区',
            'tel': '18789400826'
          },
          {
            'num': 10,
            'gridduty': '社区治理专员',
            'name': '马达',
            'sex': '男',
            'birthday': '1967.2',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区居委会副主任',
            'address': '防疫小区',
            'tel': '15809233339'
          },
          {
            'num': 11,
            'gridduty': '为民服务专员',
            'name': '南棚棚',
            'sex': '男',
            'birthday': '1968.10',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区专职',
            'address': '太阳小区',
            'tel': '15229292011'
          },
          {
            'num': 12,
            'gridduty': '为民服务专员',
            'name': '孙晓霞',
            'sex': '女',
            'birthday': '1977.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '13669238199'
          },
          {
            'num': 13,
            'gridduty': '为民服务专员',
            'name': '杨坤',
            'sex': '女',
            'birthday': '1969.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '18991926170'
          }
        ]
      },
      {
        community: '雁西社区',
        grid: '第二网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '赵维斌',
            'sex': '男',
            'birthday': '1971.8',
            'nation': '汉',
            'edu': '大学',
            'workunit': '金裕小区物业经理',
            'address': '金裕小区',
            'tel': '13571812300'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '王娟萍',
            'sex': '女',
            'birthday': '1966.3',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区副主任',
            'address': '党校小区',
            'tel': '13468762719'
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '南棚棚',
            'sex': '男',
            'birthday': '1986.10',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '太阳小区',
            'tel': '15229292011'
          },
          {
            'num': 4,
            'gridduty': '楼栋长',
            'name': '杨慧芳',
            'sex': '女',
            'birthday': '1983.2',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '太阳小区',
            'tel': '13519167179'
          },
          {
            'num': 5,
            'gridduty': '楼栋长',
            'name': '张芸衔',
            'sex': '女',
            'birthday': '1988.12',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区党支部书记',
            'address': '金裕小区',
            'tel': '18789400826'
          },
          {
            'num': 6,
            'gridduty': '中心户长',
            'name': '姚娟',
            'sex': '女',
            'birthday': '1979.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '正和小区',
            'tel': '18691842949'
          },
          {
            'num': 7,
            'gridduty': '党建工作专员',
            'name': '张芸衔',
            'sex': '女',
            'birthday': '1988.12',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区党支部书记',
            'address': '金裕小区',
            'tel': '18789400826'
          },
          {
            'num': 8,
            'gridduty': '社区治理专员',
            'name': '马达',
            'sex': '男',
            'birthday': '1967.2',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区副主任',
            'address': '防疫小区',
            'tel': '15809233339'
          },
          {
            'num': 9,
            'gridduty': '为民服务专员',
            'name': '南棚棚',
            'sex': '男',
            'birthday': '1986.10',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '太阳小区',
            'tel': '15229292011'
          },
          {
            'num': 10,
            'gridduty': '为民服务专员',
            'name': '孙晓霞',
            'sex': '女',
            'birthday': '1977.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '13669238199'
          },
          {
            'num': 11,
            'gridduty': '为民服务专员',
            'name': '杨坤',
            'sex': '女',
            'birthday': '1969.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '18991926170'
          }
        ]
      },
      {
        community: '雁西社区',
        grid: '第三网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '牛东春',
            'sex': '男',
            'birthday': '1953.2',
            'nation': '汉',
            'edu': '高中',
            'workunit': '党校小区物业经理',
            'address': '党校小区',
            'tel': '13325389129'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '张燕',
            'sex': '女',
            'birthday': '1944.3',
            'nation': '汉',
            'edu': '中专',
            'workunit': '退休',
            'address': '党校小区',
            'tel': '18066504793'
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '米芳锦',
            'sex': '女',
            'birthday': '1948.7',
            'nation': '汉',
            'edu': '初中',
            'workunit': '退休',
            'address': '党校小区',
            'tel': '15191570306'
          },
          {
            'num': 4,
            'gridduty': '楼栋长',
            'name': '张亚茹',
            'sex': '女',
            'birthday': '1967.4',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '党校小区',
            'tel': '13991380930'
          },
          {
            'num': 5,
            'gridduty': '楼栋长',
            'name': '杨峰斌',
            'sex': '男',
            'birthday': '1943.3',
            'nation': '汉',
            'edu': '中专',
            'workunit': '退休',
            'address': '党校小区',
            'tel': '18991303548'
          },
          {
            'num': 6,
            'gridduty': '楼栋长',
            'name': '李芝贤',
            'sex': '女',
            'birthday': '1950.5',
            'nation': '汉',
            'edu': '高中',
            'workunit': '退休',
            'address': '党校小区',
            'tel': '85514567'
          },
          {
            'num': 7,
            'gridduty': '楼栋长',
            'name': '王美英',
            'sex': '女',
            'birthday': '1954.7',
            'nation': '汉',
            'edu': '初中',
            'workunit': '退休',
            'address': '党校小区',
            'tel': '13892803016'
          },
          {
            'num': 8,
            'gridduty': '楼栋长',
            'name': '甄冬梅',
            'sex': '女',
            'birthday': '1951.2',
            'nation': '汉',
            'edu': '大专',
            'workunit': '退休',
            'address': '党校小区',
            'tel': '15339020869'
          },
          {
            'num': 9,
            'gridduty': '中心户长',
            'name': '姚娟',
            'sex': '女',
            'birthday': '1979.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '正和小区',
            'tel': '18691842949'
          },
          {
            'num': 10,
            'gridduty': '党建工作专员',
            'name': '张芸衔',
            'sex': '女',
            'birthday': '1988.12',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区党支部书记',
            'address': '金裕小区',
            'tel': '18789400826'
          },
          {
            'num': 11,
            'gridduty': '社区治理专员',
            'name': '马达',
            'sex': '男',
            'birthday': '1967.2',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区副主任',
            'address': '防疫小区',
            'tel': '15809233339'
          },
          {
            'num': 12,
            'gridduty': '为民服务专员',
            'name': '南棚棚',
            'sex': '男',
            'birthday': '1986.10',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '太阳小区',
            'tel': '15229292011'
          },
          {
            'num': 13,
            'gridduty': '为民服务专员',
            'name': '孙晓霞',
            'sex': '女',
            'birthday': '1977.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '13669238199'
          },
          {
            'num': 14,
            'gridduty': '为民服务专员',
            'name': '杨坤',
            'sex': '女',
            'birthday': '1969.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '13669238199'
          }
        ]
      },
      {
        community: '雁西社区',
        grid: '第四网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '姜超',
            'sex': '男',
            'birthday': '1973.5',
            'nation': '汉',
            'edu': '大学',
            'workunit': '防疫小区物业经理',
            'address': '防疫小区',
            'tel': '15929896886'
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '马达',
            'sex': '男',
            'birthday': '1967.2',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区副主任',
            'address': '防疫小区',
            'tel': '15809233339'
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '孙晓霞',
            'sex': '女',
            'birthday': '1977.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '13669238199'
          },
          {
            'num': 4,
            'gridduty': '中心户长',
            'name': '姚娟',
            'sex': '女',
            'birthday': '1979.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '正和小区',
            'tel': '18691842949'
          },
          {
            'num': 5,
            'gridduty': '党建工作专员',
            'name': '张芸衔',
            'sex': '女',
            'birthday': '1988.12',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区党支部书记',
            'address': '金裕小区',
            'tel': '18789400826'
          },
          {
            'num': 6,
            'gridduty': '社区治理专员',
            'name': '马达',
            'sex': '男',
            'birthday': '1967.2',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区副主任',
            'address': '防疫小区',
            'tel': '15809233339'
          },
          {
            'num': 7,
            'gridduty': '为民服务专员',
            'name': '南棚棚',
            'sex': '男',
            'birthday': '1986.10',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '太阳小区',
            'tel': '15229292011'
          },
          {
            'num': 8,
            'gridduty': '为民服务专员',
            'name': '孙晓霞',
            'sex': '女',
            'birthday': '1977.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '13669238199'
          },
          {
            'num': 9,
            'gridduty': '为民服务专员',
            'name': '杨坤',
            'sex': '女',
            'birthday': '1969.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '18991926170'
          }
        ]
      },
      {
        community: '雁西社区',
        grid: '第五网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '郭志龙',
            'sex': '男',
            'birthday': '1961.7',
            'nation': '汉',
            'edu': '高中',
            'workunit': '正和小区物业经理',
            'address': '正和小区',
            'tel': '15929896886'
          },
          {
            'num': 2,
            'gridduty': '网格长',
            'name': '王强',
            'sex': '男',
            'birthday': '1962.10',
            'nation': '汉',
            'edu': '高中',
            'workunit': '正和小区物业经理',
            'address': '正和小区',
            'tel': '15809233339'
          },
          {
            'num': 3,
            'gridduty': '楼栋长',
            'name': '常明利',
            'sex': '男',
            'birthday': '1968.11',
            'nation': '汉',
            'edu': '高中',
            'workunit': '雁西社区工作人员',
            'address': '正和小区',
            'tel': '18089291492'
          },
          {
            'num': 4,
            'gridduty': '楼栋长',
            'name': '姚娟',
            'sex': '女',
            'birthday': '1979.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '正和小区',
            'tel': '18691842949'
          },
          {
            'num': 5,
            'gridduty': '中心户长',
            'name': '姚娟',
            'sex': '女',
            'birthday': '1979.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '正和小区',
            'tel': '18691842949'
          },
          {
            'num': 6,
            'gridduty': '党建工作专员',
            'name': '张芸衔',
            'sex': '女',
            'birthday': '1988.12',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区党支部书记',
            'address': '金裕小区',
            'tel': '18789400826'
          },
          {
            'num': 7,
            'gridduty': '社区治理专员',
            'name': '马达',
            'sex': '男',
            'birthday': '1967.2',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区副主任',
            'address': '防疫小区',
            'tel': '15809233339'
          },
          {
            'num': 8,
            'gridduty': '为民服务专员',
            'name': '南棚棚',
            'sex': '男',
            'birthday': '1986.10',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '太阳小区',
            'tel': '15229292011'
          },
          {
            'num': 9,
            'gridduty': '为民服务专员',
            'name': '孙晓霞',
            'sex': '女',
            'birthday': '1977.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '13669238199'
          },
          {
            'num': 10,
            'gridduty': '为民服务专员',
            'name': '杨坤',
            'sex': '女',
            'birthday': '1969.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '18991926170'
          }
        ]
      },
      {
        community: '雁西社区',
        grid: '第六网格',
        griddata: [
          {
            'num': 1,
            'gridduty': '网格长',
            'name': '王娟',
            'sex': '女',
            'birthday': '1980.8',
            'nation': '汉',
            'edu': '大学',
            'workunit': '雁影华庭物业经理',
            'address': '雁影华庭小区',
            'tel': '18291929669 '
          },
          {
            'num': 2,
            'gridduty': '楼栋长',
            'name': '王娟',
            'sex': '女',
            'birthday': '1980.8',
            'nation': '汉',
            'edu': '大学',
            'workunit': '雁影华庭物业经理',
            'address': '雁影华庭小区',
            'tel': '18291929669 '
          },
          {
            'num': 3,
            'gridduty': '中心户长',
            'name': '姚娟',
            'sex': '女',
            'birthday': '1979.4',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '正和小区',
            'tel': '18691842949'
          },
          {
            'num': 4,
            'gridduty': '党建工作专员',
            'name': '张芸衔',
            'sex': '女',
            'birthday': '1988.12',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区党支部书记',
            'address': '金裕小区',
            'tel': '18789400826'
          },
          {
            'num': 5,
            'gridduty': '社区治理专员',
            'name': '马达',
            'sex': '男',
            'birthday': '1967.2',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区副主任',
            'address': '防疫小区',
            'tel': '15809233339'
          },
          {
            'num': 6,
            'gridduty': '为民服务专员',
            'name': '南棚棚',
            'sex': '男',
            'birthday': '1986.10',
            'nation': '汉',
            'edu': '本科',
            'workunit': '雁西社区工作人员',
            'address': '太阳小区',
            'tel': '15229292011'
          },
          {
            'num': 7,
            'gridduty': '为民服务专员',
            'name': '孙晓霞',
            'sex': '女',
            'birthday': '1977.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '13669238199'
          },
          {
            'num': 8,
            'gridduty': '为民服务专员',
            'name': '杨坤',
            'sex': '女',
            'birthday': '1969.9',
            'nation': '汉',
            'edu': '大专',
            'workunit': '雁西社区工作人员',
            'address': '西堪小区',
            'tel': '18991926170'
          }
        ]
      }
    ];
    vm.wgshuju = function (comm, grid) {
      var griddatas = {};
      for (var i = 0; i < vm.arr.length; i++) {
        if (vm.arr[i].community === comm && vm.arr[i].grid === grid) {
          griddatas.data = vm.arr[i].griddata;
          griddatas.grid = vm.arr[i].grid;
          griddatas.community = vm.arr[i].community;
        }
      }
      var ZZJGmodal = vm.openjgModal({
        type: function () {
          return griddatas;
        }
      });
    };
  }
}());
