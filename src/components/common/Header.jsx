import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Autocomplete,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "lightsurfacelevel-1" }}>
      <Toolbar sx={{ justifyContent: "space-between", px: 8, py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<img src="/trailing-icon.svg" alt="icon" />}
          >
            ورود / ثبت نام
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Button color="primary">درباره ما</Button>
          <Button color="primary">رویدادها</Button>
          <Button color="secondary">صفحه اصلی</Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Autocomplete
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="جستجوی شهر"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Autocomplete
              options={[]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="جستجوی رویداد"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Box>
          <img src="/logo.svg" alt="Logo" width={120} height={48} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;