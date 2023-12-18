import * as React from "react";
import { Stack, Button, Box, Grid, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { storageServices } from "../../services/supabase-services/storage-services";
function EditRoomImage({ setIsEdit, isEdit, setSelectedRoom, selectedRoom }) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [files, setFiles] = React.useState([]);
  const [urlFiles, setUrlFiles] = React.useState();
  function handleChange(e) {
    const tempFiles = Object.entries(e.target.files).map((key, value) => {
      return key[1];
    });
    setFiles(tempFiles);
    handleSave(tempFiles);
  }
  function handleRemove(image) {
    const index = files.indexOf(image);
    if (index !== -1) {
      const tempFiles = files.filter((f) => f != image);
      setFiles(tempFiles);
    }
  }
  function handleSave(files) {
    let fileUrls = [];
    files.map((file) => {
      storageServices.uploadFile(file, "Booking", "rooms").then((data) => {
        fileUrls.push(data);
      });
    });
    if (fileUrls.length > 0)
      setSelectedRoom({ ...selectedRoom, images: fileUrls });
    else setSelectedRoom({ ...selectedRoom, images: null });
  }
  return (
    <Box
      sx={{ border: 1, borderRadius: "12px", width: "83%", marginTop: "25px" }}
    >
      <Stack sx={{ marginTop: "25px", marginLeft: "6%" }} spacing={2}>
        <h4 style={{ margin: 0 }}>{` Ảnh phòng(*)`}</h4>

        {isEdit == true && (
          <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
            <Button component="label" variant="contained">
              Chọn ảnh
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
              />
            </Button>
            <p>File ảnh không có kết quả</p>
          </Stack>
        )}
        <Box
          style={{ marginBottom: "35px" }}
          sx={{
            border: 1,
            borderRadius: "12px",
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "120px",
          }}
        >
          <Grid
            container
            sx={{
              maxWidth: "90%",
              justifyContent: "start",
              alignItems: "center",
              marginTop: "2px",
              marginLeft: "3%",
              marginBottom: "12px",
            }}
            rowSpacing={2}
          >
            {files.length > 0 &&
              files.map((file) => (
                <Grid key={file.name} item lg={12 / 7}>
                  <img
                    src={URL.createObjectURL(file)}
                    style={{
                      height: "82px",
                      aspectRatio: 1,
                      objectFit: "cover",
                    }}
                  ></img>
                  <IconButton
                    onClick={() => {
                      handleRemove(file);
                    }}
                    sx={{ position: "relative" }}
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              ))}
            {isEdit == false &&
              selectedRoom.images.length > 0 &&
              selectedRoom.images.map((c) => {
                return (
                  <Grid key={c} item lg={12 / 7}>
                    <img
                      src={c}
                      style={{
                        height: "82px",
                        aspectRatio: 1,
                        objectFit: "cover",
                      }}
                    ></img>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

export default EditRoomImage;
