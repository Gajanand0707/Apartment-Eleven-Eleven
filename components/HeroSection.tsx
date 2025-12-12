'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    let timeoutId: any;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!dimensions.height) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const sceneHeight = dimensions.height;
      const hold = sceneHeight * 0.5;

      // Hide all scenes except Scene 1 initially
      gsap.set(".scene-2, .scene-3, .scene-3-5, .scene-4", { opacity: 0 });

      // Total scroll duration for pinning hero
      const totalScroll = sceneHeight * 6 + hold * 2 + sceneHeight * 0.5;
      const start = (i: number) => sceneHeight * i + hold * i;

      // Pin the hero section
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "+=" + totalScroll,
        pin: true,
        scrub: 0.2
      });

      /* -------------------------
         SCENE 1
      -------------------------- */
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: () => start(0),
          end: () => start(0) + sceneHeight,
          scrub: 0.2
        }
      })
        .to(".scene-1 .hero-text", { opacity: 0, y: -50 })
        .to(".scene-1 .pillar-1", { x: "-200%", opacity: 0 }, "<")
        .to(".scene-1 .pillar-2", { x: "200%", opacity: 0 }, "<");

      /* -------------------------
         SCENE 2
      -------------------------- */
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: () => start(1),
          end: () => start(1) + sceneHeight * 0.5,
          scrub: 0.2
        }
      })
        .set(".scene-2", { opacity: 1 })
        .from(".scene-2 .pillar-1", { y: "-100%", opacity: 0 })
        .from(".scene-2 .pillar-2", { y: "100%", opacity: 0 }, "<")
        .from(".scene-2 .still-image", { opacity: 0 }, "<")
        .to(".hero-bg", { scale: 2, x: "50%", y: "-50%" }, "<")
        .from(".scene-2 .hero-text", { opacity: 0, y: 50 }, "<");

      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: () => start(1) + sceneHeight * 0.5 + hold,
          end: () => start(2),
          scrub: 0.2
        }
      })
        .to(".scene-2 .hero-text", { opacity: 0, y: -50 })
        .to(".scene-2 .pillar-1", { y: "-100%", opacity: 0 }, "<")
        .to(".scene-2 .still-image", { opacity: 0 }, "<")
        .to(".scene-2 .pillar-2", { y: "100%", opacity: 0 }, "<");

      /* -------------------------
         SCENE 3
      -------------------------- */
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: () => start(2),
          end: () => start(2) + sceneHeight * 0.5,
          scrub: 0.2
        }
      })
        .set(".scene-3", { opacity: 1 })
        .from(".scene-3 .pillar-1", { y: "-100%", opacity: 0 })
        .from(".scene-3 .pillar-2", { y: "100%", opacity: 0 }, "<")
        .to(".hero-bg", { scale: 2, x: "-50%", y: "50%" }, "<")
        .from(".scene-3 .hero-text", { opacity: 0, y: 50 }, "<");

      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: () => start(2) + sceneHeight * 0.5 + hold,
          end: () => start(3),
          scrub: 0.2
        }
      })
        .to(".scene-3 .hero-text", { opacity: 0, y: -50 })
        .to(".scene-3 .pillar-1", { y: "-100%", opacity: 0 }, "<")
        .to(".scene-3 .pillar-2", { y: "100%", opacity: 0 }, "<");

      /* -------------------------
         SCENE 3.5
      -------------------------- */
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: () => start(3),
          end: () => start(3) + sceneHeight * 0.6,
          scrub: 0.2
        }
      })
        .set(".scene-3-5", { opacity: 1 })
        .to(".hero-bg", { scale: 1, x: "0", y: "0" }, "<")
        .from(".scene-3-5 .hero-text", { opacity: 0, y: 80 });

      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: () => start(3) + sceneHeight * 0.5 + hold,
          end: () => start(4) + sceneHeight * 0.6,
          scrub: 0.2
        }
      })
        .to(".scene-3-5", { opacity: 0, y: -50 });

      /* -------------------------
         SCENE 4 (Last Scene)
      -------------------------- */
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: () => start(4) + sceneHeight * 0.6, // after scene 3.5
          end: () => start(5), // make sure hero has enough scroll
          scrub: 0.3,
          pin: false
        }
      })
        .set(".scene-4", { opacity: 1, zIndex: 10 })
        .from(".scene-4 .hero-text", { opacity: 0, y: 60 })
        .to(".scene-4 .hero-text", { opacity: 1, y: 0 });

    }, heroRef);

    return () => ctx.revert();
  }, [dimensions]);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-bg">
        <img src="/e7e9dada1e085ecdf4a962f604b80da4e169ba72.png" alt="background" />
      </div>

      <div className="scene-1">
        <div className="pill pillar-1">
          <img src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" />
        </div>

        <div className="hero-text font-['OPTIGoudy_Agency']">
          <span>Welcome to</span>
          <span>Apartment Eleven Eleven</span>
          <span className="backdrop"></span>
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

        <div className="hero-text font-['OPTIGoudy_Agency']">
          <span>Art Shaped by Structure and</span>
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

        <div className="hero-text  font-['OPTIGoudy_Agency']">
          <span>Deliberate,</span>
          <span>Purposeful Execution</span>
        </div>

        <div className="pill pillar-2">
          <img src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" />
        </div>
      </div>

      {/* ⭐ NEW SCENE 3.5 ⭐ */}
      <div className="scene-3-5">
        <div className="hero-text text-new font-['OPTIGoudy_Agency']">
          <span>Deliberate,</span>
          <span>Purposeful Execution</span>
        </div>
      </div>

      <div className="scene-4">
        <div className="hero-text font-['OPTIGoudy_Agency']">
          <span>Welcome to</span>
          <span>Apartment Eleven Eleven</span>
        </div>
      </div>

      <div className="fade-blur"></div>

      <style jsx>{`
        
        .hero :global(img) {
          height: 100%;
          width: 100%;
          object-fit: cover;
          -webkit-object-fit: cover;
          object-position: center;
          -webkit-object-position: center;
          display: block;
          -webkit-transform: translate3d(0,0,0);
          transform: translate3d(0,0,0);
        }

        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
        }
          .hero-text{
          line-height: 1;
          }

        .hero .hero-bg {
          position: absolute;
          width: 100%;
          height: 100vh;
          z-index: -1;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translate3d(0,0,0);
          will-change: transform;
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
        position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          color: #fff; 
          z-index: 99;
          will-change: opacity, transform;
        }
          .hero .scene-1 .hero-text span:nth-child(2) {
          font-size: 5.5rem;
          text-align: center;
          }

        .hero .scene-1 .hero-text .backdrop {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: #000;
        filter: blur(50px);
        opacity: 0.4;
        transform: scale(1.5);
        z-index: -1;
        }

        .hero .scene-1 .pill {
        position: absolute;
          top: 0;
          height: 120vh;
          width : 50%;
          display: flex;
          align-items:center;
          justify-content: center;
          }

        .hero .scene-1 .pill img,
        .hero .scene-2 .pill img,
        .hero .scene-3 .pill img {
        object-fit: contain;
        }

        .hero .scene-1 .pillar-1 {
          transform: translateX(-100%);
          will-change: transform, opacity;
        }

        .hero .scene-1 .pillar-2 {
          transform: translateX(100%);
          will-change: transform, opacity;
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
          position: absolute;
          left: 10rem;
          width: 20rem;
          height: 100%;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          font-size: 3rem;
          justify-content: center;
          color: #fff;
          text-shadow: 0px 0px 10px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,1), 0px 0px 50px rgba(0,0,0,1);
          will-change: opacity, transform;
          z-index: 10;
        }

        .hero .scene-2 .pill {
          position: absolute;
          height: 150vh;
          width : 20rem;
        }

        .hero .scene-2 .pillar-1 {
          transform: translate(10rem,-45rem);
          will-change: transform, opacity;
        }

        .hero .scene-2 .pillar-2 {
          transform: translate(10rem,45rem);
          will-change: transform, opacity;
        }

        .hero .scene-2 .still-image {
          position: absolute;
          top: 0%;
          left: auto;
          right: 10%;
          will-change: opacity;
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
          position: absolute;
          right: 10rem;
          width: 20rem;
          height: 100%;
          top: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          font-size: 4rem;
          justify-content: center;
          color: #fff;
          text-shadow: 0px 0px 10px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,1), 0px 0px 50px rgba(0,0,0,1);
          will-change: opacity, transform;
          z-index: 10;
        }

        .hero .scene-3 .pill {
          left: auto;
          position: absolute;
          height: 150vh;
          width : 20rem;
        }

        .hero .scene-3 .pillar-1 {
          transform: translate(-10rem,-45rem);
          will-change: transform, opacity;
        }

        .hero .scene-3 .pillar-2 {
          transform: translate(-10rem,45rem);
          will-change: transform, opacity;
        }

        .hero .scene-4 {
          position: absolute;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
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
          will-change: opacity, transform;
        }
        .hero .fade-blur{
          display: none;
          position: absolute;
          width: 100%;
          height: 5rem;
          background: linear-gradient(0deg,rgba(218, 207, 190, 1) 0%, rgba(218, 207, 190, 0) 100%);
          bottom: -0.2rem;
          pointer-events: none;
          z-index: 50;
        }

        .hero .fade-blur.visible{ display: block; }



          @media(max-width: 500px){
			.hero .scene-1 .hero-text,
			.hero .scene-2 .hero-text,
			.hero .scene-3 .hero-text,
			.hero .scene-4 .hero-text{
				font-size: 2.5rem;
				width: 50%;
				text-align: center;
			}
        .text-new span{
        font-size:35px;
                line-height: 130%;
        width: 100%;
        display: block;
        }
        .still-image{
        display: none;
        }
        .hero .scene-1 .hero-text span:nth-child(2) {
        margin-top: 0.5rem;   
        font-size: 3rem;
        }

      .hero .scene-1 .pillar-1 {
          transform: translateX(-90%);
          height: 100vh;
          width: 16rem;
        }

        .hero .scene-1 .pillar-2 {
          transform: translateX(90%);
          height: 100vh;
          width: 16rem;
        }
		.hero .scene-2 .hero-text{
            position: absolute;
            left: 5rem;
            top: 0;
            height: 100%;
            width: 10rem;
            text-align: center;
            align-items: center;
            justify-content: center;
            margin: 0;
			font-size: 1.6rem;
		}
		.hero .scene-2 .pill{
			height: 100vh;
		}
		.hero .scene-2 .pillar-1 {
          transform: translate(0rem,-37rem);
        }

        .hero .scene-2 .pillar-2 {
          transform: translate(0rem,37rem);
        }
		.hero .scene-2 .still-image{
			top: 20%;
			left: auto;
			right : 0%;
			transform: scale(0.6);
		}


		.hero .scene-3 .hero-text{
            position: absolute;
            right: 5rem;
            top: 0;
            height: 100%;
            width: 10rem;
            text-align: center;
            align-items: center;
            justify-content: center;
            margin: 0;
			font-size: 1.5rem;
		}
		.hero .scene-3 .pill{
			height: 100vh;
		}
      .hero .scene-3 .pillar-1 {
          transform: translate(0rem,-33rem);
        }

        .hero .scene-3 .pillar-2 {
          transform: translate(0rem,33rem);
        }
          .hero.jsx-6471a9fc64a17056 .scene-1.jsx-6471a9fc64a17056 .hero-text.jsx-6471a9fc64a17056, .hero.jsx-6471a9fc64a17056 .scene-2.jsx-6471a9fc64a17056 .hero-text.jsx-6471a9fc64a17056, .hero.jsx-6471a9fc64a17056 .scene-3.jsx-6471a9fc64a17056 .hero-text.jsx-6471a9fc64a17056, .hero.jsx-6471a9fc64a17056 .scene-4.jsx-6471a9fc64a17056 .hero-text.jsx-6471a9fc64a17056{
          width:100%;
          }
		}

        .hero .scene-3-5 {
          position: absolute;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 4rem;
          opacity: 0;
          pointer-events: none;
        }

        .hero .scene-3-5 .hero-text {
          font-size: 4rem;
          color: #fff;
          text-align: center;
          line-height: 1;
          text-shadow: 0px 0px 10px rgba(0,0,0,1), 0px 0px 30px rgba(0,0,0,1);
          will-change: opacity, transform;
        }

      `}</style>
    </section>
  );
}
