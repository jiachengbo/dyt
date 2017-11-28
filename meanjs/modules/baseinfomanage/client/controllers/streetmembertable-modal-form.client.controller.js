(function () {
  'use strict';

  angular
    .module('streetMemberTable')
    .controller('StreetMemberTableModalFormController', StreetMemberTableModalFormController);

  StreetMemberTableModalFormController.$inject = ['$timeout', '$scope', '$uibModalInstance', 'streetMemberTableData', 'method', 'columnDefs', 'Upload', 'Authentication', 'Notification'];
  function StreetMemberTableModalFormController($timeout, $scope, $uibModalInstance, streetMemberTableData, method, columnDefs, Upload, Authentication, Notification) {
    var vm = this;
    vm.streetMemberTableData = streetMemberTableData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.streetMemberTableForm');
        return;
      }
      if (vm.picFile) {
        vm.streetMemberTableData.photo = vm.picFile;
      }
      $uibModalInstance.close(vm.streetMemberTableData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    //----------sex-----------
    var cvs_sex = [{'name': '男'}, {'name': '女'}];
    $scope.cvs_sex = cvs_sex;
    if (method === '新增') {
      vm.streetMemberTableData.sex = cvs_sex[0].name;
    } else if (method === '修改') {
      vm.streetMemberTableData.sex = streetMemberTableData.sex;
    }
    /*//  测试照片上传
    vm.user = Authentication.user;
    vm.progress = 0;
    vm.upload = function (dataUrl) {

      Upload.upload({
        url: '/api/person/picture',
        data: {
          aaa: 'tttt',
          newPersonPicture: dataUrl,
          bbb: 2222,
          end: new Date()
        }
      }).then(function (response) {
        $timeout(function () {
          onSuccessItem(response.data);
        });
      }, function (response) {
        if (response.status > 0) onErrorItem(response.data);
      }, function (evt) {
        vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
      });
    };
// Called after the user has successfully uploaded a new picture
    function onSuccessItem(response) {
      // Show success message
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> 上传照片成功.' });
      // Populate user object
      vm.user = Authentication.user = response;
      // Reset form
      vm.fileSelected = false;
      vm.progress = 0;
    }

    // Called after the user has failed to upload a new picture
    function onErrorItem(response) {
      vm.fileSelected = false;
      vm.progress = 0;
      // Show error message
      Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> 上传照片失败.' });
    }*/

  }
}());
