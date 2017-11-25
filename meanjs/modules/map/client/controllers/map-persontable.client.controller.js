(function () {
  'use strict';

  angular
    .module('map')
    .controller('MapPersonTableController', MapPersonTableController);

  MapPersonTableController.$inject = ['$scope', 'Notification', '$log', '$window',
    'Upload', 'MapPersonService', '$uibModal', 'Authentication', 'CommunityService', 'localStorageService'];
  function MapPersonTableController($scope, Notification, $log, $window,
                                    Upload, MapPersonService, $uibModal, Authentication, CommunityService, localStorageService) {
    var vm = this;
    vm.userCommId = '';
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;

    //打开模态框,返回模态框实例
    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/map/client/views/person-modal-form.client.view.html',
        controller: 'MapPersonModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        resolve: resarg,
        size: 'lg'
      });
    };

    //增加数据
    vm.add = function () {
      var modalInstance = vm._openModal({
        //map会传入modal的controller
        mapPersonData: function () {
          //空数据
          return new MapPersonService();
        },
        //表明是增加
        method: function () {
          return '新增';
        },
        partytype: function () {
          return vm.type;
        },
        //当前登录用户所属的社区id
        userCommId: function () {
          return vm.userCommId;
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        Upload.upload({
          url: '/api/map/person',
          data: result
        })
          .then(function (res) {
            //vm.gridOptions.data.push(res);
            refreshRecordCount(vm.queryParam);
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 新增人员成功!'});
          })
          .catch(function (err) {
            $log.error('map add save error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 新增人员失败!'
            });
          });
      })
        .catch(function (reason) {
          $log.log('Modal dismissed:', reason);
        });
    };

    //删除数据
    vm.remove = function () {
      if ($window.confirm('确定要删除吗?')) {
        vm.selectedRow.$remove(function () {
          var rowindex = vm.tableData.indexOf(vm.selectedRow);
          //去掉表格中的数据
          vm.tableData.splice(rowindex, 1);
          //复位当前行
          vm.selectedRow = null;
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 删除人员成功!'});
        })
          .catch(function (err) {
            $log.error('map deleted error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 删除人员失败!'
            });
          });
      }
    };

    //修改或查看数据
    vm._updateorview = function (isupdate) {
      var modalInstance = vm._openModal({
        mapPersonData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        method: function () {
          return isupdate ? '修改' : '查看';
        },
        partytype: function () {
          return vm.type;
        },
        //当前登录用户所属的社区id
        userCommId: function () {
          return vm.userCommId;
        }
      });

      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        if (isupdate) {
          Upload.upload({
            url: '/api/map/person/' + result.personid,
            data: result
          })
            .then(function (res) {
              //修改表格显示的数据
              angular.extend(vm.selectedRow, res.data);
              Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 修改人员成功!'});
            })
            .catch(function (err) {
              $log.error('map update save error:', err.data.message);
              Notification.error({
                message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
                '修改人员失败!'
              });
            });
        }
      }).catch(function (reason) {
        $log.log('Modal dismissed:', reason);
      });
    };

    //修改
    vm.update = function () {
      return vm._updateorview(true);
    };
    //查看
    vm.view = function () {
      return vm._updateorview(false);
    };
    //ui-gird 基本配置参数
    vm.gridOptions = {
      //表数据
      data: vm.tableData,
      columnDefs: [
        {field: 'name', displayName: '姓名'},
        {field: 'sex', displayName: '性别'},
        // {field: 'birth', displayName: '生日'},
        //{field: 'identityid', displayName: '身份证号', width: 200},
        {field: 'tel', displayName: '联系电话', width: 120},
        {field: 'familynum', displayName: '家庭人口'},
        {field: 'familymember', displayName: '家庭成员'},
        {field: 'familyaddress', displayName: '家庭地址', width: 200},
        {field: 'partytype', displayName: '所属党建'},
        {field: 'CommunityVillageConstant.name', displayName: '所属社区'},
        {field: 'MapPersonTypeTable.persontypename', displayName: '人员类型'},
        {field: 'difficultreason', displayName: '困难原因', width: 280},
        {field: 'difficultdemand', displayName: '困难需求', width: 280}
      ],

      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vm.gridApi = gridApi;
        //监视行改变函数
        gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
          $log.log('row selected ' + row.isSelected, row);
          vm.selectedRow = row.isSelected ? row.entity : null;
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
            vm.type = value.id;
          }
        });
      } else {
        angular.forEach(partyrole, function (value, key) {
          if (value.roles === 'sqadmin' && Authentication.user.roles[1] === 'sqadmin') {
            vm.type = value.id;
          } else if (value.roles === 'ncadmin' && Authentication.user.roles[1] === 'ncadmin') {
            vm.type = value.id;
          }
        });
      }
      if (Authentication.user.roles[1].indexOf('_') !== -1) {
        var role = Authentication.user.roles[1].split('_');
        CommunityService.query({
          roles: role[1]
        }).$promise.then(function (data) {
          vm.userCommId = data[0].id;
          if (vm.type) {
            vm.queryParam = {
              personId: 0,
              limit: 0,
              offset: 0,
              partytype: vm.type,
              communityId: vm.userCommId
            };
          } else {
            vm.queryParam = {
              personId: 0,
              limit: 0,
              offset: 0,
              communityId: vm.userCommId
            };
          }
          //刷新记录总数
          refreshRecordCount(vm.queryParam);
        });
      } else {
        if (vm.type) {
          vm.queryParam = {
            personId: 0,
            limit: 0,
            offset: 0,
            partytype: vm.type,
            communityId: vm.userCommId
          };
        } else {
          vm.queryParam = {
            personId: 0,
            limit: 0,
            offset: 0,
            communityId: vm.userCommId
          };
        }
        //刷新记录总数
        refreshRecordCount(vm.queryParam);
      }
    }
    //刷新记录总数
    function refreshRecordCount(queryParam) {
      MapPersonService.query(queryParam).$promise
        .then(function (result) {
          vm.gridOptions.totalItems = result[0].sum;
        })
        .then(function () {
          refreshPageData(1, vm.gridOptions.paginationPageSize);
        })
        .catch(function (err) {
          $log.error('getCount error:', err);
        });
    }

    //刷新页面数据
    function refreshPageData(pageNumber, pageSize) {
      vm.gridOptions.paginationCurrentPage = pageNumber;//当前页码
      //页面，记录数限制参数
      var pageParam;
      if (vm.type) {
        pageParam = {
          personId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          partytype: vm.type,
          communityId: vm.userCommId
        };
      } else {
        pageParam = {
          personId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          communityId: vm.userCommId
        };
      }
      //取后台数据，默认按创建时间降序排序
      return MapPersonService.query(pageParam).$promise
        .then(function (data) {
          angular.forEach(data, function (value, key) {
            if (value.partytype === 1) {
              value.partytype = '社区党建';
            } else if (value.partytype === 2) {
              value.partytype = '农村党建';
            }
          });
          vm.gridOptions.data = vm.tableData = data;
          return data;
        })
        .catch(function (err) {
          $log.error('query error:', err);
        });
    }
  }
}());
