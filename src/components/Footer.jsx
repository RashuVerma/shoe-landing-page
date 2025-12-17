import React, { useRef, useMemo } from "react";
import { Box, Typography, Grid, Link, TextField, Button, IconButton } from "@mui/material";
import { motion, useInView } from "framer-motion";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const socialIcons = [
    { icon: <FacebookIcon />, color: "#1877F2", name: "Facebook" },
    { icon: <TwitterIcon />, color: "#1DA1F2", name: "Twitter" },
    { icon: <InstagramIcon />, color: "#E4405F", name: "Instagram" },
    { icon: <LinkedInIcon />, color: "#0077B5", name: "LinkedIn" },
  ];

  const shopLinks = ["Running", "Casual", "Sports", "Fashion", "Boots"];
  const companyLinks = ["About Us", "Contact", "Careers", "Blog"];

  // Memoize background orbs to prevent regeneration
  const backgroundOrbs = useMemo(() => [
    { width: 250, height: 250, left: "10%", top: "20%", opacity: 0.04 },
    { width: 180, height: 180, right: "15%", top: "40%", opacity: 0.03 },
    { width: 300, height: 300, left: "60%", bottom: "10%", opacity: 0.05 },
  ], []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <Box
      component="footer"
      ref={footerRef}
      sx={{
        position: "relative",
        background: "linear-gradient(180deg, rgba(10, 10, 10, 0.85) 0%, rgba(13, 13, 26, 0.85) 50%, rgba(10, 10, 10, 0.85) 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        overflow: "hidden",
      }}
    >
      {/* Subtle Static Background Elements */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {backgroundOrbs.map((orb, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: `${orb.width}px`,
              height: `${orb.height}px`,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(0, 229, 255, ${orb.opacity}), transparent)`,
              left: orb.left,
              right: orb.right,
              top: orb.top,
              bottom: orb.bottom,
              filter: "blur(60px)",
            }}
          />
        ))}
      </Box>

      <Box sx={{ maxWidth: "1400px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "900",
                    mb: 2,
                    background: "linear-gradient(135deg, #00e5ff 0%, #0080ff 50%, #f093fb 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  STEPStyle
                </Typography>
              </motion.div>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  lineHeight: 1.8,
                  mb: 3,
                  maxWidth: "320px",
                }}
              >
                Your destination for premium footwear. Step into style with our
                curated collection of high-quality shoes for every occasion.
              </Typography>

              {/* Social Icons - Subtle hover */}
              <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
                {socialIcons.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconButton
                      aria-label={social.name}
                      sx={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "rgba(255, 255, 255, 0.6)",
                        width: 42,
                        height: 42,
                        "&:hover": {
                          background: "rgba(0, 229, 255, 0.1)",
                          borderColor: "rgba(0, 229, 255, 0.3)",
                          color: social.color,
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Shop Links */}
          <Grid item xs={6} sm={6} md={2}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "600",
                    mb: 2.5,
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                >
                  Shop
                </Typography>
              </motion.div>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {shopLinks.map((item) => (
                  <motion.div key={item} variants={itemVariants}>
                    <Link
                      href="#"
                      sx={{
                        color: "rgba(255, 255, 255, 0.55)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        "&:hover": {
                          color: "#00e5ff",
                          "& .arrow": {
                            opacity: 1,
                            transform: "translateX(0)",
                          },
                        },
                        transition: "color 0.25s ease",
                      }}
                    >
                      {item}
                      <ArrowForwardIcon
                        className="arrow"
                        sx={{
                          fontSize: 14,
                          opacity: 0,
                          transform: "translateX(-5px)",
                          transition: "all 0.25s ease",
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Company Links */}
          <Grid item xs={6} sm={6} md={2}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delayChildren: 0.15 }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "600",
                    mb: 2.5,
                    color: "white",
                    fontSize: "0.95rem",
                  }}
                >
                  Company
                </Typography>
              </motion.div>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {companyLinks.map((item) => (
                  <motion.div key={item} variants={itemVariants}>
                    <Link
                      href="#"
                      sx={{
                        color: "rgba(255, 255, 255, 0.55)",
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.5,
                        "&:hover": {
                          color: "#00e5ff",
                          "& .arrow": {
                            opacity: 1,
                            transform: "translateX(0)",
                          },
                        },
                        transition: "color 0.25s ease",
                      }}
                    >
                      {item}
                      <ArrowForwardIcon
                        className="arrow"
                        sx={{
                          fontSize: 14,
                          opacity: 0,
                          transform: "translateX(-5px)",
                          transition: "all 0.25s ease",
                        }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>

          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "600",
                  mb: 1.5,
                  color: "white",
                  fontSize: "0.95rem",
                }}
              >
                Stay Updated
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.55)",
                  mb: 2.5,
                  fontSize: "0.85rem",
                }}
              >
                Subscribe for new arrivals and exclusive offers.
              </Typography>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  gap: 1.5,
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter your email"
                  variant="outlined"
                  size="small"
                  sx={{
                    flex: 1,
                    "& .MuiOutlinedInput-root": {
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: "10px",
                      color: "white",
                      fontSize: "0.9rem",
                      "& fieldset": { border: "none" },
                      "&:hover": {
                        borderColor: "rgba(0, 229, 255, 0.3)",
                      },
                      "&.Mui-focused": {
                        borderColor: "#00e5ff",
                        background: "rgba(0, 229, 255, 0.05)",
                      },
                      "& input::placeholder": {
                        color: "rgba(255, 255, 255, 0.4)",
                      },
                    },
                    transition: "all 0.3s ease",
                  }}
                />
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<EmailIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      background: "linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)",
                      color: "black",
                      fontWeight: "600",
                      px: 2.5,
                      py: 1.2,
                      borderRadius: "10px",
                      whiteSpace: "nowrap",
                      fontSize: "0.85rem",
                      boxShadow: "0 4px 15px rgba(0, 229, 255, 0.25)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #0080ff 0%, #00e5ff 100%)",
                        boxShadow: "0 6px 20px rgba(0, 229, 255, 0.4)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Subscribe
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Box
            sx={{
              mt: 6,
              pt: 3,
              borderTop: "1px solid rgba(255, 255, 255, 0.06)",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "0.8rem",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              © 2024 STEPStyle. All rights reserved.
            </Typography>
            <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", justifyContent: "center" }}>
              {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link
                    href="#"
                    sx={{
                      color: "rgba(255, 255, 255, 0.4)",
                      textDecoration: "none",
                      fontSize: "0.8rem",
                      "&:hover": {
                        color: "#00e5ff",
                      },
                      transition: "color 0.25s ease",
                    }}
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}

export default Footer;
