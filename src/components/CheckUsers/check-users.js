import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './style';

const CheckUsers = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [isAddAdminDialogOpen, setIsAddAdminDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const token = sessionStorage.getItem('token');
  axios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  const fetchUsers = async () => {
    try {
      // Assuming the token is stored in sessionStorage
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users`);
      const usersData = response.data.map(user => ({
        id: user.id,
        email: user.emailAddress,
        role: user.role
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${userIdToDelete}`);
      const updatedUsers = users.filter(user => user.id !== userIdToDelete);
      setUsers(updatedUsers);
      console.log(`Deleted user with ID ${userIdToDelete}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    // Close the modal after deletion
    setUserIdToDelete(null);
  };

  const handleOpenAddAdminDialog = () => {
    setIsAddAdminDialogOpen(true);
  };

  const handleCloseAddAdminDialog = () => {
    setIsAddAdminDialogOpen(false);
  };

  const handleAddAdmin = async () => {
    // Close the dialog after adding the admin
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/signup/admin`, {
          email,
          password
      });
      
      fetchUsers();
      history.push('/'); // Redirect to home page after successful sign up
  } catch (error) {
      console.error('Error:', error);
  }
    handleCloseAddAdminDialog();
  };
  

  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className={classes.tableRow} style={{ backgroundColor: user.role.name === 'MASTER' ? '#f0f0f0' : 'inherit' }}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role.name}</TableCell>
                <TableCell>
                  {user.role.name !== 'MASTER' && ( // Conditionally render delete button
                    <IconButton aria-label="delete" onClick={() => setUserIdToDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Admin Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button variant="contained" color="primary" size="small" style={{ minWidth: '60px' }} onClick={handleOpenAddAdminDialog}>Add Admin</Button>
      </div>

      {/* Confirmation Modal */}
      {userIdToDelete && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button className="delete-btn" onClick={handleDelete}>Yes, Delete</button>
              <button onClick={() => setUserIdToDelete(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Admin Dialog */}
      <Dialog open={isAddAdminDialogOpen} onClose={handleCloseAddAdminDialog}>
        <DialogTitle>Add Admin</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddAdminDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAdmin} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* CSS Styles */}
      <style>{`
        .modal {
          display: flex;
          justify-content: center;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
          max-width: 300px; /* Adjust width as needed */
        }

        .modal-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .delete-btn {
          background-color: red;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 5px;
          cursor: pointer;
        }

        .delete-btn:hover {
          background-color: darkred;
        }
      `}</style>
    </div>
  );
};

export default CheckUsers;