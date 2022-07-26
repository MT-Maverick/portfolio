function openNav(){
    document.getElementById("myNav").style.width ="100%";
}

function closeNav(){
    document.getElementById("myNav").style.width="0%";
}


//For slides:
let slideIndex =0;
Slides();

function Slides(){
 let i;
 let slides = document.getElementsByClassName("mySlides");
 let dots = document.getElementsByClassName("dot");
 
 for(i=0;i<slides.length;i++){
   slides[i].style.display = "none";
  }
  slideIndex++;
  if(slideIndex>slides.length){slideIndex =1}
 
  for(i=0;i<dots.length;i++){
   dots[i].className = dots[i].className.replace("active","");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += "active";
  setTimeout(Slides,4000);
}
