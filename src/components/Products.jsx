import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Box, Typography, Button, Grid, Chip, Card, CardContent } from "@mui/material";
import { allProducts, categories, featuredProducts } from "../utils/shoeImages";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import FilterListIcon from "@mui/icons-material/FilterList";

function ProductCard({ product, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
        duration: 0.4, 
        delay: Math.min(index * 0.05, 0.3),
        layout: { duration: 0.3 }
      }}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
        width: "100%",
        height: "100%",
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
        whileHover={{ z: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card
          sx={{
            height: "100%",
            minHeight: "440px",
            display: "flex",
            flexDirection: "column",
            background: isHovered 
              ? "rgba(255, 255, 255, 0.07)" 
              : "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            border: isHovered 
              ? "1px solid rgba(0, 229, 255, 0.35)" 
              : "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "20px",
            overflow: "hidden",
            cursor: "pointer",
            boxShadow: isHovered
              ? "0 20px 50px rgba(0, 229, 255, 0.2), 0 0 0 1px rgba(0, 229, 255, 0.1)"
              : "0 4px 20px rgba(0, 0, 0, 0.2)",
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Badge */}
          {product.badge && (
            <Box
              sx={{
                position: "absolute",
                top: 12,
                left: 12,
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
            </Box>
          )}

          <Box
            sx={{
              position: "relative",
              padding: 2.5,
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
                height: "260px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "visible",
                mb: 2,
              }}
            >
              <motion.div
                animate={{
                  scale: isHovered ? 1.12 : 1,
                  y: isHovered ? -12 : 0,
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
                      ? "drop-shadow(0 20px 40px rgba(0, 229, 255, 0.4)) brightness(1.05)"
                      : "drop-shadow(0 8px 20px rgba(0, 0, 0, 0.35))",
                    transition: "filter 0.35s ease",
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
                    fontSize: "1.05rem",
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
                      background: "rgba(0, 229, 255, 0.12)",
                      color: "#00e5ff",
                      border: "1px solid rgba(0, 229, 255, 0.2)",
                      fontSize: "0.72rem",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "#00e5ff",
                      fontSize: "1.1rem",
                    }}
                  >
                    ${product.price}
                  </Typography>
                </Box>
              </Box>

              {/* Action Button - Smooth transition */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 8,
                  height: isHovered ? "auto" : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ overflow: "hidden", marginTop: isHovered ? 14 : 0 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<ShoppingBagIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    background: "linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)",
                    color: "black",
                    fontWeight: "bold",
                    py: 1.2,
                    borderRadius: "12px",
                    fontSize: "0.9rem",
                    boxShadow: "0 4px 15px rgba(0, 229, 255, 0.3)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #0080ff 0%, #00e5ff 100%)",
                      boxShadow: "0 6px 20px rgba(0, 229, 255, 0.5)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Add to Cart
                </Button>
              </motion.div>
            </CardContent>
          </Box>
        </Card>
      </motion.div>
    </motion.div>
  );
}

// Animated filter chip component
function FilterChip({ category, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Chip
        label={category}
        onClick={onClick}
        sx={{
          background: isSelected
            ? "linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)"
            : "rgba(255, 255, 255, 0.06)",
          color: isSelected ? "black" : "rgba(255, 255, 255, 0.8)",
          border: isSelected
            ? "none"
            : "1px solid rgba(255, 255, 255, 0.12)",
          fontWeight: isSelected ? "bold" : "500",
          cursor: "pointer",
          px: 2,
          py: 2.5,
          fontSize: "0.9rem",
          boxShadow: isSelected 
            ? "0 4px 20px rgba(0, 229, 255, 0.3)" 
            : "none",
          "&:hover": {
            background: isSelected
              ? "linear-gradient(135deg, #0080ff 0%, #00e5ff 100%)"
              : "rgba(0, 229, 255, 0.15)",
            borderColor: isSelected ? "transparent" : "rgba(0, 229, 255, 0.3)",
          },
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </motion.div>
  );
}

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const allProductsList = [...featuredProducts, ...allProducts];
  
  const filteredProducts =
    selectedCategory === "All"
      ? allProductsList
      : allProductsList.filter((product) => product.category === selectedCategory);

  return (
    <Box
      id="products"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, rgba(15, 15, 26, 0.85) 0%, rgba(26, 26, 46, 0.85) 50%, rgba(10, 10, 10, 0.85) 100%)",
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accents */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "-15%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(240, 147, 251, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "20%",
          left: "-10%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: "1400px", margin: "0 0", position: "relative", zIndex: 1,}}>
        {/* Section Header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: "#f093fb",
                  letterSpacing: 4,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  mb: 2,
                  display: "block",
                }}
              >
                SHOP BY CATEGORY
              </Typography>
            </motion.div>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
                fontWeight: "900",
                mb: 2,
                background: "linear-gradient(135deg, #ffffff 0%, #f093fb 50%, #00e5ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Browse All Products
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                maxWidth: "500px",
                mx: "auto",
                fontWeight: 300,
              }}
            >
              Filter and explore our complete collection
            </Typography>
          </Box>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1.5,
              mb: 6,
              p: 2,
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          >
            <FilterListIcon sx={{ color: "rgba(255,255,255,0.4)", mr: 1 }} />
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              >
                <FilterChip
                  category={category}
                  isSelected={selectedCategory === category}
                  onClick={() => setSelectedCategory(category)}
                />
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Products Grid */}
        <Box sx={{ width: "100%" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Grid 
                container 
                spacing={3}
                sx={{
                  justifyContent: "center",
                  alignItems: "stretch",
                }}
              >
                {filteredProducts.map((product, index) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={6} 
                    md={4} 
                    lg={3} 
                    key={product.id}
                    sx={{
                      display: "flex",
                      alignItems: "stretch",
                    }}
                  >
                    <ProductCard product={product} index={index} />
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          </AnimatePresence>
        </Box>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Box
              sx={{
                textAlign: "center",
                py: 8,
                background: "rgba(255,255,255,0.02)",
                borderRadius: "20px",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "rgba(255,255,255,0.5)" }}
              >
                No products found in this category
              </Typography>
            </Box>
          </motion.div>
        )}

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Box sx={{ textAlign: "center", mt: 6 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderColor: "rgba(0, 229, 255, 0.4)",
                  color: "#00e5ff",
                  fontWeight: "bold",
                  borderRadius: "50px",
                  backdropFilter: "blur(10px)",
                  background: "rgba(0, 229, 255, 0.05)",
                  "&:hover": {
                    borderColor: "#00e5ff",
                    background: "rgba(0, 229, 255, 0.15)",
                    boxShadow: "0 4px 20px rgba(0, 229, 255, 0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Load More Products
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

export default Products;

