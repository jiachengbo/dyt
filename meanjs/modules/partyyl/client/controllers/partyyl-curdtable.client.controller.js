(function () {
  'use strict';

  angular
    .module('partyyl')
    .controller('PartyylCURDTableController', PartyylCURDTableController);

  PartyylCURDTableController.$inject = ['$scope', 'Notification', '$log', '$window',
    'uiGridConstants', 'PartyylService',
    '$uibModal', 'Upload'];
  function PartyylCURDTableController($scope, Notification, $log, $window,
                                       uiGridConstants, PartyylService, $uibModal, Upload) {
    var vm = this;
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;

    //打开模态框,返回模态框实例
    vm._openModal = function(resarg) {
      return $uibModal.open({
        templateUrl: '/modules/partyyl/client/views/partyyl-modal-form.client.view.html',
        controller: 'PartyylModalFormController',
        controllerAs: 'mo',
        backdrop: 'static',
        resolve: resarg
      });
    };

    //增加数据
    vm.add = function() {
      var modalInstance = vm._openModal({
        //partyyl会传入modal的controller
        partyylData: function() {
          //空数据
          return new PartyylService();
        },
        //表明是增加
        method: function() {
          return '新增';
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function(result) {
        $log.log('modal ok:', result);
       // result.$save()
        Upload.upload({
          url: '/api/partyyl',
          data: result
        })
          .then(function(res) {
            vm.gridOptions.data.push(res.data);
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> 新增成功!' });
          })
          .catch(function(err) {
            $log.error('partyyl add save error:', err.data.message);
            Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' partyyl add save error!' });
          });
      })
      .catch(function(reason) {
        $log.log('Modal dismissed:', reason);
      });
    };

    //删除数据
    vm.remove = function() {
      if ($window.confirm('你确定你想要删除选定的记录?')) {
        vm.selectedRow.$remove(function() {
          var rowindex = vm.tableData.indexOf(vm.selectedRow);
          //去掉表格中的数据
          vm.tableData.splice(rowindex, 1);
          //复位当前行
          vm.selectedRow = null;
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> 删除成功!' });
        })
        .catch(function(err) {
          $log.error('partyyl deleted error:', err.data.message);
          Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
          ' partyyl delete error!' });
        });
      }
    };

    //修改或查看数据
    vm._updateorview = function(isupdate) {
      var modalInstance = vm._openModal({
        partyylData: function() {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        method: function() {
          return isupdate ? '修改' : '查看';
        }
      });

      modalInstance.result.then(function(result) {
        $log.log('modal ok:', result);
        if (isupdate) {
          //result.$update()
          Upload.upload({
            url: '/api/partyyl/' + result.id,
            data: result
          })
            .then(function(res) {
              //修改表格显示的数据
              console.log(res);
              angular.extend(vm.selectedRow, res.data);
              Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> 修改成功!' });
            })
            .catch(function(err) {
              $log.error('partyyl update save error:', err.data.message);
              Notification.error({ message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
              'partyyl update save error!' });
            });
        }
      }).catch(function(reason) {
        $log.log('Modal dismissed:', reason);
      });
    };

    //修改
    vm.update = function() {
      return vm._updateorview(true);
    };
    //查看
    vm.view = function() {
      return vm._updateorview(false);
    };

    //ui-gird 基本配置参数
    vm.gridOptions = {
      //表数据
      data: vm.tableData,
      columnDefs: [
        {field: 'title', displayName: '标题', width: '20%'},
        {field: 'content', displayName: '内容', width: '60%'},
        // {field: 'KeyWorkTypeConstant.name', displayName: '活动类型'},
        {field: 'typeId', displayName: '类型'},
        //{field: 'starttime', displayName: '开始时间', cellFilter: 'date:\"yyyy-MM-dd\"'},
        {field: 'endtime', displayName: '申报时间', cellFilter: 'date:\"yyyy-MM-dd\"'},
        //{field: 'CommunityVillageConstant.name', displayName: '所属社区'},
        {field: 'head', displayName: '负责人'}
        //{field: 'peoplenum', displayName: '参加人数'},
        //{field: 'phone', displayName: '联系电话'},
       //{field: 'address', displayName: '活动地点'}
      ],

      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vm.gridApi = gridApi;
        //监视行改变函数
        gridApi.selection.on.rowSelectionChanged($scope, function(row, event) {
          $log.log('row selected ' + row.isSelected, row);
          vm.selectedRow = row.isSelected ? row.entity : null;
        });
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          refreshPageData(newPage, pageSize);
        });
      },

      //如果不需要在表格左上角菜单显示功能，以下参数可以去掉
      paginationPageSizes: [20, 30, 40], //每页显示个数可选项
      paginationCurrentPage: 1, //当前页码
      paginationPageSize: 20,
      //使用自定义翻页控制
      useExternalPagination: true,
      //允许表格左上角菜单
      enableGridMenu: true,
      //添加自定义菜单
      gridMenuCustomItems: [
        {
          //标题
          title: '增加记录',
          //点击动作
          action: vm.add,
          //是否显示,返回true显示
          shown: function () {
            return true;
          },
          //次序，从200-300
          order: 210
        },
        {
          title: '编辑选择记录',
          action: vm.update,
          shown: function () {
            return !!vm.selectedRow;
          },
          order: 220
        },
        {
          title: '删除选择记录',
          action: vm.remove,
          shown: function () {
            return !!vm.selectedRow;
          },
          order: 230
        },
        {
          title: '查看选择记录',
          action: vm.view,
          shown: function () {
            return !!vm.selectedRow;
          },
          order: 240
        }
      ]
    };
    vm.queryParam = {
      offset: 1,
      count: true
    };
    refreshRecordCount(vm.queryParam);
    function refreshRecordCount(queryParam) {
      PartyylService.query(queryParam).$promise
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
    //取后台Partyyl表所有数据
    function refreshPageData(pageNumber, pageSize) {
      vm.gridOptions.paginationCurrentPage = pageNumber;//当前页码
      //页面，记录数限制参数
      var pageParam = {
        offset: pageNumber
      };
      //取后台数据，默认按创建时间降序排序
      return PartyylService.query(pageParam).$promise
        .then(function (data) {
          vm.gridOptions.data = vm.tableData = data;
          return data;
        })
        .catch(function (err) {
          $log.error('query error:', err);
        });
    }
    /*PartyylService.query().$promise.then(function(data) {
      vm.gridOptions.data = vm.tableData = data;
    });*/
  }
}());
