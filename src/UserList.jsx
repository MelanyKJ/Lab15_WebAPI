import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    } else {
      fetch('https://localhost:7018/People/Get', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else if (response.status === 401) {
            throw new Error('No autorizado');
          } else {
            throw new Error('Error de solicitud: ' + response.status);
          }
        })
        .then((data) => {
          setUserList(data);
        })
        .catch((error) => {
          console.error('Error al obtener la lista de usuarios:', error);
          setError(error.message);
        });
    }
  }, [navigate]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {people.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserList;
