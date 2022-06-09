using { AppLog as AL } from '../db/log-schema';


service ApplicationLog {
    entity AppLog as projection on AL;
    function testLogTranslation(log_id:String) returns String;
}