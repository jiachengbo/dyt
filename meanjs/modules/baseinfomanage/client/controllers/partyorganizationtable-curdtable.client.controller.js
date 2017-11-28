(function () {
  'use strict';

  angular
    .module('partyOrganizationTable')
    .controller('PartyOrganizationTableCURDTableController', PartyOrganizationTableCURDTableController);

  PartyOrganizationTableCURDTableController.$inject = ['$scope', 'Notification', '$log', '$window', 'PartyOrganizationTableService',
    '$uibModal', 'localStorageService', 'Authentication', 'CommunityService'];
  function PartyOrganizationTableCURDTableController($scope, Notification, $log, $window, PartyOrganizationTableService, $uibModal, localStorageService, Authentication, CommunityService) {
    var vm = this;
    vm.userCommId = '';
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;
//读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    //单位类别
    var cvs_company_type = localStorageService.getItems('PartyOrganizationUnitTypeConstant');
    //打开模态框,返回模态框实例
    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/baseinfomanage/client/views/partyorganizationtable-modal-form.client.view.html',
        controller: 'PartyOrganizationTableModalFormController',
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
        //partyOrganizationTable会传入modal的controller
        partyOrganizationTableData: function () {
          //空数据
          return new PartyOrganizationTableService();
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
        result.$save()
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
        partyOrganizationTableData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        //党建类型
        party: function () {
          return vm.type;
        },
        method: function () {
          return isupdate ? '修改' : '浏览';
        },
        //当前登录用户所属的社区id
        userCommId: function () {
          return vm.userCommId;
        }
      });

      modalInstance.result.then(function (result) {
        // $log.log('modal ok:', result);
        if (isupdate) {
          result.$update()
            .then(function (res) {
              //修改表格显示的数据
              refreshPageData(vm.gridOptions.paginationCurrentPage, vm.gridOptions.paginationPageSize);
              // angular.extend(vm.selectedRow, res);
              /*vm.QueryData();*/
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
        {field: 'name', displayName: '支部名称', width: 350},
        {field: 'established_time', displayName: '成立时间', cellFilter: 'date: "yyyy-MM-dd"'},
        {field: 'party_organization', displayName: '上级党组织'},
        // {field: 'general_branch', displayName: '上级党总支'},

        // {field: 'member_ship', displayName: '隶属关系'},
        {field: 'secretary', displayName: '书记'},
        {field: 'party_zhuangan', displayName: '党务专干'},
        {field: 'concat_phone', displayName: '联系电话'},

        {field: 'concat_address', displayName: '联系地址'},
        {field: 'party_number', displayName: '党员人数'},
        // {field: 'company_type', displayName: '单位类别'},
        {field: 'company_typename', displayName: '单位类别'},
        // {field: 'community', displayName: '社区ID', visible: false},
        {field: 'communityname', displayName: '所在社区'},

        // {field: 'longitude', displayName: '经度'},
        // {field: 'latitude', displayName: '纬度'},
        {field: 'condition_type', displayName: '组织类别'}
        //{field: 'company_condition', displayName: '组织所在单位情况'},

        // {field: 'company_name', displayName: '单位名称'},
        // {field: 'organize_condition', displayName: '单位建立组织情况'},
        // {field: 'code', displayName: '党组织所在单位代码'}
      ],
//-------------分页1.页面操作参数---------------
      paginationPageSizes: [20, 30, 40], //每页显示个数可选项
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
      //如果不需要在表格左上角菜单显示功能，以下参数可以去掉
      //允许表格左上角菜单
      enableGridMenu: true
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
      if (Authentication.user.roles[1].indexOf('_') !== -1) {
        var role = Authentication.user.roles[1].split('_');
        CommunityService.query({
          roles: role[1]
        }).$promise.then(function (data) {
          vm.userCommId = data[0].id;
          if (vm.type) {
            vm.queryParam = {
              partyOrganizationTableId: 0,
              limit: 0,
              offset: 0,
              communityId: vm.userCommId,
              type: vm.type
            };
          } else {
            vm.queryParam = {
              partyOrganizationTableId: 0,
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
            partyOrganizationTableId: 0,
            limit: 0,
            offset: 0,
            communityId: vm.userCommId,
            type: vm.type
          };
        } else {
          vm.queryParam = {
            partyOrganizationTableId: 0,
            limit: 0,
            offset: 0,
            communityId: vm.userCommId
          };
        }

        //分页4： 刷新记录总数
        refreshRecordCount(vm.queryParam);
      }
    }

    //刷新页面数据
    function refreshPageData(pageNumber, pageSize) {
      vm.gridOptions.paginationCurrentPage = pageNumber;//当前页码
      //页面，记录数限制参数
      var pageParam;
      if (vm.type) {
        pageParam = {
          partyOrganizationTableId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          communityId: vm.userCommId,
          type: vm.type
        };
      } else {
        pageParam = {
          partyOrganizationTableId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize,
          communityId: vm.userCommId
        };
      }
      //取后台数据，默认按创建时间降序排序
      return PartyOrganizationTableService.query(pageParam).$promise
        .then(function (data) {
          //cvsList 通过社区Id 反显 社区名称 到List
          if (data.length > 0) {
            for (var j = 0; j < data.length; j++) {
              var cid = data[j].community;
              var communityname = '';
              for (var k = 0; k < cvsList.length; k++) {
                if (cid === cvsList[k].id + '') {
                  communityname = cvsList[k].name;
                }
              }
              data[j].communityname = communityname;
              //类别名称
              var cid2 = data[j].company_type;
              var company_typename = '';
              for (var k2 = 0; k2 < cvs_company_type.length; k2++) {
                if (cid2 === cvs_company_type[k2].id + '') {
                  company_typename = cvs_company_type[k2].name;
                }
              }
              data[j].company_typename = company_typename;
            }
          }
          //序号列的处理
          if (data.length > 0) {
            for (var m = 0; m < data.length; m++) {
              data[m].rid = m + 1 + (pageNumber - 1) * pageSize;
            }
          }
          //company_typename
          vm.gridOptions.data = vm.tableData = data;
          return data;
        })
        .catch(function (err) {
          $log.error('query error:', err);
        });
    }

    //刷新记录总数
    function refreshRecordCount(queryParam) {
      PartyOrganizationTableService.query(queryParam).$promise
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

    /*
     //取后台PartyOrganizationTable表所有数据
     vm.QueryData = function () {
     PartyOrganizationTableService.query().$promise.then(function (data) {
     //cvsList 通过社区Id 反显 社区名称 到List
     if (data.length > 0) {
     for (var j = 0; j < data.length; j++) {
     var cid = data[j].community;
     var communityname = '';
     for (var k = 0; k < cvsList.length; k++) {
     if (cid === cvsList[k].id + '') {
     communityname = cvsList[k].name;
     }
     }
     data[j].communityname = communityname;
     }
     }
     vm.gridOptions.data = vm.tableData = data;
     });
     };
     vm.QueryData();*/
  }
}());
