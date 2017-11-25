(function () {
  'use strict';

  angular
    .module('partyBuildInstructorTable')
    .controller('PartyBuildInstructorMemTableCURDTableController', PartyBuildInstructorMemTableCURDTableController);

  PartyBuildInstructorMemTableCURDTableController.$inject = ['$scope', 'Notification', '$log', '$window', 'PartyBuildInstructorMemberService',
    '$uibModal', 'Authentication', 'CommunityService', 'localStorageService', 'Upload'];
  function PartyBuildInstructorMemTableCURDTableController($scope, Notification, $log, $window, PartyBuildInstructorTableService, $uibModal, Authentication, CommunityService, localStorageService, Upload) {
    var vm = this;
    vm.userCommId = '';
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;

    //打开模态框,返回模态框实例
    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/baseinfomanage/client/views/partybuildinstructormemtable-modal-form.client.view.html',
        controller: 'PartyBuildInstructorMemTableModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: angular.extend({
          //列定义
          columnDefs: function () {
            //去掉前1列：id
            return vm.gridOptions.columnDefs.slice(1);
          }
        }, resarg)
      });
    };

    //增加数据
    vm.add = function () {
      var modalInstance = vm._openModal({
        //partyBuildInstructorTable会传入modal的controller
        partyBuildInstructorTableData: function () {
          //空数据
          return new PartyBuildInstructorTableService();
        },
        //表明是增加
        method: function () {
          return '新增';
        },
        //党建类型
        party: function () {
          return vm.type;
        },
        //当前登录用户所属的社区id
        userCommId: function () {
          return vm.userCommId;
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function (result) {
        // $log.log('modal ok:', result);
        // result.$save()
        Upload.upload({
          url: '/api/partyBuildInstructorMember',
          data: result
        })
          .then(function (res) {
            //-----------------分页1：新增后， 刷新记录总数---------------
            refreshRecordCount(vm.queryParam);
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 新增成功!'});
          })
          .catch(function (err) {
            $log.error('新增失败:', err.data.message);
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
    vm.remove = function () {
      if ($window.confirm('确定删除?')) {
        vm.selectedRow.$remove(function () {
          //----------分页2：删除后， 刷新记录总数------------
          refreshRecordCount(vm.queryParam);
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 删除成功!'});
        })
          .catch(function (err) {
            $log.error('删除失败:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 删除失败!'
            });
          });
      }
    };

    //修改或查看数据
    vm._updateorview = function (isupdate) {
      var modalInstance = vm._openModal({
        partyBuildInstructorTableData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        method: function () {
          return isupdate ? '修改' : '浏览';
        },
        //党建类型
        party: function () {
          return vm.type;
        },
        //当前登录用户所属的社区id
        userCommId: function () {
          return vm.userCommId;
        }
      });

      modalInstance.result.then(function (result) {
        // $log.log('modal ok:', result);
        if (isupdate) {
          // result.$update()
          Upload.upload({
            url: '/api/partyBuildInstructorMember/' + result.id,
            data: result
          })
            .then(function (res) {
              //修改表格显示的数据
              refreshRecordCount(vm.queryParam);
              Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 修改成功!'});
            })
            .catch(function (err) {
              $log.error('修改失败:', err.data.message);
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
        {field: 'rid', displayName: '序号', width: 80},
        {field: 'name', displayName: '姓名', width: 140},
        {field: 'sex', displayName: '性别', width: 80},
        {field: 'tel', displayName: '联系电话', width: 240},
        {field: 'address', displayName: '地址'}
      ],
//-------------分页1.页面操作参数---------------
      paginationPageSizes: [20], //每页显示个数可选项
      paginationCurrentPage: 1, //当前页码
      paginationPageSize: 20,
      //使用自定义翻页控制
      useExternalPagination: true,

      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vm.gridApi = gridApi;
        // ---------分页2.分页按钮事件---------------
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          refreshPageData(newPage, pageSize);
        });
        //监视行改变函数
        gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
          // $log.log('row selected ' + row.isSelected, row);
          vm.selectedRow = row.isSelected ? row.entity : null;
        });
      },
      //允许表格左上角菜单
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

      vm.queryParam = {
        partyBuildInstructorMemberId: 0,
        limit: 0,
        offset: 0,
        party: vm.type
      };
      //分页4： 刷新记录总数
      refreshRecordCount(vm.queryParam);

      // console.info(vm.type);
      /*
      if (Authentication.user.roles[1].indexOf('_') !== -1) {
        var role = Authentication.user.roles[1].split('_');
        CommunityService.query({
          roles: role[1]
        }).$promise.then(function (data) {
          vm.userCommId = data[0].id;
          if (vm.type) {
            vm.queryParam = {
              partyBuildInstructorMemberId: 0,
              limit: 0,
              offset: 0,
              party: vm.type,
              communityId: vm.userCommId
            };
          } else {
            vm.queryParam = {
              partyBuildInstructorMemberId: 0,
              limit: 0,
              offset: 0,
              communityId: vm.userCommId
            };
          }
          //分页4： 刷新记录总数
          refreshRecordCount(vm.queryParam);
        });
      } else {
        if (vm.type) {
          vm.queryParam = {
            partyBuildInstructorMemberId: 0,
            limit: 0,
            offset: 0,
            party: vm.type,
            communityId: vm.userCommId
          };
        } else {
          vm.queryParam = {
            partyBuildInstructorMemberId: 0,
            limit: 0,
            offset: 0,
            communityId: vm.userCommId
          };
        }
        //分页4： 刷新记录总数
        refreshRecordCount(vm.queryParam);
      }
      */
    }

    //刷新页面数据
    function refreshPageData(pageNumber, pageSize) {
      vm.gridOptions.paginationCurrentPage = pageNumber;//当前页码
      //页面，记录数限制参数
      var pageParam;
      pageParam = {
        partyBuildInstructorMemberId: 0,
        limit: (pageNumber - 1) * pageSize,
        offset: pageSize,
        party: vm.type
      };
      /*
      if (vm.type) {
        pageParam = {
          partyBuildInstructorMemberId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          party: vm.type,
          communityId: vm.userCommId
        };
      } else {
        pageParam = {
          partyBuildInstructorMemberId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          communityId: vm.userCommId
        };
      }*/
      //取后台数据，默认按创建时间降序排序
      return PartyBuildInstructorTableService.query(pageParam).$promise
        .then(function (data) {
          //序号列的处理
          if (data.length > 0) {
            for (var m = 0; m < data.length; m++) {
              data[m].rid = m + 1 + (pageNumber - 1) * pageSize;
            }
          }/*
          angular.forEach(data, function (value, key) {
            if (value.party === 1) {
              value.party = '社区党建';
            } else if (value.party === 2) {
              value.party = '农村党建';
            } else if (value.party === 3) {
              value.party = '社会组织党建';
            } else if (value.party === 4) {
              value.party = '机关党建';
            } else if (value.party === 5) {
              value.party = '非公党建';
            }
          });*/
          vm.gridOptions.data = vm.tableData = data;
          return data;
        })
        .catch(function (err) {
          $log.error('query error:', err);
        });
    }

    //刷新记录总数
    function refreshRecordCount(queryParam) {
      PartyBuildInstructorTableService.query(queryParam).$promise
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

    //取后台PartyBuildInstructorTable表所有数据
    /* PartyBuildInstructorTableService.query().$promise.then(function(data) {
     vm.gridOptions.data = vm.tableData = data;
     });*/
  }
}());
