"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function InsideHero() {
  const heroRef = useRef<HTMLElement>(null)
  const ldoorRef = useRef<HTMLDivElement>(null)
  const rdoorRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const pRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // ensure initial states
    gsap.set(ldoorRef.current, { x: 0 })
    gsap.set(rdoorRef.current, { x: 0 })
    gsap.set([h1Ref.current, pRef.current], { y: 50, opacity: 0 })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=100%",
        scrub: 1,
        pin: true,
      }
    })
    .to(ldoorRef.current, { x: "-100%", ease: "none" }, 0)
    .to(rdoorRef.current, { x: "100%", ease: "none" }, 0)
    .to(h1Ref.current, { y: 0, opacity: 1, ease: "power2.out" }, 0.2)
    .to(pRef.current, { y: 0, opacity: 1, ease: "power2.out" }, 0.3)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      timeline.kill()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .indoor-hero {
        top:0;
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .indoor-bg {
          position: absolute;
          height: 100vh;
          min-height: 500px;
          inset: 0;
          z-index: -1;
        }
        .indoor-bg img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          -webkit-object-fit: cover;
          object-position: center;
          -webkit-object-position: center;
          filter: blur(5px);
          display: block;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);
        }

        .hero-text {
          position: absolute;
          top: 0;
          width: 90%;
          height: 100vh;
          min-height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          gap: 1rem;
          text-align: center;
          z-index: 1;
          padding: 0 1rem;
        }
          .hero-text div{
          height: fit-content;
          position: relative;
          width: fit-content;
          display: flex;
          align-items: center;
          justify-content: center;
          }
        .hero-text h1 {
          font-size: clamp(2rem, 8vw, 4rem);
          line-height: 1.2;
          text-shadow: 0px 0px 10px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.9);
          margin-bottom: 0.5rem;
          font-weight: 700;
        }
        .hero-text p {
          font-size: clamp(0.875rem, 3.5vw, 1.5rem);
          max-width: 900px;
          line-height: 1.6;
          text-shadow: 0px 0px 10px rgba(0,0,0,0.8);
          padding: 0 0.5rem;
        }
          .backdrop {
        position: absolute;
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: #000;
        filter: blur(30px);
        opacity: 0.5;
        transform: scale(1.5);
        z-index: -1;
        }

        .door {
          position: absolute;
          top: 0;
          height: 100vh;
          width: 50%;
          overflow: hidden;
          z-index: 5;
          pointer-events: none;
          }
        .door img {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
          height: 100%;
          width: 100%;
          object-fit: cover;
          -webkit-object-fit: cover;
          object-position: center;
          -webkit-object-position: center;
          transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);
        }
          .pill img{
          height: 100%;
          width: 100%;
          object-fit: cover;
          -webkit-object-fit: cover;
          object-position: center;
          -webkit-object-position: center;
          display: block;
          transform: translate3d(0,0,0);
          -webkit-transform: translate3d(0,0,0);
          }
          .indoor-hero .pill {
          top: 0;
          position: absolute;
          height: 100vh;
          width: 200px;
          z-index: 999;
        }

        .indoor-hero .pillar-1 {
          left: 0rem;
          right: auto;
          transform:translateX(-50%);
        }

        .indoor-hero .pillar-2 {
          left: auto;
          right: 0rem;
          transform:translateX(50%);
        }

        .ldoor { left: 0; transform-origin: left center; }
        .rdoor { right: 0; left: auto; transform-origin: right center; }

        @media (max-width: 768px) {
          .hero-text {
            width: 95%;
            gap: 0.75rem;
            padding: 0 0.75rem;
          }
          .hero-text h1 {
            margin-bottom: 0.25rem;
          }
          .hero-text p {
            padding: 0 0.25rem;
          }
          .indoor-bg img {
            filter: blur(3px);
          }
        }

        @media (max-width: 480px) {
          .hero-text {
            gap: 0.5rem;
          }
          .indoor-bg img {
            filter: blur(2px);
          }


          .indoor-hero .pill{
                height: 100vh;
                width: 220px;
            }
			.indoor-hero .pillar-1 {
          left: 0rem;
          right: auto;
          transform:translateX(-70%);
        }

        .indoor-hero .pillar-2 {
          left: auto;
          right: 0rem;
          transform:translateX(70%);
      }}

        .fade-blur {
          position: absolute;
          width: 100%;
          height: 5rem;
          background: linear-gradient(0deg, rgba(218, 207, 190, 1) 0%, rgba(218, 207, 190, 0) 100%);
          bottom: -0.2rem;
          pointer-events: none;
          z-index: 50;
        }
      `}</style>

      <section className="indoor-hero" ref={heroRef}>
        <div className="indoor-bg">
          <Image src="/indoor-bg.jpeg" alt="background" fill priority />
        </div>


        <div className="pill pillar-1">
          <Image src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" fill />
        </div>
        

        <div className="hero-text">
          <div><h1 ref={h1Ref} className="font-['OPTIGoudy_Agency'] text-4xl md:text-7xl">Our Philosophy</h1> <span className="backdrop"></span></div>
          <p ref={pRef} className="font-['Goudy_Old_Style'] text-2xl md:text-4xl">
            At Eleven Eleven, we believe that exceptional living begins with understanding that a home is more than a space — it's a sanctuary where life unfolds, dreams take shape, and connections flourish in an atmosphere of refined elegance.
          </p>
        </div>

        <div className="pill pillar-2">
          <Image src="/20aa144fd8a939a36caf482d74380a424105dbb2.png" alt="pillar" fill />
        </div>

        <div className="door ldoor" ref={ldoorRef}>
          <Image src="/ldoor.jpeg" alt="left door" fill />
        </div>
        <div className="door rdoor" ref={rdoorRef}>
          <Image src="/rdoor.jpeg" alt="right door" fill />
        </div>
            <div className='fade-blur'></div>
      </section>
    
    </>
  )
}
