import React, { useMemo } from "react";
import { motion } from "framer-motion";

function FloatingBackground() {
  // Memoize orbs to prevent regeneration on re-renders
  // Increased visibility for better effect
  const orbs = useMemo(() => [
    { id: 0, size: 500, x: 10, y: 15, duration: 25, delay: 0, color: "rgba(0, 229, 255, 0.6)" },
    { id: 1, size: 450, x: 80, y: 20, duration: 30, delay: 2, color: "rgba(240, 147, 251, 0.5)" },
    { id: 2, size: 400, x: 20, y: 70, duration: 28, delay: 4, color: "rgba(102, 126, 234, 0.5)" },
    { id: 3, size: 480, x: 70, y: 60, duration: 32, delay: 1, color: "rgba(0, 229, 255, 0.45)" },
    { id: 4, size: 420, x: 50, y: 40, duration: 35, delay: 3, color: "rgba(240, 147, 251, 0.45)" },
    { id: 5, size: 380, x: 90, y: 80, duration: 27, delay: 5, color: "rgba(0, 128, 255, 0.5)" },
  ], []);

  // Memoize shapes - reduced count
  const shapes = useMemo(() => [
    { id: 0, size: 60, x: 15, y: 25, duration: 20, delay: 0, rotation: 0 },
    { id: 1, size: 45, x: 85, y: 35, duration: 22, delay: 2, rotation: 45 },
    { id: 2, size: 55, x: 25, y: 75, duration: 24, delay: 4, rotation: 90 },
    { id: 3, size: 40, x: 75, y: 85, duration: 18, delay: 1, rotation: 135 },
  ], []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      {/* Floating Gradient Orbs - Subtle and smooth */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          style={{
            position: "absolute",
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            filter: "blur(50px)",
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.3, 1],
            opacity: [1, 1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}

      {/* Geometric Shapes - Very subtle */}
      {shapes.map((shape) => (
        <motion.div
          key={`shape-${shape.id}`}
          style={{
            position: "absolute",
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: shape.id % 2 === 0 ? "50%" : "30%",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            willChange: "transform",
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 180, shape.rotation],
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* Gradient overlay for depth - minimal to show orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 0%, transparent 0%, rgba(10, 10, 10, 0.1) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default FloatingBackground;
