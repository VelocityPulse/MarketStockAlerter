


new Promise((resolve, reject) => {
    onOpen().then();
    resolve(null);
}).then((value => {
    console.log("onOpen finished")
}));


async function onOpen() {

    const shouldUpdate = await shouldUpdateCheck();

    console.log("should update:" + shouldUpdate);

    if (shouldUpdate || true) {

        const url = "https://www.nasdaqtrader.com/dynamic/symdir/nasdaqlisted.txt"

        console.log("send message")
        await chrome.runtime.sendMessage({request: "REQUEST_DOWNLOAD", url: url},
            function (response) {
                console.log("send callback: " + response);
            });

                // fetch('http://www.nasdaqtrader.com/dynamic/symdir/nasdaqlisted.txt')
                //     .then(resp => resp.blob())
                //     .then(blob => {
                //         const url = window.URL.createObjectURL(blob);
                //         const a = document.createElement('a');
                //         a.style.display = 'none';
                //         a.href = url;
                //         // the filename you want
                //         a.download = 'todo-1.json';
                //         document.body.appendChild(a);
                //         a.click();
                //         window.URL.revokeObjectURL(url);
                //         alert('your file has downloaded!'); // or you know, something with better UX...
                //     })
                //     .catch(() => alert('oh no!'));
    }
}

async function shouldUpdateCheck() {
    const date = new Date(/*2021, 5, 20*/); // comment used for debug

    // source for promise : https://stackoverflow.com/a/58491883/5384689
    const items = await new Promise(resolve => {
        chrome.storage.local.get(['todayDay'], items => resolve(items));
    });

    const todayDay = items["todayDay"];

    if (date.getDay() !== parseInt(todayDay)) { // Should update because the saved day is not today

        chrome.storage.local.set({todayDay: date.getDay()}, () => {
            console.log("day " + date.getDay() + " stored");
        })

        return true;
    }
    return false;
}