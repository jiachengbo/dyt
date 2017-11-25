(function () {
  'use strict';

  angular
    .module('dynamic')
    .controller('DynamicMainOneTableController', DynamicMainOneTableController);

  DynamicMainOneTableController.$inject = ['$scope', '$stateParams', 'Notification', '$log', '$window', 'DynamicService', '$uibModal', 'Upload', 'Authentication', 'CommunityService', '$timeout', 'localStorageService', '$state'];
  function DynamicMainOneTableController($scope, $stateParams, Notification, $log, $window, DynamicService, $uibModal, Upload, Authentication, CommunityService, $timeout, localStorageService, $state) {
    var vmo = this;
    vmo.userCommId = '';
    //获取参数
    vmo.id = $stateParams.tabindex;
    vmo.name = $stateParams.tabname;
    console.log(vmo.name);
    var keytype = localStorageService.getItems('KeyWorkTypeConstant');
    vmo.keytype = [];
    for (var i = 0; i < keytype.length; i++) {
      // if (keytype[i].name !== '基层动态') {
      vmo.keytype.push(keytype[i]);
      // }
    }
    vmo.typeid = $stateParams.typeId;
    //根据 两学一做 字刷选列表数据
    vmo.TJ = $stateParams.tj;
    $timeout(function () {
      if (vmo.id === 1) {
        vmo.style = '';
      } else {
        vmo.style = 'visibility:hidden';
      }
    }, 100);
    var showPartyType = true;
    var showActivityType = true;
    //两学一做，增加6种类型
    var activityname = 'type';
    vmo.disn = function () {
      $state.go('dynamic.main.one', {typeId: vmo.typeid});
    };
    if (vmo.id === 1) {
      activityname = 'KeyWorkTypeConstant.name';
      showPartyType = false;
      showActivityType = true;
    } else {
      activityname = 'type';
      showPartyType = true;
      showActivityType = false;
    }
    vmo.arr = (($stateParams.typeId === '3' || $stateParams.typeId === '0' || $stateParams.typeId === 0 || $stateParams.typeId === 3) ? [
      {field: 'title', displayName: '活动主题', width: 200},
      {field: 'content', displayName: '活动内容', width: 400},
      {field: activityname, displayName: '活动类型', visible: showActivityType},
      {field: 'partytype', displayName: '党建类型'},
      // {field: 'KeyWorkTypeConstant.name', displayName: '活动类型'},
      // {field: 'type', displayName: '活动类型'},
      {field: 'starttime', displayName: '开始时间', cellFilter: 'date:\"yyyy-MM-dd\"'},
      {field: 'endtime', displayName: '结束时间', cellFilter: 'date:\"yyyy-MM-dd\"'},
      {field: 'CommunityVillageConstant.name', displayName: '所属社区'},
      {field: 'head', displayName: '负责人'},
      {field: 'peoplenum', displayName: '参加人数'},
      {field: 'phone', displayName: '联系电话'},
      {field: 'address', displayName: '活动地点'}
    ] : [
      {field: 'title', displayName: '活动主题', width: '55%'},
      // {field: 'content', displayName: '活动内容', width: 400},
      {field: 'CommunityVillageConstant.name', displayName: '所属社区', width: '15%'},
      {field: activityname, displayName: '活动类型', visible: showActivityType, width: '15%'},
      {field: 'partytype', displayName: '党建类型', width: '15%'}
      // {field: 'KeyWorkTypeConstant.name', displayName: '活动类型'},
      // {field: 'type', displayName: '活动类型'},
      // {field: 'starttime', displayName: '开始时间', cellFilter: 'date:\"yyyy-MM-dd\"'},
      // {field: 'endtime', displayName: '结束时间', cellFilter: 'date:\"yyyy-MM-dd\"'},
      // {field: 'CommunityVillageConstant.name', displayName: '所属社区'},
      // {field: 'head', displayName: '负责人'},
      // {field: 'peoplenum', displayName: '参加人数'},
      // {field: 'phone', displayName: '联系电话'},
      // {field: 'address', displayName: '活动地点'}
    ]);
    vmo.show = vmo.arr.length > 2 ? 0 : 1;
    //表数据
    vmo.tableData = [];
    //ui-grid 当前选择的行
    vmo.selectedRow = null;
    //打开模态框,返回模态框实例
    vmo._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/dynamic/client/views/dynamic-modal-form.client.view.html',
        controller: 'DynamicModalFormController',
        controllerAs: 'mo',
        backdrop: 'static',
        resolve: resarg,
        size: 'lg'
      });
    };
    //增加数据
    vmo.add = function () {
      var modalInstance = vmo._openModal({
        //dynamic会传入modal的controller
        dynamicData: function () {
          return new DynamicService();
        },
        //表明是增加
        method: function () {
          return '新增';
        },
        tableName: function () {
          return vmo.name;
        },
        //党建类型
        partyid: function () {
          return vmo.type;
        },
        //当前登录用户所属的社区id
        userCommId: function () {
          return vmo.userCommId;
        },
        show: function () {
          return vmo.show;
        }
      });
      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        Upload.upload({
          url: '/api/dynamic',
          data: result
        })
          .then(function (res) {
            //vmo.gridOptions.data.push(new DynamicService(res.data));
            refreshRecordCount(vmo.queryParam);
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 新增成功!'});
          })
          .catch(function (err) {
            $log.error('dynamic add save error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 新增失败!'
            });
          });
      })
        .catch(function (reason) {
          $log.log('Modal dismissed:', reason);
        });
    };

    //删除数据
    vmo.remove = function () {
      if ($window.confirm('确定要删除吗?')) {
        vmo.selectedRow.$remove(function () {
          var rowindex = vmo.tableData.indexOf(vmo.selectedRow);
          //去掉表格中的数据
          vmo.tableData.splice(rowindex, 1);
          //复位当前行
          vmo.selectedRow = null;
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 删除成功!'});
        })
          .catch(function (err) {
            $log.error('dynamic deleted error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 删除失败!'
            });
          });
      }
    };

    //修改或查看数据
    vmo._updateorview = function (isupdate) {
      var modalInstance = vmo._openModal({
        dynamicData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vmo.selectedRow);
        },
        method: function () {
          return isupdate ? '修改' : '查看';
        },
        //党建类型
        partyid: function () {
          return vmo.type;
        },
        tableName: function () {
          return vmo.name;
        },
        //当前登录用户所属的社区id
        userCommId: function () {
          return vmo.userCommId;
        }
      });

      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        if (isupdate) {
          Upload.upload({
            url: '/api/dynamic/' + result.keyworkid,
            data: result
          })
            .then(function (res) {
              //修改表格显示的数据
              angular.extend(vmo.selectedRow, res.data);
              Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 修改成功!'});
            })
            .catch(function (err) {
              $log.error('dynamic update save error:', err.data.message);
              Notification.error({
                message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
                '修改失败!'
              });
            });
        }
      }).catch(function (reason) {
        $log.log('Modal dismissed:', reason);
      });
    };

    //修改
    vmo.update = function () {
      return vmo._updateorview(true);
    };
    //查看
    vmo.view = function () {
      return vmo._updateorview(false);
    };
    //ui-gird 基本配置参数
    vmo.gridOptions = {
      //表数据
      data: vmo.tableData,
      columnDefs: vmo.arr,

      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vmo.gridApi = gridApi;
        //监视行改变函数
        gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
          $log.log('row selected ' + row.isSelected, row);
          vmo.selectedRow = row.isSelected ? row.entity : null;
        });
        //分页按钮事件
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          refreshPageData(newPage, pageSize);
        });
      },
      paginationPageSizes: [20, 30, 40], //每页显示个数可选项
      paginationCurrentPage: 1, //当前页码
      paginationPageSize: 20,
      //使用自定义翻页控制
      useExternalPagination: true,
      //不允许表格左上角菜单
      enableGridMenu: false
    };

    //获取当前登录用户信息
    var partyrole = localStorageService.getItems('PartyOrganizationUnitTypeConstant');
    if (Authentication.user !== null) {
      if (Authentication.user.roles[1].indexOf('_') !== -1) {
        angular.forEach(partyrole, function (value, key) {
          if (value.roles.indexOf(Authentication.user.roles[1].split('_')[0]) !== -1) {
            vmo.type = value.id;
          }
        });
      } else {
        angular.forEach(partyrole, function (value, key) {
          if (value.roles === Authentication.user.roles[1]) {
            vmo.type = value.id;
          }
        });
      }
      if (vmo.type) {
        switch (vmo.type) {
          case 1:
            vmo.type = '城市党建';
            break;
          case 2:
            vmo.type = '农村党建';
            break;
          case 3:
            vmo.type = '社会组织党建';
            break;
          case 4:
            vmo.type = '机关党建';
            break;
          case 5:
            vmo.type = '非公党建';
            break;
          default:
            break;
        }
      }
      if (Authentication.user.roles[1].indexOf('_') !== -1) {
        var role = Authentication.user.roles[1].split('_');
        CommunityService.query({
          roles: role[1]
        }).$promise.then(function (data) {
          vmo.userCommId = data[0].id;
          if (vmo.type) {
            vmo.queryParam = {
              typeId: 0,
              type: vmo.name,
              limit: 0,
              offset: 0,
              communityId: vmo.userCommId,
              partytype: vmo.type,
              typeId1: vmo.name === '两学一做' ? $stateParams.typeId : 0
            };
          } else {
            vmo.queryParam = {
              typeId: 0,
              type: vmo.name,
              limit: 0,
              offset: 0,
              communityId: vmo.userCommId,
              typeId1: vmo.name === '两学一做' ? $stateParams.typeId : 0
            };
          }
          //刷新记录总数
          refreshRecordCount(vmo.queryParam);
        });
      } else {
        //分页参数
        if (vmo.type) {
          vmo.queryParam = {
            typeId: 0,
            type: vmo.name,
            limit: 0,
            offset: 0,
            communityId: vmo.userCommId,
            partytype: vmo.type,
            typeId1: vmo.name === '两学一做' ? $stateParams.typeId : 0
          };
        } else {
          vmo.queryParam = {
            typeId: 0,
            type: vmo.name,
            limit: 0,
            offset: 0,
            communityId: vmo.userCommId,
            typeId1: vmo.name === '两学一做' ? $stateParams.typeId : 0
          };
        }
        //刷新记录总数
        refreshRecordCount(vmo.queryParam);
      }
    }
    //刷新记录总数
    function refreshRecordCount(queryParam) {
      DynamicService.query(queryParam).$promise
        .then(function (result) {
          vmo.gridOptions.totalItems = result[0].sum;
        })
        .then(function () {
          refreshPageData(1, vmo.gridOptions.paginationPageSize);
        })
        .catch(function (err) {
          $log.error('getCount error:', err);
        });
    }

    //刷新页面数据
    function refreshPageData(pageNumber, pageSize) {
      vmo.gridOptions.paginationCurrentPage = pageNumber;//当前页码
      //页面，记录数限制参数
      var pageParam;
      if (vmo.type) {
        pageParam = {
          typeId: 0,
          type: vmo.name,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          communityId: vmo.userCommId,
          partytype: vmo.type,
          typeId1: vmo.name === '两学一做' ? $stateParams.typeId : 0
        };
      } else {
        pageParam = {
          typeId: 0,
          type: vmo.name,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          communityId: vmo.userCommId,
          typeId1: vmo.name === '两学一做' ? $stateParams.typeId : 0
        };
      }
      //取后台数据，默认按创建时间降序排序
      return DynamicService.query(pageParam).$promise
        .then(function (data) {
          vmo.gridOptions.data = vmo.tableData = data;
          return data;
        })
        .catch(function (err) {
          $log.error('query error:', err);
        });
    }
  }
}());
