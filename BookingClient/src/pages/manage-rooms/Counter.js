import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";

function Counter({ sx, setIsEdit, isEdit,value,onChange }) {
  const [count, setCount] = React.useState(value !=null ?value :0);
  const handlePlus=()=>{
    setCount(count+1);
    onChange(count+1);
  }
  const handleMinus=()=>{ 
    if(count-1>=0){
      setCount(count-1);
      onChange(count-1);
    }
  }
  return (
    <Box sx={{ ...sx }}>
      <Stack direction={"row"} spacing={3}>
        {isEdit == true && (
          <>
            <div style={{cursor:'pointer'}} onClick={()=>{handleMinus()}}>
              <Typography sx={{ fontSize: "20px" }}>-</Typography>
            </div>
            <div>
              <Typography sx={{ fontSize: "16px" }}>{count}</Typography>
            </div>
            <div style={{cursor:'pointer'}} onClick={()=>{handlePlus()}}>
              <Typography sx={{ fontSize: "20px" }}>+</Typography>
            </div>
          </>
        )}
        {isEdit == false && (
          <div>
            <Typography sx={{ fontSize: "16px" }}>{value}</Typography>
          </div>
        )}
      </Stack>
    </Box>
  );
}
export default Counter;
