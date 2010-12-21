/*
 * Tine 2.0
 * 
 * @package     Tine
 * @subpackage  Tinebase
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Cornelius Weiss <c.weiss@metaways.de>
 * @copyright   Copyright (c) 2007-2010 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id: Common.js 4995 2008-10-20 10:20:01Z c.weiss@metaways.de $
 */

/*global Ext, Tine, Locale*/

Ext.ns('Tine', 'Tine.Tinebase');

/**
 * static common helpers
 */
Tine.Tinebase.common = {
    
    /**
     * Open browsers native popup
     * 
     * @param {string} 	windowName
     * @param {string} 	url
     * @param {int} 	width
     * @param {int} 	height
     */
    openWindow: function (windowName, url, width, height) {
        // M$ IE has its internal location bar in the viewport
        if (Ext.isIE) {
            height = height + 20;
        }
        
        // chrome counts window decoration and location bar to window height
        if (Ext.isChrome) {
            height += 40;
        }
        
        windowName = Ext.isString(windowName) ? windowName.replace(/[^a-zA-Z0-9_]/g, '') : windowName;
        
        var	w, h, x, y, leftPos, topPos, popup;

        if (document.all) {
            w = document.body.clientWidth;
            h = document.body.clientHeight;
            x = window.screenTop;
            y = window.screenLeft;
        } else { 
            if (window.innerWidth) {
                w = window.innerWidth;
                h = window.innerHeight;
                x = window.screenX;
                y = window.screenY;
            }
        }
        leftPos = ((w - width) / 2) + y;
        topPos = ((h - height) / 2) + x;
        
        popup = window.open(url, windowName, 'width=' + width + ',height=' + height + ',top=' + topPos + ',left=' + leftPos +
        ',directories=no,toolbar=no,location=no,menubar=no,scrollbars=no,status=no,resizable=yes,dependent=no');
        
        return popup;
    },
    
    showDebugConsole: function () {
        if (! Ext.debug) {
            var head = document.getElementsByTagName("head")[0],
            	scriptTag = document.createElement("script");
            
            scriptTag.setAttribute("src", 'library/ExtJS/src/debug.js');
            scriptTag.setAttribute("type", "text/javascript");
            head.appendChild(scriptTag);
            
            var scriptEl = Ext.get(scriptTag);
            scriptEl.on('load', function () {
                Ext.log('debug console initialised');
            });
            scriptEl.on('fail', function () {
                Ext.msg.alert('could not activate debug console');
            });
        } else {
            Ext.log('debug console reactivated');
        }
    },
    
    /**
     * Returns localised date and time string
     * 
     * @param {mixed} $_iso8601
     * @see Ext.util.Format.date
     * @return {String} localised date and time
     */
    dateTimeRenderer: function ($_iso8601) {
    	var dateObj = $_iso8601 instanceof Date ? $_iso8601 : Date.parseDate($_iso8601, Date.patterns.ISO8601Long);
    	
        return Ext.util.Format.date(dateObj, Locale.getTranslationData('Date', 'medium') + ' ' + Locale.getTranslationData('Time', 'medium'));
    },

    /**
     * Returns localised date string
     * 
     * @param {mixed} date
     * @see Ext.util.Format.date
     * @return {String} localised date
     */
    dateRenderer: function (date) {
    	var dateObj = date instanceof Date ? date : Date.parseDate(date, Date.patterns.ISO8601Long);
    	
        return Ext.util.Format.date(dateObj, Locale.getTranslationData('Date', 'medium'));
    },
    
    /**
     * Returns localised time string
     * 
     * @param {mixed} date
     * @see Ext.util.Format.date
     * @return {String} localised time
     */
    timeRenderer: function (date) {
    	var dateObj = date instanceof Date ? date : Date.parseDate(date, Date.patterns.ISO8601Long);
    	
        return Ext.util.Format.date(dateObj, Locale.getTranslationData('Time', 'medium'));
    },
    
    /**
     * Returns rendered tags for grids
     * 
     * @param {mixed} tags
     * @return {String} tags as colored squares with qtips
     * 
     * TODO add style for tag divs
     */
    tagsRenderer: function (tags) {
        var result = '';
        if (tags) {
            for (var i = 0; i < tags.length; i += 1) {
                var qtipText = tags[i].name;
                if (tags[i].description) {
                    qtipText += ' | ' + tags[i].description;
                }
                result += '<div ext:qtip="' + qtipText + '" class="tb-grid-tags" style="background-color:' + tags[i].color + ';">&#160;</div>';
            }
        }
        
        return result;
    },
    
    /**
     * Returns prettyfied minutes
     * 
     * @param  {Number} minutes
     * @param  {String} format -> {0} will be replaced by Hours, {1} with minutes
     * @param  {String} leadingZeros add leading zeros for given item {i|H}
     * @return {String}
     */
    minutesRenderer: function (minutes, format, leadingZeros) {
        var s,
        	i = minutes % 60,
        	H = Math.floor(minutes / 60), // % (24);
        	Hs;
        //var d = Math.floor(minutes / (60 * 24));
        
        if (leadingZeros && (leadingZeros === true || leadingZeros.match(/i/)) && String(i).length === 1 ) {
            i = '0' + String(i);
        }
        
        if (leadingZeros && (leadingZeros === true || leadingZeros.match(/H/)) && String(H).length === 1 ) {
            H = '0' + String(H);
        }
        
        if (! format) {
            s = String.format(Tine.Tinebase.translation.ngettext('{0} minute', '{0} minutes', i), i);
            Hs = String.format(Tine.Tinebase.translation.ngettext('{0} hour', '{0} hours', H), H);
            //var ds = String.format(Tine.Tinebase.translation.ngettext('{0} workday', '{0} workdays', d), d);
            
            if (i === 0) {
            	s = Hs;
            } else {
                s = H ? Hs + ', ' + s : s;
            }
            //s = d ? ds + ', ' + s : s;
            
            return s;
        }
        
        return String.format(format, H, i);
    },

    /**
     * Returns prettyfied seconds
     * 
     * @param  {Number} seconds
     * @return {String}
     */
    secondsRenderer: function (seconds) {
        
        var s = seconds % 60,
        	m = Math.floor(seconds / 60),
        	result = '';
        
        var secondResult = String.format(Tine.Tinebase.translation.ngettext('{0} second', '{0} seconds', s), s);
        
        if (m) {
            result = Tine.Tinebase.common.minutesRenderer(m);
        }
        
        if (s) {
            if (result !== '') {
                result += ', ';
            }
            result += secondResult;
        }
        
        return result;
    },
    
    /**
     * Returns the formated username
     * 
     * @param {object} account object 
     * @return {string} formated user display name
     */
    usernameRenderer: function (accountObject) {
        var result = (accountObject) ? accountObject.accountDisplayName : '';
        
        return Ext.util.Format.htmlEncode(result);
    },
    
    /**
     * Returns a username or groupname with according icon in front
     */
    accountRenderer: function (accountObject, metadata, record, rowIndex, colIndex, store) {
        if (! accountObject) {
        	return '';
        }
        
        var type, iconCls, displayName;
        
        if (accountObject.accountDisplayName) {
            type = 'user';
            displayName = accountObject.accountDisplayName;
        } else if (accountObject.name) {
            type = 'group';
            displayName = accountObject.name;
        } else if (record.data.name) {
            type = record.data.type;
            displayName = record.data.name;
        } else if (record.data.account_name) {
            type = record.data.account_type;
            displayName = record.data.account_name;
        }
        
        iconCls = type === 'user' ? 'renderer renderer_accountUserIcon' : 'renderer renderer_accountGroupIcon';
        
        return '<div class="' + iconCls  + '">&#160;</div>' + Ext.util.Format.htmlEncode(displayName); 
    },
    
    /**
     * Returns account type icon
     */
    accountTypeRenderer: function (type) {
        var iconCls = (type) === 'user' ? 'renderer_accountUserIcon' : 'renderer_accountGroupIcon';
        
        return '<div style="background-position: 0px" class="' + iconCls  + '">&#160;</div>'; 
    },
    
    /**
     * return yes or no in the selected language for a boolean value
     * 
     * @param {string} value
     * @return {string}
     */
    booleanRenderer: function (value) {
        var translationString = String.format("{0}",(value == 1) ? Locale.getTranslationData('Question', 'yes') : Locale.getTranslationData('Question', 'no'));
        
        return translationString.substr(0, translationString.indexOf(':'));
    },
    
    /**
     * custom field renderer
     * 
     * @param {Object} customfields of record
     * @param {} metadata
     * @param {} record
     * @param {} rowIndex
     * @param {} colIndex
     * @param {} store
     * @param {String} name of the customfield
     * @return {String}
     */
    customfieldRenderer: function (customfields, metadata, record, rowIndex, colIndex, store, name) {
        return Ext.util.Format.htmlEncode(customfields[name]); 
    },
    
    /**
     * check if user has right to view/manage this application/resource
     * 
     * @param   {String}      right (view, admin, manage)
     * @param   {String}      application
     * @param   {String}      resource (for example roles, accounts, ...)
     * @returns {Boolean} 
     */
    hasRight: function (right, application, resource) {
        var userRights = [];
        
        if (! (Tine && Tine[application] && Tine[application].registry && Tine[application].registry.get('rights'))) {
            if (! Tine.Tinebase.appMgr) {
                console.error('Tine.Tinebase.appMgr not yet available');
            } else if (Tine.Tinebase.appMgr.get(application)) {
                console.error('Tine.' + application + '.rights is not available, initialisation Error!');
            }
            return false;
        }
        userRights = Tine[application].registry.get('rights');
        
        //console.log(userRights);
        var result = false;
        
        for (var i = 0; i < userRights.length; i += 1) {
            if (userRights[i] === 'admin') {
                result = true;
                break;
            }
            
            if (right === 'view' && (userRights[i] === 'view_' + resource || userRights[i] === 'manage_' + resource)) {
                result = true;
                break;
            }
            
            if (right === 'manage' && userRights[i] === 'manage_' + resource) {
                result = true;
                break;
            }
            
            if (right === userRights[i]) {
                result = true;
                break;
            }
        }
    
        return result;
    },
    
    /**
     * returns random integer number
     * @param {Integer} min
     * @param {Integer} max
     * @return {Integer}
     */
    getRandomNumber: function (min, max) {
        if (min > max) {
            return -1;
        }
        if (min === max) {
            return min;
        }
        return min + parseInt(Math.random() * (max - min + 1), 10);
    }
};
