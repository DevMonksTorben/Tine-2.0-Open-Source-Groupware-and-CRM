<?php
/**
 * Tine 2.0
 * 
 * @package     Tinebase
 * @subpackage  Record
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @copyright   Copyright (c) 2007-2008 Metaways Infosystems GmbH (http://www.metaways.de)
 * @author      Cornelius Weiss <c.weiss@metaways.de>
 * @version     $Id$
 */

/**
 * Abstract implemetation of  Tinebase_Record_Interface
 * 
 * @package     Tinebase
 * @subpackage  Record
 */
abstract class Tinebase_Record_Abstract implements Tinebase_Record_Interface
{
	/**
     * should datas be validated on the fly(false) or only on demand(true)
     *
     * @var bool
     */
    public  $bypassFilters;
    
    /**
     * should datetimeFields be converted from iso8601 strings to ZendDate objects and back 
     *
     * @var bool
     */
    public  $convertDates;
    
    /**
     * key in $_validators/$_properties array for the filed which 
     * represents the identifier
     * NOTE: _Must_ be set by the derived classes!
     * 
     * @var string
     */
    protected $_identifier = NULL;
    
    /**
     * application the record belongs to
     * NOTE: _Must_ be set by the derived classes!
     *
     * @var string
     */
    protected $_application = NULL;
    
    /**
     * holds properties of record
     * 
     * @var array 
     */
    protected $_properties = array();
    
    /**
     * this filter get used when validating user generated content with Zend_Input_Filter
     *
     * @var array list of zend inputfilter
     */
    protected $_filters = array();
    
    /**
     * Defintion of properties. All properties of record _must_ be declared here!
     * This validators get used when validating user generated content with Zend_Input_Filter
     * NOTE: _Must_ be set by the derived classes!
     * 
     * @var array list of zend validator
     */
    protected $_validators = array();
    
    /**
     * the validators place there validation errors in this variable
     * 
     * @var array list of validation errors
     */
    protected $_validationErrors = array();
    
    /**
     * name of fields containing datetime or or an array of datetime
     * information
     *
     * @var array list of datetime fields
     */
    protected $_datetimeFields = array();
    
    /**
     * save state if data are validated
     *
     * @var bool
     */
    protected $_isValidated = false;
    
    /**
     * holds instance of Zend_Filter
     * 
     * @var Zend_Filter
     */
    protected $_Zend_Filter = NULL;
   
    /**
     * Default constructor
     * Constructs an object and sets its record related properties.
     * 
     * @todo what happens if not all properties in the datas are set?
     * The default values must also be set, even if no filtering is done!
     * 
     * @param mixed $_data
     * @param bool $bypassFilters sets {@see this->bypassFilters}
     * @param bool $convertDates sets {@see $this->convertDates}
     * @return void
     * @throws Tinebase_Record_Exception_DefinitionFailure
     */
    public function __construct($_data = NULL, $_bypassFilters = false, $_convertDates = true)
    {
        if ($this->_identifier === NULL) {
            throw new Tinebase_Record_Exception_DefinitionFailure('$this->_identifier is not declared');
        }
        
        $this->bypassFilters = (bool)$_bypassFilters;
        $this->convertDates = (bool)$_convertDates;

        if(is_array($_data)) {
            $this->setFromArray($_data);
        }
        
    }
    
    /**
     * sets identifier of record
     * 
     * @param int identifier
     * @return void
     */
    public function setId($_id)
    {
        // set internal state to "not validated"
        $this->_isValidated = false;
        
        if ($this->bypassFilters === true) {
            $this->_properties[$this->_identifier] = $_id;
        } else {
        	$this->__set($this->_identifier, $_id);
        }
    }
    
    /**
     * gets identifier of record
     * 
     * @return identifier
     */
    public function getId()
    {
    	if (! isset($this->_properties[$this->_identifier])) {
    		$this->setId(NULL);
    	}
    	return $this->_properties[$this->_identifier];
    }
    
    /**
     * gets application the records belongs to
     * 
     * @return string application
     */
    public function getApplication()
    {
    	return $this->_application;
    }
    
    /**
     * sets the record related properties from user generated input.
     * 
     * Input-filtering and validation by Zend_Filter_Input can enabled and disabled
     *
     * @param array $_data the new data to set
     * @throws Tinebase_Record_Exception_Validation when content contains invalid or missing data
     */
    public function setFromArray(array $_data)
    {
        if($this->convertDates === true) {
            $this->_convertISO8601ToZendDate($_data);
        }
        
        // set internal state to "not validated"
        $this->_isValidated = false;
        
        // make sure we run through the setters
        $bypassFilter = $this->bypassFilters;
        $this->bypassFilters = true;
        foreach ($_data as $key => $value) {
            if (array_key_exists ($key, $this->_validators)) {
            	$this->$key = $value;
            }
        }
        
        $this->bypassFilters = $bypassFilter;
        
        if ($this->bypassFilters !== true) {
            $this->isValid(true);
        }
    }
    
    /**
     * Sets timezone of $this->_datetimeFields
     * 
     * @see Zend_Date::setTimezone()
     * @param string $_timezone
     * @throws Tinebase_Record_Exception_Validation
     * @return void
     */
    public function setTimezone($_timezone)
    {
        foreach ($this->_datetimeFields as $field) {
            if (!isset($this->_properties[$field])) continue;
            
            if(!is_array($this->_properties[$field])) {
                $toConvert = array(&$this->_properties[$field]);
            } else {
                $toConvert = &$this->_properties[$field];
            }

            foreach ($toConvert as $field => &$value) {
                if (! $value instanceof Zend_Date) {
                    throw new Tinebase_Record_Exception_Validation($toConvert[$field] . 'must be an Zend_Date'); 
                }
                $value->setTimezone($_timezone);
            } 
        }
    }
    
    /**
     * returns array of fields with validation errors 
     *
     * @return array
     */
    public function getValidationErrors()
    {
        return $this->_validationErrors;
    }
    
    /**
     * returns array with record related properties 
     *
     * @return array
     */
    public function toArray()
    {
        $recordArray = $this->_properties;
        if ($this->convertDates === true) {
            $this->_convertZendDateToISO8601($recordArray);
        }
        return $recordArray;
    }
    
    /**
     * validate and filter the the internal data
     *
     * @param $_throwExceptionOnInvalidData
     * @return bool
     */
    public function isValid($_throwExceptionOnInvalidData=false)
    {
        if($this->_isValidated === false) {
            $inputFilter = $this->_getFilter();
            $inputFilter->setData($this->_properties);
            
            if ($inputFilter->isValid()) {
                // set $this->_properties with the filtered values
                $this->_properties = $inputFilter->getUnescaped();
                $this->_isValidated = true;
            } else {
                $this->_validationErrors = array();
                
                foreach($inputFilter->getMessages() as $fieldName => $errorMessage) {
                    //print_r($inputFilter->getMessages());
                    $this->_validationErrors[] = array(
                        'id'  => $fieldName,
                        'msg' => $errorMessage
                    );
                }
                if ($_throwExceptionOnInvalidData) {
                    $e = new Tinebase_Record_Exception_Validation('some fields ' . implode(',', array_keys($inputFilter->getMessages())) . ' have invalid content');
                    Zend_Registry::get('logger')->debug(__CLASS__ . ":\n" .
                        print_r($this->_validationErrors,true). $e);
                    throw $e;
                }
            }
        }
        
        return $this->_isValidated;
    }
    
    public function applyFilter()
    {
        $this->isValid(true);
        
    }
    /**
     * sets record related properties
     * 
     * @param string _name of property
     * @param mixed _value of property
     * @throws Tinebase_Record_Exception_NotDefined
     * @return void
     */
    public function __set($_name, $_value)
    {
        if (!array_key_exists ($_name, $this->_validators)) {
            throw new Tinebase_Record_Exception_NotDefined($_name . ' is no property of $this->_properties');
        }
        
        $this->_properties[$_name] = $_value;
        $this->_isValidated = false;
        
        if ($this->bypassFilters !== true) {
            $this->isValid(true);
        }
    }
    
    /**
     * checkes if an propertiy is set
     * 
     * @param string _name name of property
     * @return bool property is set or not
     */
    public function __isset($_name)
    {
        return isset($this->_properties[$_name]);
    }
    
    /**
     * gets record related properties
     * 
     * @param string _name of property
     * @throws Tinebase_Record_Exception_NotDefined
     * @return mixed value of property
     */
    public function __get($_name)
    {
        if (!array_key_exists ($_name, $this->_validators)) {
            throw new Tinebase_Record_Exception_NotDefined($_name . ' is no property of $this->_properties');
        }
        
        return $this->_properties[$_name];
    }
    
    /**
     * returns a Zend_Filter for the $_filters and $_validators of this record class.
     * we just create an instance of Filter if we really need it.
     * 
     * @return Zend_Filter
     */
    protected function _getFilter()
    {
        if ($this->_Zend_Filter == NULL) {
           $this->_Zend_Filter = new Zend_Filter_Input($this->_filters, $this->_validators);
        }
        return $this->_Zend_Filter;
    }
    
    /**
     * Converts Zend_Dates into ISO8601 representation
     *
     * @param array &$_toConvert
     * @return void
     */
    protected function _convertZendDateToISO8601(&$_toConvert)
    {
        foreach ($_toConvert as $field => &$value) {
            if ($value instanceof Zend_Date) {
                $_toConvert[$field] = $value->get(Zend_Date::ISO_8601);
            } elseif (is_array($value)) {
                $this->_convertZendDateToISO8601($value);
            }
        }
    }
    
    /**
     * Converts dates into Zend_Date representation
     *
     * @param array &$_data
     * @return void
     */
    protected function _convertISO8601ToZendDate(array &$_data)
    {
        foreach ($this->_datetimeFields as $field) {
            if (!isset($_data[$field]) || $_data[$field] instanceof Zend_Date) continue;
            
            if(is_array($_data[$field])) {
                foreach($_data[$field] as $dataKey => $dataValue) {
                	if ($dataValue instanceof Zend_Date) continue;
                    $_data[$field][$dataKey] =  (int)$dataValue == 0 ? NULL : new Zend_Date($dataValue, Zend_Date::ISO_8601);
                }
            } else {
                $_data[$field] = (int)$_data[$field] == 0 ? NULL : new Zend_Date($_data[$field], Zend_Date::ISO_8601);
            }
        }
    }
    
    /**
     * required by ArrayAccess interface
     */
    public function offsetExists($_offset)
    {
        return isset($this->_properties[$_offset]);
    }
    
    /**
     * required by ArrayAccess interface
     */
    public function offsetGet($_offset)
    {
        return $this->_properties[$_offset];
    }
    
    /**
     * required by ArrayAccess interface
     */
    public function offsetSet($_offset, $_value)
    {
        return $this->__set($_offset, $_value);
    }
    
    /**
     * required by ArrayAccess interface
     * @throws Tinebase_Record_Exception_NotAllowed
     */
    public function offsetUnset($_offset)
    {
        throw new Tinebase_Record_Exception_NotAllowed('Unsetting of properties is not allowed');
    }
    
    /**
     * required by IteratorAggregate interface
     */
    public function getIterator()
    {
        return new ArrayIterator($this->_properties);    
    }
    
    /**
     * returns a random 40-character hexadecimal number to be used as 
     * universal identifier (UID)
     * 
     * @return string 40-character hexadecimal number
     */
    public static function generateUID()
    {
        return sha1(mt_rand(). microtime());
    }
}