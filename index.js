function _loadExternalResources(url, entries) {
    const promises = entries.map(
        entry => this._loadExternalResource(url, entry));
    return Promise.all(promises);
}

function _loadExternalResource(url, entry) {
    return new Promise((resolve, reject) => {
        // What type of resource is it ?
        const match = entry.match(/\.([^.]+)$/);
        if (!match) return;
        const type = match[1];

        // Create the proper tag
        let tag;
        if (type === 'css') {
            tag = document.createElement("link");
            tag.type = 'text/css';
            tag.rel = 'stylesheet';
            tag.href = this._normalizeUrl(`${url}/${entry}`);
        }
        else if (type === "js") {
            tag = document.createElement("script");
            tag.type = "text/javascript";
            tag.src = this._normalizeUrl(`${url}/${entry}`);
        }

        if (tag) {
            tag.onload = function () { resolve(entry); };
            tag.onerror = function () { reject(entry); };
            document.getElementsByTagName("head")[0].appendChild(tag);
        }
    });
}