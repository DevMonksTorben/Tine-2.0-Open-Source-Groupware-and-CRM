/*
 * Tine 2.0
 * 
 * @package     Felamimail
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Philipp Schuele <p.schuele@metaways.de>
 * @copyright   Copyright (c) 2010 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id$
 *
 */
 
Ext.namespace('Tine.Felamimail');

/**
 * @namespace   Tine.Felamimail
 * @class       Tine.Felamimail.FolderSelectPanel
 * @extends     Ext.Panel
 * 
 * <p>Account/Folder Tree Panel</p>
 * <p>Tree of Accounts with folders</p>
 * <pre>
 * TODO         make it possible to preselect folder
 * TODO         use it for folder subscriptions
 * </pre>
 * 
 * @author      Philipp Schuele <p.schuele@metaways.de>
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @version     $Id$
 * 
 * @param       {Object} config
 * @constructor
 * Create a new Tine.Felamimail.FolderSelectPanel
 */
Tine.Felamimail.FolderSelectPanel = Ext.extend(Ext.Panel, {
	
    /**
     * Panel config
     * @private
     */
    frame: true,
    border: true,
    autoScroll: true,
    bodyStyle: 'background-color:white',
	
    /**
     * init
     * @private
     */
    initComponent: function() {
        this.addEvents(
            /**
             * @event folderselect
             * Fired when folder is selected
             */
            'folderselect'
        );

        this.app = Tine.Tinebase.appMgr.get('Felamimail');
        this.account = this.account || this.app.getActiveAccount();
        this.title = String.format(this.app.i18n._('Folders of account {0}'), this.account.get('name'));
        
        this.initActions();
        this.initFolderTree();
        
        Tine.Felamimail.FolderSelectPanel.superclass.initComponent.call(this);
	},
    
    /**
     * init actions
     */
    initActions: function() {
        this.action_cancel = new Ext.Action({
            text: _('Cancel'),
            minWidth: 70,
            scope: this,
            handler: this.onCancel,
            iconCls: 'action_cancel'
        });
        
        this.fbar = [
            '->',
            this.action_cancel
        ];        
    },
        
    /**
     * init folder tree
     */
    initFolderTree: function() {
        this.folderTree = new Ext.tree.TreePanel({
            id: 'felamimail-foldertree',
            rootVisible: true,
            store: this.store || this.app.getFolderStore(),
            // TODO use another loader/store for subscriptions
            loader: this.loader || new Tine.Felamimail.TreeLoader({
                folderStore: this.store,
                app: this.app
            }),
            root: new Ext.tree.AsyncTreeNode({
                text: this.account.get('name'),
                draggable: false,
                allowDrop: false,
                expanded: true,
                leaf: false,
                cls: 'felamimail-node-account',
                id: this.account.id,
                path: '/' + this.account.id
            })
        });
        this.folderTree.on('click', this.onFolderSelect, this);
        
        this.items = [this.folderTree];
    },
    
    /**
     * @private
     */
    afterRender: function() {
        Tine.Felamimail.FolderSelectPanel.superclass.afterRender.call(this);
        this.window.setTitle(this.app.i18n._('Folder Selection'));
    },

    /**
     * on folder select handler
     * 
     * @param {Ext.tree.AsyncTreeNode} node
     * @private
     */
    onFolderSelect: function(node) {
        this.fireEvent('folderselect', node);
    },
    
    /**
     * @private
     */
    onCancel: function(){
        this.purgeListeners();
        this.window.close();
    }    
});

/**
 * Felamimail FolderSelectPanel Popup
 * 
 * @param   {Object} config
 * @return  {Ext.ux.Window}
 */
Tine.Felamimail.FolderSelectPanel.openWindow = function (config) {
    var window = Tine.WindowFactory.getWindow({
        width: 200,
        height: 300,
        name: Tine.Felamimail.FolderSelectPanel.prototype.windowNamePrefix + Ext.id(),
        contentPanelConstructor: 'Tine.Felamimail.FolderSelectPanel',
        contentPanelConstructorConfig: config
    });
    return window;
};