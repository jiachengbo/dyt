(function () {
  'use strict';

  angular
    .module('regionalization')
    .controller('ProgressModalFormController', ProgressModalFormController);

  ProgressModalFormController.$inject = ['$scope', '$log', '$window', '$uibModalInstance', 'projectData', 'method', 'ProgressService', 'Notification', 'Upload', 'localStorageService'];
  function ProgressModalFormController($scope, $log, $window, $uibModalInstance, projectData, method, ProgressService, Notification, Upload, localStorageService) {
    var vm = this;
    vm.projectData = projectData;
    vm.method = method;
    vm.disabled = (method === '查看');
    //项目来源下拉框
    var projectSources = [
      {'projectSourcename': '问卷调查'},
      {'projectSourcename': '街道党工委研究'},
      {'projectSourcename': '在职党员上报'},
      {'projectSourcename': '成员单位上报'},
      {'projectSourcename': '社区发起'},
      {'projectSourcename': '其他'}
    ];
    $scope.projectSourceInfo = projectSources;
    //项目类型下拉框
    var projectTypes = [
      {'projectTypename': '社会稳定'},
      {'projectTypename': '经济发展'},
      {'projectTypename': '社会服务保障'},
      {'projectTypename': '社会综合治理'},
      {'projectTypename': '其他'}
    ];
    $scope.projectTypeInfo = projectTypes;
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    $scope.communityInfo = cvsList;
    if (method === '新增') {
      vm.projectData.source = projectSources[0].projectSourcename;
      vm.projectData.projecttype = projectTypes[0].projectTypename;
      if (cvsList.length > 0) {
        vm.projectData.communityid = cvsList[0].id;
      }
    }
    if (method === '修改' || method === '查看') {
      vm.projectData.sbtime = new Date(projectData.sbtime);
      vm.projectData.finishtime = new Date(projectData.finishtime);
      vm.projectData.source = projectData.source;
    }

    //日期选择器
    $scope.today = function () {
      vm.projectData.sbtime = new Date();
      vm.projectData.finishtime = new Date();
      vm.progresstime = new Date();
    };
    $scope.clear = function () {
      vm.projectData.sbtime = null;
      vm.projectData.finishtime = null;
      vm.progresstime = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.toggleMin = function () {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };
    $scope.open3 = function () {
      $scope.popup3.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };
    $scope.popup3 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }

    //表数据
    vm.tableData = [];
    //ui-grid 当前选择的行
    vm.selectedRow = null;
    vm.errInfo = '';
    vm.progressSubmit = '新增';
    vm.buttonClass = 'btn btn-success';
    vm.progressDelete = true;
    //ui-gird 基本配置参数
    vm.gridOptions = {
      //表数据
      data: vm.tableData,
      columnDefs: [
        {field: 'progresstime', displayName: '创建时间', cellFilter: 'date:\"yyyy-MM-dd\"'},
        {field: 'progresscontent', displayName: '进展内容', width: 600}
      ],

      onRegisterApi: function (gridApi) {
        //保存api调用对象
        vm.gridApi = gridApi;
        //监视行改变函数
        gridApi.selection.on.rowSelectionChanged($scope, function (row, event) {
          $log.log('row selected ' + row.isSelected, row);
          vm.selectedRow = row.isSelected ? row.entity : null;
          vm.errInfo = '';
          if (row.isSelected) {
            vm.progresscontent = vm.selectedRow.progresscontent;
            vm.progresstime = new Date(vm.selectedRow.progresstime);
            vm.progressSubmit = '修改';
            vm.buttonClass = 'btn btn-primary';
            vm.progressphoto = vm.selectedRow.progressphoto;
            vm.progressDelete = false;
          } else {
            vm.progresscontent = null;
            vm.progresstime = null;
            vm.progressSubmit = '新增';
            vm.buttonClass = 'btn btn-success';
            vm.progressphoto = null;
            vm.progressDelete = true;
          }
        });
        //分页按钮事件
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          refreshPageData(newPage, pageSize);
        });
      },
      paginationPageSizes: [10, 20, 30], //每页显示个数可选项
      paginationCurrentPage: 1, //当前页码
      paginationPageSize: 10,
      //使用自定义翻页控制
      useExternalPagination: true,
      //不允许表格左上角菜单
      enableGridMenu: false
    };
    //初始化控件
    function initProgress() {
      vm.selectedRow = null;
      vm.progresscontent = null;
      vm.progresstime = null;
      vm.fileSelected = false;
      vm.progressPicFile = null;
      vm.progressphoto = null;
      vm.progressSubmit = '新增';
      vm.buttonClass = 'btn btn-success';
      vm.progressDelete = true;
    }

    //新增或者修改项目进展
    vm.progressOk = function () {
      if (vm.progressPicFile) {
        vm.progressphoto = vm.progressPicFile;
      }
      if (vm.progresscontent === undefined ||
        vm.progresscontent === '' || vm.progresscontent === null) {
        vm.errInfo = '进展内容不能为空！';
        return;
      } else if (vm.progresstime === undefined ||
        vm.progresstime === '' || vm.progresstime === null) {
        vm.errInfo = '进展时间不能为空！';
        return;
      } else {
        vm.errInfo = '';
      }
      var progress = new ProgressService();
      progress.progresscontent = vm.progresscontent;
      progress.progresstime = vm.progresstime;
      progress.projectid = projectData.projectid;
      progress.progressphoto = vm.progressphoto;
      if (vm.progressSubmit === '新增') {
        Upload.upload({
          url: '/api/regionalization/progress',
          data: progress
        })
          .then(function (res) {
            //vm.gridOptions.data.push(new ProgressService(res.data));
            refreshRecordCount(vm.queryParam);
            initProgress();
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 项目进展新增成功!'});
          })
          .catch(function (err) {
            $log.error('regionalization add save error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 项目进展新增失败!'
            });
          });
      } else {
        progress.progressid = vm.selectedRow.progressid;
        Upload.upload({
          url: '/api/regionalization/progress/' + progress.progressid,
          data: progress
        })
          .then(function (res) {
            //修改表格显示的数据
            angular.extend(vm.selectedRow, res.data);
            initProgress();
            Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 项目进展修改成功!'});
          })
          .catch(function (err) {
            $log.error('project update save error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i> ' +
              '项目进展修改失败!'
            });
          });
      }
    };
    //删除数据
    vm.progressRemove = function () {
      if ($window.confirm('确定要删除吗?')) {
        vm.selectedRow.$remove(function () {
          var rowindex = vm.tableData.indexOf(vm.selectedRow);
          //去掉表格中的数据
          vm.tableData.splice(rowindex, 1);
          //复位当前行
          initProgress();
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 项目进展删除成功!'});
        })
          .catch(function (err) {
            $log.error('progress deleted error:', err.data.message);
            Notification.error({
              message: err.data.message, title: '<i class="glyphicon glyphicon-remove"></i>' +
              ' 项目进展删除失败!'
            });
          });
      }
    };
    //分页参数
    vm.queryParam = {
      projectid: projectData.projectid,
      progressId: 0,
      limit: 0,
      offset: 0
    };
    //刷新记录总数
    refreshRecordCount(vm.queryParam);
    //刷新记录总数
    function refreshRecordCount(queryParam) {
      ProgressService.query(queryParam).$promise
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
      var pageParam = {
        projectid: projectData.projectid,
        progressId: 0,
        limit: (pageNumber - 1) * pageSize,
        offset: pageSize
      };
      //取后台数据，默认按创建时间降序排序
      return ProgressService.query(pageParam).$promise
        .then(function (data) {
          vm.gridOptions.data = vm.tableData = data;
          return data;
        })
        .catch(function (err) {
          $log.error('query error:', err);
        });
    }

    //在这里处理要进行的操作
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
