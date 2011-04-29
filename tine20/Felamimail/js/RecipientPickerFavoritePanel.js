/*
 * Tine 2.0
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Philipp Schüle <p.schuele@metaways.de>
 * @copyright   Copyright (c) 2011 Metaways Infosystems GmbH (http://www.metaways.de)
 */
Ext.ns('Tine.Felamimail');

/**
 * @namespace   Tine.Felamimail
 * @class       Tine.Felamimail.RecipientPickerFavoritePanel
 * @extends     Ext.tree.TreePanel
 * 
 * <p>PersistentFilter Picker Panel</p>
 * 
 * @author      Philipp Schüle <p.schuele@metaways.de>
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * 
 * @param       {Object} config
 * @constructor
 * Create a new Tine.Felamimail.RecipientPickerFavoritePanel
 * 
 * TODO create filter on click dynamically (add emails from recipient picker dialog store)
 */
Tine.Felamimail.RecipientPickerFavoritePanel = Ext.extend(Tine.widgets.persistentfilter.PickerPanel, {
    
    collapsible: true,
    baseCls: 'ux-arrowcollapse',
    animCollapse: true,
    titleCollapse:true,
    draggable : true,
    autoScroll: false,
                        
    /**
     * @private
     */
    initComponent: function() {
        this.title = this.app.i18n._('Recipient filter');
        
        this.store = new Ext.data.ArrayStore({
            fields: Tine.widgets.persistentfilter.model.PersistentFilter.getFieldDefinitions(),
            sortInfo: {field: 'name', direction: 'ASC'}
        });
        
        var label = '';
        Ext.each(['all', 'to', 'cc', 'bcc'], function(field) {
            switch (field) {
                case 'all':
                    label = this.app.i18n._('All recipients');
                    break;
                default:
                    label = String.format(this.app.i18n._('"{0}" recipients'), field);
                    break;
            }
            this.store.add([new Tine.widgets.persistentfilter.model.PersistentFilter({
                //filters: field,
                filters: [],
                name: label,
                model: 'Addressbook_Model_Contact',
                application_id: this.app.id,
                id: Ext.id()
            })]);        
        }, this);

        
        this.filterNode = new Ext.tree.AsyncTreeNode({
            id: '_recipientFilter',
            leaf: false,
            expanded: true
        });
        
        Tine.Felamimail.RecipientPickerFavoritePanel.superclass.initComponent.call(this);
    }
});
