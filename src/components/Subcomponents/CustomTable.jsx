import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import "./customTable.css";

const CustomTable = (props) => {
  const { data,deletingRowHandler,editRowHandler } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Picture</TableCell>
          <TableCell>Edit</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data &&
          data.map((ele) => (
            <TableRow key={ele.id}>
              <TableCell>{ele.id}</TableCell>
              <TableCell>{ele.name}</TableCell>
              <TableCell>{ele.price}</TableCell>
              <TableCell>{ele.qty}</TableCell>
              <TableCell>
                <img
                  src={ele.file[0]}
                  alt=""
                  width={70}
                  style={{ borderRadius: "5px" }}
                />
              </TableCell>

              <TableCell>
                {" "}
                <EditIcon onClick={()=>editRowHandler(ele)} className="EditandDeleteIcon" />{" "}
              </TableCell>
              <TableCell>
                {" "}
                <DeleteSweepIcon onClick={()=>deletingRowHandler(ele.id)} className="EditandDeleteIcon" />{" "}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default CustomTable;
