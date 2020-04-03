/**
 * Credentials client
 */

'use strict';

/**
 * Module dependencies.
 */

var middleware = require('./middleware');
var utils = require('./utils');

/**
 * Initialize a new `Credentials` client.
 */

function Credentials(jenkins) {
  this.jenkins = jenkins;
}

/**
 * Object meta
 */

Credentials.meta = {};

/**
 * Credentials domain exists
 */

Credentials.prototype.domainExists = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];

  if (arg0 === 'string' && arg1 === 'string') {
    opts = {
      name: arguments[0],
      domain: arguments[1],
    };
    callback = arg2 === 'function' ? arguments[2] : undefined;
  } else {
    opts = {
      name: arguments[0],
      domain: '_'
    };
    callback = arg1 === 'function' ? arguments[1] : undefined;
  }

  this.jenkins._log(['debug', 'credentials', 'domainExists'], opts);

  var req = { name: 'credentials.domainExists' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');

    req.path = '{folder}/credentials/store/folder/domain/{domain}/api/json';
    req.params = {
      folder: folder.path(),
      domain: opts.domain,
    };
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._head(req, middleware.exists, callback);
};


/**
 * Create new credentials domain from xml
 */

Credentials.prototype.domain = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];
  var arg3 = typeof arguments[3];

  if (arg0 === 'string') {
    opts = {
      name: arguments[0],
    };
    if (arg1 === 'string' && arg2 === 'string') {
      opts.domain = arguments[1]
      opts.xml = arguments[2]
      callback = arg3 === 'function' ? arguments[3] : undefined;
    } else {
      opts.domain = '_'
      opts.xml = arguments[1]
      callback = arg2 === 'function' ? arguments[2] : undefined;
    }
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'credentials', 'domain'], opts);

  var req = { name: 'credentials.domain' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.xml) throw new Error('xml required');

    req.path = '{dir}/credentials/store/folder/createDomain';
    req.headers = { 'content-type': 'application/xml; charset=utf-8' };
    req.params = { dir: folder.path() };
    req.body = Buffer.from(opts.xml);
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(req, middleware.empty, callback);
};


/**
 * Create new credentials in a domain from xml
 */

Credentials.prototype.create = function(opts, callback) {
  var arg0 = typeof arguments[0];
  var arg1 = typeof arguments[1];
  var arg2 = typeof arguments[2];
  var arg3 = typeof arguments[3];

  if (arg0 === 'string') {
    opts = {
      name: arguments[0],
    };
    if (arg1 === 'string' && arg2 === 'string') {
      opts.domain = arguments[1]
      opts.xml = arguments[2]
      callback = arg3 === 'function' ? arguments[3] : undefined;
    } else {
      opts.domain = '_'
      opts.xml = arguments[1]
      callback = arg2 === 'function' ? arguments[2] : undefined;
    }
  }

  opts = opts || {};

  this.jenkins._log(['debug', 'credentials', 'create'], opts);

  var req = { name: 'credentials.create' };

  utils.options(req, opts);

  try {
    var folder = utils.FolderPath(opts.name);

    if (folder.isEmpty()) throw new Error('name required');
    if (!opts.xml) throw new Error('xml required');

    req.path = '{dir}/credentials/store/folder/domain/{domain}/createCredentials';
    req.headers = { 'content-type': 'application/xml; charset=utf-8' };
    req.params = {
      dir: folder.path(),
      domain: domain
    };
    req.body = Buffer.from(opts.xml);
  } catch (err) {
    return callback(this.jenkins._err(err, req));
  }

  return this.jenkins._post(req, middleware.empty, callback);
};


/**
 * Module exports.
 */

exports.Credentials = Credentials;
