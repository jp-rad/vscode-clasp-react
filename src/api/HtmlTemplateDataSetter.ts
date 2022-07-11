/*

MIT License

Copyright (c) 2022 jp-rad

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

namespace HtmlTemplateDataSetter {

    interface HtmlTemplate extends GoogleAppsScript.HTML.HtmlTemplate {
        /**
         * Pushing data.
         * @param data the data pushing to HtmlTemplate.
         */
        setData(data: any): HtmlTemplate;
    }

    export function createTemplateFromFile(filename: string, data?: any): HtmlTemplate {
        const template = HtmlService.createTemplateFromFile(filename);
        template.setData = (data: any) => internal.pushToData(template, data);
        return data ? template.setData(data) : template;
    }

    export namespace internal {

        /**
         * Pushing Variable: `data`
         * https://developers.google.com/apps-script/guides/html/templates#pushing_variables_to_templates     
         */

        interface DataContainer {
            data: any;
        };

        const htmlTemplateDataContainerString = '<? try {?><?= data ?><? } catch {} ?>';

        export function pushToData(template: GoogleAppsScript.HTML.HtmlTemplate, data: any) {
            const container: DataContainer = { data };
            template.data = JSON.stringify(container);
            return template;
        }

        export function getFromData() {
            let container: DataContainer;
            try {
                container = JSON.parse(htmlTemplateDataContainerString);
            } catch (error) {
                container = { data: null, }
            }
            return container;
        }

        export const defaultValue: DataContainer = {
            data: null,
        }

    }

}

export default HtmlTemplateDataSetter;
