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
    cm: null,
    
    defaultSortInfo: {field: 'id', direction: 'ASC'},    
    
    recordClass: Tine.Sipgate.Model.Line,
    app:null,
    
    initComponent: function() {
        if (!this.app) {
            this.app = Tine.Tinebase.appMgr.get(this.appName);
        }  
        
        
        this.title = this.app.i18n._('Select the Account in this window. Selecting saves the definition, so no \'OK\'-button is needed.');
        
        this.recordProxy = Tine.Sipgate.lineBackend;
        this.initStore();
        this.cm = this.getColumnModel();

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
        var accounts = Ext.decode(this.accounts);

        return new Ext.grid.ColumnModel({
            defaults: {
                sortable: false,
                menuDisabled: true,
                width: 160
            }, 
            columns: [
                {   id: 'tos', header: this.app.i18n._('Type'), dataIndex: 'tos', width: 30,
                    renderer: function(e,f,g,h) {
                        switch (e) {
                            case 'fax': 
                                var itemClass = 'SipgateTreeNode_fax';
                                break;
                            case 'voice':
                                var itemClass = 'SipgateTreeNode_phone';
                                break;
                            default: var itemClass = 'SipgateTreeNode_phone';
                        }
                        
                        return '<div class="' + itemClass + '"></div>';
                        }
                },
                
                { id: 'id', header: this.app.i18n._('Id'), dataIndex: 'id', hidden: true },
                { id: 'account_id', header: this.app.i18n._('User Account'), dataIndex: 'account_id', 
                    renderer      : function(e,f,g,h) { return accounts[h][1]},
                    editor: new Ext.form.ComboBox({
                        mode: 'local',
                        forceSelection: true,    
                        blurOnSelect  : true,
                        expandOnFocus : true,
                        store: new Ext.data.ArrayStore({
                            id: 0,
                            fields: [
                                'myId',
                                'displayText'
                            ],
                            data: accounts
                        }),
                        valueField: 'myId',
                        displayField: 'displayText',
                        triggerAction: 'all'
                    }) 
                },
                { id: 'uri_alias', header: this.app.i18n._('Uri Alias'), dataIndex: 'uri_alias' },
                { id: 'sip_uri', header: this.app.i18n._('Sip Uri'), dataIndex: 'sip_uri' },
                { id: 'e164_out', header: this.app.i18n._('Outgoing Number'), dataIndex: 'e164_out', width: 100},
                { id: 'e164_in', header: this.app.i18n._('Incoming Number(s)'), dataIndex: 'e164_in', width: 100,
                  renderer: function(e) {
                        var es = Ext.decode(e);
                        var esText = '<dl>';
                        Ext.each(es, function(e){
                            esText += '<dt>' + e + '</dt>';
                            })
                        esText += '</dl>';
                        return esText;
                    }
                }
           ]
       });
    }
});

/**
 * Sipgate admin settings popup
 * 
 * @return  {Ext.ux.Window}
 */
Tine.Sipgate.AssignAccountsGrid.openWindow = function (config) {
    config.accounts = Ext.encode(config.accounts);
    var window = Tine.WindowFactory.getWindow({
        width: 750,
        height: 300,
        name: 'SipgateAssignAccountsGridWindow',
        title: Tine.Tinebase.appMgr.get('Sipgate').i18n._('Configure Lines'),
        contentPanelConstructor: 'Tine.Sipgate.AssignAccountsGrid',
        contentPanelConstructorConfig: config
    });
    return window;
};
