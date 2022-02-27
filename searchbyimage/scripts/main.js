const pixelmatch = require('pixelmatch');


console.log("Hello")

  function drawDataURIOnCanvas(strDataURI, canvas) {
    "use strict";
    var img = new window.Image();
    img.crossOrigin = 'anonymous'; 
    img.addEventListener("load", function () {
        canvas.width = img.width
        canvas.height = img.height
        canvas.getContext("2d").drawImage(img, 0, 0);
    });
    img.setAttribute("src", strDataURI);
  }

var images = document.getElementsByTagName('img')
console.log("OK")
console.log(images[0])

  document.body.prepend(document.createElement('canvas'));
  document.body.prepend(document.createElement('canvas'));
  document.body.prepend(document.createElement('canvas'));

  const canvases = [...document.querySelectorAll('canvas')]
  canvases.forEach(e => {e.width = e.height = 0})

  drawDataURIOnCanvas(images[0].src, canvases[0])

  drawDataURIOnCanvas(images[1].src, canvases[1])
  console.log("Drawn")
  const img1Ctx = canvases[0].getContext('2d')
  const img2Ctx = canvases[1].getContext('2d')
  const diffCtx = canvases[2].getContext('2d')
  const {width, height} = canvases[0]
  canvases[2].width = width
  canvases[2].height = height
  console.log("Contexts")
  const img1 = img1Ctx.getImageData(0, 0, width, height);
  console.log("First")
  const img2 = img2Ctx.getImageData(0, 0, width, height);
  console.log("Cmon")
  const diff = diffCtx.createImageData(width, height);
  console.log("A")
  pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1})
  console.log("B")

browser.runtime.onMessage.addListener((message) => {
    if (browser.runtime.lastError) {
    console.error(browser.runtime.lastError);
    }
    console.log("Got it")
    console.log(message.image)
    processImage(message.image)
})






