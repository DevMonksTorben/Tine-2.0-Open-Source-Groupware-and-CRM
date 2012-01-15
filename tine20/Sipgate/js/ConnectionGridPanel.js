/*
 * Tine 2.0
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * @copyright   Copyright (c) 2011 Metaways Infosystems GmbH (http://www.metaways.de)
 */
Ext.ns('Tine.Sipgate');

/**
 * Connection grid panel
 * 
 * @namespace   Tine.Sipgate
 * @class       Tine.Sipgate.ConnectionGridPanel
 * @extends     Tine.widgets.grid.GridPanel
 * 
 * <p>Connection Grid Panel</p>
 * <p><pre>
 * </pre></p>
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * 
 * @param       {Object} config
 * @constructor
 * Create a new Tine.Sipgate.ConnectionGridPanel
 */
Tine.Sipgate.ConnectionGridPanel = Ext.extend(Ext.grid.GridPanel, {
    /**
     * record class
     * @cfg {Tine.Sipgate.Model.Connection} recordClass
     */
    recordClass: Tine.Sipgate.Model.Connection,
    
    /**
     * eval grants
     * @cfg {Boolean} evalGrants
     */
    evalGrants: true,
       
    /**
     * optional additional filterToolbar configs
     * @cfg {Object} ftbConfig
     */
    ftbConfig: null,
    border: false,
    /**
     * grid specific
     * @private
     */
    defaultSortInfo: {field: 'creation_time', direction: 'DESC'},
    gridConfig: {
        autoExpandColumn: 'title'
    },
     
    handlers: {},
    actions: {},
    /**
     * inits this cmp
     * @private
     */
    initComponent: function() {
        this.recordProxy = Tine.Sipgate.connectionBackend;

        this.cm = this.getColumnModel();
        this.tbar = this.getPagingToolbar();
        Tine.Sipgate.ConnectionGridPanel.superclass.initComponent.call(this);
    },
    
    getPagingToolbar: function() {
        try {
            var fromdate = new Ext.form.DateField({
                format : 'D, d. M. Y',
                value : new Date(new Date().getTime() - (24 * 60 * 60 * 1000)),
                fieldLabel : this.app.i18n._('Calls from'),
                id : 'startdt',
                name : 'startdt',
                width : 140,
                allowBlank : false,
                endDateField : 'enddt'
            });

            var todate = new Ext.form.DateField({
                format : 'D, d. M. Y',
                fieldLabel : this.app.i18n._('Calls to'),
                value : new Date(),
                maxValue : new Date(),
                id : 'enddt',
                name : 'enddt',
                width : 140,
                allowBlank : false,
                startDateField : 'startdt'
            });

            return new Ext.PagingToolbar({
//                items: [ fromdate, todate ],
                prependButtons: true,
    
                        pageSize : 20,
//                        store : this.store,
                        displayInfo : true,
                        displayMsg : this.app.i18n._('Displaying calls {0} - {1} of {2}'),
                        emptyMsg : this.app.i18n._("No calls to display")
            });
        } catch (e) {
            Tine.log.err('Could not create pagingToolbar');
            Tine.log.err(e.stack ? e.stack : e);
            return new Ext.Panel({html: 'Error creating pagingToolbar'});
        }
    },
    
//    getFilterToolbar: function(config) {
//        return new Ext.Panel({html: 'MERKEL'});
//    },
//            
//    getActionToolbar: function() {
//return new Ext.Panel({html: 'MERKEL'});
//    },
//        this.handlers.addNumber = function() { alert('ASD'); };
//        this.handlers.dialNumber = function() { alert('ASD'); };
//        
//        this.actions.dialNumber = new Ext.Action({
//            text : this.app.i18n._('Dial number'),
//            tooltip : this.app.i18n._('Initiates a new outgoing call'),
//            handler : this.handlers.dialNumber,
//            iconCls : 'action_DialNumber',
//            scope : this
//        });
//
//        this.actions.addNumber = new Ext.Action({
//            text : this.app.i18n._('Add Number to Addressbook'),
//            tooltip : this.app.i18n._('Adds this number to the Addressbook'),
//            handler : this.handlers.addNumber,
//            iconCls : 'action_AddNumber',
//            scope : this
//        });
//        
//        return new Ext.Toolbar({
//            items : [{
//                xtype : 'buttongroup',
//                columns : 1,
//                items : [Ext.apply(
//                        new Ext.Button(this.actions.dialNumber), {
//                            scale : 'medium',
//                            rowspan : 2,
//                            iconAlign : 'top'
//                        })]
//            }, '->']
//        });
//    },
    
    /**
     * returns cm
     * 
     * @return Ext.grid.ColumnModel
     * @private
     */
    getColumnModel: function(){
        return new Ext.grid.ColumnModel({
                    defaults : {
                        sortable : true,
                        resizable : true
                    },
                    columns : [{
                        id : 'Status',
                        header : this.app.i18n._('Status'),
                        dataIndex : 'Status',
                        width : 20,
                        renderer: function(el) { 
                            return '<div class="SipgateCallStateList ' + el + '"></div>';
                        } 
                    }, {
                        id : 'RemoteParty',
                        header : this.app.i18n._('Remote Party'),
                        dataIndex : 'RemoteParty',
                        hidden : false
                    }, {
                        id : 'RemoteNumber',
                        header : this.app.i18n._('Remote Number'),
                        dataIndex : 'RemoteNumber',
                        hidden : false
                    }, {
                        id : 'LocalUri',
                        header : this.app.i18n._('Local Uri'),
                        dataIndex : 'LocalUri',
                        hidden : true
                    }, {
                        id : 'RemoteUri',
                        header : this.app.i18n._('Remote Uri'),
                        dataIndex : 'RemoteUri',
                        hidden : true
                            // renderer :
                            // this.renderer.destination'RemoteParty','RemoteRecord','RemoteNumber'
                        }, {
                        id : 'Timestamp',
                        header : this.app.i18n._('Call started'),
                        dataIndex : 'Timestamp',
                        renderer: function(tstamp) {
                            var d = new Date(tstamp*1000);                            
                            var n = d.format('D, d. M. Y H:m:s');
                            return n;
                        },
                        hidden:false
                        }, {
                        id : 'EntryID',
                        header : this.app.i18n._('Call ID'),
                        dataIndex : 'EntryID',
                        hidden : true
                    }]
                });
        
//        
//        
//        
//        
//        
//        return new Ext.grid.ColumnModel({ 
//            defaults: {
//                sortable: true,
//                resizable: true
//            },
//            columns: [
//            {   id: 'tags', header: this.app.i18n._('Tags'), width: 40,  dataIndex: 'tags', sortable: false, renderer: Tine.Tinebase.common.tagsRenderer },                
//            {
//                id: 'number',
//                header: this.app.i18n._("Number"),
//                width: 100,
//                sortable: true,
//                dataIndex: 'number',
//                hidden: true
//            }, {
//                id: 'title',
//                header: this.app.i18n._("Title"),
//                width: 350,
//                sortable: true,
//                dataIndex: 'title'
//            }, {
//                id: 'status',
//                header: this.app.i18n._("Status"),
//                width: 150,
//                sortable: true,
//                dataIndex: 'status',
//                renderer: Tine.Tinebase.widgets.keyfield.Renderer.get('Sipgate', 'projectStatus')
//            }].concat(this.getModlogColumns())
//        });
    },
    
    /**
     * status column renderer
     * @param {string} value
     * @return {string}
     */
    statusRenderer: function(value) {
        return this.app.i18n._hidden(value);
    }
});
