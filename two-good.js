function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function navAnim(){
    gsap.to("#nav-part1 svg",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start:"top 0",
            end:"top -5%",
            scrub:true,
        },
    });
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
          trigger: "#page1",
          scroller: "#main",
          start: "top 0",
          end: "top -5%",
          scrub: true,
        },
      });
}

function page1Animation(){
    gsap.from("#page1 h1",{
        opacity:0,
        y:50,
        duration:0.8,
        stagger:0.5,
        delay:0.5
    })
}
function cursourAnimation(){
    var video=document.querySelector("#video-container");
var play=document.querySelector("#cursour");
video.addEventListener("mouseenter",() => {
    gsap.to(play,{
        opacity:1,
        transform: "translate(-50%,-50%) scale(1)"
    })
})
video.addEventListener("mouseleave",() => {
    gsap.to(play,{
        opacity:0,
        transform: "translate(-50%,-50%) scale(0)"
    })
})
video.addEventListener("mousemove",(dets)=>{
   gsap.to(play,{
    top:dets.y+350,
    left:dets.x
   })
})

}
function page56Animation(){
    document.addEventListener("mousemove",(dets)=>{
        gsap.to("#cursor",{
         top:dets.y,
         left:dets.x
        })
     
     })
     var elem=document.querySelector("#page5");
     elem.addEventListener("mouseenter",()=>{
         gsap.to("#cursor",{
             scale:1
         })
     })
     elem.addEventListener("mouseleave",()=>{
         gsap.to("#cursor",{
             scale:0
         })
     })
     var elem1=document.querySelector("#page6");
     elem1.addEventListener("mouseenter",()=>{
         gsap.to("#cursor",{
             scale:1
         })
     })
     elem1.addEventListener("mouseleave",()=>{
         gsap.to("#cursor",{
             scale:0
         })
     })
}

locomotiveAnimation();
page56Animation();
cursourAnimation();
page1Animation();
navAnim();