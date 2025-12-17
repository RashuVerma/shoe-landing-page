import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { Box, Typography, IconButton, Card, CardContent, Chip, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { allProducts, featuredProducts } from "../utils/shoeImages";

function SliderCard({ product, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        width: "100%",
        height: "100%",
        minWidth: "300px",
        flexShrink: 0,
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          width: "100%",
          height: "100%",
        }}
        whileHover={{ z: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card
          sx={{
            height: "100%",
            minHeight: "420px",
            display: "flex",
            flexDirection: "column",
            background: isHovered 
              ? "rgba(255, 255, 255, 0.08)" 
              : "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(20px)",
            border: isHovered 
              ? "1px solid rgba(0, 229, 255, 0.4)" 
              : "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "24px",
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: isHovered
              ? "0 25px 50px rgba(0, 229, 255, 0.25), 0 0 0 1px rgba(0, 229, 255, 0.1)"
              : "0 8px 32px rgba(0, 0, 0, 0.3)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Badge */}
          {product.badge && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 10,
              }}
            >
              <Chip
                label={product.badge}
                size="small"
                sx={{
                  background: "linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "0.7rem",
                }}
              />
            </motion.div>
          )}

          <Box
            sx={{
              position: "relative",
              padding: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            {/* Image Container */}
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "240px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                mb: 2,
              }}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  y: isHovered ? -15 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: isHovered
                      ? "drop-shadow(0 20px 40px rgba(0, 229, 255, 0.5)) brightness(1.05)"
                      : "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.4))",
                    transition: "filter 0.4s ease",
                  }}
                />
              </motion.div>
            </Box>

            {/* Content */}
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: "0 !important",
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "700",
                    mb: 1,
                    color: "white",
                    fontSize: "1.1rem",
                  }}
                >
                  {product.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Chip
                    label={product.category}
                    size="small"
                    sx={{
                      background: "rgba(0, 229, 255, 0.15)",
                      color: "#00e5ff",
                      border: "1px solid rgba(0, 229, 255, 0.25)",
                      fontSize: "0.75rem",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#00e5ff",
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
              </Box>

              {/* Quick Action Button - Smooth appearance */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 10,
                  height: isHovered ? "auto" : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ overflow: "hidden", marginTop: isHovered ? 16 : 0 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)",
                    color: "black",
                    fontWeight: "bold",
                    py: 1,
                    borderRadius: "12px",
                    boxShadow: "0 4px 15px rgba(0, 229, 255, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #0080ff 0%, #00e5ff 100%)",
                      boxShadow: "0 6px 20px rgba(0, 229, 255, 0.5)",
                    },
                  }}
                >
                  Quick View
                </Button>
              </motion.div>
            </CardContent>
          </Box>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function ProductSlider({ title, products, gradient, subtitle }) {
  const scrollRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      const newScrollLeft =
        scrollRef.current.scrollLeft + direction * scrollAmount;
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  React.useEffect(() => {
    checkScrollability();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollability);
      return () => scrollContainer.removeEventListener("scroll", checkScrollability);
    }
  }, [products]);

  if (products.length === 0) return null;

  return (
    <Box sx={{ mb: 10 }}>
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              fontWeight: "800",
              mb: 1,
              background: gradient || "linear-gradient(135deg, #00e5ff 0%, #0080ff 50%, #f093fb 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)" }}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </motion.div>

      <Box sx={{ position: "relative", width: "100%" }}>
        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollLeft ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <IconButton
            onClick={() => scroll(-1)}
            disabled={!canScrollLeft}
            sx={{
              position: "absolute",
              left: { xs: 0, md: -25 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(10, 10, 10, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              color: "#00e5ff",
              width: 50,
              height: 50,
              "&:hover": {
                background: "rgba(0, 229, 255, 0.2)",
                borderColor: "#00e5ff",
                transform: "translateY(-50%) scale(1.1)",
              },
              "&:disabled": {
                opacity: 0,
              },
              transition: "all 0.3s ease",
            }}
          >
            <ChevronLeft sx={{ fontSize: 32 }} />
          </IconButton>
        </motion.div>

        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            gap: 3,
            overflowX: "auto",
            overflowY: "visible",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
            px: { xs: 2, md: 4 },
            py: 3,
            mx: { xs: 0, md: 2 },
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: Math.min(index * 0.08, 0.4),
                ease: "easeOut"
              }}
            >
              <SliderCard product={product} index={index} />
            </motion.div>
          ))}
        </Box>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: canScrollRight ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <IconButton
            onClick={() => scroll(1)}
            disabled={!canScrollRight}
            sx={{
              position: "absolute",
              right: { xs: 0, md: -25 },
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(10, 10, 10, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              color: "#00e5ff",
              width: 50,
              height: 50,
              "&:hover": {
                background: "rgba(0, 229, 255, 0.2)",
                borderColor: "#00e5ff",
                transform: "translateY(-50%) scale(1.1)",
              },
              "&:disabled": {
                opacity: 0,
              },
              transition: "all 0.3s ease",
            }}
          >
            <ChevronRight sx={{ fontSize: 32 }} />
          </IconButton>
        </motion.div>
      </Box>
    </Box>
  );
}

function Sliders() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const allProductsList = [...featuredProducts, ...allProducts];
  const runningProducts = allProductsList.filter(
    (product) => product.category === "Running"
  );
  const casualProducts = allProductsList.filter(
    (product) => product.category === "Casual"
  );

  return (
    <Box
      id="featured"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgba(10, 10, 10, 0.85) 0%, rgba(26, 26, 46, 0.85) 50%, rgba(15, 15, 26, 0.85) 100%)",
        py: { xs: 6, md: 10 },
        px: { xs: 1, md: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background gradient accent */}
      <Box
        sx={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "30%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(240, 147, 251, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: "1500px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "#00e5ff",
                  letterSpacing: 4,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  mb: 2,
                  display: "block",
                }}
              >
                FEATURED COLLECTIONS
              </Typography>
            </motion.div>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2.2rem", md: "3.5rem" },
                fontWeight: "900",
                mb: 2,
                background: "linear-gradient(135deg, #ffffff 0%, #00e5ff 50%, #f093fb 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Discover Your Style
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "600px",
                mx: "auto",
                fontWeight: 300,
                fontSize: { xs: "0.95rem", md: "1.1rem" },
              }}
            >
              Browse through our curated selection of premium footwear designed for comfort and style
            </Typography>
          </Box>
        </motion.div>

        <ProductSlider
          title="All Shoes"
          subtitle="Complete collection of our finest footwear"
          products={allProductsList}
          gradient="linear-gradient(135deg, #00e5ff 0%, #0080ff 50%, #f093fb 100%)"
        />

        <ProductSlider
          title="Running Collection"
          subtitle="Performance meets comfort"
          products={runningProducts}
          gradient="linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)"
        />

        <ProductSlider
          title="Casual Essentials"
          subtitle="Everyday comfort with style"
          products={casualProducts}
          gradient="linear-gradient(135deg, #f093fb 0%, #667eea 100%)"
        />
      </Box>
    </Box>
  );
}

export default Sliders;
