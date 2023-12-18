import * as React from "react";
import { Stack, Button, Typography,Box,Avatar } from "@mui/material";
import { BedroomChild,BedroomParent } from "@mui/icons-material";
import priceFormat from "../../services/priceFormat";
function RoomButton({room}) {
  return (
    <Box sx={{maxWidth:'200px',border:1,borderRadius:2}}>
        <Stack direction="row" spacing={2}sx={{maxWidth:'200px',justifyContent:'center',alignItems:'center',paddingTop:'8px',paddingBottom:'8px'}}>
            <Avatar>{room.room_Number}</Avatar>
            <Stack direction={'column'} spacing={1}>
                <Stack direction={'row'} sx={{alignItems:'center'}} spacing={1}>
                    <Typography>{room.single_Bed}</Typography>
                    <BedroomChild />
                    <Typography>-</Typography>
                    <Typography>{room.double_Bed}</Typography>
                    <BedroomParent />
                </Stack>
                <Typography>{priceFormat(room.price)} VND</Typography>
            </Stack>
        </Stack>
    </Box>
  );
}

export default RoomButton;
