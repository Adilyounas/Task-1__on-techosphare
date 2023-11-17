import { Box, Button, Dialog, TextField } from "@mui/material";
import React from "react";

const EditRowForm = (props) => {
  const {
    editRowData,
    editFormOpen,
    setEditFormOpen,
    editFormChangeHandler,
    editRowFormSubmitHandler,
    editFormData,
    updateDisabled,
  } = props;

  return (
    <>
      <Dialog
        open={editFormOpen}
        onClose={() => setEditFormOpen(!editFormOpen)}
      >
        <Box
          component={"div"}
          width={"450px"}
          maxWidth={"460px"}
          minWidth={"360px"}
        >
          <Box
            component={"form"}
            onSubmit={editRowFormSubmitHandler}
            style={{
              padding: "30px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <TextField
              id="id"
              type="string"
              defaultValue={editRowData.id}
              fullWidth
            />

            <TextField
              id="name"
              label="Enter Name"
              type="string"
              value={editFormData.name}
              onChange={editFormChangeHandler}
              fullWidth
            />

            <TextField
              id="qty"
              type="number"
              label="Enter Quantity"
              value={editFormData.qty}
              onChange={editFormChangeHandler}
              fullWidth
            />

            <TextField
              id="price"
              type="number"
              label="Enter Price"
              value={editFormData.price}
              onChange={editFormChangeHandler}
              fullWidth
            />

            <Box
              width={"100%"}
              gap={2}
              display={"flex"}
              overflow={"auto"}
              id="formImages"
            >
              {editFormData.file &&
                editFormData.file.map((ele, index) => (
                  <div key={index}>
                    <img
                      src={ele}
                      alt=""
                      width={"70px"}
                      style={{ borderRadius: "7px" }}
                    />
                  </div>
                ))}
            </Box>

            <TextField
              id="file"
              type="file"
              inputProps={{
                multiple: true,
                accept: "image/jpeg", // Specify the accepted file types (e.g., JPEG)
              }}
              style={{ display: "none" }}
              onChange={editFormChangeHandler}
              fullWidth
            />
            <label
              htmlFor="file"
              style={{ cursor: "pointer", padding: "20px 0" }}
            >
              <Button variant="contained" color="primary" component="span">
                Choose File
              </Button>
            </label>

            <Button
              id="updateBtn"
              disabled={updateDisabled}
              type="submit"
              variant="contained"
            >
              Update
            </Button>
            <Button variant="contained">Close</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default EditRowForm;
