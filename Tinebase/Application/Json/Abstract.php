<?php
/**
 * Tine 2.0
 * 
 * @package     Tinebase
 * @subpackage  Application
 * @license     http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 * @copyright   Copyright (c) 2007-2008 Metaways Infosystems GmbH (http://www.metaways.de)
 * @author      Cornelius Weiss <c.weiss@metaways.de>
 * @version     $Id$
 */


/**
 * Abstract class for an Tine 2.0 application with Json interface
 * Each tine application must extend this class to gain an native tine 2.0 user
 * interface.
 * 
 * @package     Tinebase
 * @subpackage  Application
 */
abstract class Tinebase_Application_Json_Abstract extends Tinebase_Application_Abstract implements Tinebase_Application_Json_Interface
{

}
