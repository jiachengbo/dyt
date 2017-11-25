'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Map Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['user', 'admin'],
    allows: [{
      resources: '/api/map/person',
      permissions: '*'
    }, {
      resources: '/api/map/person/:personId',
      permissions: '*'
    }, {
      resources: '/api/map/personType',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If Map Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
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
  });
};
