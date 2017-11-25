(function () {
  'use strict';

  angular
    .module('core')
    .controller('shequwgController', shequwgController);
  shequwgController.$inject = ['$scope', '$rootScope', '$state', '$window', '$uibModalInstance', 'type'];
  function shequwgController($scope, $rootScope, $state, $window, $uibModalInstance, type) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.grid = type.grid;
    vm.community = type.community;
    vm.tableData = type.data;
    //   [
    //   {'num': '序号'},
    //   {'gridduty': '“三长三员”网格小组'},
    //   {'name': '姓名'},
    //   {'sex': '性别'},
    //   {'birthday': '出生年月'},
    //   {'nation': '民族'},
    //   {'edu': '文化程度'},
    //   {'name': '姓名'},
    //   {'sex': '性别'},
    //   {'birthday': '出生年月'},
    //   {'nation': '民族'},
    //   {'edu': '文化程度'},
    //   {'workunit': '工作单位及职务'},
    //   {'address': '家庭住址'},
    //   {'tel': '联系方式'}
    // ];
    vm.gridOptions = {
      //表数据
      data: vm.tableData,
      columnDefs: [
        {field: 'num', displayName: '序号', width: 60},
        {field: 'gridduty', displayName: '“三长三员”网格小组'},
        {field: 'name', displayName: '姓名', width: 60},
        {field: 'sex', displayName: '性别', width: 60},
        {field: 'birthday', displayName: '出生年月', width: 80},
        {field: 'nation', displayName: '民族', width: 60},
        {field: 'edu', displayName: '文化程度', width: 60},
        {field: 'workunit', displayName: '工作单位及职务', width: 170},
        {field: 'address', displayName: '家庭住址'},
        {field: 'tel', displayName: '联系方式'}
      ],
      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vm.gridApi = gridApi;
        //监视行改变函数
        gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
          vm.selectedRow = row.isSelected ? row.entity : null;
        });
        //分页按钮事件
        // gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
        //   // refreshPageData(newPage, pageSize);
        // });
      },
      paginationPageSizes: [10, 20, 30], //每页显示个数可选项
      paginationCurrentPage: 1, //当前页码
      paginationPageSize: 10,
      //使用自定义翻页控制
      // useExternalPagination: true,
      //不允许表格左上角菜单
      enableGridMenu: false
    };
    vm.ok = function () {

    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
