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
    accounts: null,
    cls : 'tw-editdialog',
    anchor : '100% 100%',
    deferredRender : false,
    buttonAlign : null,
    bufferResize : 500,
    app:null,
    validated: false,
    
    initComponent: function() {
        if (!this.app) {
            this.app = Tine.Tinebase.appMgr.get(this.appName);
        }  
        // init actions
        this.initActions();
        
        // init buttons and tbar
        this.initButtons(); 
        
        Tine.Admin.userBackend.load({sort: 'id', dir: 'ASC', start: 0, limit: 1000}, null, this.setAccounts, this);
        this.items = this.getFormItems();
        
        this.loadRecord();
        

        Tine.Sipgate.AdminPanel.superclass.initComponent.call(this);
    },
    
    
    setAccounts: function(_ret) {
        var accounts = [];
        
        Ext.each(_ret.records, function(record) {
            accounts.push([record.data.accountId, record.data.accountDisplayName]);
        });
        
        this.accounts = accounts;
        
    },  
    
    initButtons: function() {
        this.fbar = [ '->', this.action_cancel, this.action_assign, this.action_ok, this.action_close ];
    },
    
    onRender: function(ct, position) {
        
        this.loadMask = new Ext.LoadMask(ct, {msg: this.app.i18n._('Loading Sipgate Configuration')});
        
        Tine.widgets.dialog.EditDialog.superclass.onRender.call(this, ct, position);

        // generalized keybord map for edit dlgs
        new Ext.KeyMap(this.el, [ {
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
        
        this.action_assign = new Ext.Action({
            text : this.app.i18n._('Assign Accounts'),
            minWidth : 70,
            scope : this,
            disabled: true,
            handler : this.onAssignAccounts,
            iconCls : 'SipgateAssignUsers'
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
        
        if(this.validated) this.onCancel();
        else {
            this.messageBox = Ext.Msg.wait(this.app.i18n._('Validating Sipgate Configuration'),this.app.i18n._('Please Wait'))
            this.saveSettings();
            
        }
        
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
                    try {
                        this.record = Ext.decode(_result.responseText);   
                        this.usernameField.setValue(this.record.username);
                        this.passwordField.setValue(this.record.password);
                        this.accounttypeField.setValue(this.record.accounttype);
                        
                    } catch (e) {
                        Tine.log.error('Tine.Sipgate.AdminPanel::loadRecord::successCallback');
                        Tine.log.error(e.stack ? e.stack : e);
                    }
                    this.loadMask.hide();
                }
            });
        
    },
    
    onValid: function() {
        this.action_assign.enable(); 
        this.validated = true;
    },
    
    onAssignAccounts: function() {
        var win = Tine.Sipgate.AssignAccountsGrid.openWindow({accounts: this.accounts});
        win.on('update', function() {
            win.onCancel();
            this.onCancel();
        },this);
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
                    this.messageBox.hide();
                    var result = Ext.decode(_result.responseText);
                    
                    if(result.valid == 1) {
                        Ext.Msg.alert(_('Connection succeeded'), _('The Connection to Sipgate succeeded!<br />Assign Accounts if not already done now.'));
                        this.onValid();
                    } else {
                        this.validated = false;
                        Ext.Msg.alert(_('Connection failed'), String.format(_('The Connection to Sipgate failed.<br /><br />Message: "{0}"'), result.error));
                        this.action_assign.disable();
                    }

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
                        name: 'username',
                        ref: '../../usernameField',
                        value: '',
                        listeners: {
                            scope: this,
                            change: function() { this.validated = false; this.action_assign.disable();}
                        }
                    }, {
                        fieldLabel: this.app.i18n._('Password'),
                        xtype: 'textfield',
                        inputType: 'password',
                        name: 'password',
                        value: '',
                        ref: '../../passwordField',
                        listeners: {
                            scope: this,
                            change: function() { this.validated = false; this.action_assign.disable();}
                        }
                }]
            }, {
                xtype: 'fieldset',
                region: 'center',
                padding: 5,
                layout: 'form',
                title: this.app.i18n._('Account Settings'),
                items: [
                    {
                        xtype: 'radiogroup',
                        hideLabel: true,
                        ref: '../../accounttypeField',
                        itemCls: 'x-check-group-alt',
                        columns: 1,
                        name: 'optionGroup',
                        items: [
                            {
                                checked: false,
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: this.app.i18n._('Plus'),
                                name: 'accounttype',
                                inputValue: 'plus'
                            }, {
                                checked: false,
                                fieldLabel: '',
                                labelSeparator: '',
                                boxLabel: this.app.i18n._('Team'),
                                name: 'accounttype',
                                inputValue: 'team'
                            }
                        ]
                    }
                ]
            }
        ]};
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
        height: 250,
        name: Tine.Sipgate.AdminPanel.prototype.windowNamePrefix + id,
        contentPanelConstructor: 'Tine.Sipgate.AdminPanel'
    });
    return window;
};