/*
 * Tine 2.0
 * 
 * @package     Crm
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Philipp Schuele <p.schuele@metaways.de>
 * @copyright   Copyright (c) 2009-2010 Metaways Infosystems GmbH (http://www.metaways.de)
 *
 */

Ext.namespace('Tine.Sipgate');

/**
 * admin settings panel
 * 
 * @namespace   Tine.Sipgate
 * @class       Tine.Sipgate.AssignAccountsGrid
 * @extends     Ext.grid.EditorGridPanel
 * 
 * <p>Sipgate Assign Accounts Panel</p>
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * @copyright   Copyright (c) 2009-2010 Metaways Infosystems GmbH (http://www.metaways.de)
 * 
 * Create a new Tine.Sipgate.AssignAccountsGrid
 */
Tine.Sipgate.AssignAccountsGrid = Ext.extend(Ext.grid.EditorGridPanel, {

    appName : 'Sipgate',
    loadMask : true,
    store: null,
    
    defaultSortInfo: {field: 'id', direction: 'ASC'},    
    cm: null,
    
    recordClass: Tine.Sipgate.Model.Line,
    
    app:null,
    
    initComponent: function() {
        if (!this.app) {
            this.app = Tine.Tinebase.appMgr.get(this.appName);
        }  
       
        this.recordProxy = Tine.Sipgate.lineBackend;
        this.cm = this.getColumnModel();
        this.initStore(); 
        
        Tine.Sipgate.AssignAccountsGrid.superclass.initComponent.call(this);
    },
     
    initStore: function() {
            this.store = new Tine.Tinebase.data.RecordStore({
                recordClass: this.recordClass
            });
        this.store.load();
    },
    
    
    
    /**
     * returns column model
     * 
     * @return Ext.grid.ColumnModel
     * @private
     */
    getColumnModel: function() {
        return new Ext.grid.ColumnModel({ 
            defaults: {
                sortable: true,
                hidden: true,
                resizable: true
            },
            columns: this.getColumns()
        });
    },
    
    /**
     * returns array with columns
     * 
     * @return {Array}
     */
    getColumns: function() {
        return [
            { id: 'id', header: this.app.i18n._('Id'), dataIndex: 'id', width: 10, hidden: true },
            { id: 'account_id', header: this.app.i18n._('User Account'), dataIndex: 'account_id', width: 10 },
            { id: 'uri_alias', header: this.app.i18n._('Uri Alias'), dataIndex: 'uri_alias', width: 10 },
            { id: 'sip_uri', header: this.app.i18n._(''), dataIndex: 'sip_uri', width: 10 },
            { id: 'e164_out', header: this.app.i18n._('Outgoing Number'), dataIndex: 'e164_out', width: 10 },
            { id: 'e164_in', header: this.app.i18n._('Incoming Number(s)'), dataIndex: 'e164_in', width: 10 },
            { id: 'tos', header: this.app.i18n._('Type'), dataIndex: 'tos', width: 10 }
       ];
    }
});

Tine.Sipgate.AssignAccountsGridContainer = new Ext.Viewport({
    frame: false,
    layout: 'fit'
    
    
});

/**
 * Sipgate admin settings popup
 * 
 * @return  {Ext.ux.Window}
 */
Tine.Sipgate.AssignAccountsGrid.openWindow = function () {
    var window = Tine.WindowFactory.getWindow({
        width: 350,
        height: 200,
        name: 'SipgateAssignAccountsGridWindow'
//        contentPanelConstructor: 'Tine.Sipgate.AssignAccountsGrid',
//        contentPanelConstructorConfig: { items : [ {
//                region : 'center',
//                layout : {
//                    align : 'stretch',
//                    type : 'vbox'
//                }
//
//            }, Tine.Sipgate.AssignAccountsGrid ] }
    });
    return window;
};
