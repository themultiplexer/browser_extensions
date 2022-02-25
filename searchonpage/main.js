(function() {
  console.log("Hello")
  
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  
  var images = document.getElementsByTagName('img')
  console.log("OK")
  console.log(images.length)
  
  images[images.length-1].scrollIntoView()
  images[images.length-1].style.border = "2px solid red"
})();





