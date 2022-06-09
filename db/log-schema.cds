using { cuid } from '@sap/cds/common';

entity AppLog : cuid {
    message_id: String;
    message_type: String;
    message_param: String;
    virtual message_text: String;
}