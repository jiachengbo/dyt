(function () {
  'use strict';

  angular
    .module('applyNow')
    .controller('ApplyNowCURDTableController', ApplyNowCURDTableController);

  ApplyNowCURDTableController.$inject = ['$scope', 'Notification', '$log', '$window',
    'uiGridConstants', 'ApplyNowService',
    '$uibModal', 'Authentication'];
  function ApplyNowCURDTableController($scope, Notification, $log, $window,
                                       uiGridConstants, ApplyNowService, $uibModal, Authentication) {
    var vm = this;
    if (Authentication.user) {
      vm.idcard = Authentication.user.IDcard;
      vm.grade = Authentication.user.roles.indexOf('partym');
    }
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;

    //打开模态框,返回模态框实例
    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/applynow/client/views/applyNow-modal-form.client.view.html',
        controller: 'ApplyNowModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: resarg
      });
    };

    //增加数据
    vm.add = function () {
      var modalInstance = vm._openModal({
        //applyNow会传入modal的controller
        applyNowData: function () {
          //空数据
          return new ApplyNowService();
        },
        //表明是增加
        method: function () {
          return '增加';
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        result.$save()
          .then(function (res) {
            vm.gridOptions.data.push(res);
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> applyNow add saved successfully!'});
          })
          .catch(function (err) {
            $log.error('applyNow add save error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' applyNow add save error!'
            });
          });
      })
        .catch(function (reason) {
          $log.log('Modal dismissed:', reason);
        });
    };

    //删除数据
    vm.remove = function () {
      if ($window.confirm('Are you sure you want to remove selected record?')) {
        vm.selectedRow.$remove(function () {
          var rowindex = vm.tableData.indexOf(vm.selectedRow);
          //去掉表格中的数据
          vm.tableData.splice(rowindex, 1);
          //复位当前行
          vm.selectedRow = null;
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> applyNow deleted successfully!'});
        })
          .catch(function (err) {
            $log.error('applyNow deleted error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' applyNow delete error!'
            });
          });
      }
    };

    //修改或查看数据
    vm._updateorview = function (isupdate) {
      var modalInstance = vm._openModal({
        applyNowData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        method: function () {
          return isupdate ? 'update' : 'view';
        }
      });

      modalInstance.result.then(function (result) {
        $log.log('modal ok:', result);
        if (isupdate) {
          result.$update()
            .then(function (res) {
              //修改表格显示的数据
              console.log(res);
              angular.extend(vm.selectedRow, res);
              Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> applyNow update saved successfully!'});
            })
            .catch(function (err) {
              $log.error('applyNow update save error:', err.data.message);
              Notification.error({
                message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
                'applyNow update save error!'
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
        {field: 'gender', displayName: '性别'},
        {field: 'phoneNumber', displayName: '联系方式'},
        {field: 'idcard', displayName: '身份证号'},
        {field: 'zhibu', displayName: '所在支部'},
        {field: 'mingzu', displayName: '民族'},
        {field: 'partytime', displayName: '入党时间', cellFilter: 'date:"yyyy-MM-dd"'},
        {field: 'brith', displayName: '出生日期', cellFilter: 'date:"yyyy-MM-dd"'},
        {field: 'danwei', displayName: '工作单位'},
        {field: 'adress', displayName: '家庭住址'},
        {field: 'partymoney', displayName: '党费'},
        {field: 'jiguan', displayName: '籍贯'},
        {field: 'zhuangtai', displayName: '预约状态'}
      ],
      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vm.gridApi = gridApi;
        //监视行改变函数
        gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
          $log.log('row selected ' + row.isSelected, row);
          vm.selectedRow = row.isSelected ? row.entity : null;
        });
      },

      //如果不需要在表格左上角菜单显示功能，以下参数可以去掉
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
    var where = {};
    if (vm.grade > -1) {
      where.idcard = vm.idcard;
    }
    //取后台ApplyNow表所有数据
    ApplyNowService.query(where).$promise.then(function (data) {
      vm.gridOptions.data = vm.tableData = data;
    });
  }
}());
