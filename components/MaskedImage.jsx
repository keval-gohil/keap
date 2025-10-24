"use client";
import { useEffect, useRef } from "react";
import styles from "./MaskedImage.module.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MaskedImage() {
    const svgRef = useRef(null);

    useEffect(() => {
        if (!svgRef.current) return;

        let r = 0;
        let active = false;

        function figureMask() {
            const data = svgRef.current.querySelector("#goAway").getBBox();
            r = Math.sqrt(Math.pow(data.width, 2) + Math.pow(data.height, 2)) / 2;

            if (!active) {
                gsap.set("#cover", { attr: { r } });
            }
        }

        figureMask();
        ScrollTrigger.addEventListener("revert", figureMask);

        const anim = gsap.timeline();

        anim
            .fromTo(
                "#cover",
                { duration: 0.75, attr: { r: () => r } },
                { attr: { r: 0 } }
            )
            .to(`.${styles.something}`, { duration: 0.25, opacity: 1 });

        gsap.to(`.${styles.svgText}`, {
            x: 0,
            y: -800,
            opacity: 1,
            duration: 5,
            filter: "blur(20px)",
            ease: "power1.out",
            scrollTrigger: {
                trigger: `.${styles.svgText}`,
                start: "top 5%",
                end: "bottom 5%",
                markers: true,
                scrub: 2,
                toggleActions: "play complete reverse reset",
            },
        });

        ScrollTrigger.create({
            trigger: `.${styles.image}`,
            start: "top top",
            end: "+=100%",
            pin: true,
            scrub: true,
            animation: anim,
            invalidateOnRefresh: true,
            onEnter: () => { active = true },
            onLeave: () => { active = false },
            onEnterBack: () => { active = true },
            onLeaveBack: () => { active = false }
        });

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
            anim.kill();
        };
    }, []);

    return (
        <div>
            <div className={styles.image}>
                <svg
                    ref={svgRef}
                    id="demo"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                >
                    <defs>
                        <mask id="theMask">
                            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
                            <circle id="cover" r="200" fill="black" cx="50%" cy="50%" />
                        </mask>
                    </defs>

                    <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        className={styles.svgText}
                    >
                        <tspan x="50%" dy="-1.9em">A captivating way to</tspan>
                        <tspan x="50%" dy="1.4em">fall in love with</tspan>
                        <tspan x="50%" dy="1.4em">a character in just</tspan>
                        <tspan x="50%" dy="1.4em">a few seconds.</tspan>
                    </text>


                    <g mask="url(#theMask)">
                        <rect
                            id="goAway"
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="#fff"
                        />
                    </g>
                </svg>

                <div className={styles.something}>
                    <div className={styles.maskLogo}>
                        <h1>KEAP</h1>
                        <sub>EDITS</sub>
                    </div>
                </div>
            </div>

            <div className={styles.bottomSpacer}>
                <p>Currently updating and developing new features — Character Edits by</p>
                <a href="https://kval.vercel.app" target="_blank">kval.vercel.app</a>
            </div>
        </div>
    );
}
