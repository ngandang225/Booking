import * as React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";

function AddDialog(props) {
  const { onClose, open, content, input, validateInput, handleAction, onChange } = props;

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: { sm: "100%", md: "60%", lg: "40%" },
          maxHeight: 600,
        },
      }}
      open={open}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle>{content.title}</DialogTitle>
      <IconButton
        aria-label="close"
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={onClose}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        dividers
        sx={{
          padding: "32px 52px",
        }}
      >
        <Box>
          <InputLabel
            required
            htmlFor="name"
            error={input.errorMessage !== ""}
          >
            {`${content.label}:`}
          </InputLabel>
          <OutlinedInput
            value={input.value}
            onChange={onChange}
            onBlur={validateInput}
            error={input.errorMessage !== ""}
            fullWidth
            required
            id="name"
            type="text"
          ></OutlinedInput>
          <FormHelperText error={input.errorMessage !== ""}>
            {input.errorMessage !== ""
              ? input.errorMessage
              : content.description}
          </FormHelperText>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            boxShadow: "none",
          }}
          onClick={handleAction}
        >
          {content.action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDialog;
