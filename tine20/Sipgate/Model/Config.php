<?php
/**
 * Tine 2.0
 *
 * @package     Sipgate
 * @subpackage  Record
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @copyright   Copyright (c) 2009 Metaways Infosystems GmbH (http://www.metaways.de)
 * @author      Philipp Schuele <p.schuele@metaways.de>
 *
 * TODO         generalize this (by adding more generic fields)
 */

/**
 * class Sipgate_Model_Config
 *
 * @package     Sipgate
 * @subpackage  Record
 */
class Sipgate_Model_Config extends Tinebase_Record_Abstract
{
    /**
     * username config
     *
     * @var string
     */
    const USERNAME = 'username';

    /**
     * password config
     *
     * @var string
     */
    const PASSWORD = 'password';

    /**
     * accounttype config
     *
     * @var string
     */
    const ACCOUNTTYPE = 'accounttype';

    /**
     * identifier
     *
     * @var string
     */
    protected $_identifier = 'id';

    /**
     * application the record belongs to
     *
     * @var string
     */
    protected $_application = 'Sipgate';

    /**
     * record validators
     *
     * @var array
     */
    protected $_validators = array(
        'id'                => array('allowEmpty' => true ),
        'username'        => array('allowEmpty' => true ),
        'password'         => array('allowEmpty' => true ),
        'accounttype'       => array('allowEmpty' => true ),
    );

//    /**
//     * get an array in a multidimensional array by its property
//     *
//     * @param array $_id
//     * @param string $_property
//     * @return array
//     *
//     * @todo add to generic config/settings model
//     */
//    public function getOptionById($_id, $_property, $_idProperty = 'id')
//    {
//        if ($this->has($_property) && isset($this->$_property) && is_array($this->$_property)) {
//            foreach ($this->$_property as $sub) {
//                if (array_key_exists($_idProperty, $sub) && $sub[$_idProperty] == $_id) {
//                    return $sub;
//                }
//            }
//        }
//
//        return array();
//    }
//
//    /**
//     * get an array of leadstates with property endslead set to 1
//     *
//     * @param bool $_onlyIds
//     * @return array
//     */
//    public function getEndedLeadstates($_onlyIds = FALSE) {
//        $result = array();
//        foreach($this->leadstates as $leadstate) {
//            if ($leadstate['endslead']) {
//                $result[] = $_onlyIds ? $leadstate['id'] : $leadstate;
//            }
//        }
//
//        return $result;
//    }

} // end of Sipgate_Model_Config
