<?php
/**
 * Tine 2.0
 *
 * @package     Sipgate
 * @license     http://www.gnu.org/licenses/agpl.html AGPL3
 * @author      Alexander Stintzing <alex@stintzing.net>
 * @copyright   Copyright (c) 2011 Metaways Infosystems GmbH (http://www.metaways.de)
 * @version     $Id: Controller.php 26 2011-05-03 01:42:01Z alex $
 *
 */

/**
 * controller class for the Sipgate application
 *
 * @package     Sipgate
 */
class Sipgate_Controller extends Tinebase_Controller_Abstract
{
        /**
         * call backend type
         *
         * @var string
         */
        protected $_callBackendType = NULL;

        /**
         * Application name
         * @var string
         */
        protected $_applicationName = NULL;

        /**
         * Holds the Preferences
         * @var Sipgate_Preference
         */
        protected $_pref = NULL;

        /**
         * the constructor
         *
         * don't use the constructor. use the singleton
         */
        private function __construct() {
                $this->_applicationName = 'Sipgate';
                $this->_pref = new Sipgate_Preference();
        }

        /**
         * don't clone. Use the singleton.
         *
         */
        private function __clone() {
        }

        /**
         * holds the instance of the singleton
         *
         * @var Sipgate_Controller
         */
        private static $_instance = NULL;

        /**
         * the singleton pattern
         *
         * @return Sipgate_Controller
         */
        public static function getInstance()
        {
                if (self::$_instance === NULL) {
                        self::$_instance = new Sipgate_Controller();
                }

                return self::$_instance;
        }

        /**
         * dial number
         *
         * @param   int $_callee
         * @return  mixed
         */
        public function dialNumber($_callee)
        {
                $caller = $this->_pref->{'phoneId'};

                $backend = Sipgate_Backend_Factory::factory();

                if (Tinebase_Core::isLogLevel(Zend_Log::DEBUG)) Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__
                  . ' Dialing number ' . $_callee . ' with phone id ' . $caller);

                return $backend->dialNumber($caller, $_callee);
        }

        /**
         * gets the Session Status by an Id
         * @param string $sessionId
         */
        public function getSessionStatus($sessionId) {
                if(empty($sessionId)) throw new Sipgate_Exception('No Session-Id in Controller submitted!');
                $backend = Sipgate_Backend_Factory::factory();
                return $backend->getSessionStatus($sessionId);
        }

        /**
         * Closes the Session by an Id
         * @param string $sessionId
         */
        public function closeSession($sessionId) {
                if(empty($sessionId)) throw new Sipgate_Exception('No Session-Id in Controller submitted!');
                $backend = Sipgate_Backend_Factory::factory();
                return $backend->closeSession($sessionId);
        }

        /**
         *
         * Gets the devices
         */
        public function getAllDevices() {
                $backend = Sipgate_Backend_Factory::factory();
                return $backend->getAllDevices();
        }

        /**
         * Gets the Phones
         *
         * @return array
         */
        public function getPhoneDevices() {
                $backend = Sipgate_Backend_Factory::factory();

                if (Tinebase_Core::isLogLevel(Zend_Log::DEBUG)) Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__
          . ' Getting sipgate phones.');

                $result = $backend->getPhoneDevices();

                if (Tinebase_Core::isLogLevel(Zend_Log::TRACE)) Tinebase_Core::getLogger()->trace(__METHOD__ . '::' . __LINE__ . ' ' . print_r($result, TRUE));

                return $result;
        }

        /**
         *
         * Gets the Faxes
         */
        public function getFaxDevices() {
                $backend = Sipgate_Backend_Factory::factory();
                return $backend->getFaxDevices();
        }

        /**
         * Gets the CallHistory of the specified sipUri
         *
         * @param String $_sipUri
         */

        public function getCallHistory($_sipUri, $_start, $_stop, $_pstart, $_plimit) {

                return Sipgate_Backend_Factory::factory()->getCallHistory($_sipUri, $_start, $_stop, $_pstart, $_plimit);
        }


        /**
         * send SMS
         *
         * @param   string $_number
         * @param   string $_content
         */
        public function sendSms($_number,$_content)
        {
                $_sender = $this->_pref->getValue('mobileNumber');
                $backend = Sipgate_Backend_Factory::factory();
                return $backend->sendSms($_sender, $_number, $_content);
        }

   /**
     * Returns settings for crm app
     * - result is cached
     *
     * @param boolean $_resolve if some values should be resolved (here yet unused)
     * @return  Sipgate_Model_Config
     *
     * @todo check 'endslead' values
     * @todo generalize this / adopt Tinebase_Controller_Abstract::getConfigSettings()
     */
    public function getConfigSettings($_resolve = FALSE)
    {
        $cache = Tinebase_Core::get('cache');
        $cacheId = convertCacheId('getSipgateSettings');
        $result = $cache->load($cacheId);

        if (! $result) {

            $translate = Tinebase_Translation::getTranslation('Sipgate');

            $result = new Sipgate_Model_Config(array(
                'defaults' => parent::getConfigSettings()
            ));

            $others = array(
                Crm_Model_Config::LEADTYPES => array(
                    array('id' => 1, 'leadtype' => $translate->_('Customer')),
                    array('id' => 2, 'leadtype' => $translate->_('Partner')),
                    array('id' => 3, 'leadtype' => $translate->_('Reseller')),
                ),
                Crm_Model_Config::LEADSTATES => array(
                    array('id' => 1, 'leadstate' => $translate->_('open'),                  'probability' => 0,     'endslead' => 0),
                    array('id' => 2, 'leadstate' => $translate->_('contacted'),             'probability' => 10,    'endslead' => 0),
                    array('id' => 3, 'leadstate' => $translate->_('waiting for feedback'),  'probability' => 30,    'endslead' => 0),
                    array('id' => 4, 'leadstate' => $translate->_('quote sent'),            'probability' => 50,    'endslead' => 0),
                    array('id' => 5, 'leadstate' => $translate->_('accepted'),              'probability' => 100,   'endslead' => 1),
                    array('id' => 6, 'leadstate' => $translate->_('lost'),                  'probability' => 0,     'endslead' => 1),
                ),
                Crm_Model_Config::LEADSOURCES => array(
                    array('id' => 1, 'leadsource' => $translate->_('Market')),
                    array('id' => 2, 'leadsource' => $translate->_('Email')),
                    array('id' => 3, 'leadsource' => $translate->_('Telephone')),
                    array('id' => 4, 'leadsource' => $translate->_('Website')),
                )
            );
            foreach ($others as $setting => $defaults) {
                $result->$setting = Tinebase_Config::getInstance()->getConfigAsArray($setting, $this->_applicationName, $defaults);
            }

            // save result and tag it with 'settings'
            $cache->save($result, $cacheId, array('settings'));
        }

        return $result;
    }

    /**
     * save crm settings
     *
     * @param Crm_Model_Config $_settings
     * @return Crm_Model_Config
     *
     * @todo generalize this
     */
    public function saveConfigSettings($_settings)
    {
//          die(var_dump($_settings));

//        if (Tinebase_Core::isLogLevel(Zend_Log::DEBUG)) Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ . ' Updating Crm Settings: ' . print_r($_settings->toArray(), TRUE));
//
        foreach ($_settings->toArray() as $field => $value) {
//            var_dump($field);
//        }
//            if ($field == 'id') {
//                continue;
//            } else if ($field == 'defaults') {
//                parent::saveConfigSettings($value);
//            } else {
                Tinebase_Config::getInstance()->setConfigForApplication($field, Zend_Json::encode($value), $this->_applicationName);
//            }
//        }
//
//        // invalidate cache
//        Tinebase_Core::get('cache')->clean(Zend_Cache::CLEANING_MODE_MATCHING_TAG, array('settings'));
//
        return $this->getConfigSettings();
    }
    }

}
