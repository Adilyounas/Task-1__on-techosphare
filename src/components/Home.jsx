import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import CustomTable from "./Subcomponents/CustomTable";
import Form from "./Subcomponents/Form";
import { v4 as uuidv4 } from "uuid";
import EditRowForm from "./Subcomponents/EditRowForm";

const Home = () => {
  const key = "data";

  const existingDataString = window.sessionStorage.getItem(key);
  const existingData = existingDataString ? JSON.parse(existingDataString) : [];

  const [disabled, setDisabled] = useState(true);
  const [updateDisabled, setUpdateDisabled] = useState(true);

  const [formOpen, setFormClose] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const [ItemDelete, setItemDelete] = useState(false);
  const [editRowData, setEditRowData] = useState({});

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    qty: "",
    file: [],
  });

  if (
    formData.id !== "" &&
    formData.name !== "" &&
    formData.price !== "" &&
    formData.qty !== "" &&
    formData.file.length > 0
  ) {
    setTimeout(() => {
      setDisabled(false);
    }, 1000);
  }
  const [editFormData, setEditFormData] = useState({
    id: "",
    name: "",
    price: "",
    qty: "",
    file: [],
  });


  const dialogHandler = () => {
    setFormClose(!formOpen);
    setFormData((old) => ({ ...old, id: uuidv4() }));
    setFormData((old) => ({
      ...old,
      name: "",
      price: "",
      qty: "",
      file: [],
    }));
    setDisabled(true);

  };

  const dialogChangeHandler = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    if (name === "name" || name === "price" || name === "qty") {
      setFormData((old) => ({ ...old, [name]: value }));
    } else {
      const files = e.target.files;
      let filesData = []; // Create an array to store file data

      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
          let reader = new FileReader();

          reader.onload = () => {
            if (reader.readyState === 2) {
              filesData.push(reader.result);
              if (filesData.length === files.length) {
                setFormData((old) => ({ ...old, file: filesData }));
              }
            }
          };

          reader.readAsDataURL(file);
        });
      }
    }
  };

  const dialogSubmitHandler = (e) => {
    e.preventDefault();
    const key = "data";

    const existingDataString = window.sessionStorage.getItem(key);

    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];

    const newData = [...existingData, formData];
    window.sessionStorage.setItem(key, JSON.stringify(newData));

    setFormData((old) => ({
      ...old,
      id: "",
      name: "",
      price: "",
      qty: "",
      file: [],
    }));

    setDisabled(true);

    dialogHandler();
  };

  ///delete and edit section here

  const deletingRowHandler = (id) => {
    // console.log(id);

    const key = "data";

    const existingDataString = window.sessionStorage.getItem(key);

    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];

    const updateD_AfterDeletion = existingData.filter((ele) => {
      return ele.id !== id;
    });

    window.sessionStorage.setItem(key, JSON.stringify(updateD_AfterDeletion));

    setItemDelete(!ItemDelete);
  };

  const editRowHandler = (ele) => {
    setEditRowData(ele);
    setEditFormData((old) => ({
      ...old,
      id: ele.id,
      name: ele.name,
      price: ele.price,
      qty: ele.qty,
      file: ele.file,
    }));
    setEditFormOpen(!editFormOpen);
    setUpdateDisabled(true)
  };

  const editFormChangeHandler = (e) => {
    const name = e.target.id;
    const value = e.target.value;

    if (
      name === "name" ||
      name === "price" ||
      name === "qty" ||
      name === "file"
    ) {
      setUpdateDisabled(false);
    }

    if (name === "name" || name === "price" || name === "qty") {
      setEditFormData((old) => ({ ...old, [name]: value }));
    } else {
      const files = e.target.files;
      let updateImagesVar = [];
      // console.log(updateImagesVar);

      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              updateImagesVar.push(reader.result);
              if (updateImagesVar.length === files.length) {
                setEditFormData((old) => ({ ...old, file: updateImagesVar }));
              }
            }
          };

          reader.readAsDataURL(file);
        });
      }
    }
  };

  const editRowFormSubmitHandler = (e) => {
    e.preventDefault();
    const key = "data";

    const existingDataString = window.sessionStorage.getItem(key);

    const existingData = existingDataString
      ? JSON.parse(existingDataString)
      : [];

    const deleteItem = existingData.filter((ele) => {
      return ele.id !== editFormData.id;
    });

    window.sessionStorage.clear();

    const newData = [...deleteItem, editFormData];
    window.sessionStorage.setItem(key, JSON.stringify(newData));

    setEditFormOpen(!editFormOpen);
  };

  //todo   <------------------------------------   USEEFFECT ----------------------------------->

  React.useEffect(() => { }, [formOpen, ItemDelete, disabled]);
  return (
    <>
      <Box
        component={"div"}
        width={"50vw"}
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
        margin={"auto"}
        p={"5vh 0"}
      >
        <Button
          style={{ margin: "5vmax 0" }}
          variant="contained"
          onClick={dialogHandler}
        >
          Add Item
        </Button>
        <CustomTable
          deletingRowHandler={deletingRowHandler}
          data={existingData}
          editRowHandler={editRowHandler}
        />

        <EditRowForm
          updateDisabled={updateDisabled}
          editFormChangeHandler={editFormChangeHandler}
          editRowHandler={editRowHandler}
          setEditFormOpen={setEditFormOpen}
          editFormOpen={editFormOpen}
          editRowData={editRowData}
          editRowFormSubmitHandler={editRowFormSubmitHandler}
          editFormData={editFormData}
        />

        <Form
          dialogChangeHandler={dialogChangeHandler}
          dialogHandler={dialogHandler}
          formOpen={formOpen}
          setFormClose={setFormClose}
          data={existingData}
          formData={formData}
          disabled={disabled}
          dialogSubmitHandler={dialogSubmitHandler}
        />
      </Box>
    </>
  );
};

export default Home;
