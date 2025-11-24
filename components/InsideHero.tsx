"use client"

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
        end: "+=150%",
        scrub: 0.8,
        pin: true,
      }
    })
    .to(ldoorRef.current, { x: "-100%", ease: "none" }, 0)
    .to(rdoorRef.current, { x: "100%", ease: "none" }, 0)
    .to(h1Ref.current, { y: 0, opacity: 1, ease: "power2.out" }, 0.2)
    .to(pRef.current, { y: 0, opacity: 1, ease: "power2.out" }, 0.3)

    return () => {
      timeline.kill()
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        .indoor-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 500px;
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
          filter: blur(5px);
          display: block;
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

        .door {
          position: absolute;
          top: 0;
          height: 100vh;
          min-height: 500px;
          width: 50vw;
          overflow: hidden;
          z-index: 5;
          pointer-events: none;
        }
        .door img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          display: block;
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
        }
      `}</style>

      <section className="indoor-hero" ref={heroRef}>
        <div className="indoor-bg">
          <img src="/indoor-bg.jpeg" alt="background" />
        </div>

        <div className="hero-text">
          <h1 className = "font-[OPTIGoudy_Agency] "ref={h1Ref}>Our Philosophy</h1>
          <p  className="font-[Goudy_Old_Style]" ref={pRef}>
            At Eleven Eleven, we believe that exceptional living begins with understanding that a home is more than a space — it's a sanctuary where life unfolds, dreams take shape, and connections flourish in an atmosphere of refined elegance.
          </p>
        </div>

        <div className="door ldoor" ref={ldoorRef}>
          <img src="/ldoor.jpeg" alt="left door" />
        </div>
        <div className="door rdoor" ref={rdoorRef}>
          <img src="/rdoor.jpeg" alt="right door" />
        </div>
      </section>
    </>
  )
}
