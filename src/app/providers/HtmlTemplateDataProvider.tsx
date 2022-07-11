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

import React, { createContext, useContext } from 'react';
import HtmlTemplateDataSetter from '../../api/HtmlTemplateDataSetter';

const HtmlTemplateDataContext = createContext(HtmlTemplateDataSetter.internal.defaultValue);

/**
 * Accepts data pushed on the server side of Google Apps Script.
 * @param defaultData Default data
 * @returns Pushed data or defaultData
 */
export function useData<T = undefined>(defaultData?: T) {
    const { data } = useContext(HtmlTemplateDataContext);
    return defaultData ? { data: data ? data as T : defaultData, } : { data: data as T, };
}

function HtmlTemplateDataProvider({ children }) {
    const dataContainer = HtmlTemplateDataSetter.internal.getFromData();
    return (
        <HtmlTemplateDataContext.Provider value={dataContainer}>
            {children}
        </HtmlTemplateDataContext.Provider>
    );
}

export default HtmlTemplateDataProvider;
