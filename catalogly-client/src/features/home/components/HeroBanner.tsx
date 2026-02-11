import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { palette } from "../../../theme/palette";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.98 },
};

const floatVariants = {
  animate: {
    y: [0, -8, 0],
    rotate: [0, 2, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

export default function HeroBanner() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: { xs: "70vh", md: "80vh" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderRadius: 3,
        background: `linear-gradient(145deg, ${palette.forestDeep} 0%, ${palette.forest} 35%, ${palette.sage} 70%, ${palette.sageMuted} 100%)`,
        boxShadow: `0 24px 48px -12px ${theme.palette.common.black}25`,
      }}
    >
      {/* Decorative floating shapes */}
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{
          position: "absolute",
          top: "15%",
          left: "10%",
          opacity: 0.15,
        }}
      >
        <AutoStoriesIcon sx={{ fontSize: 80, color: "white" }} />
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{
          position: "absolute",
          bottom: "20%",
          right: "12%",
          opacity: 0.12,
        }}
      >
        <MenuBookIcon sx={{ fontSize: 60, color: "white" }} />
      </motion.div>
      <motion.div
        variants={floatVariants}
        animate="animate"
        style={{
          position: "absolute",
          top: "40%",
          right: "8%",
          opacity: 0.1,
        }}
      >
        <LocalLibraryIcon sx={{ fontSize: 48, color: "white" }} />
      </motion.div>

      {/* Content */}
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        sx={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          px: 3,
          py: 6,
        }}
      >
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              mb: 3,
              px: 2,
              py: 1,
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <AutoStoriesIcon sx={{ fontSize: 28, color: "white" }} />
            <Typography
              variant="overline"
              sx={{
                color: "white",
                letterSpacing: 3,
                fontWeight: 600,
                opacity: 0.95,
              }}
            >
              Your Library
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              color: "white",
              fontWeight: 800,
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem", lg: "4.5rem" },
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              mb: 2,
              textShadow: "0 2px 24px rgba(0,0,0,0.15)",
            }}
          >
            Discover your
            <br />
            <Box
              component="span"
              sx={{
                background: `linear-gradient(90deg, ${palette.terracottaLight} 0%, ${palette.clay} 50%, ${palette.ivory} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              next great read
            </Box>
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: 480,
              mx: "auto",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Browse our curated collection of books. Find stories that inspire,
            challenge, and delight.
          </Typography>
        </motion.div>

        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            component={RouterLink}
            to="/books"
            variant="contained"
            size="large"
            endIcon={
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowForwardIcon sx={{ fontSize: 22 }} />
              </motion.span>
            }
            sx={{
              px: 4,
              py: 1.75,
              fontSize: "1.1rem",
              fontWeight: 700,
              textTransform: "none",
              borderRadius: 3,
              bgcolor: palette.terracotta,
              color: palette.warmWhite,
              boxShadow: `0 8px 24px ${palette.terracottaDark}40`,
              "&:hover": {
                bgcolor: palette.terracottaDark,
                boxShadow: `0 12px 32px ${palette.terracottaDark}50`,
              },
            }}
          >
            Explore Catalogly
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
