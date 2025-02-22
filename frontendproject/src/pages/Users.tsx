import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        console.log('Resposta da API:', response.data); 
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Usuários</h1>
      <ul>
        {users.map(user => (
          <li key={user.id} className="mb-2">
            {user.firstName} {user.lastName}
            <Button onClick={() => handleEdit(user.id)} className="ml-2">Editar</Button>
            <Button onClick={() => handleDelete(user.id)} className="ml-2">Excluir</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;