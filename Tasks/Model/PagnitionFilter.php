<?php
/**
 * eGroupWare 2.0
 * 
 * @package     Tasks
 * @license     http://www.gnu.org/licenses/agpl.html
 * @author      Cornelius Weiss <c.weiss@metaways.de>
 * @copyright   Copyright (c) 2007-2007 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id$
 *
 */

/**
 * Task Pagenit Record Class
 * @package Tasks
 */
class Tasks_Model_PagnitionFilter extends Egwbase_Record_Abstract
{
    protected $_identifier = 'identifier';
    
    protected $_application = 'Tasks';
    
    protected $_validators = array(
        'identifier'           => array('allowEmpty' => true,  'Int'   ),
        
        'start'                => array('allowEmpty' => true,  'Int'   ),
        'limit'                => array('allowEmpty' => true,  'Int'   ),
        'sort'                 => array('allowEmpty' => true,          ),
        'dir'                  => array('allowEmpty' => true,  'Alpha' ),

        'containerType'             => array('allowEmpty' => true           ),
        'owner'                => array('allowEmpty' => true           ),
        'container'            => array('allowEmpty' => true           ),
        
        'query'                => array('allowEmpty' => true           ),
        'organizer'            => array('allowEmpty' => true           ),
        'status'               => array('allowEmpty' => true           ),
        'showClosed'           => array('allowEmpty' => true, 'InArray' => array(true,false)),
        'due'                  => array('allowEmpty' => true           ),
        'tag'                  => array('allowEmpty' => true           ),
        
    );
    
    protected $_datetimeFields = array(
        'due',
    );
    
    /**
     * gets record related properties
     * 
     * @param string name of property
     * @return mixed value of property
     */
    public function __get($_name)
    {
        switch ($_name) {
            case 'container':
                $this->_resolveContainer();
                break;
            default:
        }
        return parent::__get($_name);
    }
    
    /**
     * Resolves containers from selected nodes
     * 
     * @throws Exception
     * @return void
     */
    protected function _resolveContainer()
    {
        if (isset($this->_properties['container']) && is_array($this->_properties['container'])) {
            return;
        }
        if (!$this->containerType) {
            throw new Exception('You need to set a containerType.');
        }
        if ($this->containerType == 'Personal' && !$this->owner) {
            throw new Exception('You need to set an owner when containerType is "Personal".');
        }
        
        $cc = Egwbase_Container::getInstance();
        switch($this->containerType) {
            case 'all':
                $accountId = Zend_Registry::get('currentAccount')->accountId;
                $containers = $cc->getContainerByACL($accountId, $this->_application, Egwbase_Container::GRANT_READ);
                break;
            case 'personal':
                $containers = $cc->getPersonalContainer($this->_application, $this->owner);
                break;
            case 'shared':
                $containers = $cc->getSharedContainer($this->_application);
                break;
            case 'OtherUsers':
                $containers = $cc->getOtherUsersContainer($this->_application);
                break;
            case 'singleContainer':
                $this->_properties['container'] = array($this->_properties['container']);
                return;
            default:
                throw new Exception('containerType not supported.');
        }
        $container = array();
        foreach ($containers as $singleContainer) {
            $container[] = $singleContainer->getId();
        }
        
        $this->_properties['container'] = $container;
    }
}