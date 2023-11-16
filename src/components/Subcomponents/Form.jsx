import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import React from "react";
import "./Form.css";

const Form = (props) => {
  const {
    formOpen,
    setFormClose,
    dialogHandler,
    dialogChangeHandler,
    formData,
    dialogSubmitHandler,
    disabled,
  } = props;

  return (
    <Dialog onClose={() => setFormClose(false)} open={formOpen}>
      <Box
        component={"div"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        px={4}
        py={2}
        width={"450px"}
        maxWidth={"460px"}
        minWidth={"360px"}
      >
        <Box component={"div"}>
          <Typography style={{ padding: "20px 0" }} variant="h4">
            Add Product
          </Typography>
          <Box component={"form"} paddingBottom={"30px"}>
            <Box
              component={"div"}
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              width={"360px"}
            >
              <TextField
                id="id"
                label="ID"
                type="string"
                value={formData.id}
                variant="outlined"
                fullWidth
              />
              <TextField
                id="name"
                label="name"
                type="string"
                value={formData.name}
                variant="outlined"
                onChange={dialogChangeHandler}
                fullWidth
              />
              <TextField
                id="qty"
                label="Quantity"
                inputProps={{ min: "0" }}
                type="number"
                value={formData.qty}
                variant="outlined"
                onChange={dialogChangeHandler}
                fullWidth
              />
              <TextField
                id="price"
                label="Price"
                type="number"
                inputProps={{ min: "0" }}
                value={formData.price}
                variant="outlined"
                onChange={dialogChangeHandler}
                fullWidth
              />

              <Box
                width={"100%"}
                gap={2}
                display={"flex"}
                overflow={"auto"}
                id="formImages"
              >
                {formData.file &&
                  formData.file.map((ele) => (
                    <div>
                      <img src={ele} alt="" width={"70px"} style={{borderRadius:"7px"}}/>
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
                value={formData.imgUrl}
                style={{ display: "none" }}
                onChange={dialogChangeHandler}
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
            </Box>

            <Button
              onClick={dialogSubmitHandler}
              variant="contained"
              type="submit"
              id="saveBtn"
              disabled={disabled}
            >
              Save
            </Button>
            <Button
              style={{ margin: "0px 20px" }}
              onClick={dialogHandler}
              variant="contained"
            >
              Close
            </Button>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default Form;
