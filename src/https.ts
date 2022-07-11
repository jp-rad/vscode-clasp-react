import HtmlTemplateDataSetter from './api/HtmlTemplateDataSetter';

function doGet(e: GoogleAppsScript.Events.DoGet) {
    Logger.log(e);
    const template = HtmlTemplateDataSetter.createTemplateFromFile('index');
    return template
        .setData(e) // pushing data.
        .evaluate()
        .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
        .setTitle("React App on Google Apps Script");
}
