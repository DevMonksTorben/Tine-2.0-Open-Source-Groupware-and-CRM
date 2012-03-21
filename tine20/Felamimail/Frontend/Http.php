<?php
/**
 * backend class for Tinebase_Http_Server
 *
 * This class handles all Http requests for the felamimail application
 *
 * @package     Felamimail
 * @license     http://www.gnu.org/licenses/agpl.html AGPL Version 3
 * @author      Lars Kneschke <l.kneschke@metaways.de>
 * @copyright   Copyright (c) 2007-2011 Metaways Infosystems GmbH (http://www.metaways.de)
 *
 */
class Felamimail_Frontend_Http extends Tinebase_Frontend_Http_Abstract
{
    /**
     * app name
     *
     * @var string
     */
    protected $_applicationName = 'Felamimail';
    

    /**
     * download email attachment
     *
     * @param  string  $messageId
     * @param  string  $partId
     */
    public function downloadAttachment($messageId, $partId)
    {
        if (Tinebase_Core::isLogLevel(Zend_Log::DEBUG)) Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ 
            . ' Downloading Attachment ' . $partId . ' of message with id ' . $messageId
        );
        
        $messages = explode(',',$messageId);
        
        $this->_downloadMessagePart($messages, $partId);
    }

    /**
     * download message
     *
     * @param  string  $messageId
     * @param  string  $filter
     */
    public function downloadMessage($messageId,$filter)
    {
        if (Tinebase_Core::isLogLevel(Zend_Log::DEBUG)) Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ . ' Downloading Message ' . $messageId);
        if($filter){
            $filterData = Zend_Json::decode($filter);
            $filter = new Felamimail_Model_MessageFilter(array());
            $filter->setFromArrayInUsersTimezone($filterData);
            $messages = Felamimail_Controller_Cache_Message::getInstance()->getMessageIdsFromFilter($filter);
        }else{
            $messages = explode(',',$messageId);
        }
       $this->_downloadMessagePart($messages);
    }
    
    /**
     * download message part
     * 
     * @param string $_messageId
     * @param string $_partId
     */
    protected function _downloadMessagePart($_messageId, $_partId = NULL)
    {
        $oldMaxExcecutionTime = Tinebase_Core::setExecutionLifeTime(0);
        
        try {
            if(count($_messageId) == 1){
                $part = Felamimail_Controller_Message::getInstance()->getMessagePart($_messageId[0], $_partId);
                if ($part instanceof Zend_Mime_Part) {
                        $filename = (! empty($part->filename)) ? $part->filename : $_messageId[0] . '.eml';
                        $contentType = ($_partId === NULL) ? Felamimail_Model_Message::CONTENT_TYPE_MESSAGE_RFC822 : $part->type;

                        if (Tinebase_Core::isLogLevel(Zend_Log::DEBUG)) Tinebase_Core::getLogger()->debug(__METHOD__ . '::' . __LINE__ . ' '
                            . ' filename: ' . $filename 
                            . ' content type' . $contentType 
                            //. print_r($part, TRUE)
                            //. ' ' . stream_get_contents($part->getDecodedStream())
                        );

                        // cache for 3600 seconds
                        $maxAge = 3600;
                        header('Cache-Control: private, max-age=' . $maxAge);
                        header("Expires: " . gmdate('D, d M Y H:i:s', Tinebase_DateTime::now()->addSecond($maxAge)->getTimestamp()) . " GMT");

                        // overwrite Pragma header from session
                        header("Pragma: cache");

                        header('Content-Disposition: attachment; filename="' . $filename . '"');
                        header("Content-Type: " . $contentType);
                        $stream = ($_partId === NULL) ? $part->getRawStream() : $part->getDecodedStream();
                        fpassthru($stream);
                        fclose($stream);
                }
            }else{
                $ZIPfile = new ZipArchive();
                $tmpFile = tempnam(Tinebase_Core::getTempDir(), 'tine20_');
                if ($ZIPfile->open($tmpFile) === TRUE) {
                    foreach($_messageId as $messageID){
                        $part = Felamimail_Controller_Message::getInstance()->getRawMessage($messageID);
                        $filename = $messageID . '.eml';
                        $ZIPfile->addFromString($filename, $part);
                    }
                    $ZIPfile->close();
                }
                $maxAge = 3600;
                header('Cache-Control: private, max-age=' . $maxAge);
                header("Expires: " . gmdate('D, d M Y H:i:s', Tinebase_DateTime::now()->addSecond($maxAge)->getTimestamp()) . " GMT");
                // overwrite Pragma header from session
                header("Pragma: cache");
                header('Content-Disposition: attachment; filename="menssagens.zip"');
                header("Content-Type: application/zip");
                
                $stream = fopen($tmpFile, 'r');
                fpassthru($stream);
                fclose($stream);
                unlink($tmpFile);
            }
        } catch (Exception $e) {
            Tinebase_Core::getLogger()->warn(__METHOD__ . '::' . __LINE__ . ' Failed to get message part: ' . $e->getMessage());
        }
        
        Tinebase_Core::setExecutionLifeTime($oldMaxExcecutionTime);
        
        exit;
    }
}
