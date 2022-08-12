const cds = require("@sap/cds");
const TextBundle = require("@sap/textbundle").TextBundle;
//const i18nutils = require("@sap/cds/libx/common/i18n");
//const commonutils = require("@sap/cds/libx");

// let _i18n
// const i18n = (...args) => {
//   if (!_i18n) _i18n = require('@sap/cds/libx/common/i18n')
//   return _i18n(...args)
// }
// //const { getErrorMessage } = require('./utils')

module.exports = cds.service.impl(async function () {
    
    //Test: messages at application/ service level
    this.on("testLogTranslation", async (req) => {
      const logId = req.data.log_id;
      req.reject(400, 'ORDER_EXCEEDS_STOCK', [20, 10])
    });

    //Test: messges added in the application log
    this.after('READ', 'AppLog', (applogs, req) => {

      const locale = req.user.locale;
      const bundle = new TextBundle('../assets/i18n/messages', locale);

        applogs.forEach(applog => {
          params = applog.message_param.split(",");
          applog.message_text = bundle.getText(applog.message_id,params);         

          // try {
          //   const args = applog.message_param.split(',');
          //   const matches = applog.message_text.match(/\{[\w][\w]*\}/g) || []
          //   for (const match of matches) {
          //     const arg = args[match.slice(1, -1)]
          //     const argtext = arg //may be arg should also be translated
          //     applog.message_text = applog.message_text.replace(match, argtext || (arg != null ? arg : 'NULL'))
          // }
          // } catch (e) {
          //   console.log(e);
          // }
          //applog.message_text = 'my test';
        });      
      });

    // this.after('READ', 'AppLog', each => {

      
    //   // ***Using the text bundles apporach
    //       //const locale = req.user.locale;
    //     const locale = $user.locale;
    //     const bundle = new TextBundle('../assets/i18n/messages_en', locale);
    //     let text = bundle.getText('ORDER_EXCEEDS_STOCK');
    //     const args = [20, 10];

    //     try {
    //       const matches = text.match(/\{[\w][\w]*\}/g) || []
    //       for (const match of matches) {
    //         const arg = args[match.slice(1, -1)]
    //         const argtext = arg
    //         text = text.replace(match, argtext || (arg != null ? arg : 'NULL'))
    //       }
    //     } catch (e) {
    //       console.log(e);
    //     }        
    
    //     //each.log_text = '{i18n>ORDER_EXCEEDS_STOCK}';
    //     //each.log_text = `{i18n>${each.log_id}}`;
    //   });

})
