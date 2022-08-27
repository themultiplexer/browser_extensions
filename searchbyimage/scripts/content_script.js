browser.runtime.onMessage.addListener((message) => {
    /*
    var canvas = document.createElement('canvas');
    document.body.prepend(canvas)
    var image = new Image();
    image.addEventListener('load', () => {
      canvas.width = image.width
      canvas.height = image.height
      canvas.getContext('2d').drawImage(image, 0, 0)
    })
    image.src = message.command
    */
    
    var label = document.createElement("p")
    label.style.position = "absolute";
    label.style.top = "5px";
    label.style.left = "5px";
    label.innerHTML = message.diff
    label.style.color = "white"

    var img = document.querySelector("img[src='" + message.url.replace("https:", "") + "']")
    img.style.opacity = 0.5
    img.parentNode.appendChild(label)
});


let elementsArray = document.querySelectorAll("img");

elementsArray.forEach(function(elem) {
    elem.addEventListener("mouseover", function () {
      console.log("mousover")
    });
});
