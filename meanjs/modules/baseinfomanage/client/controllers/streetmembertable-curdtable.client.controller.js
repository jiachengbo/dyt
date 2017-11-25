(function () {
  'use strict';

  angular
    .module('streetMemberTable')
    .controller('StreetMemberTableCURDTableController', StreetMemberTableCURDTableController);

  StreetMemberTableCURDTableController.$inject = ['$scope', 'Notification', '$log', '$window', 'uiGridConstants', 'StreetMemberTableService',
    '$uibModal', 'Upload'];
  function StreetMemberTableCURDTableController($scope, Notification, $log, $window, uiGridConstants, StreetMemberTableService, $uibModal, Upload) {
    var vm = this;
    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;
    //分页1： 每次请求的数据条数
    /*vm.dataOffset = 0;
    vm.dataRequest = 1;*/
    //打开模态框,返回模态框实例
    vm._openModal = function (resarg) {
      return $uibModal.open({
        templateUrl: '/modules/baseinfomanage/client/views/streetmembertable-modal-form.client.view.html',
        controller: 'StreetMemberTableModalFormController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: angular.extend({
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
        //streetMemberTable会传入modal的controller
        streetMemberTableData: function () {
          //空数据
          return new StreetMemberTableService();
        },
        //表明是增加
        method: function () {
          return '新增';
        }
      });

      // 模态窗口关闭之后返回的值
      modalInstance.result.then(function (result) {
        // $log.log('modal ok:', result);
        Upload.upload({
          url: '/api/streetMemberTable',
          data: result
        })
          .then(function (res) {
            //和$resouce.$save()返回值格式不同，不是resouce类型，在此做转换
            // vm.tableData.push(new StreetMemberTableService(res.data));

            //分页2：新增后， 刷新记录总数
            refreshRecordCount(vm.queryParam);

            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 保存成功!'});
          })
          .catch(function (err) {
            // $log.error('save error:', err);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 保存失败!'
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

          //分页3：删除后， 刷新记录总数
          refreshRecordCount(vm.queryParam);

          /*
           var rowindex = vm.tableData.indexOf(vm.selectedRow);
           //去掉表格中的数据
           vm.tableData.splice(rowindex, 1);
           //复位当前行
           vm.selectedRow = null;
           */
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
        streetMemberTableData: function () {
          //复制当前选择的数据, 不要直接修改，否则表格上会直接显示模态框中修改后的内容
          return angular.copy(vm.selectedRow);
        },
        method: function () {
          return isupdate ? '修改' : '浏览';
        }
      });

      modalInstance.result.then(function (result) {
        // $log.log('修改 图:', result);
        if (isupdate) {
          Upload.upload({
            url: '/api/streetMemberTable/' + result.id,
            data: result
          })
            .then(function (res) {
              //修改表格显示的数据
              angular.extend(vm.selectedRow, res.data);
              Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 更新成功!'});
            })
            .catch(function (err) {
              Notification.error({
                message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
                '更新失败!'
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
        {field: 'name', displayName: '姓名'},
        {field: 'sex', displayName: '性别'},
        {field: 'duty', displayName: '职务'},
        {field: 'work_unit', displayName: '工作单位'},
        {field: 'type_style', displayName: '类型'},
        {field: 'photo', displayName: '人员照片', visible: false},
        {field: 'remark', displayName: '备注'}
      ],
//分页1.页面操作参数
      paginationPageSizes: [20, 30, 40], //每页显示个数可选项
      paginationCurrentPage: 1, //当前页码
      paginationPageSize: 20,
      //使用自定义翻页控制
      useExternalPagination: true,

      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vm.gridApi = gridApi;
// 分页2.分页按钮事件
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
//分页3参数
    vm.queryParam = {
      streetMemberTableId: 0,
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
        streetMemberTableId: 0,
        limit: (pageNumber - 1) * pageSize,
        offset: pageSize
      };
      //取后台数据，默认按创建时间降序排序
      return StreetMemberTableService.query(pageParam).$promise
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
      StreetMemberTableService.query(queryParam).$promise
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

    /*//如果不需要在表格左上角菜单显示功能，以下参数可以去掉
     //允许表格左上角菜单
     enableGridMenu: true,
     //添加自定义菜单
     gridMenuCustomItems
     :
     [
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
     }
     ;
     */
    /*   //取后台StreetMemberTable表所有数据
     StreetMemberTableService.query().$promise.then(function (data) {
     vm.gridOptions.data = vm.tableData = data;
     });
     */
  }
}());
