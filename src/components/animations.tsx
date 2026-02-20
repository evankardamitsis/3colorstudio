"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  type Variants,
  type HTMLMotionProps,
} from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};


const defaultTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as const,
};

const fastTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

export interface FadeInUpProps extends HTMLMotionProps<"div"> {
  delay?: number;
  once?: boolean;
}

/** Scroll-triggered fade-in-up reveal. */
export function FadeInUp({
  children,
  delay = 0,
  once = true,
  className,
  ...rest
}: FadeInUpProps) {
  const { ref, isInView } = useScrollReveal(once);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{
        ...defaultTransition,
        delay,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Hook for scroll-triggered reveal: ref + isInView. */
function useScrollReveal(once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    amount: 0.15,
    margin: "0px 0px -60px 0px",
  });
  return { ref, isInView };
}

export interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  once?: boolean;
}

/** Scroll-triggered fade-in reveal. */
export function FadeIn({
  children,
  delay = 0,
  once = true,
  className,
  ...rest
}: FadeInProps) {
  const { ref, isInView } = useScrollReveal(once);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeIn}
      transition={{
        ...defaultTransition,
        delay,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export interface FadeInScaleProps extends HTMLMotionProps<"div"> {
  delay?: number;
  once?: boolean;
}

/** Scroll-triggered fade-in with subtle scale. */
export function FadeInScale({
  children,
  delay = 0,
  once = true,
  className,
  ...rest
}: FadeInScaleProps) {
  const { ref, isInView } = useScrollReveal(once);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInScale}
      transition={{
        ...defaultTransition,
        delay,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export interface FadeInStaggerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  once?: boolean;
}

/** Container for staggered child reveals. Use FadeInStaggerItem for children. */
export function FadeInStagger({
  children,
  staggerDelay = 0.08,
  once = true,
  className,
  ...rest
}: FadeInStaggerProps) {
  const { ref, isInView } = useScrollReveal(once);
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            staggerDirection: 1,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export interface FadeInStaggerItemProps extends HTMLMotionProps<"div"> {
  transition?: { duration?: number; delay?: number };
}

/** Child for FadeInStagger. */
export function FadeInStaggerItem({
  children,
  className,
  transition: customTransition,
  ...rest
}: FadeInStaggerItemProps) {
  return (
    <motion.div
      variants={staggerItemVariants}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        ...customTransition,
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** On-mount fade-in (no scroll trigger). For above-the-fold content like hero. */
export interface FadeInOnMountProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

export function FadeInOnMount({
  children,
  delay = 0,
  duration = 0.7,
  className,
  ...rest
}: FadeInOnMountProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Staggered on-mount (for hero lines, etc). */
export interface StaggerOnMountProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  childDelay?: number;
}

export function StaggerOnMount({
  children,
  staggerDelay = 0.12,
  className,
  ...rest
}: StaggerOnMountProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            staggerDirection: 1,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const staggerOnMountItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function StaggerOnMountItem({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={staggerOnMountItemVariants} className={className} {...rest}>
      {children}
    </motion.div>
  );
}

/** Hover scale micro-interaction. */
export const hoverScale = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: fastTransition,
};

/** Hover lift (translateY). */
export const hoverLift = {
  whileHover: { y: -4 },
  whileTap: { y: 0 },
  transition: fastTransition,
};
