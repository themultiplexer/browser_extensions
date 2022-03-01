const pixelmatch = require('pixelmatch');

async function loadImage(url, elem) {
  return new Promise((resolve, reject) => {
    elem.onload = () => resolve(elem);
    elem.onerror = reject;
    elem.src = url;
  });
}

var ref = document.createElement('canvas');
ref.width = 128;
ref.height = 128;
document.body.appendChild(ref)

var image = new Image();
image.addEventListener('load', () => {
  ref.width = image.width
  ref.height = image.height
  ref.getContext('2d').drawImage(image, 0, 0)
})
image.src = 'data:image/jpeg;base64,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';


var diffCanvas = document.createElement('canvas');
diffCanvas.width = 128;
diffCanvas.height = 128;
document.body.appendChild(diffCanvas)

function listener(details) {
   
  var canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  document.body.appendChild(canvas)

  let filter = browser.webRequest.filterResponseData(details.requestId);

  filter.ondata = async event => {

    var b64image = 'data:image/jpeg;base64,' + btoa(String.fromCharCode(...new Uint8Array(event.data)))

    //canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    var imageElem = new Image();
    await loadImage(b64image, imageElem)

    canvas.width = imageElem.width
    canvas.height = imageElem.height
    canvas.getContext('2d').drawImage(imageElem, 0, 0)

    var img1Ctx = canvas.getContext('2d')
    var img2Ctx = ref.getContext('2d')
    var diffCtx = diffCanvas.getContext('2d')
    var {width, height} = canvas
    var img1 = img1Ctx.getImageData(0, 0, width, height)
    var img2 = img2Ctx.getImageData(0, 0, width, height)
    var diff = diffCtx.createImageData(width, height)
    var diffCount = pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1})
    console.log(diffCount)

    diffCanvas.toBlob(function(blob){

      function reset(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
          command: URL.createObjectURL(blob),
          url: details.url,
          diff: diffCount
        });
      } 
  
      function reportError(error) {
        console.error(`Could not beastify: ${error}`);
      }
  
      browser.tabs.query({active: true, currentWindow: true}).then(reset).catch(reportError);
  
    },'image/png');

    diffCtx.putImageData(diff, 0, 0)
    const hasPixels = diffCtx.getImageData(0, 0, width, height).data.some(d => !!d);


    //var enc = new TextEncoder();
    //filter.write(enc.encode(canvas.toDataURL('image/jpeg').replace("data:image/jpeg;base64,", "")).buffer)
    filter.write(event.data)
    filter.close();
  }

  filter.onstop = event => {


    //filter.close();
  }

  return {};
}

console.log("WTFTTFTF")

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: ["https://pr0gramm.com/*", "https://thumb.pr0gramm.com/*"], types: ["image"]},
  ["blocking"]
);