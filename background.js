console.log("background.js" + Date.now())


chrome.runtime.onMessage.addListener(
    function ({request, object}, sender, onSuccess) {
        console.log("receiving message")

        if (request === "REQUEST_DOWNLOAD") {

            console.log("i want to download")

            // fetch(object)
            //     .then(response => response.text())
            //     .then(responseText => onSuccess(responseText))
        }

        onSuccess("finished");
        // return Promise.resolve("finished");  // Will respond asynchronously.
    }
);