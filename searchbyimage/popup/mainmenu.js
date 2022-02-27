console.log("loaded")
var idbFileStorage = require("idb-file-storage")

var image;

async function getStoredData(filename) {
  try {
    const tmpFiles = await idbFileStorage.getFileStorage({
      name: "tmpFiles"
    });
    const storedData = await tmpFiles.get(filename);

    if (storedData instanceof File) {
      var img = document.querySelector('img');
      img.onload = () => {
          URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }
      img.src = URL.createObjectURL(storedData);
      image = storedData
    } else {
      // No data
    }
  } catch (err) {
    console.error("Get stored data", err);
    throw err;
  }
}


getStoredData("temp.png")

document.querySelector('#select').addEventListener("click", (e) => {

  let createData = {
    type: "detached_panel",
    url: "/selector/panel.html",
    width: 500,
    height: 500
  };
  let creating = browser.windows.create(createData);
  
});

document.querySelector('#run').addEventListener("click", (e) => {

  console.log(image)

  function reset(tabs) {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "reload", message: "bruh", image: URL.createObjectURL(image)
    });
  } 

  function reportError(error) {
    console.error(`Could not beastify: ${error}`);
  }

  browser.tabs.query({active: true, currentWindow: true}).then(reset).catch(reportError);
  
});