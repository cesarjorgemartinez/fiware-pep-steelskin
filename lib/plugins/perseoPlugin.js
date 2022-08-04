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

const urlTablePlugin = require('./urlTablePlugin');

/**
 * Perseo operation identification table. Each row of the table contains an operation with three fields:
 * the method of the operation, a regular expression to identify the URL, and the action that operation should be
 * assigned.
 */
const perseoOperations = [
    ['POST', /\/notices\/?/, 'notify'],

    ['GET', /\/rules\/?/, 'readRule'],
    ['GET', /\/rules\/.*/, 'readRule'],
    ['POST', /\/rules\/?/, 'writeRule'],
    ['DELETE', /\/rules\/.*/, 'writeRule'],
    ['PUT', /\/rules\/.*/, 'writeRule'],

    ['GET', /\/m2m\/vrules\/?/, 'readRule'],
    ['GET', /\/m2m\/vrules\/.*/, 'readRule'],
    ['POST', /\/m2m\/vrules\/?/, 'writeRule'],
    ['DELETE', /\/m2m\/vrules\/.*/, 'writeRule'],
    ['PUT', /\/m2m\/vrules\/.*/, 'writeRule'],

    ['GET', /\/version/, 'readRule']
];


exports.extractAction = urlTablePlugin.extractAction(perseoOperations);
