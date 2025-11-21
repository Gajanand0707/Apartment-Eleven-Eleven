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
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .indoor-bg {
          position: absolute;
          height: 100vh;
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
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          gap: 2rem;
          text-align: center;
          z-index: 1;
          padding: 0 1rem;
        }
        .hero-text h1 {
          font-size: clamp(2rem, 4vw, 4rem);
          line-height: 1.05;
          text-shadow: 0px 0px 10px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.9), 0px 0px 30px rgba(0,0,0,0.9);
          margin-bottom: 0.5rem;
        }
        .hero-text p {
          font-size: clamp(1rem, 2.2vw, 1.5rem);
          max-width: 900px;
          text-shadow: 0px 0px 10px rgba(0,0,0,0.8);
        }

        .door {
          position: absolute;
          top: 0;
          height: 100vh;
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
      `}</style>

      <section className="indoor-hero" ref={heroRef}>
        <div className="indoor-bg">
          <img src="/indoor-bg.jpeg" alt="background" />
        </div>

        <div className="hero-text">
          <h1 ref={h1Ref}>Our Philosophy</h1>
          <p ref={pRef}>
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
