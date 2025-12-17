import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Products", "Collections", "About", "Contact"];

  return (
    <AppBar
      position="fixed"
      component={motion.div}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{
        background: scrolled 
          ? "rgba(10, 10, 10, 0.95)" 
          : "rgba(0, 0, 0, 0.3)",
        backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
        boxShadow: scrolled 
          ? "0 4px 30px rgba(0, 229, 255, 0.15)" 
          : "none",
        borderBottom: scrolled 
          ? "1px solid rgba(0, 229, 255, 0.1)" 
          : "none",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", py: scrolled ? 0.5 : 1 }}>
        
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              letterSpacing: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <motion.span 
              style={{ color: "#00e5ff" }}
              animate={{ 
                textShadow: ["0 0 10px rgba(0,229,255,0.5)", "0 0 20px rgba(0,229,255,0.8)", "0 0 10px rgba(0,229,255,0.5)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              STEP
            </motion.span>
            Style
          </Typography>
        </motion.div>

        {/* DESKTOP MENU */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          {navItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Button
                onClick={() => setActiveItem(item)}
                sx={{
                  color: activeItem === item ? "#00e5ff" : "white",
                  position: "relative",
                  px: 2,
                  py: 1,
                  borderRadius: "8px",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(0, 128, 255, 0.1) 100%)",
                    opacity: activeItem === item ? 1 : 0,
                    transition: "opacity 0.3s ease",
                    borderRadius: "8px",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: activeItem === item ? "100%" : "0%",
                    height: "2px",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
                    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  "&:hover": {
                    color: "#00e5ff",
                    "&::before": {
                      opacity: 1,
                    },
                    "&::after": {
                      width: "80%",
                    },
                  },
                  transition: "color 0.3s ease",
                }}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  {item}
                </motion.span>
              </Button>
            </motion.div>
          ))}
        </Box>

        {/* CTA Button */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(135deg, #00e5ff 0%, #0080ff 100%)",
                color: "black",
                fontWeight: "bold",
                px: 3,
                py: 1,
                borderRadius: "25px",
                boxShadow: "0 4px 15px rgba(0, 229, 255, 0.3)",
                "&:hover": {
                  background: "linear-gradient(135deg, #0080ff 0%, #00e5ff 100%)",
                  boxShadow: "0 6px 25px rgba(0, 229, 255, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Shop Now
            </Button>
          </motion.div>
        </Box>

        {/* MOBILE MENU ICON */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton
            sx={{ 
              display: { xs: "flex", md: "none" }, 
              color: "white",
              "&:hover": {
                color: "#00e5ff",
                background: "rgba(0, 229, 255, 0.1)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </motion.div>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
