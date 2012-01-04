/*
 * Tine 2.0
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * @copyright   Copyright (c) 2011 Metaways Infosystems GmbH (http://www.metaways.de)
 */
Ext.ns('Tine.Sipgate');

/**
 * Line grid panel
 * 
 * @namespace   Tine.Sipgate
 * @class       Tine.Sipgate.LineGridPanel
 * @extends     Tine.widgets.grid.GridPanel
 * 
 * <p>Line Grid Panel</p>
 * <p><pre>
 * </pre></p>
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * 
 * @param       {Object} config
 * @constructor
 * Create a new Tine.Sipgate.LineGridPanel
 */
Tine.Sipgate.LineGridPanel = Ext.extend(Tine.widgets.grid.GridPanel, {
    /**
     * record class
     * @cfg {Tine.Sipgate.Model.Line} recordClass
     */
    recordClass: Tine.Sipgate.Model.Line,
    
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
    
    /**
     * grid specific
     * @private
     */
    defaultSortInfo: {field: 'creation_time', direction: 'DESC'},
    gridConfig: {
        autoExpandColumn: 'title'
    },
     
    /**
     * inits this cmp
     * @private
     */
    initComponent: function() {
        this.recordProxy = Tine.Sipgate.recordBackend;
        
        this.gridConfig.cm = this.getColumnModel();
        this.filterToolbar = this.filterToolbar || this.getFilterToolbar(this.ftbConfig);
        
        this.plugins = this.plugins || [];
        this.plugins.push(this.filterToolbar);
        
        Tine.Sipgate.LineGridPanel.superclass.initComponent.call(this);
    },
    
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
                        header : this.translation._('Status'),
                        dataIndex : 'Status',
                        width : 20,
                        renderer: function(el){ 
                            return '<div class="SipgateCallStateList ' + el + '"></div>';
                        } 
                        
                            // renderer : this.renderer.direction
                        }, {
                        id : 'RemoteParty',
                        header : this.translation._('Remote Party'),
                        dataIndex : 'RemoteParty',
                        hidden : false
                    }, {
                        id : 'RemoteNumber',
                        header : this.translation._('Remote Number'),
                        dataIndex : 'RemoteNumber',
                        hidden : false
                    }, {
                        id : 'LocalUri',
                        header : this.translation._('Local Uri'),
                        dataIndex : 'LocalUri',
                        hidden : true
                    }, {
                        id : 'RemoteUri',
                        header : this.translation._('Remote Uri'),
                        dataIndex : 'RemoteUri',
                        hidden : true
                            // renderer :
                            // this.renderer.destination'RemoteParty','RemoteRecord','RemoteNumber'
                        }, {
                        id : 'Timestamp',
                        header : this.translation._('Call started'),
                        dataIndex : 'Timestamp',
                        renderer: function(tstamp) {
                            var d = new Date(tstamp*1000);                            
                            var n = d.format('D, d. M. Y H:m:s');
                            return n;
                        },
                        hidden:false
                        }, {
                        id : 'EntryID',
                        header : this.translation._('Call ID'),
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
