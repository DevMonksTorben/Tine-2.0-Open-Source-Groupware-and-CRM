<?php

/**
 * Supported-address-data property
 *
 * This property is a representation of the supported-address-data property
 * in the CardDAV namespace. 
 *
 * @package Sabre
 * @subpackage CardDAV
 * @copyright Copyright (C) 2007-2011 Rooftop Solutions. All rights reserved.
 * @author Evert Pot (http://www.rooftopsolutions.nl/) 
 * @license http://code.google.com/p/sabredav/wiki/License Modified BSD License
 */
class Sabre_CardDAV_Property_SupportedAddressData extends Sabre_DAV_Property {

    /**
     * supported version
     * 
     * @var string
     */
    protected $version;
    
    /**
     * Creates the property 
     * 
     * @param array $components 
     */
    public function __construct($version = '3.0') {

       $this->version = $version; 

    }
    
    /**
     * Serializes the property in a DOMDocument 
     * 
     * @param Sabre_DAV_Server $server 
     * @param DOMElement $node 
     * @return void
     */
    public function serialize(Sabre_DAV_Server $server,DOMElement $node) {

        $doc = $node->ownerDocument;

        $prefix = isset($server->xmlNamespaces[Sabre_CardDAV_Plugin::NS_CARDDAV])?$server->xmlNamespaces[Sabre_CardDAV_Plugin::NS_CARDDAV]:'card';

        $caldata = $doc->createElement($prefix . ':supported-address-data');
        $caldata->setAttribute('content-type','text/vcard');
        $caldata->setAttribute('version',$this->version);

        $node->appendChild($caldata); 
    }

}
