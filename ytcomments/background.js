console.log("Easy")
browser.runtime.onMessage.addListener((message) => {
  alert(message.message + " " + message.count)
});