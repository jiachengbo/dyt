(function () {
  'use strict';

  angular
    .module('organization')
    .controller('ProfessionAlgradingTableController', ProfessionAlgradingTableController);

  ProfessionAlgradingTableController.$inject = ['$scope', 'Notification', '$log', '$window', 'ProfessionAlgradingServive',
    '$uibModal', 'Upload', 'localStorageService', 'Authentication'];
  function ProfessionAlgradingTableController($scope, Notification, $log, $window, ProfessionAlgradingServive, $uibModal, Upload, localStorageService, Authentication) {
    var vm = this;
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;

    //打开模态框,返回模态框实例
    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/dynamic/client/views/professionalgrading-modal-form.client.view.html',
        controller: 'ProfessionAlgradinginfoModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        resolve: resarg,
        size: 'lg'
      });
    };

    //增加数据
    vm.add = function () {
      var modalInstance = vm._openModal({
        //organization会传入modal的controller
        ProfessionAlgradingData: function () {
          //空数据
          return new ProfessionAlgradingServive();
        },
        //党建类型
        partyid: function () {
          return vm.type;
        },
        //表明是增加
        method: function () {
          return '新增';
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        Upload.upload({
          url: '/api/professionalgradinginfo',
          data: result
        })
          .then(function (res) {
            // vm.gridOptions.data.push(res);
            refreshRecordCount(vm.queryParam);
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 职业水平认证新增成功!'});
          })
          .catch(function (err) {
            $log.error('organization add save error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 职业水平认证新增失败!'
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
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 职业水平认证删除成功!'});
        })
          .catch(function (err) {
            $log.error('organization deleted error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 职业水平认证删除失败!'
            });
          });
      }
    };

    //修改或查看数据
    vm._updateorview = function (isupdate) {
      var modalInstance = vm._openModal({
        ProfessionAlgradingData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        //党建类型
        partyid: function () {
          return vm.type;
        },
        method: function () {
          return isupdate ? '修改' : '查看';
        }
      });

      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        if (isupdate) {
          Upload.upload({
            url: '/api/professionalgradinginfo/' + result.id,
            data: result
          })
            .then(function (res) {
              //修改表格显示的数据
              angular.extend(vm.selectedRow, res);
              Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 职业水平认证修改成功!'});
            })
            .catch(function (err) {
              $log.error('organization update save error:', err.data.message);
              Notification.error({
                message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
                '职业水平认证修改失败!'
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
        {field: 'title', displayName: '标题', width: 300},
        {field: 'content', displayName: '内容', width: 600},
        {field: 'party', displayName: '党建类型'},
        {field: 'jurisdiction', displayName: '所在辖区'},
        {field: 'head', displayName: '负责人'},
        {field: 'createdate', displayName: '创建时间', cellFilter: 'date:\"yyyy-MM-dd HH:mm:ss\"'}
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
    //分页参数
    var partyrole = localStorageService.getItems('PartyOrganizationUnitTypeConstant');
    if (Authentication.user !== null) {
      angular.forEach(partyrole, function (value, key) {
        if (value.roles === Authentication.user.roles[1]) {
          vm.type = value.id;
        }
      });
      if (vm.type) {
        vm.queryParam = {
          professionalgradingId: 0,
          party: vm.type,
          limit: 0,
          offset: 0
        };
      } else {
        vm.queryParam = {
          professionalgradingId: 0,
          limit: 0,
          offset: 0
        };
      }
    }
    //刷新记录总数
    refreshRecordCount(vm.queryParam);
    //刷新记录总数
    function refreshRecordCount(queryParam) {
      ProfessionAlgradingServive.query(queryParam).$promise
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
          professionalgradingId: 0,
          party: vm.type,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize
        };
      } else {
        pageParam = {
          professionalgradingId: 0,
          limit: (pageNumber - 1) * pageSize,
          offset: pageSize
        };
      }
      //取后台数据，默认按创建时间降序排序
      return ProfessionAlgradingServive.query(pageParam).$promise
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