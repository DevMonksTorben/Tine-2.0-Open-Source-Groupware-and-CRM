
Ext.ns('Tine.Sipgate');

Tine.Sipgate.LineTreePanel = function(config) {
    Ext.apply(this, config);
    Tine.Sipgate.LineTreePanel.superclass.constructor.call(this);
};

Ext.extend(Tine.Sipgate.LineTreePanel, Ext.tree.TreePanel, {

    rootVisible : false,
    border : false,
    collapsible : true,
    grid : null,
    filterPlugin: null,
    root: {},
    
    titleCollapse: true,
    title: '',
    baseCls: 'ux-arrowcollapse',
    filterPlugin: null,
    
    app : null,
    appName: 'Sipgate',
    
    recordClass: Tine.Sipgate.Model.Line,
        
    initComponent: function() {
        
        this.setTitle(this.app.i18n._('Devices'));        
        this.initStore();
        
        Tine.Sipgate.LineTreePanel.superclass.initComponent.call(this);
    },
    
    initStore: function() {
        this.store = new Tine.Tinebase.data.RecordStore({
            recordClass: this.recordClass,
            sortInfo: {
                field: 'sip_uri',
                direction: 'ASC'
            },
            listeners: {
                scope: this,
                load: function() { this.populateTree(); }
            }
        });
        
        this.store.load();
    },
    
    populateTree: function() {

        var treeRoot = new Ext.tree.TreeNode({
            expanded: true,
            text : this.app.i18n._('Devices'),
            allowDrag : false,
            allowDrop : false,
            icon : false
        });
    
        this.setRootNode(treeRoot);       
        // get tree root
        var treeRoot = this.getRootNode();

        // remove all children first
        treeRoot.eachChild(function(child) {treeRoot.removeChild(child);});
    
        // add phones to tree menu
        this.store.each(function(record) {
            treeRoot.appendChild(new Ext.tree.TreeNode({
                id : record.get('id'),
                record : record,
                text : record.get('sip_uri'),
                qtip : record.get('uri_alias'),
                iconCls : 'SipgateTreeNode_' + record.get('tos'),
                leaf : true
            }));
        });
    },

    getFilterPlugin: function() {
        if (!this.filterPlugin) {
            this.filterPlugin = new Tine.Sipgate.FilterPanel({app: this.app});
        }
        
        return this.filterPlugin;

    }
    
});

Ext.reg('tine.sipgate.linetreepanel', Tine.Sipgate.LineTreePanel);
