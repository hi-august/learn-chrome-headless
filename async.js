const CDP = require('chrome-remote-interface');

async function example() {
    try {
        // connect to endpoint
        var client = await CDP();
        // extract domains
        const {Network, Page} = client;
        // setup handlers
        Network.requestWillBeSent((params) => {
            console.log(params.request.url);
        });
        // enable events then start!
        await Promise.all([Network.enable(), Page.enable()]);
        await Page.navigate({url: 'https://github.com'});
        await Page.loadEventFired();
    } catch (err) {
        console.error(err);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

example();
