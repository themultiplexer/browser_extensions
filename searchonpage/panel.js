async function storeFile(filename, file) {
    try {
      const tmpFiles = await IDBFiles.getFileStorage({
        name: "tmpFiles"
      });
      await tmpFiles.put(filename, file);
    } catch (err) {
      console.error("File storing error", err);
      throw err;
    }
  }
  
  async function getStoredData(filename) {
    try {
      const tmpFiles = await IDBFiles.getFileStorage({
        name: "tmpFiles"
      });
      const storedData = await tmpFiles.get(filename);
  
      if (storedData instanceof File) {
        var img = document.querySelector('img');
        img.onload = () => {
            URL.revokeObjectURL(img.src);  // no longer needed, free memory
        }
        img.src = URL.createObjectURL(storedData);
      } else {
        // No data
      }
    } catch (err) {
      console.error("Get stored data", err);
      throw err;
    }
  }

  function saveImage(files){
    var img = document.querySelector('img');
    img.onload = () => {
        URL.revokeObjectURL(img.src); 
    }
    storeFile("temp.png", files[0])
    console.log("Stored file")
    img.src = URL.createObjectURL(files[0]); 
  }


  document.querySelector('input[type="file"]').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        console.log("Found file")
        saveImage(this.files)
    }
  });

  var dropContainer = document.getElementById("dropContainer")

  dropContainer.ondragover = dropContainer.ondragenter = function(evt) {
    evt.preventDefault();
  };
  
  dropContainer.ondrop = function(evt) {
    fileInput.files = evt.dataTransfer.files;
    saveImage(evt.dataTransfer.files)
    evt.preventDefault();
  };

  getStoredData("temp.png")