<?php
/**
 * Tine 2.0
 *
 * @package     Sipgate
 * @subpackage  Controller
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * @copyright   Copyright (c) 2007-2011 Metaways Infosystems GmbH (http://www.metaways.de)
 *
 */

/**
 * contact controller for Sipgate
 *
 * @package     Sipgate
 * @subpackage  Controller
 */
class Sipgate_Controller_Line extends Tinebase_Controller_Record_Abstract
{

    /**
     * check for container ACLs
     *
     * @var boolean
     *
     */
    protected $_doContainerACLChecks = false;

    /**
     * do right checks - can be enabled/disabled by _setRightChecks
     *
     * @var boolean
     */
    protected $_doRightChecks = false;

    /**
     * the constructor
     *
     * don't use the constructor. use the singleton
     */
    private function __construct() {
        $this->_applicationName = 'Sipgate';
        $this->_modelName = 'Sipgate_Model_Line';
        $this->_backend = new Sipgate_Backend_Line();
    }

    /**
     * don't clone. Use the singleton.
     *
     */
    private function __clone()
    {
    }

    /**
     * holds the instance of the singleton
     *
     * @var Sipgate_Controller_Line
     */
    private static $_instance = NULL;

    /**
     * the singleton pattern
     *
     * @return Sipgate_Controller_Line
     */
    public static function getInstance()
    {
        if (self::$_instance === NULL) {
            self::$_instance = new Sipgate_Controller_Line();
        }

        return self::$_instance;
    }
}
