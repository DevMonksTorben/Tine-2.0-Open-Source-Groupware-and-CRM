<?php
/**
 * Tine 2.0
 *
 * @package     Sipgate
 * @subpackage  Setup
 * @license     http://www.gnu.org/licenses/agpl.html AGPL3
 * @copyright   Copyright (c) 2011 Metaways Infosystems GmbH (http://www.metaways.de)
 * @author      Alexander Stintzing <alex@stintzing.net>
 */

/**
 * Sipgate updates for version 1.1
 *
 * @package     Sipgate
 * @subpackage  Setup
 */
class Sipgate_Setup_Update_Release1 extends Setup_Update_Abstract
{

    public function update_0() {

    }

    /**
     * update 0.1 -> 1.0
     */
    public function update_1()
    {
        $this->setApplicationVersion('Sipgate', '1.0');
    }

    /**
     * update 1.0 -> 1.1
     */
    public function update_2()
    {

        $schema = new Setup_Backend_Schema_Table_Xml('<table>
            <name>sipgate_lines</name>
            <version>0</version>
            <declaration>
                <field>
                    <name>id</name>
                    <type>text</type>
                    <length>40</length>
                    <notnull>true</notnull>
                </field>
                <field>
                    <name>uri_alias</name>
                    <type>text</type>
                    <length>256</length>
                </field>
                <field>
                    <name>sip_uri</name>
                    <type>text</type>
                    <length>256</length>
                </field>
                <field>
                    <name>e164_out</name>
                    <type>text</type>
                    <length>256</length>
                </field>
                <field>
                    <name>e164_in</name>
                    <type>text</type>
                    <length>256</length>
                </field>
                <field>
                    <name>tos</name>
                    <type>text</type>
                    <length>10</length>
                </field>
                <field>
                    <name>creation_time</name>
                    <type>datetime</type>
                </field>
            </declaration>
        </table>');

        $this->_backend->createTable($schema);

        // add index
        $index = new Setup_Backend_Schema_Index_Xml('<index>
                    <name>id</name>
                    <primary>true</primary>
                    <field>
                        <name>id</name>
                    </field>
                </index>');

        $this->_backend->addPrimaryKey('sipgate_lines',$index);

        $schema = new Setup_Backend_Schema_Table_Xml('<table>
            <name>sipgate_connections</name>
            <version>0</version>
            <declaration>
                <field>
                    <name>id</name>
                    <type>text</type>
                    <length>40</length>
                    <notnull>true</notnull>
                </field>
                <field>
                    <name>tos</name>
                    <type>text</type>
                    <length>10</length>
                    <notnull>true</notnull>
                </field>
                <field>
                    <name>source_uri</name>
                    <type>text</type>
                    <length>256</length>
                </field>
                <field>
                    <name>target_uri</name>
                    <type>text</type>
                    <length>256</length>
                </field>
                <field>
                    <name>line_id</name>
                    <type>text</type>
                    <length>40</length>
                </field>
                <field>
                    <name>timestamp</name>
                    <type>datetime</type>
                </field>
                <field>
                    <name>creation_time</name>
                    <type>datetime</type>
                </field>
                <field>
                    <name>tarif</name>
                    <type>text</type>
                    <length>256</length>
                </field>
                <field>
                    <name>duration</name>
                    <type>integer</type>
                </field>
                <field>
                    <name>units_charged</name>
                    <type>integer</type>
                </field>
                <field>
                    <name>contact_id</name>
                    <type>text</type>
                    <length>40</length>
                </field>

            </declaration>
        </table>');

        $this->_backend->createTable($schema);

        $this->_backend->addPrimaryKey('sipgate_connections',$index);

        $index = new Setup_Backend_Schema_Index_Xml('<index>
                    <name>timestamp</name>
                    <field>
                        <name>timestamp</name>
                    </field>
                </index>');

        $this->_backend->addIndex('sipgate_connections',$index);

         $index = new Setup_Backend_Schema_Index_Xml('<index>
                    <name>sipgate_connection::contact_id--addressbook::id</name>
                    <field>
                        <name>contact_id</name>
                    </field>
                    <foreign>true</foreign>
                    <reference>
                        <table>addressbook</table>
                        <field>id</field>
                    </reference>
                </index>');

        $this->_backend->addForeignKey('sipgate_connections', $index);

        $index = new Setup_Backend_Schema_Index_Xml('
                <index>
                    <name>sipgate_connection::line_id--sipgate_lines::id</name>
                    <field>
                        <name>line_id</name>
                    </field>
                    <foreign>true</foreign>
                    <reference>
                        <table>sipgate_lines</table>
                        <field>id</field>
                    </reference>
                </index>');

        $this->_backend->addForeignKey('sipgate_connections', $index);


        $this->validateTableVersion('sipgate_lines', '0');
        $this->validateTableVersion('sipgate_connections', '0');

        $this->setTableVersion('sipgate_lines', '0');
        $this->setTableVersion('sipgate_connections', '0');

        $this->setApplicationVersion('Sipgate', '1.1');
    }
}
