'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sceneHeights = window.innerHeight;
    const hold = sceneHeights * 0.5;

    gsap.set(".scene-2, .scene-3, .scene-4", { opacity: 0 });

    const totalScroll = sceneHeights * 4 + hold * 3;

    ScrollTrigger.create({
      trigger: ".hero",
      start: "top top",
      end: "+=" + totalScroll,
      pin: true,
      scrub: true
    });

    function start(i: number) {
      return sceneHeights * i + hold * i;
    }

    // Scene 1 animation
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: () => start(0),
        end: () => start(0) + sceneHeights,
        scrub: true
      }
    })
    .to(".scene-1 .hero-text", { opacity: 0, y: -50 })
    .to(".scene-1 .pillar-1", { x: -300, opacity: 0 }, "<")
    .to(".scene-1 .pillar-2", { x: 300, opacity: 0 }, "<");

    // Scene 2 animation
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: () => start(1),
        end: () => start(1) + sceneHeights * 0.5,
        scrub: true
      }
    })
    .set(".scene-2", { opacity: 1 })
    .from(".scene-2 .pillar-1", { y: -300, opacity: 0 })
    .from(".scene-2 .pillar-2", { y: 300, opacity: 0 }, "<")
    .from(".scene-2 .still-image", { opacity: 0 }, "<")
    .to(".hero .hero-bg", { scale: 2, x: "50%", y: "-50%" }, "<")
    .from(".scene-2 .hero-text", { opacity: 0, y: 50 }, "<");

    ScrollTrigger.create({
      trigger: ".hero",
      start: () => start(1) + sceneHeights * 0.5,
      end: () => start(1) + sceneHeights * 0.5 + hold,
      scrub: true
    });

    // Scene 2 exit
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: () => start(1) + sceneHeights * 0.5 + hold,
        end: () => start(2),
        scrub: true
      }
    })
    .to(".scene-2 .hero-text", { opacity: 0, y: -50 })
    .to(".scene-2 .pillar-1", { y: -300, opacity: 0 }, "<")
    .to(".scene-2 .still-image", { opacity: 0 }, "<")
    .to(".scene-2 .pillar-2", { y: 300, opacity: 0 }, "<");

    // Scene 3 animation
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: () => start(2),
        end: () => start(2) + sceneHeights * 0.5,
        scrub: true
      }
    })
    .set(".scene-3", { opacity: 1 })
    .from(".scene-3 .pillar-1", { y: -300, opacity: 0 })
    .from(".scene-3 .pillar-2", { y: 300, opacity: 0 }, "<")
    .to(".hero .hero-bg", { scale: 2, x: "-50%", y: "50%" }, "<")
    .from(".scene-3 .hero-text", { opacity: 0, y: 50 }, "<");

    ScrollTrigger.create({
      trigger: ".hero",
      start: () => start(2) + sceneHeights * 0.5,
      end: () => start(2) + sceneHeights * 0.5 + hold,
      scrub: true
    });

    // Scene 3 exit
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: () => start(2) + sceneHeights * 0.5 + hold,
        end: () => start(3),
        scrub: true
      }
    })
    .to(".scene-3 .hero-text", { opacity: 0, y: -50 })
    .to(".scene-3 .pillar-1", { y: -300, opacity: 0 }, "<")
    .to(".scene-3 .pillar-2", { y: 300, opacity: 0 }, "<");

    // Scene 4 animation
    gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: () => start(3),
        end: () => start(3) + sceneHeights * 0.7,
        scrub: true
      }
    })
    .set(".scene-4", { opacity: 1 })
    .to(".hero .hero-bg", { scale: 1, x: "0%", y: "0%" }, "<")
    .from(".scene-4 .hero-text", { opacity: 0, y: 60 });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <img src="/e7e9dada1e085ecdf4a962f604b80da4e169ba72.png" alt="background" />
      </div>
      
      <div className="scene-1">
        <div className="pill pillar-1">
          <img src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" />
        </div>
        <div className="hero-text">
          <span>Welcome to</span>
          <span>Apartment Eleven Eleven</span>
        </div>
        <div className="pill pillar-2">
          <img src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" />
        </div>
      </div>

      <div className="scene-2">
        <div className="pill pillar-1">
          <img src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" />
        </div>
        <div className="still-image">
          <img src="/d7dc12bd8ab008d09cce1d49b3b0bcd00b90c596.png" alt="still" />
        </div>
        <div className="hero-text">
          <span>Art Shaped by Structure and </span>
          <span>A vision built with exacting Precision</span>
        </div>
        <div className="pill pillar-2">
          <img src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" />
        </div>
      </div>

      <div className="scene-3">
        <div className="pill pillar-1">
          <img src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" />
        </div>
        <div className="hero-text">
          <span>Deliberate,</span>
          <span>Purposeful Execution</span>
        </div>
        <div className="pill pillar-2">
          <img src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" />
        </div>
      </div>

      <div className="scene-4">
        <div className="hero-text">
          <span>Deliberate, Purposeful Execution</span>
        </div>
      </div>

      <style jsx>{`
        .hero :global(img) {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }

        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
        }

        .hero .hero-bg {
          position: absolute;
          width: 100%;
          height: 100vh;
          z-index: -1;
        }

        .hero .scene-1 {
          position: absolute;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero .scene-1 .hero-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
          color: #fff;
          text-shadow: 0px 0px 10px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,1), 0px 0px 50px rgba(0,0,0,1);
        }

        .hero .scene-1 .pill {
          top: 0;
          position: absolute;
          height: 120vh;
        }

        .hero .scene-1 .pillar-1 {
          left: -3rem;
          right: auto;
        }

        .hero .scene-1 .pillar-2 {
          left: auto;
          right: -3rem;
        }

        .hero .scene-2 {
          position: absolute;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
        }

        .hero .scene-2 .hero-text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-left: 4rem;
          font-size: 4rem;
          justify-content: center;
          color: #fff;
          text-shadow: 0px 0px 10px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,1), 0px 0px 50px rgba(0,0,0,1);
        }

        .hero .scene-2 .pill {
          left: 10%;
          position: absolute;
          height: 150vh;
        }

        .hero .scene-2 .pillar-1 {
          top: -120%;
        }

        .hero .scene-2 .pillar-2 {
          bottom: -120%;
          top: auto;
        }

        .hero .scene-2 .still-image {
          position: absolute;
          top: 0%;
          left: auto;
          right: 10%;
        }

        .hero .scene-3 {
          position: absolute;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          overflow: hidden;
        }

        .hero .scene-3 .hero-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 4rem;
          font-size: 4rem;
          justify-content: center;
          color: #fff;
          text-shadow: 0px 0px 10px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,1), 0px 0px 50px rgba(0,0,0,1);
        }

        .hero .scene-3 .pill {
          right: 14%;
          left: auto;
          position: absolute;
          height: 150vh;
        }

        .hero .scene-3 .pillar-1 {
          top: -120%;
        }

        .hero .scene-3 .pillar-2 {
          bottom: -120%;
          top: auto;
        }

        .hero .scene-4 {
          position: absolute;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          overflow: hidden;
        }

        .hero .scene-4 .hero-text {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 4rem;
          font-size: 4rem;
          justify-content: center;
          color: #fff;
          text-shadow: 0px 0px 10px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,1), 0px 0px 50px rgba(0,0,0,1);
        }
          @media(max-width: 500px){
			.hero .scene-1 .hero-text,
			.hero .scene-2 .hero-text,
			.hero .scene-3 .hero-text,
			.hero .scene-4 .hero-text{
				font-size: 3rem;
				width: 50%;
				text-align: center;
			}

			.hero .scene-1 .pill{
				height: 100vh;
			}
			.hero .scene-1 .pillar-1{
			left: -10rem;
			right: auto;
		}
		.hero .scene-1 .pillar-2{
			left: auto;
			right: -10rem;
		}

		.hero .scene-2 .hero-text{
			font-size: 2rem;
			width: 90%;
			text-align: left;
			margin-left: 1rem;
			margin-top: 10rem;
		}
		.hero .scene-2 .pill{
			left: 10%;
			position: absolute;
			height: 100vh;
		}
		.hero .scene-2 .pillar-1{
			top:-70%;
		}
		.hero .scene-2 .pillar-2{
			bottom:-70%;
			top:auto;
		}
		.hero .scene-2 .still-image{
			top: 20%;
			left: auto;
			right : 0%;
			transform: scale(0.6);
		}


		.hero .scene-3 .hero-text{
			font-size: 2rem;
			width: 90%;
			align-items: flex-end;
			margin-right: 3rem;
			text-align: right;
		}
		.hero .scene-3 .pill{
			right: 5%;
			left: auto;
			position: absolute;
			height: 100vh;
		}
		.hero .scene-3 .pillar-1{
			top:-60%;
		}
		.hero .scene-3 .pillar-2{
			bottom:-60%;
			top:auto;
		}
		}

      `}</style>
    </section>
  );
}