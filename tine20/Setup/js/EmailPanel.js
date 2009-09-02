/*
 * Tine 2.0
 * 
 * @package     Setup
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Philipp Schuele <p.schuele@metaways.de>
 * @copyright   Copyright (c) 2009 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id$
 *
 */
 
Ext.ns('Tine', 'Tine.Setup');
 
/**
 * Setup Email Config Manager
 * 
 * @namespace   Tine.Setup
 * @class       Tine.Setup.EmailPanel
 * @extends     Tine.Tinebase.widgets.form.ConfigPanel
 * 
 * <p>Email Config Panel</p>
 * <p><pre>
 * </pre></p>
 * 
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Philipp Schuele <p.schuele@metaways.de>
 * @copyright   Copyright (c) 2009 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id$
 * 
 * @param       {Object} config
 * @constructor
 * Create a new Tine.Setup.EmailPanel
 */
Tine.Setup.EmailPanel = Ext.extend(Tine.Tinebase.widgets.form.ConfigPanel, {
    
    /**
     * @property idPrefix DOM Id prefix
     * @type String
     */
    idPrefix: null,
    
    /**
     * imapBackend DOM Id prefix
     * 
     * @property imapBackendIdPrefix
     * @type String
     */
    imapBackendIdPrefix: null,
    
    /**
     * combo box containing the imap backend selection
     * 
     * @property imapBackendCombo
     * @type Ext.form.ComboBox 
     */
    imapBackendCombo: null,

    /**
     * smtpBackend DOM Id prefix
     * 
     * @property smtpBackendIdPrefix
     * @type String
     */
    smtpBackendIdPrefix: null,
    
    /**
     * combo box containing the smtp backend selection
     * 
     * @property smtpBackendCombo
     * @type Ext.form.ComboBox 
     */
    smtpBackendCombo: null,

    /**
     * @private
     * panel cfg
     */
    saveMethod: 'Setup.saveEmailConfig',
    registryKey: 'emailData',
    
    defaults: {
        xtype: 'fieldset',
        autoHeight: 'auto',
        defaults: {width: 300}
        //defaultType: 'textfield'
    },
    
    /**
     * @private
     */
    initComponent: function() {
        this.idPrefix                  = Ext.id();
        this.imapBackendIdPrefix       = this.idPrefix + '-imapBackend-',
        this.smtpBackendIdPrefix       = this.idPrefix + '-smtpBackend-',

        Tine.Setup.EmailPanel.superclass.initComponent.call(this);
    },
    
    /**
     * Change IMAP card layout depending on selected combo box entry
     */
    onChangeImapBackend: function() {
        var imapBackend = this.imapBackendCombo.getValue();
        
        var cardLayout = Ext.getCmp(this.imapBackendIdPrefix + 'CardLayout').getLayout();
        if (cardLayout !== 'card') {
            cardLayout.setActiveItem(this.imapBackendIdPrefix + imapBackend);
        }
    },

    /**
     * Change SMTP card layout depending on selected combo box entry
     */
    onChangeSmtpBackend: function() {
        var smtpBackend = this.smtpBackendCombo.getValue();
        
        var cardLayout = Ext.getCmp(this.smtpBackendIdPrefix + 'CardLayout').getLayout();
        if (cardLayout !== 'card') {
            cardLayout.setActiveItem(this.smtpBackendIdPrefix + smtpBackend);
        }
    },

    /**
     * @private
     */
    onRender: function(ct, position) {
        Tine.Setup.EmailPanel.superclass.onRender.call(this, ct, position);
        
        this.onChangeImapBackend.defer(250, this);
        this.onChangeSmtpBackend.defer(250, this);
    },
    
   /**
     * returns config manager form
     * 
     * @private
     * @return {Array} items
     */
    getFormItems: function() {
        
        var backendComboConfig = {
            width: 300,
            listWidth: 300,
            mode: 'local',
            forceSelection: true,
            allowEmpty: false,
            triggerAction: 'all',
            selectOnFocus:true,
            value: 'standard',
            fieldLabel: this.app.i18n._('Backend')
        }
        
        // imap combo
        backendComboConfig.store = [['standard', this.app.i18n._('Standard IMAP')], ['dbmail', 'DBmail']];
        backendComboConfig.name = 'imap_backend';
        backendComboConfig.listeners = {
            scope: this,
            change: this.onChangeImapBackend,
            select: this.onChangeImapBackend
        };
        this.imapBackendCombo = new Ext.form.ComboBox(backendComboConfig);
        
        // smtp combo
        backendComboConfig.store = [['standard', this.app.i18n._('Standard SMTP')], ['postfix', 'Postfix']];
        backendComboConfig.name = 'smtp_backend';
        backendComboConfig.listeners = {
            scope: this,
            change: this.onChangeSmtpBackend,
            select: this.onChangeSmtpBackend
        };
        this.smtpBackendCombo = new Ext.form.ComboBox(backendComboConfig);

        return [{
            title: this.app.i18n._('Imap'),
            id: 'setup-imap-group',
            checkboxToggle:true,
            collapsed: true,
            items: [
                this.imapBackendCombo, 
            {
                name: 'imap_host',
                fieldLabel: this.app.i18n._('Hostname'),
                xtype: 'textfield'
            }, {
                name: 'imap_user',
                fieldLabel: this.app.i18n._('Username'),
                xtype: 'textfield'
            }, {
                name: 'imap_password',
                fieldLabel: this.app.i18n._('Password'),
                xtype: 'textfield',
                inputType: 'password'
            }, {
                name: 'imap_port',
                fieldLabel: this.app.i18n._('Port'),
                xtype: 'numberfield'
            }, {
                fieldLabel: this.app.i18n._('Secure Connection'),
                name: 'imap_ssl',
                typeAhead     : false,
                triggerAction : 'all',
                lazyRender    : true,
                editable      : false,
                mode          : 'local',
                value: 'none',
                xtype: 'combo',
                listWidth: 300,
                store: [
                    ['none', this.app.i18n._('None')],
                    ['tls',  this.app.i18n._('TLS')],
                    ['ssl',  this.app.i18n._('SSL')]
                ]
            }, {
                name: 'imap_domain',
                fieldLabel: this.app.i18n._('Domain'),
                xtype: 'textfield'
            }, {
                xtype: 'combo',
                listWidth: 300,
                mode: 'local',
                forceSelection: true,
                allowEmpty: false,
                triggerAction: 'all',
                selectOnFocus:true,
                value: 0,
                store: [[0, this.app.i18n._('No')], [1, this.app.i18n._('Yes')]],
                name: 'imap_useAsDefault',
                fieldLabel: this.app.i18n._('Use as default account')
            }, {
                name: 'imap_name',
                fieldLabel: this.app.i18n._('Default account name'),
                xtype: 'textfield'
            }, {
                id: this.imapBackendIdPrefix + 'CardLayout',
                layout: 'card',
                activeItem: this.imapBackendIdPrefix + 'standard',
                border: false,
                width: '100%',
                defaults: {
                    border: false
                },
                items: [{
                    // nothing in here yet
                    id: this.imapBackendIdPrefix + 'standard',
                    layout: 'form',
                    items: []
                }, {
                    // dbmail config options
                    id: this.imapBackendIdPrefix + 'dbmail',
                    layout: 'form',
                    autoHeight: 'auto',
                    defaults: {
                        width: 300,
                        xtype: 'textfield'
                    },
                    items: this.getDbConfigFields('dbmail')
                }]
            }]
        }, {
            title: this.app.i18n._('Smtp'),
            id: 'setup-smtp-group',
            checkboxToggle:true,
            collapsed: true,
            items: [
                this.smtpBackendCombo,
            {
                name: 'smtp_hostname',
                fieldLabel: this.app.i18n._('Hostname'),
                xtype: 'textfield'
            }, {
                name: 'smtp_username',
                fieldLabel: this.app.i18n._('Username'),
                xtype: 'textfield'
            }, {
                name: 'smtp_password',
                fieldLabel: this.app.i18n._('Password'),
                inputType: 'password',
                xtype: 'textfield'
            }, {
                name: 'smtp_port',
                fieldLabel: this.app.i18n._('Port'),
                xtype: 'numberfield'
            }, {
                fieldLabel: this.app.i18n._('Secure Connection'),
                name: 'smtp_ssl',
                typeAhead     : false,
                triggerAction : 'all',
                lazyRender    : true,
                editable      : false,
                mode          : 'local',
                value: 'none',
                xtype: 'combo',
                listWidth: 300,
                store: [
                    ['none', this.app.i18n._('None')],
                    ['tls',  this.app.i18n._('TLS')],
                    ['ssl',  this.app.i18n._('SSL')]
                ]
            }, {
                fieldLabel: this.app.i18n._('Authentication'),
                name: 'smtp_auth',
                typeAhead     : false,
                triggerAction : 'all',
                lazyRender    : true,
                editable      : false,
                mode          : 'local',
                xtype: 'combo',
                listWidth: 300,
                value: 'login',
                store: [
                    ['none',    this.app.i18n._('None')],
                    ['login',   this.app.i18n._('Login')],
                    ['plain',   this.app.i18n._('Plain')]
                ]
            }, {
                id: this.smtpBackendIdPrefix + 'CardLayout',
                layout: 'card',
                activeItem: this.smtpBackendIdPrefix + 'standard',
                border: false,
                width: '100%',
                defaults: {
                    border: false
                },
                items: [{
                    // nothing in here yet
                    id: this.smtpBackendIdPrefix + 'standard',
                    layout: 'form',
                    items: []
                }, {
                    // postfix config options
                    id: this.smtpBackendIdPrefix + 'postfix',
                    layout: 'form',
                    autoHeight: 'auto',
                    defaults: {
                        width: 300,
                        xtype: 'textfield'
                    },
                    items: this.getDbConfigFields('postfix')
                }]
            }]
        }];
    },
    
    /**
     * applies registry state to this cmp
     */
    applyRegistryState: function() {
        this.action_saveConfig.setDisabled(!this.isValid());
    },
    
    /**
     * get db config fields
     * 
     * @param {String} type
     * @return {Array}
     */
    getDbConfigFields: function(type) {
        return [{
            name: 'imap_' + type + '_host',
            fieldLabel: Ext.util.Format.capitalize(type) + ' ' + this.app.i18n._('Hostname')
        }, {
            name: 'imap_' + type + '_dbname',
            fieldLabel: Ext.util.Format.capitalize(type) + ' ' + this.app.i18n._('Database')
        }, {
            name: 'imap_' + type + '_username',
            fieldLabel: Ext.util.Format.capitalize(type) + ' ' + this.app.i18n._('User')
        }, {
            name: 'imap_' + type + '_password',
            fieldLabel: Ext.util.Format.capitalize(type) + ' ' + this.app.i18n._('Password'),
            inputType: 'password'
        }];
    }
});
