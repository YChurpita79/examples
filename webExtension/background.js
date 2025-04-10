/***********************************************************************************************************************
 * This is fetch servic
 *********************************************************************************************************************/

class HttpService {
    request = (route, method, body, formData = false, responseType, resolve) => {
        let requestHeaders;
        if (!formData) {
            requestHeaders = {'Content-Type': 'application/json'};
        }
        return fetch(route, {
            headers: {
                ...requestHeaders
            },
            method,
            body: formData ? body : body && JSON.stringify(body)
        })
            .then((res) => {

                if (res.status === 200 || res.status === 201) {
                    const rsdJson = responseType === 'text' ? res.text() : res.json();
                    if (typeof resolve === 'function') {
                        resolve({data: rsdJson, status: res.status});
                    }
                    return rsdJson;

                } else {
                    if (typeof resolve === 'function') {
                        resolve({status: res.status});
                    }
                    return res.status;
                }
            })

            .catch((error) => {
                if (typeof resolve === 'function') {
                    resolve({status: ' another mistake of sending'});
                }
            });
    };
};

const httpService = new HttpService();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.contentScriptQuery === 'getData') {
        const backendUrl = request.url;
        const data = request.data;
        const hostUrl = request.clientUrl;
        new Promise((resp, rej) => {
            const form = new FormData();
            form.append('text', data);
            form.append('host_url', hostUrl);
            httpService.request(backendUrl, 'POST', form, true, 'json', resp);

        }).then((res) => {
            console.log(res)
            sendResponse({data: res});
        });

        return true;
    }
});
