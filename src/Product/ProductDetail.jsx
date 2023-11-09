import React, { useState } from "react";
import "./productDetails.css";

//todo <----------------------Material Ui components--------------------------->

import CloseIcon from "@mui/icons-material/Close";

const ProductDetail = () => {
  //todo <----------------------useStates hooks--------------------------->

  const [rows] = useState([]);
  const [productIdValue, setProductIdValue] = useState(0);
  const [fileEvent, setFileEvent] = useState(undefined);
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productFile, setProductFile] = useState("");

  //todo <---------------------- fill all data and enter in Condition--------------------------->

  if (
    productIdValue > 0 &&
    productName !== "" &&
    productQty > 0 &&
    productPrice > 0 &&
    productFile !== "" &&
    productFile !== null
  ) {
    setTimeout(() => {
      let saveBtn = document.querySelector(".saveBtn");
      saveBtn.style.backgroundColor = "rebeccapurple";
      saveBtn.style.color = "white";
      saveBtn.disabled = false;
    }, 1000);
  }

  //todo <---------------------- file onchange Handler--------------------------->

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When the file is loaded, set it as the image state
        setProductFile(reader.result);
      };
      reader.readAsDataURL(file); // Convert the file to data URL

      setFileEvent(event);
    }
  };

  //todo <---------------------- from submit Handler--------------------------->

  function formSubmitHandler(e) {
    e.preventDefault();
    if (
      productIdValue > 0 &&
      productName !== "" &&
      productQty > 0 &&
      productPrice > 0 &&
      productFile !== ""
    ) {
      let form = document.querySelector("form");
      let table = document.querySelector("table");
      let addNewProductBtn = document.querySelector(".addnewproductBtn");
      let h1 = document.querySelector(".main_heading");

      h1.style.filter = "blur(0px)";
      table.style.filter = "blur(0px)";
      addNewProductBtn.style.display = "block";
      form.style.display = "none";

      rows.push({
        id: productIdValue,
        productName: productName,
        qty: productQty,
        price: productPrice,
        imgUrl: productFile,
      });

      setProductName("");
      setProductQty(0);
      setProductPrice(0);
      setProductFile("");
      if (fileEvent !== undefined) {
        setTimeout(() => {
          const emptyFile = (fileEvent.target.value = null);
          setProductFile(emptyFile);
        }, 500);
      }

      if (true) {
        //todo  button again disabled

        let saveBtn = document.querySelector(".saveBtn");
        saveBtn.style.backgroundColor = "rgb(209, 209, 209)";
        saveBtn.style.color = "rgb(168, 168, 168)";
        saveBtn.disabled = true;
      }
    } else {
      return;
    }
  }

  //todo <----------------------Add Product Handler--------------------------->

  const addNewProduct = () => {
    let form = document.querySelector("form");
    let table = document.querySelector("table");
    let addNewProductBtn = document.querySelector(".addnewproductBtn");
    let h1 = document.querySelector(".main_heading");

    h1.style.filter = "blur(4px)";

    table.style.filter = "blur(4px)";
    addNewProductBtn.style.display = "none";
    form.style.display = "block";
    const ids = rows.reduce((acc, ele) => {
      return (acc = acc + 1);
    }, 1);

    setProductIdValue(ids);
  };

  //todo <----------------------cross btn handler--------------------------->

  const closeFormHandler = () => {
    let form = document.querySelector("form");
    let table = document.querySelector("table");
    let addNewProductBtn = document.querySelector(".addnewproductBtn");
    let h1 = document.querySelector(".main_heading");

    h1.style.filter = "blur(0px)";
    table.style.filter = "blur(0px)";
    addNewProductBtn.style.display = "block";
    form.style.display = "none";
  };

  return (
    <>
      <div id="main_container">
        <h1 className="main_heading">
          {`Total Products are`} <span>{rows.length}</span>
        </h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 &&
              rows.map((ele) => (
                <tr key={ele.id}>
                  <td>{ele.id}</td>
                  <td>{ele.productName}</td>
                  <td>{ele.qty}</td>
                  <td>{ele.price}</td>
                  <td>
                    <img
                      src={ele.imgUrl}
                      alt="profile"
                      width={100}
                      style={{ borderRadius: "10px" }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button className="addnewproductBtn" onClick={addNewProduct}>
          Add Product
        </button>
        <div className="form_Container">
          <form onSubmit={formSubmitHandler}>
            <CloseIcon onClick={closeFormHandler} className="closeBtn" />
            <input
              required
              value={productIdValue}
              type="number"
              placeholder="Enter Id"
              readOnly
            />
            <input
              required
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
              type="string"
              placeholder="Enter Product Name"
            />
            <input
              required
              onChange={(e) => setProductQty(parseInt(e.target.value))}
              value={productQty > 0 ? productQty : ""}
              type="number"
              placeholder="Enter Product Quantity"
            />
            <input
              required
              onChange={(e) => setProductPrice(parseInt(e.target.value))}
              value={productPrice > 0 ? productPrice : ""}
              type="number"
              placeholder="Enter Price"
            />
            <input required onChange={handleFileChange} type="file" />
            <button type="submit" disabled className="saveBtn">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
