<?php
/**
 * Tine 2.0 - http://www.tine20.org
 * 
 * @package     Tinebase
 * @license     http://www.gnu.org/licenses/agpl.html
 * @copyright   Copyright (c) 2010-2010 Metaways Infosystems GmbH (http://www.metaways.de)
 * @author      Lars Kneschke <l.kneschke@metaways.de>
 * @version     $Id$
 */

/**
 * Test helper
 */
require_once dirname(dirname(dirname(__FILE__))) . DIRECTORY_SEPARATOR . 'TestHelper.php';

if (!defined('PHPUnit_MAIN_METHOD')) {
    define('PHPUnit_MAIN_METHOD', 'Tinebase_WebDav_TreeTest::main');
}

/**
 * Test class for Tinebase_WebDav_Tree
 * 
 * @package     Tinebase
 */
class Tinebase_WebDav_TreeTest extends PHPUnit_Framework_TestCase
{
    /**
     * @var array test objects
     */
    protected $objects = array();

    /**
     * Tree
     *
     * @var Tinebase_WebDav_Tree
     */
    protected $_webdavTree;
    
    /**
     * Runs the test methods of this class.
     *
     * @access public
     * @static
     */
    public static function main()
    {
		$suite  = new PHPUnit_Framework_TestSuite('Tine 2.0 webdav tree tests');
        PHPUnit_TextUI_TestRunner::run($suite);
	}

    /**
     * Sets up the fixture.
     * This method is called before a test is executed.
     *
     * @access protected
     */
    protected function setUp()
    {
        $this->_webdavTree = new Tinebase_WebDav_Tree('/');
        
        $this->objects['nodes'] = array();
    }

    /**
     * Tears down the fixture
     * This method is called after a test is executed.
     *
     * @access protected
     */
    protected function tearDown()
    {
        foreach ($this->objects['nodes'] as $node) {
            $this->_rmDir($node);
        } 
    }
    
    protected function _rmDir($_node)
    {
        foreach ($_node->getChildren() as $child) {
            if ($child instanceof Filemanager_Frontend_WebDavFile) {
                $child->delete();
            } else {
                $this->_rmDir($child);
            }
        }
        $_node->delete();
    }
    
    public function testgetNodeForPath()
    {
        $node = $this->_webdavTree->getNodeForPath(null);
        
        $this->assertType('Tinebase_WebDav_Root', $node);
        
        $children = $node->getChildren();
        
        $this->assertEquals('dav', $children[0]->getName());
        
        $this->setExpectedException('Sabre_DAV_Exception_Forbidden');
        
        $node->delete();
    }
    
    public function testgetNodeForPath_dav()
    {
        $node = $this->_webdavTree->getNodeForPath('dav');
        
        $this->assertType('Tinebase_WebDav_Root', $node);
        $this->assertEquals('dav', $node->getName());
        
        $children = $node->getChildren();
        
        #var_dump($children);
        
        $this->assertType('Sabre_DAV_ICollection', $children[0]);
        
        $this->setExpectedException('Sabre_DAV_Exception_Forbidden');
        
        $node->delete();
    }
    
    public function testgetNodeForPath_dav_filemanager()
    {
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager');
        
        $this->assertType('Filemanager_Frontend_WebDav', $node);
        $this->assertEquals('filemanager', $node->getName());
        
        $children = $node->getChildren();
        
        $this->assertEquals(1, count($children));
        $this->assertType('Sabre_DAV_ICollection', $children[0]);
        
        $this->setExpectedException('Sabre_DAV_Exception_Forbidden');
        
        $node->delete();
    }
    
    public function testgetNodeForPath_dav_filemanager_shared()
    {
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared');
        
        $this->assertType('Filemanager_Frontend_WebDav', $node);
        $this->assertEquals('shared', $node->getName());
        
        $children = $node->getChildren();
        
        $this->setExpectedException('Sabre_DAV_Exception_Forbidden');
        
        $node->delete();
    }
    
    /**
     * 
     * @return Filemanager_Frontend_WebDavDirectory
     */
    public function testgetNodeForPath_dav_filemanager_shared_phpunit()
    {
        $this->testCreateDirectory();
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/phpunit');
        
        $this->assertType('Filemanager_Frontend_WebDavDirectory', $node);
        $this->assertEquals('phpunit', $node->getName());
        
        $children = $node->getChildren();
        
        return $node;
    }
    
    public function testgetNodeForPath_dav_filemanager_shared_phpunit_file()
    {
        $this->testCreateFile();
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/phpunit/tine_logo.png');
        
        $this->assertType('Filemanager_Frontend_WebDavFile', $node);
        $this->assertEquals('tine_logo.png', $node->getName());
    }
    
    /**
     * 
     * @return Filemanager_Frontend_WebDavDirectory
     */
    public function testCreateDirectory()
    {
        try {
            // remove file left over from broken test
            $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/phpunit');
            $node->delete();
        } catch (Sabre_DAV_Exception_FileNotFound $sdavefnf) {
            // do nothing
        }
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared');
        
        $node->createDirectory('phpunit');
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/phpunit');
        $this->objects['nodes'][] = $node;
        
        $this->assertType('Filemanager_Frontend_WebDavDirectory', $node);
        
        return $node;
    }
    
    public function testCreateFile()
    {
        try {
            // remove file left over from broken test
            $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/phpunit/tine_logo.png');
            $node->delete();
        } catch (Sabre_DAV_Exception_FileNotFound $sdavefnf) {
            // do nothing
        }
        
        $parent = $this->testCreateDirectory();
        
        $file = $parent->createFile('tine_logo.png', fopen(dirname(__FILE__) . '/../files/tine_logo.png', 'r'));
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/phpunit/tine_logo.png');
        
        $this->assertType('Filemanager_Frontend_WebDavFile', $node);
    }
    
    public function testUpdateFile()
    {
        try {
            // remove file left over from broken test
            $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/phpunit/tine_logo.png');
            $node->delete();
        } catch (Sabre_DAV_Exception_FileNotFound $sdavefnf) {
            // do nothing
        }
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/Lars');
        
        $file = $node->createFile('tine_logo.png', fopen(dirname(__FILE__) . '/../files/tine_logo.png', 'r'));
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/Lars/tine_logo.png');
        
        $node->put(fopen(dirname(__FILE__) . '/../files/tine_logo.png', 'r'));
        
        $this->assertType('Filemanager_Frontend_WebDavFile', $node);
        
        $node->delete();
    }
    
    public function testgetNodeForPath_invalidApplication()
    {
        $this->setExpectedException('Sabre_DAV_Exception_FileNotFound');
        
        $node = $this->_webdavTree->getNodeForPath('dav/invalidApplication');
    }
    
    public function testgetNodeForPath_invalidContainerType()
    {
        $this->setExpectedException('Sabre_DAV_Exception_FileNotFound');
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/invalidContainerType');
    }
    
    public function testgetNodeForPath_invalidFolder()
    {
        $this->setExpectedException('Sabre_DAV_Exception_FileNotFound');
        
        $node = $this->_webdavTree->getNodeForPath('dav/filemanager/shared/invalidContainer');
    }
    
    /**
     * @return Filemanager_Model_Directory
     */
    #public static function getTestRecord()
    #{
    #    $object  = new Tinebase_Model_Tree_Node(array(
    #        'name'     => 'PHPUnit test node',
    #    ), true); 
    #    
    #    return $object;
    #}
}		
	

if (PHPUnit_MAIN_METHOD == 'Tinebase_WebDav_TreeTest::main') {
    Tinebase_WebDav_TreeTest::main();
}