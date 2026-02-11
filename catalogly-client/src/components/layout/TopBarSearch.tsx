import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";
import { useState } from "react";
import BookSearchAutocomplete from "../../features/books/components/BookSearchAutocomplete";

export default function TopBarSearch() {
  const { query: queryParam } = useParams<"query">();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const searchKey = queryParam ?? "empty";

  return (
    <>
      <Tooltip title="Search books">
        <IconButton
          aria-label="Search books"
          onClick={() => setMobileSearchOpen(true)}
          sx={{
            display: { xs: "flex", md: "none" },
            order: 3,
          }}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flex: "0 0 auto",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          minWidth: 0,
          width: { md: 370, lg: 560 },
          order: 3,
        }}
      >
        <BookSearchAutocomplete key={searchKey} />
      </Box>

      <Collapse
        in={mobileSearchOpen}
        timeout={300}
        sx={{
          width: "100%",
          order: 10,
          flexBasis: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            py: 1.5,
            px: 0.5,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <BookSearchAutocomplete key={`mobile-${searchKey}`} />
          </Box>
          <IconButton
            onClick={() => setMobileSearchOpen(false)}
            aria-label="Close search"
            size="small"
            sx={{ flexShrink: 0 }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Collapse>
    </>
  );
}
