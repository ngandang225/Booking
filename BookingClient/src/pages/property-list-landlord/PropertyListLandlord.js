import * as React from "react";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import "./PropertyListLandlord.scss";
import { propertyServices } from "../../services/property-services/propertyService";
import AddDialog from "../../shared/add-dialog/AddDialog";
import PropertyItem from "./property-item/PropertyItem";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";

function PropertyListLandlord() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [nameInput, setNameInput] = React.useState({
    value: "",
    errorMessage: "",
  });
  const [properties, setProperties] = React.useState(null);

  React.useEffect(() => {
    propertyServices.getAllByUserId(user.id).then((data) => {
      setProperties(data);
    });
  }, []);

  // Set input value
  const handleChangeInput = (event) => {
    setNameInput({ ...nameInput, value: event.target.value });
  };
  // Validate property name input
  const validateName = () => {
    if (nameInput.value === "") {
      setNameInput({
        ...nameInput,
        errorMessage: "Vui lòng điền tên chỗ nghỉ",
      });
      return false;
    }
    setNameInput({ ...nameInput, errorMessage: "" });
    return true;
  };
  const dialogContent = {
    title: "Chỗ nghỉ mới của bạn",
    label: "Tên chỗ nghỉ",
    action: "Tạo chỗ nghỉ mới",
    description: "Nhập tên chỗ nghỉ ở đây",
  };

  const addNewProperty = () => {
    if (validateName()) {
      // Request to create
      let property = {
        owner_Id: user.id,
        name: nameInput.value,
      };
      propertyServices.createProperty(property).then((data) => {
        if (data.constructor === String && data === "Property existed") {
          setNameInput({
            ...nameInput,
            errorMessage: "Tên chỗ nghỉ đã tồn tại.",
          });
        } else if (data.constructor === Object) {
          setOpen(false);
          // Direct to edit page
          // ...
        }
      });
    }
  };
  return (
    <div id="property-list-landlord-wrapper">
      <Typography variant="h4" className="title">
        Các chỗ nghỉ mà bạn sở hữu tại Travel Ease
      </Typography>
      <Button
        className="add-btn"
        variant="contained"
        sx={{
          backgroundColor: "primary.main",
          boxShadow: "none",
        }}
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Chỗ nghỉ mới
      </Button>
      <Box id="property-list-container">
        {properties &&
          properties.map((property, index) => (
            <div className="property-item">
              <PropertyItem key={index} property={property} />
            </div>
          ))}
      </Box>
      <AddDialog
        open={open}
        onClose={() => setOpen(false)}
        content={dialogContent}
        input={nameInput}
        onChange={handleChangeInput}
        validateInput={validateName}
        handleAction={addNewProperty}
      />
    </div>
  );
}
export default PropertyListLandlord;
