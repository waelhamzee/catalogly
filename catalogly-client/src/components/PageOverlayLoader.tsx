import Box from "@mui/material/Box";

export default function PageOverlayLoader() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}  
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          "& > span": {
            width: 8,
            height: 8,
            borderRadius: "50%",
            bgcolor: "primary.main",
            animation: "pulse 1.4s ease-in-out infinite both",
            "&:nth-of-type(1)": { animationDelay: "-0.32s" },
            "&:nth-of-type(2)": { animationDelay: "-0.16s" },
          },
          "@keyframes pulse": {
            "0%, 80%, 100%": { transform: "scale(0.6)", opacity: 0.5 },
            "40%": { transform: "scale(1)", opacity: 1 },
          },
        }}
      >
        <Box component="span" />
        <Box component="span" />
        <Box component="span" />
      </Box>
    </Box>
  );
}
