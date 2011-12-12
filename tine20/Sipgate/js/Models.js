/*
 * Tine 2.0
 * 
 * @package     Sipgate
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * @copyright   Copyright (c) 2007-2010 Metaways Infosystems GmbH (http://www.metaways.de)
 *
 */
 
Ext.namespace('Tine.Sipgate', 'Tine.Sipgate.Model');

Tine.Sipgate.Model.LineArray = [
    { name: 'id' },
    { name: 'account_id' },
    { name: 'uri_alias' },
    { name: 'sip_uri' },
    { name: 'e164_out' },
    { name: 'e164_in' },
    { name: 'tos' },
    { name: 'creation_time' }
];

Tine.Sipgate.Model.Line = Tine.Tinebase.data.Record.create(Tine.Sipgate.Model.LineArray, {
    appName: 'Sipgate',
    modelName: 'Line',
    idProperty: 'id',
    titleProperty: 'uri_alias',

    recordName: 'Line',
    recordsName: 'Lines',
    
    containerProperty: null

});

Tine.Sipgate.lineBackend = new Tine.Tinebase.data.RecordProxy({
    appName: 'Sipgate',
    modelName: 'Line',
    recordClass: Tine.Sipgate.Model.Line
});


/**
 * @namespace Tine.Sipgate.Model
 * @class Tine.Sipgate.Model.Settings
 * @extends Tine.Tinebase.data.Record
 * 
 * Settings Record Definition
 */ 
 
Tine.Sipgate.Model.Settings = Tine.Tinebase.data.Record.create([
        {name: 'id'}

    ], {
    appName: 'Sipgate',
    modelName: 'Settings',
    idProperty: 'id',
    titleProperty: 'title',
    // ngettext('Settings', 'Settings', n);
    recordName: 'Settings',
    recordsName: 'Settingss',
    containerProperty: null,
    // ngettext('record list', 'record lists', n);
    containerName: 'Settings',
    containersName: 'Settings',
    getTitle: function() {
        return this.recordName;
    }
});