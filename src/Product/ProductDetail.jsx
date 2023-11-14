import React, {  useState } from "react";

//todo <----------------------Other file imports--------------------------->
import UpdateProduct from "./UpdateProduct/UpdateProduct";
import "./productDetails.css";

//todo <----------------------Material Ui components--------------------------->

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

//todo <----------------------Install libraries other than material ui--------------------------->
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
let generatedId = "";
let getRowDataSessionStorage = JSON.parse(window.sessionStorage.getItem("rows"));
let sessionStorageData

if (getRowDataSessionStorage) {
  sessionStorageData = getRowDataSessionStorage
  
}else{
  sessionStorageData = []
}

const ProductDetail = () => {
  //todo <----------------------useStates hooks--------------------------->

  //  JSON.parse(window.sessionStorage.getItem("rows"));
  // const row = useMemo(() => {
  // }, []);

  const [rows,setRows] = useState(sessionStorageData);

  const [images, setImages] = useState([]);
  const [userSelectFile, setUserSelectFile] = useState(false);
  const [productIdValue, setProductIdValue] = useState("");
  const [productName, setProductName] = useState("");
  const [productQty, setProductQty] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [filteredValuesState, setFilterValuesState] = useState([]);

  //todo <----use variable like useState hook so that code use it many time with different values------>
  let productIdMatched = false;
  //I am using this as a useState hook because if i use dirrectly useState hook then i was give me too many randers error

  //todo <---------------------- fill all data and enter in Condition--------------------------->

  //*  1-- if there is no matched value
  //*  2-- if value enter is greater than 0
  //*  3-- if name is not empty
  //*  4-- if qty and price is greater than 0
  //*  5-- if user select a file from computer it means he change the file so userSelectFile will be true in this case

  //todo------------if the above conditions are satisfied then enable the Save button------------>
  if (
    productIdMatched !== true &&
    productName !== "" &&
    productQty > 0 &&
    productPrice > 0 &&
    userSelectFile &&
    images.length > 0
  ) {
    setTimeout(() => {
      let saveBtn = document.querySelector("#saveBtn");
      saveBtn.style.backgroundColor = "rebeccapurple";
      saveBtn.style.color = "white";
      saveBtn.disabled = false;
    }, 1000);
  } else {
    let saveBtn = document.querySelector("#saveBtn");
    if (saveBtn !== null) {
      saveBtn.style.backgroundColor = "rgb(209, 209, 209)";
      saveBtn.style.color = "rgb(168, 168, 168)";
      saveBtn.disabled = true;
    }
  }

  //todo <---------------------- file onchange Handler--------------------------->

  const handleFileChange = (event) => {
    const files = event.target.files; // Get the selected files
    const newFiles = Array.from(files);
    setImages([]); //if there are some files present there than clear them
    setUserSelectFile(true); //condition satisfied now enable the btn

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  //todo <---------------------- from submit Handler--------------------------->

  function formSubmitHandler(e) {
    e.preventDefault();

    //* 1--- if there is something in the rows then enter in and check wheather if there is an id in rows which may be equal to the id that user trying to enter than in that scenerio ( productIdMatched = true;) which indicate the positive sign of another id so

    if (rows.length > 0) {
      rows.forEach((ele) => {
        if (ele.id === productIdValue) {
          productIdMatched = true;
          return;
        }
      });
    }

    //* now we will satisfy all the conditions if true submit the form with values that user enter, if not through an error

    if (
      productIdMatched === false &&
      productName !== "" &&
      productQty > 0 &&
      productPrice > 0 &&
      userSelectFile
    ) {
      let form = document.querySelector("form");
      let table = document.querySelector("table");
      let addNewProductBtn = document.querySelector(".addnewproductBtn");
      let h1 = document.querySelector(".main_heading");
      let formContainer = document.querySelector(".form_Container");

      h1.style.filter = "blur(0px)";
      table.style.filter = "blur(0px)";
      addNewProductBtn.style.display = "block";
      form.style.display = "none";
      formContainer.style.zIndex = -1;

      let obj = {
        id: productIdValue,
        productName: productName,
        qty: productQty,
        price: productPrice,
        imagesUrl: images,
      };

      // setRows((old) => [...old, obj]);
      rows.push(obj);

      let strRows = JSON.stringify(rows);
      window.sessionStorage.setItem("rows", strRows);

      setProductName("");
      setProductQty(0);
      setProductPrice(0);
      setImages([]);

      // if (row && row.length) {
      //   setRows(row);
      // }

      if (true) {
        //* this code will turn button again disabled, automatically if the form is submited

        let saveBtn = document.querySelector("#saveBtn");
        saveBtn.style.backgroundColor = "rgb(209, 209, 209)";
        saveBtn.style.color = "rgb(168, 168, 168)";
        saveBtn.disabled = true;
      }
    } else {
      toast.error("Id Exist Try an Other", { duration: 5000 });

      productIdMatched = false;
    }
  }

  //todo <----------------------Add Product Handler--------------------------->

  //* This code indicate that if user click on the add new Product button than background will be blur,hide or change indexes, so that the form will show clearly

  const addNewProduct = () => {
    generatedId = uuidv4();

    setProductIdValue(generatedId);
    let form = document.querySelector("form");
    let formContainer = document.querySelector(".form_Container");
    let addNewProductBtn = document.querySelector(".addnewproductBtn");
    let table = document.querySelector("table");
    let h1 = document.querySelector(".main_heading");

    h1.style.filter = "blur(4px)";
    table.style.filter = "blur(4px)";
    addNewProductBtn.style.display = "none";
    formContainer.style.zIndex = 1;
    form.style.display = "block";
  };

  //todo <----------------------cross btn handler--------------------------->

  //* This code indicate that if user click on the close button than background who was blur,hide or change indexes, should be normal

  const closeFormHandler = () => {
    let form = document.querySelector("form");
    let table = document.querySelector("table");
    let addNewProductBtn = document.querySelector(".addnewproductBtn");
    let h1 = document.querySelector(".main_heading");
    let formContainer = document.querySelector(".form_Container");

    formContainer.style.zIndex = -1;
    h1.style.filter = "blur(0px)";
    table.style.filter = "blur(0px)";
    addNewProductBtn.style.display = "block";
    form.style.display = "none";
  };

  //todo <----------------------row edit handler--------------------------->

  //* 1---if user click on edit button the whole row will store in filteredValue which is a clicked data and further set state accordingly
  //* 2---if user click on edit button unneccessary things will blur,change indexes or hide

  const editFormHandler = (id) => {
    const filteredValue = rows.find((ele) => {
      return ele.id === id;
    });

    setFilterValuesState(filteredValue);

    let form2Container = document.querySelector("#updateProduct_Container");
    let addNewProductBtn = document.querySelector(".addnewproductBtn");
    let table = document.querySelector("table");
    let h1 = document.querySelector(".main_heading");
    let lable2 = document.querySelector("#lable2");
    let form2 = document.querySelector("#form2");

    lable2.style.display = "block";
    h1.style.filter = "blur(4px)";
    table.style.filter = "blur(4px)";
    form2Container.style.zIndex = 0;
    addNewProductBtn.style.display = "none";
    form2.style.display = "block";
  };

  //* This code indicate that click row will be deleted from rows state

  const deleteItemHandler = (id) => {
    const filteredValue = rows.filter((ele) => {
      return ele.id !== id;
    });
    // setRows(filteredValue);

    let strRows = JSON.stringify(filteredValue);
    window.sessionStorage.setItem("rows", strRows);
  };

  // React.useEffect(() => {
  //   setRows(getRowDataSessionStorage);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [getRowDataSessionStorage]); // Only run once after initial render


  return (
    <>
      <div id="main_container">
        <h1 className="main_heading">
       
          
        </h1>
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Picture</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {rows && rows.length > 0 &&
              rows.map((ele, index) => (
                <tr key={ele.id}>
                  <td>{index + 1}</td>
                  <td>{ele.productName ? ele.productName : ""}</td>
                  <td>{ele.qty ? ele.qty : 0}</td>
                  <td>{ele.price ? ele.price : 0}</td>
                  <td>
                    <img
                      src={ele.imagesUrl[0]}
                      alt="profile"
                      width={100}
                      style={{ borderRadius: "5px" }}
                    />
                  </td>
                  <td>
                    <EditIcon
                      className="editIcon"
                      onClick={() => editFormHandler(ele.id)}
                    />
                  </td>
                  <td>
                    <DeleteIcon
                      className="deleteIcon"
                      onClick={() => deleteItemHandler(ele.id)}
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
          <form onSubmit={formSubmitHandler} id="form1">
            <CloseIcon onClick={closeFormHandler} className="closeBtn" />
            <input
              value={productIdValue}
              readOnly
              type="string"
              placeholder="Enter Id"
            />
            <input
              required
              onChange={(e) => setProductName(e.target.value)}
              value={productName === "" ? "" : productName}
              type="string"
              placeholder="Enter Product Name"
              maxLength="35"
            />
            <input
              required
              onChange={(e) => setProductQty(parseInt(e.target.value))}
              value={productQty > 0 ? productQty : ""}
              type="number"
              placeholder="Enter Product Quantity"
              max={"1000"}
            />
            <input
              required
              onChange={(e) => setProductPrice(parseFloat(e.target.value))}
              value={productPrice > 0 ? productPrice : ""}
              type="number"
              placeholder="Enter Price"
              max={"1000000"}
            />
            <div id="updateProductImages_div">
              <div>
                {images &&
                  images.map((ele, index) => (
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
            <label id="lebel1" htmlFor="fileInput2">
              Choose File
            </label>
            <input
              multiple
              required
              onChange={handleFileChange}
              id="fileInput2"
              type="file"
            />
            <button type="submit" disabled id="saveBtn" className="saveBtn">
              Save
            </button>
          </form>
        </div>
        <UpdateProduct
          rows={sessionStorageData}
          setRows={setRows}
          filteredValuesState={filteredValuesState}
        />
      </div>
    </>
  );
};

export default ProductDetail;
