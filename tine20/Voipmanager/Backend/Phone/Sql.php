<?php
/**
 * Tine 2.0
 *
 * @package     Voipmanager Management
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Thomas Wadewitz <t.wadewitz@metaways.de>
 * @copyright   Copyright (c) 2007-2008 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id:  $
 *
 */

/**
 * 
 *
 * @package  Voipmanager
 */
class Voipmanager_Backend_Phone_Sql implements Voipmanager_Backend_Phone_Interface
{
    /**
     * @var Zend_Db_Adapter_Abstract
     */
    protected $_db;    
    
	/**
	 * the constructor
	 */
    public function __construct()
    {
        $this->_db = Zend_Registry::get('dbAdapter');
    }
    
	/**
	 * get Location
	 * 
     * @param string $_sort
     * @param string $_dir
	 * @return Tinebase_Record_RecordSet of subtype Voipmanager_Model_Location
	 */
    public function getLocation($_sort = 'id', $_dir = 'ASC', $_filter = NULL)
    {	
        $where = array();
        if(!empty($_filter)) {
            $_fields = "firmware_interval,firmware_status,update_policy,setting_server,admin_mode,ntp_server,http_user,description";            
            $where = $this->_getSearchFilter($_filter, $_fields);
        }
        
        $select = $this->_db->select()
            ->from(array('location' => SQL_TABLE_PREFIX . 'snom_location'));

        $select->order($_sort.' '.$_dir);

        foreach($where as $whereStatement) {
            $select->where($whereStatement);
        }               
        //echo  $select->__toString();
       
        $stmt = $this->_db->query($select);

        $rows = $stmt->fetchAll(Zend_Db::FETCH_ASSOC);
        
       	$result = new Tinebase_Record_RecordSet('Voipmanager_Model_Location', $rows);
		
        return $result;
	}
    
	/**
	 * get Location by id
	 * 
     * @param string $_id
	 * @return Tinebase_Record_RecordSet of subtype Voipmanager_Model_Location
	 */
    public function getLocationById($_locationId)
    {	
        $locationId = Voipmanager_Model_Location::convertLocationIdToInt($_locationId);
        $select = $this->_db->select()->from(SQL_TABLE_PREFIX . 'snom_location')->where($this->_db->quoteInto('id = ?', $locationId));
        $row = $this->_db->fetchRow($select);
        if (! $row) {
            throw new UnderflowException('location not found');
        }
#       	$result = new Tinebase_Record_RecordSet('Voipmanager_Model_Location', $row);
        $result = new Voipmanager_Model_Location($row);
        return $result;
	}    
    
    
   
     /**
     * add a location
     *
     * @param Voipmanager_Model_Location $_location the location data
     * @return Voipmanager_Model_Location
     */
    public function addLocation (Voipmanager_Model_Location $_location)
    {
        if (! $_location->isValid()) {
            throw new Exception('invalid location');
        }
        
        if ( empty($_location->id) ) {
        	$_location->setId(Tinebase_Record_Abstract::generateUID());
        }
        
        $locationData = $_location->toArray();
        
        $this->_db->insert(SQL_TABLE_PREFIX . 'snom_location', $locationData);

        return $this->getLocationById($_location->id);
    }
    
    
    /**
     * update an existing location
     *
     * @param Voipmanager_Model_Location $_location the locationdata
     * @return Voipmanager_Model_Location
     */
    public function updateLocation (Voipmanager_Model_Location $_location)
    {
        if (! $_location->isValid()) {
            throw new Exception('invalid location');
        }
        $locationId = $_location->getId();
        $locationData = $_location->toArray();
        unset($locationData['id']);

        $where = array($this->_db->quoteInto('id = ?', $locationId));
        $this->_db->update(SQL_TABLE_PREFIX . 'snom_location', $locationData, $where);
        
        return $this->getLocationById($locationId);
    }    
     
    
    
    /**
     * delete location identified by location id
     *
     * @param int $_locationId location id
     * @return int the number of row deleted
     */
    public function deleteLocation ($_locationId)
    {
        $locationId = Voipmanager_Model_Location::convertLocationIdToInt($_locationId);
        $where = array($this->_db->quoteInto('id = ?', $locationId) , $this->_db->quoteInto('id = ?', $locationId));
        $result = $this->_db->delete(SQL_TABLE_PREFIX . 'snom_location', $where);
        return $result;
    }    
    
    
    /**
     * Deletes a set of locations.
     * 
     * If one of the locations could not be deleted, no location is deleted
     * 
     * @throws Exception
     * @param array array of strings (location ids)
     * @return void
     */
    public function deleteLocations($_ids)
    {
        try {
            $this->_db->beginTransaction();
            foreach ($_ids as $id) {
                $this->deleteLocation($id);
            }
            $this->_db->commit();
            
        } catch (Exception $e) {
            $this->_db->rollBack();
            throw $e;
        }
    } 
    
    
    
	/**
	 * get Software
	 * 
     * @param string $_sort
     * @param string $_dir
	 * @return Tinebase_Record_RecordSet of subtype Voipmanager_Model_Software
	 */
    public function getSoftware($_sort = 'id', $_dir = 'ASC', $_filter = NULL)
    {	
        $where = array();
        
        if(!empty($_filter)) {
            $_fields = "description,model,softwareimage";            
            $where = $this->_getSearchFilter($_filter, $_fields);
        }
        
        $select = $this->_db->select()
            ->from(array('location' => SQL_TABLE_PREFIX . 'snom_software'), array(
                'id',
                'description',
                'model',
                'softwareimage')
            );

        $select->order($_sort.' '.$_dir);

         foreach($where as $whereStatement) {
              $select->where($whereStatement);
         }               
       //echo  $select->__toString();
       
        $stmt = $this->_db->query($select);

        $rows = $stmt->fetchAll(Zend_Db::FETCH_ASSOC);
        
       	$result = new Tinebase_Record_RecordSet('Voipmanager_Model_Software', $rows);
		
        return $result;
	}    
    
	/**
	 * get Software by id
	 * 
     * @param string $_id
	 * @return Tinebase_Record_RecordSet of subtype Voipmanager_Model_Software
	 */
    public function getSoftwareById($_softwareId)
    {	
        //$softwareId = Voipmanager_Model_Software::convertSoftwareIdToInt($_softwareId);
        $select = $this->_db->select()
            ->from(SQL_TABLE_PREFIX . 'snom_software')
            ->where($this->_db->quoteInto('id = ?', $_softwareId));
            
        $row = $this->_db->fetchRow($select);
        if (! $row) {
            throw new UnderflowException('software not found');
        }
#       	$result = new Tinebase_Record_RecordSet('Voipmanager_Model_Software', $row);
        $result = new Voipmanager_Model_Software($row);
        return $result;
	}      
    
    /**
     * add new software
     *
     * @param Voipmanager_Model_Software $_software the softwaredata
     * @return Voipmanager_Model_Software
     */
    public function addSoftware (Voipmanager_Model_Software  $_software)
    {
        if (! $_software->isValid()) {
            throw new Exception('invalid software');
        }

        if ( empty($_software->id) ) {
            $_software->setId(Tinebase_Record_Abstract::generateUID());
        }
        
        $softwareData = $_software->toArray();
        
        $this->_db->insert(SQL_TABLE_PREFIX . 'snom_software', $softwareData);

        return $this->getSoftwareById($_software->getId());
    }
    
    /**
     * update an existing software
     *
     * @param Voipmanager_Model_Software $_software the softwaredata
     * @return Voipmanager_Model_Software
     */
    public function updateSoftware (Voipmanager_Model_Software $_software)
    {
        if (! $_software->isValid()) {
            throw new Exception('invalid software');
        }
        $softwareId = $_software->getId();
        $softwareData = $_software->toArray();
        unset($softwareData['id']);

        $where = array($this->_db->quoteInto('id = ?', $softwareId));
        $this->_db->update(SQL_TABLE_PREFIX . 'snom_software', $softwareData, $where);
        
        return $this->getSoftwareById($softwareId);
    }    
    

    /**
     * delete software identified by software id
     *
     * @param int $_softwareId software id
     * @return int the number of row deleted
     */
    public function deleteSoftware ($_softwareId)
    {
        $softwareId = Voipmanager_Model_Software::convertSoftwareIdToInt($_softwareId);
        $where = array($this->_db->quoteInto('id = ?', $softwareId) , $this->_db->quoteInto('id = ?', $softwareId));
        $result = $this->_db->delete(SQL_TABLE_PREFIX . 'snom_software', $where);
        return $result;
    }    
    
    
    /**
     * Deletes a set of software entries ids.
     * 
     * If one of the software entries could not be deleted, no software is deleted
     * 
     * @throws Exception
     * @param array array of strings (software ids)
     * @return void
     */
    public function deleteSoftwares($_ids)
    {
        try {
            $this->_db->beginTransaction();
            foreach ($_ids as $id) {
                $this->deleteSoftware($id);
            }
            $this->_db->commit();
            
        } catch (Exception $e) {
            $this->_db->rollBack();
            throw $e;
        }
    }
    
  
	/**
	 * get Templates
	 * 
     * @param string $_sort
     * @param string $_dir
	 * @return Tinebase_Record_RecordSet of subtype Voipmanager_Model_Template
	 */
    public function getTemplates($_sort = 'id', $_dir = 'ASC', $_filter = NULL)
    {	
        $where = array();
        
        if(!empty($_filter)) {
            $_fields = "model,description";            
            $where = $this->_getSearchFilter($_filter, $_fields);
        }
        
        
        $select = $this->_db->select()
            ->from(array('voipmanager' => SQL_TABLE_PREFIX . 'snom_templates'), array(
                'id',
                'name',
                'description',
                'model',
                'keylayout_id',
                'setting_id',
                'software_id')
            );

        $select->order($_sort.' '.$_dir);

        foreach($where as $whereStatement) {
            $select->where($whereStatement);
        }               
        //echo  $select->__toString();
       
        $stmt = $this->_db->query($select);

        $rows = $stmt->fetchAll(Zend_Db::FETCH_ASSOC);
        
       	$result = new Tinebase_Record_RecordSet('Voipmanager_Model_Template', $rows);
		
        return $result;
	}
    
    
	/**
	 * get Template by id
	 * 
     * @param string $_id
	 * @return Tinebase_Record_RecordSet of subtype Voipmanager_Model_Template
	 */
    public function getTemplateById($_templateId)
    {	
        $templateId = Voipmanager_Model_Template::convertTemplateIdToInt($_templateId);
        $select = $this->_db->select()->from(SQL_TABLE_PREFIX . 'snom_templates')->where($this->_db->quoteInto('id = ?', $templateId));
        $row = $this->_db->fetchRow($select);
        if (! $row) {
            throw new UnderflowException('template not found');
        }
#       	$result = new Tinebase_Record_RecordSet('Voipmanager_Model_Template', $row);
        $result = new Voipmanager_Model_Template($row);
        return $result;
	}
	   
    /**
     * add new template
     *
     * @param Voipmanager_Model_Template $_template the template data
     * @return Voipmanager_Model_Template
     */
    public function addTemplate (Voipmanager_Model_Template $_template)
    {
        if (! $_template->isValid()) {
            throw new Exception('invalid template');
        }

        if ( empty($_template->id) ) {
            $_template->setId(Tinebase_Record_Abstract::generateUID());
        }
        
        $template = $_template->toArray();
        
        $this->_db->insert(SQL_TABLE_PREFIX . 'snom_templates', $template);

        return $this->getTemplateById($_template->getId());
    }
    
    /**
     * update an existing template
     *
     * @param Voipmanager_Model_Template $_template the template data
     * @return Voipmanager_Model_Template
     */
    public function updateTemplate (Voipmanager_Model_Template $_template)
    {
        if (! $_template->isValid()) {
            throw new Exception('invalid template');
        }
        $templateId = $_template->getId();
        $templateData = $_template->toArray();
        unset($templateData['id']);

        $where = array($this->_db->quoteInto('id = ?', $templateId));
        $this->_db->update(SQL_TABLE_PREFIX . 'snom_templates', $templateData, $where);
        
        return $this->getTemplateById($templateId);
    }    
	
    
    /*
	 * get Lines
	 * 
     * @param string $_sort
     * @param string $_dir
	 * @return Tinebase_Record_RecordSet of subtype Voipmanager_Model_Line
	 */
    public function getAsteriskLines($_sort = 'id', $_dir = 'ASC', $_filter = NULL)
    {	
        $where = array();
        
        if(!empty($_filter)) {
            $_fields = "callerid,context,fullcontact,ipaddr";            
            $where = $this->_getSearchFilter($_filter, $_fields);
        }
        
        
        $select = $this->_db->select()
            ->from(array('voipmanager' => SQL_TABLE_PREFIX . 'asterisk_lines'), array(
                  'id',
                  'name',
                  'accountcode',
                  'amaflags',
                  'callgroup',
                  'callerid',
                  'canreinvite',
                  'context',
                  'defaultip',
                  'dtmfmode',
                  'fromuser',
                  'fromdomain',
                  'fullcontact',
                  'host',
                  'insecure',
                  'language',
                  'mailbox',
                  'md5secret',
                  'nat',
                  'deny',
                  'permit',
                  'mask',
                  'pickupgroup',
                  'port',
                  'qualify',
                  'restrictcid',
                  'rtptimeout',
                  'rtpholdtimeout',
                  'secret',
                  'type',
                  'username',
                  'disallow',
                  'allow',
                  'musiconhold',
                  'regseconds',
                  'ipaddr',
                  'regexten',
                  'cancallforward',
                  'setvar',
                  'notifyringing',
                  'useclientcode',
                  'authuser',
                  'call-limit',
                  'busy-level')
                  );

        $select->order($_sort.' '.$_dir);

        foreach($where as $whereStatement) {
            $select->where($whereStatement);
        }               
        //echo  $select->__toString();
       
        $stmt = $this->_db->query($select);

        $rows = $stmt->fetchAll(Zend_Db::FETCH_ASSOC);
        
       	$result = new Tinebase_Record_RecordSet('Voipmanager_Model_Line', $rows);
		
        return $result;
	}
    
    
	/**
	 * get Line by id
	 * 
     * @param string $_id
	 * @return Tinebase_Record_RecordSet of subtype Voipmanager_Model_Line
	 */
    public function getLineById($_lineId)
    {	
        $lineId = Voipmanager_Model_Line::convertLineIdToInt($_lineId);
        $select = $this->_db->select()->from(SQL_TABLE_PREFIX . 'asterisk_lines')->where($this->_db->quoteInto('id = ?', $lineId));
        $row = $this->_db->fetchRow($select);
        if (! $row) {
            throw new UnderflowException('line not found');
        }
#       	$result = new Tinebase_Record_RecordSet('Voipmanager_Model_Line', $row);
        $result = new Voipmanager_Model_Line($row);
        return $result;
	}
	   
    /**
     * add new line
     *
     * @param Voipmanager_Model_Line $_line the line data
     * @return Voipmanager_Model_Line
     */
    public function addLine (Voipmanager_Model_Line $_line)
    {
        if (! $_line->isValid()) {
            throw new Exception('invalid line');
        }

        if ( empty($_line->id) ) {
            $_line->setId(Tinebase_Record_Abstract::generateUID());
        }
        
        $line = $_line->toArray();
        
        $this->_db->insert(SQL_TABLE_PREFIX . 'asterisk_lines', $line);

        return $this->getLineById($_line->getId());
    }
    
    /**
     * update an existing line
     *
     * @param Voipmanager_Model_Line $_line the line data
     * @return Voipmanager_Model_Line
     */
    public function updateLine (Voipmanager_Model_Line $_line)
    {
        if (! $_line->isValid()) {
            throw new Exception('invalid line');
        }
        $lineId = $_line->getId();
        $lineData = $_line->toArray();
        unset($lineData['id']);

        $where = array($this->_db->quoteInto('id = ?', $lineId));
        $this->_db->update(SQL_TABLE_PREFIX . 'asterisk_lines', $lineData, $where);
        
        return $this->getLineById($lineId);
    }        
    
    
    
   /**
     * create search filter
     *
     * @param string $_filter
     * @param int $_leadstate
     * @param int $_probability
     * @param bool $_getClosedLeads
     * @return array
     */
    protected function _getSearchFilter($_filter, $_fields)
    {
        $where = array();
        if(!empty($_filter)) {
            $search_values = explode(" ", $_filter);
            
            $search_fields = explode(",", $_fields);
            foreach($search_fields AS $search_field) {
                $fields .= " OR " . $search_field . " LIKE ?";    
            }
            $fields = substr($fields,3);
        
            foreach($search_values AS $search_value) {
                $where[] = Zend_Registry::get('dbAdapter')->quoteInto('('.$fields.')', '%' . $search_value . '%');                            
            }
        }
        return $where;
    }    
   
}
