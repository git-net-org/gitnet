"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NewAnimatedLogo = () => {
const letters = "GitNet".split("");

    // Variants for the container to orchestrate the animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Stagger the animation of each letter
                delayChildren: 0.2,
            },
        },
    };

    // Variants for each letter
    const letterVariants = {
        hidden: { 
            y: 40, 
            opacity: 0,
            rotateX: -90,
            filter: "blur(8px)"
        },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            transition: { 
                type: "spring" as const, 
                damping: 12, 
                stiffness: 200 
            },
        },
    };

    // A vibrant color palette for the letters
    const colors = ["#8B5CF6", "#A855F7", "#EC4899", "#F472B6", "#6366F1", "#8B5CF6"];

    return (
        <Link href="/">
            <motion.div
                className="flex items-center cursor-pointer group"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                aria-label="GitNet Logo"
            >
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        className="font-bold text-2xl tracking-tight"
                        style={{
                            display: 'inline-block',
                            color: colors[index % colors.length]
                        }}
                        whileHover={{
                            y: -6,
                            scale: 1.15,
                            color: colors[(index + 1) % colors.length],
                            textShadow: `0px 0px 12px ${colors[(index + 2) % colors.length]}66`,
                            transition: {
                                type: "spring" as const,
                                damping: 8,
                                stiffness: 300,
                            },
                        }}
                    >
                        {letter}
                    </motion.span>
                ))}
            </motion.div>
        </Link>
    );
};

export default NewAnimatedLogo;
