<?php
/**
 * controller for Admin
 *
 * @package     Admin
 * @license     http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * @author      Lars Kneschke <l.kneschke@metaways.de>
 * @copyright   Copyright (c) 2007-2007 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id: Controller.php 273 2007-11-08 22:51:16Z lkneschke $
 *
 */
class Admin_Controller
{
    /**
     * the constructor
     *
     * don't use the constructor. use the singleton 
     */
    private function __construct() {}
    
    /**
     * don't clone. Use the singleton.
     *
     */
    private function __clone() {}

    /**
     * holdes the instance of the singleton
     *
     * @var Admin_Controller
     */
    private static $instance = NULL;
    
    /**
     * the singleton pattern
     *
     * @return Admin_Controller
     */
    public static function getInstance() 
    {
        if (self::$instance === NULL) {
            self::$instance = new Admin_Controller;
        }
        
        return self::$instance;
    }
    
    public function getAccount($_accountId)
    {
        $backend = Egwbase_Account::getInstance();

        $result = $backend->getAccount($_accountId);
        
        return $result;
    }
    
    public function getAccounts($_filter, $_sort, $_dir, $_start = NULL, $_limit = NULL)
    {
        $backend = Egwbase_Account::getInstance();

        $result = $backend->getAccounts($_filter, $_sort, $_dir, $_start, $_limit);
        
        return $result;
    }
    
    public function setAccountStatus($_accountId, $_status)
    {
        $backend = Egwbase_Account::getInstance();
        
        $result = $backend->setStatus($_accountId, $_status);
        
        return $result;
    }

    public function setAccountPassword($_accountId, $_password1, $_password2)
    {
        $backend = Egwbase_Account::getInstance();
        
        if($_password1 != $_password2) {
            throw new Exception("passwords don't match");
        }
        
        $result = $backend->setPassword($_accountId, $_password1);
        
        return $result;
    }
    
    public function getAccessLogEntries($_filter = NULL, $_sort = 'li', $_dir = 'ASC', $_limit = NULL, $_start = NULL, $_from = NULL, $_to = NULL)
    {
        $egwAccessLog = Egwbase_AccessLog::getInstance();

        $result = $egwAccessLog->getEntries($_filter, $_sort, $_dir, $_start, $_limit, $_from, $_to);
        
        return $result;
    }
    
    public function saveAccount(Egwbase_Account_Model_FullAccount $_account)
    {
        Egwbase_Account::getInstance()->saveAccount($_account);
    }
}
