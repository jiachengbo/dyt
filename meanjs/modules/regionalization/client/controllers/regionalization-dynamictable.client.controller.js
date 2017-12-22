(function () {
  'use strict';

  angular
    .module('regionalization')
    .controller('RegionalizationDynamicController', RegionalizationDynamicController);

  RegionalizationDynamicController.$inject = ['$scope', 'Notification', '$log', '$window',
    'Upload', 'DjdynamicService', '$uibModal', 'Authentication', 'CommunityService', 'localStorageService', 'PartyMemberTableService'];
  function RegionalizationDynamicController($scope, Notification, $log, $window,
                                            Upload, DjdynamicService, $uibModal, Authentication, CommunityService, localStorageService, PartyMemberTableService) {
    var vm = this;
    vm.userCommId = '';
    if (Authentication.user) {
      vm.id_card = Authentication.user.IDcard;
      vm.grade = Authentication.user.roles.indexOf('partym');
      if (vm.grade > 0) {
        vm.queryParam = {
          partyMemberTableId: 0,
          limit: 0,
          offset: 20,
          id_card: vm.id_card,
          communityId: ''
        };
        PartyMemberTableService.query(vm.queryParam).$promise.then(function (data) {
          vm.partym = data[0];
          vm.userCommId = vm.partym.community;
          vm.type = vm.partym.partytype;
          switch (vm.type) {
            case 1:
              vm.type = '城市党建';
              break;
            case 2:
              vm.type = '农村党建';
              break;
            case 3:
              vm.type = '社会组织党建';
              break;
            case 4:
              vm.type = '机关党建';
              break;
            case 5:
              vm.type = '非公党建';
              break;
            default:
              break;
          }
        }).then(function () {
          vm.queryParam = {
            dynamicId: 0,
            limit: 0,
            offset: 0,
            communityId: vm.userCommId,
            type: vm.type
          };
          refreshRecordCount(vm.queryParam);
        });
      }
    }
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;

    //打开模态框,返回模态框实例
    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/regionalization/client/views/djdynamic-modal-form.client.view.html',
        controller: 'DjdynamicModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        resolve: resarg,
        size: 'lg'
      });
    };

    //增加数据
    vm.add = function () {
      var modalInstance = vm._openModal({
        //regionalization会传入modal的controller
        dynamicData: function () {
          //空数据
          return new DjdynamicService();
        },
        //党建类型
        party: function () {
          return vm.type;
        },
        //表明是增加
        method: function () {
          return '新增';
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
          url: '/api/regionalization/djdynamic',
          data: result
        })
          .then(function (res) {
            //vm.gridOptions.data.push(new DjdynamicService(res.data));
            refreshRecordCount(vm.queryParam);
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 党建需求新增成功!'});
          })
          .catch(function (err) {
            $log.error('regionalization add save error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 党建需求新增失败!'
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
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 党建需求删除成功!'});
        })
          .catch(function (err) {
            $log.error('regionalization deleted error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 党建需求删除失败!'
            });
          });
      }
    };

    //修改或查看数据
    vm._updateorview = function (isupdate) {
      var modalInstance = vm._openModal({
        dynamicData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        //党建类型
        party: function () {
          return vm.type;
        },
        method: function () {
          return isupdate ? '修改' : '查看';
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
            url: '/api/regionalization/djdynamic/' + result.dynamicid,
            data: result
          })
            .then(function (res) {
              //修改表格显示的数据
              angular.extend(vm.selectedRow, res.data);
              Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 党建需求修改成功!'});
            })
            .catch(function (err) {
              $log.error('regionalization update save error:', err.data.message);
              Notification.error({
                message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
                '党建需求修改失败!'
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
        {field: 'dynamictitle', displayName: '标题', width: 300},
        {field: 'dynamiccontext', displayName: '内容', width: 600},
        {field: 'state', displayName: '状态'},
        {field: 'CommunityVillageConstant.name', displayName: '所属社区'},
        {field: 'GridTable.name', displayName: '所属网格'},
        {field: 'type', displayName: '类型'}
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
          if (value.roles === Authentication.user.roles[1]) {
            vm.type = value.id;
          }
        });
      }
      // console.log(Authentication.user.roles);
      // console.log(vm.type);
      if (vm.type) {
        switch (vm.type) {
          case 1:
            vm.type = '城市党建';
            break;
          case 2:
            vm.type = '农村党建';
            break;
          case 3:
            vm.type = '社会组织党建';
            break;
          case 4:
            vm.type = '机关党建';
            break;
          case 5:
            vm.type = '非公党建';
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
          vm.userCommId = data[0].id;
          if (vm.type) {
            vm.queryParam = {
              dynamicId: 0,
              limit: 0,
              offset: 0,
              communityId: vm.userCommId,
              type: vm.type
            };
          } else {
            vm.queryParam = {
              dynamicId: 0,
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
            dynamicId: 0,
            limit: 0,
            offset: 0,
            communityId: vm.userCommId,
            type: vm.type
          };
        } else {
          vm.queryParam = {
            dynamicId: 0,
            limit: 0,
            offset: 0,
            communityId: vm.userCommId
          };
        }
        //刷新记录总数
        if (vm.grade === -1) {
          refreshRecordCount(vm.queryParam);
        }
      }
    }

    //刷新记录总数
    function refreshRecordCount(queryParam) {
      DjdynamicService.query(queryParam).$promise
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
          dynamicId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          communityId: vm.userCommId,
          type: vm.type
        };
      } else {
        pageParam = {
          dynamicId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          communityId: vm.userCommId
        };
      }
      //取后台数据，默认按创建时间降序排序
      console.log('aaaaaaaaaa');
      console.log(pageParam);
      return DjdynamicService.query(pageParam).$promise
        .then(function (data) {
          vm.gridOptions.data = vm.tableData = data;
          return data;
        })
        .catch(function (err) {
          $log.error('query error:', err);
        });
    }
  }
}());
