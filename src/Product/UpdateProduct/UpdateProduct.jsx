import React, { useState } from "react";
import "./updateproduct.css";
import CloseIcon from "@mui/icons-material/Close";

const UpdateProduct = ({ filteredValuesState,setRows,rowsData }) => {
  //todo <----------------------User state hooks--------------------------->
console.log(filteredValuesState);
  const [updateIdValue, setUpdateIdValue] = useState(undefined);
  const [updateProductName, setUpdateProductName] = useState("");
  const [updateProductQty, setUpdateProductQty] = useState(0);
  const [updateProductPrice, setUpdateProductPrice] = useState(0);
  const [updateProductImages, setUpdateProductImages] = useState([]);

  //todo <----   use variable like useState hook so that code use it many time with different values  ------>

  let productIdMatched = false;
  //I am using this as a useState hook because if i use dirrectly useState hook then i was give me too many randers error

  //todo <----------------------   cross btn handler   --------------------------->

  //* This code indicate that if user click on the close button than background who was blur,hide or change indexes, should be norm

  const closeForm2Handler = () => {
    let form2 = document.querySelector("#form2");
    let table = document.querySelector("table");
    let addNewProductBtn = document.querySelector(".addnewproductBtn");
    let h1 = document.querySelector(".main_heading");
    let form2Container = document.querySelector("#updateProduct_Container");
    form2Container.style.zIndex = -1;

    h1.style.filter = "blur(0px)";
    table.style.filter = "blur(0px)";
    addNewProductBtn.style.display = "block";
    form2.style.display = "none";

    //reset all values

    setUpdateIdValue(updateIdValue);
    setUpdateProductName(updateProductName);
    setUpdateProductQty(updateProductQty);
    setUpdateProductPrice(updateProductPrice);
  };

  //todo <----------------------   Load the system images  --------------------------->

  //* This code indicate that updateImagesHandler setting the selected images from computer into updateProductImages

  const updateImagesHandler = (event) => {
    const files = event.target.files; // Get the selected files
    const newFiles = Array.from(files);
    setUpdateProductImages([]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setUpdateProductImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  //todo <----------------------   Form Submit Handler  --------------------------->
  //* This code indicate that values recieving from click on edit button, if there are equal than no problem

  const form2SubmitHandlelr = (e) => {
    e.preventDefault();

    let uniqueId = filteredValuesState.id


    // setRows(removeMatchedVal); //this will remove the the old values

    let obj = {
      id: uniqueId,
      productName:
        updateProductName === ""
          ? filteredValuesState.productName
          : updateProductName,
      qty: updateProductQty === 0 ? filteredValuesState.qty : updateProductQty,
      price:
        updateProductPrice === 0
          ? filteredValuesState.price
          : updateProductPrice,
      imagesUrl:
        updateProductImages.length === 0
          ? filteredValuesState.imagesUrl
          : updateProductImages,
    };

    const rows = JSON.parse(window.sessionStorage.getItem("rows"));
    const removeMatchedVal = rows.filter((ele) => {
      return ele.id !== filteredValuesState.id;
    });

    window.sessionStorage.setItem("rows", JSON.stringify(removeMatchedVal));

    const rows2 = JSON.parse(window.sessionStorage.getItem("rows"));

    // setRows(rows)
    
    
    
    rows2.push(obj);

    
    
    window.sessionStorage.setItem("rows", JSON.stringify(rows2));
    // setRows(rows)
    console.log(rows);
    
    // setRows((old) => [...old, obj]);

    let form2Container = document.querySelector("#updateProduct_Container");
    form2Container.style.zIndex = -1;
    let table = document.querySelector("table");
    let h1 = document.querySelector(".main_heading");
    h1.style.filter = "blur(0px)";
    table.style.filter = "blur(0px)";

    let form2 = document.querySelector("#form2");
    form2.style.display = "none";

    let addNewProductBtn = document.querySelector(".addnewproductBtn");
    addNewProductBtn.style.display = "block";

    let updateBtn = document.querySelector("#updateBtn");
    if (updateBtn !== null) {
      updateBtn.disabled = false;
      updateBtn.style.backgroundColor = "rgb(209, 209, 209)";
      updateBtn.style.color = "rgb(168, 168, 168)";
      updateBtn.disabled = true;
    }

    setUpdateIdValue(undefined);
    setUpdateProductName("");
    setUpdateProductQty(0);
    setUpdateProductPrice(0);
    setUpdateProductImages([]);
  };

  //Enable the button if any of the value change
  if (
    productIdMatched !== false ||
    updateIdValue !== undefined ||
    updateProductName !== "" ||
    updateProductQty !== 0 ||
    updateProductPrice !== 0 ||
    updateProductImages.length > 0 ||
    false
  ) {
    let updateBtn = document.querySelector("#updateBtn");
    if (updateBtn !== null) {
      updateBtn.disabled = false;
      updateBtn.style.backgroundColor = "rebeccapurple";
      updateBtn.style.color = "white";
    }
  } else {
    let updateBtn = document.querySelector("#updateBtn");
    if (updateBtn !== null) {
      updateBtn.disabled = false;
      updateBtn.style.backgroundColor = "rgb(209, 209, 209)";
      updateBtn.style.color = "rgb(168, 168, 168)";
      updateBtn.disabled = true;
    }
  }



  return (
    <div id="updateProduct_Container">
      <form id="form2" onSubmit={form2SubmitHandlelr}>
        <CloseIcon onClick={closeForm2Handler} className="closeBtn" />

        <input
          defaultValue={filteredValuesState.id && filteredValuesState.id}
          readOnly
          type="string"
        />
        <input
          required
          onChange={(e) => setUpdateProductName(e.target.value)}
          defaultValue={
            updateProductName !== ""
              ? updateProductName
              : filteredValuesState.productName &&
                filteredValuesState.productName
          }
          type="string"
          placeholder="Enter Product Name"
          maxLength="35"
        />
        <input
          required
          onChange={(e) => setUpdateProductQty(parseInt(e.target.value))}
          defaultValue={
            updateProductQty !== 0
              ? updateProductQty
              : filteredValuesState.qty && filteredValuesState.qty
          }
          type="number"
          placeholder="Enter Product Quantity"
          max={"1000"}
        />
        <input
          required
          onChange={(e) => setUpdateProductPrice(parseFloat(e.target.value))}
          defaultValue={
            updateProductPrice !== 0
              ? updateProductPrice
              : filteredValuesState.price && filteredValuesState.price
          }
          type="number"
          placeholder="Enter Price"
          max={"1000000"}
        />
        <div id="updateProductImages_div">
          <div>
            {updateProductImages && updateProductImages.length > 0
              ? updateProductImages.map((ele, index) => (
                  <img
                    className="updateproductimgs"
                    src={ele}
                    key={index}
                    alt={index}
                  />
                ))
              : filteredValuesState.imagesUrl &&
                filteredValuesState.imagesUrl.map((ele, index) => (
                  <img
                    className="updateproductimgs"
                    src={ele}
                    key={index}
                    alt={index}
                  />
                ))}
          </div>
          Press Shift and Scroll
        </div>
        {/* <input multiple required onChange={handleFileChange} type="file" /> */}
        <label id="lable2" htmlFor="updatefileInput">
          Choose File
        </label>
        <input
          multiple
          onChange={updateImagesHandler}
          id="updatefileInput"
          type="file"
        />
        <button
          disabled={true}
          type="submit"
          id="updateBtn"
          // className="saveBtn"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
