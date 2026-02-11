import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import HeroBanner from "../components/HeroBanner";

const pageVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="show"
      style={{ width: "100%" }}
    >
      <Box
        sx={{
          width: "100%",
          "& > section": {
            maxWidth: 1200,
            mx: "auto",
          },
        }}
      >
        <HeroBanner />
      </Box>
    </motion.div>
  );
}
