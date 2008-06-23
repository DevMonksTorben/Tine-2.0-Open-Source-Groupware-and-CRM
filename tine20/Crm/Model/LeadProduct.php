<?php
/**
 * class to hold product data
 * 
 * @package     Crm
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Thomas Wadewitz <t.wadewitz@metaways.de>
 * @copyright   Copyright (c) 2007-2008 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id$
 *
 */

/**
 * class to hold product data linked to leads
 * 
 * @package     Crm
 */
class Crm_Model_LeadProduct extends Tinebase_Record_Abstract
{
    /**
     * key in $_validators/$_properties array for the filed which 
     * represents the identifier
     * 
     * @var string
     */    
    protected $_identifier = 'id';
    
    /**
     * application the record belongs to
     *
     * @var string
     */
    protected $_application = 'Crm';
    
    /**
     * list of zend inputfilter
     * 
     * this filter get used when validating user generated content with Zend_Input_Filter
     *
     * @var array
     */
    protected $_filters = array(
        '*'                     => 'StringTrim'
    );
    
    /**
     * list of zend validator
     * 
     * this validators get used when validating user generated content with Zend_Input_Filter
     *
     * @var array
     */
    protected $_validators = array(
        'id' 				    => array(Zend_Filter_Input::ALLOW_EMPTY => true, Zend_Filter_Input::DEFAULT_VALUE => NULL),
        'lead_id'               => array(Zend_Filter_Input::ALLOW_EMPTY => false, 'presence' => 'required'),
		'product_id'            => array(Zend_Filter_Input::ALLOW_EMPTY => false, 'presence' => 'required'),
		'product_desc'          => array(Zend_Filter_Input::ALLOW_EMPTY => true),
		'product_price'         => array(Zend_Filter_Input::ALLOW_EMPTY => true)
    );

}