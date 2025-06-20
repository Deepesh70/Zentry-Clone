import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {ScrollTrigger} from "gsap/all";
import { TiLocationArrow } from 'react-icons/ti';
import { useState, useRef, useEffect } from 'react';
// import VideoPreview from './VideoPreview';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading]= useState(true);
  const [ loadedVideos, setLoadedVideos ] = useState(0);
  const totalVideos = 4;
  const nextVdRef = useRef(null);
  const miniVideoRef = useRef(null);
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);

    const miniVideo= miniVideoRef.current;
    const miniRect = miniVideo.getBoundingClientRect();

    const videoElement = miniVideo.querySelector('video');
    if(!videoElement) return;

    const tl= gsap.timeline();

    // First, position the next video exactly over the mini video
  tl.set("#next-video-container", { 
    visibility: "visible",
    width: miniRect.width,
    height: miniRect.height,
    x: miniRect.left,
    y: miniRect.top,
    borderRadius: "12px",
    overflow: "hidden"
  });
   // Then animate it to fill the screen
  tl.to("#next-video-container", {
    width: "100vw",
    height: "100vh",
    x: 0,
    y: 0,
    borderRadius: 0,
    duration: 1,
    ease: "power2.inOut"
  });

  // Fade out the original mini video
  tl.to(miniVideo, {
    opacity: 0,
    duration: 0.5
  }, 0);
  
  // Fade in any content that should appear after the transition
  tl.to(".hero-content", {
    opacity: 1,
    y: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: "power2.out"
  }, "-=0.3");
};

   // Tilt effect on mouse move
  const handleMouseMove = (e) => {
    if (!miniVideoRef.current) return;

    const { left, top, width, height } = miniVideoRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const tiltX = (y - 0.5) * 30; // Tilt range: -10 to 10 degrees
    const tiltY = (0.5 - x) * 30; // Tilt range: -10 to 10 degrees

    miniVideoRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    if (miniVideoRef.current) {
      miniVideoRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(0.5)';
    }
  };

 useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 50% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  

  return (
     <div className="relative min-h-dvh w-screen overflow-x-hidden overflow-y-auto">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={miniVideoRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-100">
          G<b>A</b>MING
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">

            
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black text-3xl ">
        G<b>A</b>MING
      </h1>
    </div>
  );
};



export default Hero;