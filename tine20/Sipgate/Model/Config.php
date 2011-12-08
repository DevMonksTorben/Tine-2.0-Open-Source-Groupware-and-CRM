<?php
/**
 * Tine 2.0
 *
 * @package     Sipgate
 * @subpackage  Record
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @copyright   Copyright (c) 2009 Metaways Infosystems GmbH (http://www.metaways.de)
 * @author      Alexander Stintzing <alex@stintzing.net>
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
}
