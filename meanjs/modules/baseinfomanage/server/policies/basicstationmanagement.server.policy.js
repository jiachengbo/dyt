'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke BasicStationManagement Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['user', 'admin'],
    allows: [{
      resources: '/api/basicStationManagement',
      permissions: '*'
    }, {
      resources: '/api/basicStationManagement/:basicStationManagementId',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If BasicStationManagement Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];
  return next();
  // Check for user roles
  /*acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });*/
};
