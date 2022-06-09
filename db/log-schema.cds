using { cuid } from '@sap/cds/common';

entity AppLog : cuid {
    log_id: String;
    log_param: String;
    virtual log_text: String;
}