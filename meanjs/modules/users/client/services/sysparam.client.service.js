(function () {
  'use strict';

  angular
    .module('sysparam.services')
    .factory('SysparamService', SysparamService);

  SysparamService.$inject = ['$resource', '$log'];

  function SysparamService($resource, $log) {
    var Sysparam = $resource('/api/sysparam/:sysparamId', {
      sysparamId: '@name'
    }, {
      update: {
        method: 'PUT',
        url: '/api/sysparam',
        //覆盖掉:sysparamId
        params: {
          sysparamId: null
        }
      },
      save: {
        method: 'POST',
        url: '/api/sysparam',
        //覆盖掉:sysparamId
        params: {
          sysparamId: null
        }
      }
    });

    return Sysparam;
  }
}());
