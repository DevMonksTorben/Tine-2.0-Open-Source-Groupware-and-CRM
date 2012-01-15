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

// LINES

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


// CONNECTIONS

Tine.Sipgate.Model.ConnectionArray = [
    { name: 'id' },
    { name: 'tos' },
    { name: 'source_uri' },
    { name: 'target_uri' },
    { name: 'line_id' },
    { name: 'timestamp' },
    { name: 'tarif' },
    { name: 'duration' },
    { name: 'units_charged' },
    { name: 'contact_id' },
    { name: 'creation_time' }
];

Tine.Sipgate.Model.Connection = Tine.Tinebase.data.Record.create(Tine.Sipgate.Model.ConnectionArray, {
    appName: 'Sipgate',
    modelName: 'Connection',
    idProperty: 'id',
    titleProperty: 'source_uri',

    recordName: 'Connection',
    recordsName: 'Connections'
    
//    containerProperty: 'line_id'

});

Tine.Sipgate.connectionBackend = new Tine.Tinebase.data.RecordProxy({
    appName: 'Sipgate',
    modelName: 'Connection',
    recordClass: Tine.Sipgate.Model.Connection
});


Tine.Sipgate.Model.Connection.getFilterModel = function() {
    var app = Tine.Tinebase.appMgr.get('Sipgate');
    
    return [ 
        {label: _('Quick search'),    field: 'query',       operators: ['contains']},
        {label: app.i18n._('Title'),    field: 'title'},
        {label: app.i18n._('Number'),    field: 'number'},
        {label: app.i18n._('Description'),    field: 'description'},
        {
            label: app.i18n._('Status'),
            field: 'status',
            filtertype: 'tine.widget.keyfield.filter', 
            app: app, 
            keyfieldName: 'projectStatus'
        },
        {filtertype: 'tinebase.tag', app: app},
        {filtertype: 'tine.widget.container.filtermodel', app: app, recordClass: Tine.Sipgate.Model.Connection},
        {filtertype: 'tine.projects.attendee', app: app},
        {label: app.i18n._('Last modified'),                                            field: 'last_modified_time', valueType: 'date'},
        {label: app.i18n._('Last modifier'),                                            field: 'last_modified_by',   valueType: 'user'},
        {label: app.i18n._('Creation Time'),                                            field: 'creation_time',      valueType: 'date'},
        {label: app.i18n._('Creator'),                                                  field: 'created_by',         valueType: 'user'}
    ];
};

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

/**
 * @namespace Tine.Sipgate
 * @class Tine.Sipgate.settingBackend
 * @extends Tine.Tinebase.data.RecordProxy
 * 
 * Settings Backend
 */ 
Tine.Sipgate.settingsBackend = new Tine.Tinebase.data.RecordProxy({
    appName: 'Sipgate',
    modelName: 'Settings',
    recordClass: Tine.Sipgate.Model.Settings
});