(function () {
  'use strict';

  angular
    .module('advancedUnitManagement')
    .controller('AdvancedUnitManagementCURDTableController', AdvancedUnitManagementCURDTableController);

  AdvancedUnitManagementCURDTableController.$inject = ['$scope', 'Notification', '$log', '$window', 'uiGridConstants', 'AdvancedUnitManagementService',
    '$uibModal'];
  function AdvancedUnitManagementCURDTableController($scope, Notification, $log, $window, uiGridConstants, AdvancedUnitManagementService, $uibModal) {
    var vm = this;
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;

    //打开模态框,返回模态框实例
    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/baseinfomanage/client/views/advancedunitmanagement-modal-form.client.view.html',
        controller: 'AdvancedUnitManagementModalFormController',
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
        //advancedUnitManagement会传入modal的controller
        advancedUnitManagementData: function () {
          //空数据
          return new AdvancedUnitManagementService();
        },
        //表明是增加
        method: function () {
          return '新增';
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function (result) {
        // $log.log('modal ok:', result);
        result.$save()
          .then(function (res) {
//-----------------分页1：新增后， 刷新记录总数---------------
            refreshRecordCount(vm.queryParam);

            // vm.gridOptions.data.push(res);
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

          /*var rowindex = vm.tableData.indexOf(vm.selectedRow);
           //去掉表格中的数据
           vm.tableData.splice(rowindex, 1);
           //复位当前行
           vm.selectedRow = null;*/
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
        advancedUnitManagementData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        method: function () {
          return isupdate ? '修改' : '浏览';
        }
      });

      modalInstance.result.then(function (result) {
        // $log.log('modal ok:', result);
        if (isupdate) {
          result.$update()
            .then(function (res) {
              //修改表格显示的数据
              angular.extend(vm.selectedRow, res);
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
        {field: 'rid', displayName: '序号'},
        {field: 'name', displayName: '单位名称'},
        {field: 'level', displayName: '级别'},
        {field: 'first_declare', displayName: '初次申报', cellFilter: 'date: "yyyy-MM-dd"'},
        {field: 'last_expired', displayName: '上次届满', cellFilter: 'date: "yyyy-MM-dd"'},
        {field: 'addrss', displayName: '地址'},
        {field: 'fzr', displayName: '负责人'},
        {field: 'charge_leader', displayName: '分管领导'},
        {field: 'full_time_cadre', displayName: '专干'}
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
      enableGridMenu: false
    };

    //取后台AdvancedUnitManagement表所有数据
    /* AdvancedUnitManagementService.query().$promise.then(function(data) {
     vm.gridOptions.data = vm.tableData = data;
     });*/
    //分页3参数
    vm.queryParam = {
      advancedUnitManagementId: 0,
      limit: 0,
      offset: 0
    };
    //分页4： 刷新记录总数
    refreshRecordCount(vm.queryParam);
    //刷新页面数据
    function refreshPageData(pageNumber, pageSize) {
      vm.gridOptions.paginationCurrentPage = pageNumber;//当前页码
      //页面，记录数限制参数
      var pageParam = {
        advancedUnitManagementId: 0,
        limit: (pageNumber - 1) * pageSize,
        offset: pageSize
      };
      //取后台数据，默认按创建时间降序排序
      return AdvancedUnitManagementService.query(pageParam).$promise
        .then(function (data) {
          //序号列的处理
          if (data.length > 0) {
            for (var m = 0; m < data.length; m++) {
              data[m].rid = m + 1 + (pageNumber - 1) * pageSize;
            }
          }
          vm.gridOptions.data = vm.tableData = data;
          return data;
        })
        .catch(function (err) {
          $log.error('query error:', err);
        });
    }

    //刷新记录总数
    function refreshRecordCount(queryParam) {
      AdvancedUnitManagementService.query(queryParam).$promise
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

  }
}());
