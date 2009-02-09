/*
 * Tine 2.0
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Philipp Schuele <p.schuele@metaways.de>
 * @copyright   Copyright (c) 2007-2008 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id$
 *
 */
 
Ext.namespace('Ext.ux.form');

/**
 * A ComboBox with a (Ext.data.JsonStore) store that loads its data from a record in this format:
 * {
 *  value:1,
 *  records:[{id: 0, name: 'name 1'},{id: 1,name: 'name 2'}]
 * }
 * 
 * use it like this:
 * {
 *   xtype:'reccombo',
 *   name: 'software_id',
 *   fieldLabel: this.app.i18n._('Software Version'),
 *   displayField: 'name',
 *   store: new Ext.data.JsonStore({
 *      fields: Tine.Voipmanager.Model.SnomSoftware
 *   })
 * }
 */ 
Ext.ux.form.RecordsComboBox = Ext.extend(Ext.form.ComboBox, {
	
    /**
     * default config
     */
	triggerAction: 'all',
    editable: false,
    forceSelection: true,
    mode:'local',
    valueField:'id',
	
	/**
	 * overwrite setValue() to get records
	 * 
	 * @param {} value
	 */
    setValue: function(value) {
        var val = value;
        // check if object and load options from record
        if(typeof value === 'object' && Object.prototype.toString.call(value) === '[object Object]') {
            if(value['records'] !== undefined) {
                this.store.loadData(value['records']);
            }
            val = value['value'];
        }
        Ext.ux.form.RecordsComboBox.superclass.setValue.call(this, val);
    }
});

// register xtype
Ext.reg('reccombo', Ext.ux.form.RecordsComboBox);
