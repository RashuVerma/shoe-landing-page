import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Box, Typography, Button, Stack } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

// Typewriter component for animated text
function TypewriterText({ text, speed = 50, delay = 0 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0 && !isReady) {
      const timer = setTimeout(() => setIsReady(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay, isReady]);

  useEffect(() => {
    if (!isReady || currentIndex >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      setCurrentIndex((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isReady]);

  return <span>{displayedText}</span>;
}

// Animated Button Component with glow effect
function GlowButton({ children, variant = "contained", delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant={variant}
        size="large"
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const shoeY = useTransform(scrollY, [0, 500], [0, 150]);
  const shoeRotate = useTransform(scrollY, [0, 500], [0, 15]);
  const shoeScale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const line1 = "Experience the perfect blend of comfort, style, and quality.";
  const line2 = "Find your perfect pair from our curated collection of premium shoes.";

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, rgba(10, 10, 10, 0.85) 0%, rgba(26, 26, 46, 0.85) 50%, rgba(22, 33, 62, 0.85) 100%)",
        color: "white",
        overflow: "hidden",
        px: { xs: 2, md: 4 },
        py: 4,
        pt: { xs: 10, md: 12 },
      }}
    >
      {/* Animated gradient orbs in background */}
      <Box sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <motion.div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)",
            right: "-200px",
            top: "-200px",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(240, 147, 251, 0.1) 0%, transparent 70%)",
            left: "-100px",
            bottom: "-100px",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </Box>

      <Box sx={{ maxWidth: "1400px", margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
        <Box 
          sx={{ 
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 6 },
            minHeight: "80vh",
          }}
        >
          {/* Left Side - Text Content */}
          <Box sx={{ flex: 1, zIndex: 2 }}>
            <motion.div
              style={{ opacity: textOpacity }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Stack spacing={3}>
                {/* Badge */}
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 1,
                      background: "rgba(0, 229, 255, 0.1)",
                      border: "1px solid rgba(0, 229, 255, 0.3)",
                      borderRadius: "50px",
                      px: 2,
                      py: 0.5,
                      mb: 2,
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#00e5ff",
                      }}
                    />
                    <Typography variant="body2" sx={{ color: "#00e5ff", fontWeight: 500 }}>
                      New Collection 2024
                    </Typography>
                  </Box>
                </motion.div>

                {/* Main Title */}
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "2.5rem", md: "4rem", lg: "5rem" },
                      fontWeight: "900",
                      lineHeight: 1.1,
                      background: "linear-gradient(135deg, #00e5ff 0%, #0080ff 50%, #f093fb 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 2,
                    }}
                  >
                    Step Into Style
                  </Typography>
                </motion.div>

                {/* Subtitle */}
                <motion.div variants={itemVariants}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: "1rem", md: "1.4rem" },
                      opacity: 0.9,
                      fontWeight: 300,
                      mb: 2,
                    }}
                  >
                    Discover Premium Footwear Collection
                  </Typography>
                </motion.div>

                {/* Typewriter Text */}
                <motion.div variants={itemVariants}>
                  <Box
                    sx={{
                      fontSize: { xs: "0.9rem", md: "1.05rem" },
                      opacity: 0.7,
                      lineHeight: 1.8,
                      mb: 3,
                      minHeight: { xs: "4rem", md: "4.5rem" },
                    }}
                  >
                    <Typography variant="body1" component="div" sx={{ mb: 0.5 }}>
                      <TypewriterText text={line1} speed={25} delay={800} />
                    </Typography>
                    <Typography variant="body1" component="div">
                      <TypewriterText text={line2} speed={25} delay={2800} />
                    </Typography>
                  </Box>
                </motion.div>

                {/* Buttons */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <GlowButton
                    delay={0.8}
                    sx={{
                      px: 4,
                      py: 1.5,
                      background: "linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)",
                      color: "black",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      borderRadius: "50px",
                      boxShadow: "0 4px 20px rgba(0, 229, 255, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #0080ff 0%, #00e5ff 100%)",
                        boxShadow: "0 8px 40px rgba(0, 229, 255, 0.6)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Shop Now
                  </GlowButton>
                  <GlowButton
                    variant="outlined"
                    delay={1}
                    sx={{
                      px: 4,
                      py: 1.5,
                      borderColor: "rgba(255, 255, 255, 0.3)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      borderRadius: "50px",
                      backdropFilter: "blur(10px)",
                      background: "rgba(255, 255, 255, 0.05)",
                      "&:hover": {
                        borderColor: "#00e5ff",
                        color: "#00e5ff",
                        background: "rgba(0, 229, 255, 0.1)",
                        boxShadow: "0 4px 20px rgba(0, 229, 255, 0.3)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Explore Collection
                  </GlowButton>
                </Stack>

                {/* Stats */}
                <motion.div variants={itemVariants}>
                  <Stack 
                    direction="row" 
                    spacing={4} 
                    sx={{ mt: 4, pt: 3, borderTop: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {[
                      { value: "500+", label: "Products" },
                      { value: "50k+", label: "Happy Customers" },
                      { value: "4.9", label: "Rating" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ fontWeight: "bold", color: "#00e5ff" }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ opacity: 0.6, fontSize: "0.85rem" }}
                        >
                          {stat.label}
                        </Typography>
                      </motion.div>
                    ))}
                  </Stack>
                </motion.div>
              </Stack>
            </motion.div>
          </Box>

          {/* Right Side - Floating Shoe Image with Parallax */}
          <Box sx={{ flex: 1, zIndex: 1 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: "350px", md: "550px" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
              }}
            >
              {/* Glow ring behind shoe */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "80%",
                  height: "80%",
                  borderRadius: "50%",
                  border: "2px solid rgba(0, 229, 255, 0.2)",
                  boxShadow: "0 0 60px rgba(0, 229, 255, 0.3), inset 0 0 60px rgba(0, 229, 255, 0.1)",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating Shoe Image with Parallax */}
              <motion.img
                src="/assets/images/shoe.png"
                alt="Premium Shoe"
                style={{
                  width: "100%",
                  maxWidth: "480px",
                  height: "auto",
                  maxHeight: "480px",
                  objectFit: "contain",
                  background: "transparent",
                  filter: "drop-shadow(0 30px 60px rgba(0, 229, 255, 0.6)) drop-shadow(0 0 40px rgba(0, 229, 255, 0.3))",
                  display: "block",
                  y: shoeY,
                  rotate: shoeRotate,
                  scale: shoeScale,
                }}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -20, 0],
                  rotateZ: [0, 3, -3, 0],
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotateZ: {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
      >
        <Typography variant="body2" sx={{ opacity: 0.5, mb: 1, fontSize: "0.75rem", letterSpacing: 2 }}>
          SCROLL
        </Typography>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <KeyboardArrowDownIcon sx={{ color: "#00e5ff", fontSize: 28 }} />
        </motion.div>
      </motion.div>
    </Box>
  );
}

export default Hero;
