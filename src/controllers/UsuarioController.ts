import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const users = [
    {
      username: 'usuario',
      password: '$2a$10$gTbXjGQFbxz1Zn1ioz3l1ecEu8wFwT7wAoToYdmMPfWiNUFvNf9dS' // senha: "senha123"
    }
  ];
  
  export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }
  
    bcrypt.compare(password, user.password, (err, result) => {
      if (err || !result) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }
  
      const token = jwt.sign({ username: user.username }, 'secreta', { expiresIn: '1h' });
  
      res.status(200).json({ message: 'Login bem-sucedido', token });
    });
  };