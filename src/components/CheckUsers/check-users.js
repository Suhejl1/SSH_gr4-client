import React, { useState } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './style';

const CheckUsers = () => {
  const classes = useStyles();

  // State for storing users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', role: 'User' },
    { id: 5, name: 'Lebron James', email: 'lebron@example.com', role: 'User' },
    { id: 6, name: 'Steph Curry', email: 'curry@example.com', role: 'User' },
    { id: 7, name: 'James Harden', email: 'harden@example.com', role: 'User' },
    { id: 8, name: 'Kendrick Lamar', email: 'kendrick@example.com', role: 'Admin' },
    { id: 9, name: 'Reis Stanovci', email: 'reis@example.com', role: 'Admin' },
  ]);

  const handleDelete = (userId) => {
    // Filter out the user with the given userId
    const updatedUsers = users.filter(user => user.id !== userId);
    // Update the state with the filtered users
    setUsers(updatedUsers);
    console.log(`Deleted user with ID ${userId}`);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className={classes.tableRow}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <IconButton aria-label="delete" onClick={() => handleDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CheckUsers;
