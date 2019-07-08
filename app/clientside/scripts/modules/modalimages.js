  // Get the modal
  var modal = document.getElementById("myModal");
        
  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");
  
  function myFunc(el){
    var ImgSrc=el.src;
    var altText=el.alt;
    modal.style.display = "block";
    modalImg.src = ImgSrc;
    captionText.innerHTML = altText;
  }
  
  window.onclick=function(event)
  { if(event.target==modal)
    { modal.style.display="none";
  }
  }
  
  var span = document.getElementsByClassName("close")[0];
  