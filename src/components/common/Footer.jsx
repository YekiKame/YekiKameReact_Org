import React from "react";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "lightprimarya-24", py: 6 }}>
      <Container>
        <Box sx={{ textAlign: "center" }}>
          <img src="/logo5.svg" alt="Logo" />
          <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
            «یکی کمه» با هدف ساده‌تر کردن ایجاد و مدیریت رویدادها طراحی شده
            است. به راحتی افراد مناسب برای فعالیت‌های خود را پیدا کنید و لحظاتی
            فراموش‌نشدنی بسازید. ما همواره در کنار شما هستیم!
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <TwitterIcon fontSize="large" />
            <TelegramIcon fontSize="large" />
            <InstagramIcon fontSize="large" />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
          >
            <Button color="primary">درباره ما</Button>
            <Divider orientation="vertical" flexItem />
            <Button color="primary">رویدادها</Button>
            <Divider orientation="vertical" flexItem />
            <Button color="secondary">صفحه اصلی</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;