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
 * @class       Tine.Sipgate.AdminPanel
 * @extends     Tine.widgets.dialog.EditDialog
 * 
 * <p>Sipgate Admin Panel</p>
 * <p><pre>
 * TODO         generalize this
 * TODO         revert/rollback changes onCancel
 * </pre></p>
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * @copyright   Copyright (c) 2009-2010 Metaways Infosystems GmbH (http://www.metaways.de)
 * 
 * @param       {Object} config
 * @constructor
 * Create a new Tine.Sipgate.AdminPanel
 */
Tine.Sipgate.AdminPanel = Ext.extend(Ext.FormPanel, {
    /**
     * @private
     */
    //windowNamePrefix: 'LeadEditWindow_',
    // private
    appName : 'Sipgate',
    bodyStyle : 'padding:5px',
    layout : 'fit',
    border : false,
    record: null,
    cls : 'tw-editdialog',
    anchor : '100% 100%',
    deferredRender : false,
    buttonAlign : null,
    bufferResize : 500,
    app:null,
    
    initComponent: function() {
        if (!this.app) {
            this.app = Tine.Tinebase.appMgr.get(this.appName);
        }  
        // init actions
        this.initActions();
        
        // init buttons and tbar
        this.initButtons(); 
        
        this.loadRecord();
        this.items = this.getFormItems();

        Tine.Sipgate.AdminPanel.superclass.initComponent.call(this);
    },
    
  
    
    initButtons: function() {
        this.fbar = [ '->', this.action_cancel, this.action_ok, this.action_close ];
    },
    
    onRender: function(ct, position) {
        
        this.loadMask = new Ext.LoadMask(ct, {msg: this.app.i18n._('Loading Sipgate Configuration')});
        
        Tine.widgets.dialog.EditDialog.superclass.onRender.call(this, ct, position);

        // generalized keybord map for edit dlgs
        var map = new Ext.KeyMap(this.el, [ {
            key : [ 10, 13 ], // ctrl + return
            ctrl : true,
            fn : this.onUpdate,
            scope : this
        } ]);

    },
 
    
    /**
     * init actions
     */
    initActions : function() {
        this.action_ok = new Ext.Action({
            text : this.app.i18n._('OK'),
            minWidth : 70,
            scope : this,
            handler : this.onUpdate,
            iconCls : 'action_saveAndClose'
        });
        this.action_cancel = new Ext.Action({
            text : this.app.i18n._('Cancel'),
            minWidth : 70,
            scope : this,
            handler : this.onCancel,
            iconCls : 'action_cancel'
        });
        this.action_close = new Ext.Action({
            text : this.app.i18n._('Close'),
            minWidth : 70,
            scope : this,
            handler : this.onCancel,
            iconCls : 'action_saveAndClose',
            // x-btn-text
            hidden : true
        });
    },
    
    onCancel : function() {
        this.fireEvent('cancel');
        this.purgeListeners();
        this.window.close();
    },
    
    onUpdate: function() {
        Tine.log.debug(this.getForm().getValues());
        this.saveSettings()
    },
    
    loadRecord: function() {
        
        if (! this.rendered) {
            this.loadRecord.defer(250, this);
            return;
        }
        
        Ext.Ajax.request({
                url : 'index.php',
                scope: this,
                params : {
                    method : 'Sipgate.getConfigSettings'
                },
                success : function(_result, _request) {
                    this.record = Ext.decode(_result.responseText);
                    Tine.log.debug(this.record);

                    if(this.record.username) {
                        this.getForm().findField('username').setValue(this.record.username);
                        this.getForm().findField('password').setValue(this.record.password);
                    
                        if(this.record.accounttype == 'plus') {
                            this.getForm().findField('plus').setValue(true);
                        } else {
                            this.getForm().findField('team').setValue(true);
                        }
                    }
                    this.loadMask.hide();
                }
            });
        
    },
    
    saveSettings: function() {
        Ext.Ajax.request({
                url : 'index.php',
                scope: this,
                params : {
                    method : 'Sipgate.saveConfigSettings',
                    _values : this.getForm().getValues()

                },
                success : function(_result, _request) {
                    this.onCancel();
                }
            });
                
    },
       
    getFormItems : function() {


        return {
            border : false,
            frame : true,
            layout : 'border',
            items: [{
                xtype: 'fieldset',
                region: 'north',
                padding: 5,
                 layout: 'form',
                 height: 100,
                title: this.app.i18n._('Credentials'),
                items: [{
                        fieldLabel: this.app.i18n._('Username'),
                        xtype: 'textfield',
                        name: 'username'
                    }, {
                        fieldLabel: this.app.i18n._('Password'),
                        xtype: 'textfield',
                        inputType: 'password',
                        name: 'password'
                }]
            }, {
                xtype: 'fieldset',
                region: 'center',
                padding: 5,
                 layout: 'form',
                title: this.app.i18n._('Account Settings'),
                items: [{ 
                  boxLabel: this.app.i18n._('Plus'), 
                  name: 'plus',
//                  checked: (this.record.accounttype = 'plus') ? true : false,
                  xtype: 'checkbox',
                  bubbleEvents: ['check'],
                  listeners: {
                      scope: this, 
                      check: function() {
//                          this.getForm().findField('plus');
                          this.getForm().findField('team').setValue(false);
                          
                      }
                  }
                },
                { boxLabel: this.app.i18n._('Team'), 
                  name: 'team',
                  xtype: 'checkbox',
                  bubbleEvents: ['check'],
//                  checked: (this.record.accounttype = 'team') ? true : false,
                  listeners: {
                      scope: this, 
                      check: function() {
//                          this.getForm().findField('team').el.checked = 'checked';                        
                          this.getForm().findField('plus').setValue(false);
                      }
                  }
                        }  ]
            }
            
            
            
            ]
              
        };
    }
});



/**
 * admin panel on update function
 * 
 * TODO         update registry without reloading the mainscreen
 */
Tine.Sipgate.AdminPanel.onUpdate = function() {
    // reload mainscreen to make sure registry gets updated
    window.location = window.location.href.replace(/#+.*/, '');
}

/**
 * Sipgate admin settings popup
 * 
 * @param   {Object} config
 * @return  {Ext.ux.Window}
 */
Tine.Sipgate.AdminPanel.openWindow = function (config) {
    var window = Tine.WindowFactory.getWindow({
        width: 350,
        height: 200,
        name: Tine.Sipgate.AdminPanel.prototype.windowNamePrefix + id,
        contentPanelConstructor: 'Tine.Sipgate.AdminPanel'
    });
    return window;
};

//Ext.namespace('Tine.Crm.Admin');
//
///**
// * @namespace   Tine.Crm.Admin
// * @class       Tine.Crm.Admin.QuickaddGridPanel
// * @extends     Tine.widgets.grid.QuickaddGridPanel
// * 
// * admin config option quickadd grid panel
// */
//Tine.Crm.Admin.QuickaddGridPanel = Ext.extend(Tine.widgets.grid.QuickaddGridPanel, {
//
//    /**
//     * @private
//     */
//    initComponent: function() {
//        this.app = this.app ? this.app : Tine.Tinebase.appMgr.get('Crm');
//
//        Tine.Crm.Admin.QuickaddGridPanel.superclass.initComponent.call(this);
//    }
//});
