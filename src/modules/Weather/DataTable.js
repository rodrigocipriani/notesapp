import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import FirebaseService from "../../firebase/FirebaseService";
import { privateUrls } from "./urls";

const DataTable = ({ data }) => {
  const remove = id => {
    FirebaseService.remove(id, "leituras");
  };

  return (
    <React.Fragment>
      <Typography variant="headline" component="h2">
        Add New
      </Typography>
      <Table selectable="false">
        <TableHead>
          <TableRow>
            <TableCell>Key</TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell>Humidity</TableCell>
            <TableCell>Client</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.key}</TableCell>
              <TableCell>{item.temperatura}</TableCell>
              <TableCell>{item.umidade}</TableCell>
              <TableCell>{item.cliente}</TableCell>
              <TableCell>{item.data}</TableCell>
              <TableCell>
                <Button onClick={() => remove(item.key)}>Remove</Button>
                <Button
                  component={props => (
                    <Link
                      to={`${privateUrls.edit.pathWithouParam}${item.key}`}
                      {...props}
                    />
                  )}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default DataTable;
