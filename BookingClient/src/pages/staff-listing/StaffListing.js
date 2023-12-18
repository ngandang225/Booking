import * as React from "react";
import "./StaffListing.scss";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import { propertyServices } from "../../services/property-services/propertyService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddDialog from "../../shared/add-dialog/AddDialog";
function StaffListing() {
  let { propertyId } = useParams();
  const [property, setProperty] = useState({});
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [newStaffEmail, setNewStaffEmail] = useState({
    value: "",
    errorMessage: "",
  });
  const content = {
    title: "Nhân viên mới",
    label: "Email tài khoản",
    description: "Vui lòng nhập email đã đăng ký tài khoản",
    action: "Thêm nhân viên",
  };
  const submitNewStaff = () => {
    //send request
    propertyServices
      .addStaffs(property.id, newStaffEmail.value)
      .then((data) => {
        //if error, setNewStaffEmail({...newStaffEmail, errorMessage: error})
        if (data.constructor === String) {
          if (data === "User not existed") {
            setNewStaffEmail({
              ...newStaffEmail,
              errorMessage: "Email chưa được đăng ký tài khoản",
            });
          } else {
            setNewStaffEmail({
              ...newStaffEmail,
              errorMessage: "Thêm không thành công, vui lòng thử lại",
            });
          }

          //if success, setProperty, setRows, setRowSelectionModel, setOpen(false);
        } else {
          setProperty(data);
          setRows(data.staffs);
          setRowSelectionModel([]);
          setOpen(false);
        }
      });
  };
  const validateEmail = () => {
    if (newStaffEmail.value === "") {
      setNewStaffEmail({
        ...newStaffEmail,
        errorMessage: "Vui lòng nhập email",
      });
    } else setNewStaffEmail({ ...newStaffEmail, errorMessage: "" });
  };
  useEffect(() => {
    propertyServices.getByIdWithStaffs(propertyId).then((data) => {
      setProperty(data);
      setRows(
        data.staffs.map((s) => {
          return {
            id: s.id,
            fullName: s.fullname,
            gender: s.gender,
            phoneNumber: s.phoneNumber,
            email: s.email,
            address: s.address,
            accountName: s.username,
          };
        })
      );
    });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "fullName", headerName: "Tên nhân viên", width: 200 },
    { field: "gender", headerName: "Giới tính", width: 100 },
    { field: "phoneNumber", headerName: "Số điện thoại", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "address", headerName: "Địa chỉ", width: 250 },
    { field: "accountName", headerName: "Tên tài khoản", width: 150 },
  ];

  const deleteStaffs = () => {
    const users = rowSelectionModel.map((item) => {
      let staff = property.staffs.find((s) => s.id === item);
      if (staff === undefined) return null;
      return staff;
    });
    console.log(property);
    propertyServices.deleteStaffs(property.id, users).then((data) => {
      if (data.constructor === String && data === "Property does not exists") {
        console.log("error");
        //báo lỗi
      } else if (data.constructor === Object) {
        //delete thành công
        setProperty(data);
        setRows(
          data.staffs.map((s) => {
            return {
              id: s.id,
              fullName: s.fullname,
              gender: s.gender,
              phoneNumber: s.phoneNumber,
              email: s.email,
              address: s.address,
              accountName: s.username,
            };
          })
        );
        setRowSelectionModel([]);
      }
    });
  };
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  return (
    <div className="staff-listing">
      <h2 className="title">THÔNG TIN NHÂN VIÊN</h2>
      <div className="motto">
        Khách sạn Phân Ương - Khách sạn tình yêu số 1 Đà Lạt
      </div>
      <div className="taskRow">
        <div className="num-of-selected-staffs">
          {rowSelectionModel.length} nhân viên được chọn
        </div>
        {rowSelectionModel.length > 0 && (
          <Button
            variant="outlined"
            startIcon={<DeleteOutlineIcon />}
            onClick={deleteStaffs}
          >
            Xoá nhân viên
          </Button>
        )}
        <Button
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Nhân viên mới
        </Button>
      </div>
      <div className="staffsGrid">
        <DataGrid
          columnVisibilityModel={{
            // Hide columns status and traderName, the other columns will remain visible
            id: false,
          }}
          rows={rows}
          columns={columns}
          initialState={{}}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          hideFooterPagination
          hideFooterSelectedRowCount
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
            console.log(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
        />
      </div>
      <AddDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        content={content}
        input={newStaffEmail}
        onChange={(event) => {
          setNewStaffEmail({ ...newStaffEmail, value: event.target.value });
        }}
        handleAction={submitNewStaff}
        validateInput={validateEmail}
      />
    </div>
  );
}
export default StaffListing;
