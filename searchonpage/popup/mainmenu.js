function listenForClicks() {
  document.addEventListener("click", (e) => {

        function reset(tabs) {
          browser.tabs.sendMessage(tabs[0].id, {
            command: "reset",
          });
        } 

        function reportError(error) {
          console.error(`Could not beastify: ${error}`);
        }

        browser.tabs.query({active: true, currentWindow: true}).then(reset).catch(reportError);
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.runtime.onMessage.addListener((message) => {
  alert(message.message + " " + message.count)
});

listenForClicks()

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
/*
browser.tabs.executeScript({
  code: `document.getElementById("chat").style.border = "5px solid red"`
}).catch(reportExecuteScriptError);
*/
//browser.tabs.executeScript({file: "/main.js"}).then(listenForClicks).catch(reportExecuteScriptError);