/*
 * Copyright 2014 Telefonica Investigación y Desarrollo, S.A.U
 *
 * This file is part of fiware-pep-steelskin
 *
 * fiware-pep-steelskin is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * fiware-pep-steelskin is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with fiware-pep-steelskin.
 * If not, seehttp://www.gnu.org/licenses/.
 *
 * For those usages not covered by the GNU Affero General Public License
 * please contact with::[iot_support@tid.es]
 */

'use strict';

const packageInformation = require('../../package.json'),
    config = require('../../config'),
    logger = require('logops'),
    cacheUtils = require('./../services/cacheUtils');

function retrieveVersion(req, res, next) {
    res.status(200).json({
        version: packageInformation.version,
        port: config.resource.proxy.port
    });
}

function changeLogLevel(req, res, next) {
    const levels = ['INFO', 'ERROR', 'FATAL', 'DEBUG', 'WARN', 'WARNING'];

    if (!req.query.level) {
        res.status(400).json({
            error: 'log level missing'
        });
    } else if (levels.indexOf(req.query.level.toUpperCase()) < 0) {
        res.status(400).json({
            error: 'invalid log level'
        });
    } else {
        let newLevel = req.query.level.toUpperCase();
        if (newLevel === 'WARNING') {
            newLevel = 'WARN';
        }
        logger.setLevel(newLevel);
        logger.info('change log level to ' + newLevel);
        res.status(200).send('');
    }
}

/**
 * Return the current log level.
 */
function getLogLevel(req, res, next) {
    res.status(200).json({
        level: logger.getLevel()
    });
}

/**
 * Return the cache statistics
 */
function getCacheStats(req, res, next) {
    res.status(200).json({
        cacheStats: {
            subservice: cacheUtils.get().data.subservice.getStats(),
            roles: cacheUtils.get().data.roles.getStats(),
            user: cacheUtils.get().data.user.getStats(),
            validation: cacheUtils.get().data.validation.getStats()
        }
    });
}

/**
 * Reset the cache statistics
 */
function resetCacheStats(req, res, next) {
    logger.info('reset cache stats ');
    cacheUtils.get().data.subservice.flushStats();
    cacheUtils.get().data.roles.flushStats();
    cacheUtils.get().data.user.flushStats();
    cacheUtils.get().data.validation.flushStats();
    res.status(204).json({});
}


function resetCache(req, res, next) {
    logger.info('reset cache');
    cacheUtils.get().data.subservice.flushAll();
    cacheUtils.get().data.roles.flushAll();
    cacheUtils.get().data.user.flushAll();
    cacheUtils.get().data.validation.flushAll();
    res.status(204).json({});
}


function loadContextRoutes(router) {
    router.get('/version', retrieveVersion);
    router.put('/admin/log', changeLogLevel);
    router.get('/admin/log', getLogLevel);
    router.get('/admin/cacheStats', getCacheStats);
    router.delete('/admin/cacheStats', resetCacheStats);
    router.delete('/admin/cache', resetCache);
}

exports.loadContextRoutes = loadContextRoutes;
