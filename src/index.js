/*import { TweenMax, Power4 } from "gsap";*/

const arrow = document.querySelector("#arrow");
const container = document.querySelector(".container");


let translate = 0;
let currentSlide = 0;
let moving = false;
let currentVideo = 0;
const totalVideos = 2;  // videos are numbered starting with 0. So 0, 1, 2.

if (screen.width < 600) {
  // set random video for mobile as there is no slides cycle to cycle through videos
  var randomBG = Math.floor(Math.random() * 3);
  document.getElementsByClassName("vid")[0].src = "assets/videos/video-"+randomBG+".mp4";

}

  // infinite scroll
  const firstSlide = container.children[0].cloneNode(true);
  container.appendChild(firstSlide);
  const numSlides = container.children.length;
  const secondSlide = container.children[1].cloneNode(true);
  container.appendChild(secondSlide);
  container.style.width = `${numSlides * 100}vw`;
  //

  const onClick = () => {
    // resync playback of duplicate
    //dupVids = document.getElementsByClassName("vid");
    //dupVids[1].currentTime = dupVids[0].currentTime;
    //dupVids[1].play();
    //
    if (moving) return;
    moving = true;
    currentSlide++;
    translate = -(75 / numSlides) * currentSlide;
    TweenMax.to(container, 0.75, {
      xPercent: translate,
      ease: Power4.easeInOut,
      onComplete: () => {
        moving = false;
        if (currentSlide === numSlides - 1) {
          TweenMax.to(container, 0, { xPercent: 0 });
          currentSlide = 0;
        }

        // sequence videos
        if (currentSlide === 1) {
          currentVideo++;
          if(currentVideo > totalVideos) {
            currentVideo = 0;
          }
          document.querySelectorAll(".vid").forEach(el => {
            el.src = "assets/videos/video-" + currentVideo + ".mp4";
          });
        }
      }
    });
  };
  arrow.addEventListener("click", onClick);


  // video on mobile low power
  const videoElement = document.getElementsByClassName('.vid');

  videoElement.addEventListener('suspend', () => {
    $(".bgimg").css("display", "block");
  });

  videoElement.addEventListener('play', () => {
    $(".bgimg").css("display", "none");
  });
