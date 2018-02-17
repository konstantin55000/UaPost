chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Handle message.
    // In this example, message === 'whatever value; String, object, whatever'
    console.log('address', message);
});