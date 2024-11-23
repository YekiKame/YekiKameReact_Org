import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import TimerIcon from "@mui/icons-material/Timer";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

const EventCard = ({ image, title, time, participants, location, category }) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TimerIcon />
          <Typography variant="caption">{time}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PersonIcon />
          <Typography variant="caption">{participants}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon />
          <Typography variant="caption">{location}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SportsSoccerIcon />
          <Typography variant="caption">{category}</Typography>
        </Box>
        <Button variant="contained" color="primary" fullWidth>
          عضو شدن
        </Button>
      </CardContent>
    </Card>
  );
};

export default EventCard;