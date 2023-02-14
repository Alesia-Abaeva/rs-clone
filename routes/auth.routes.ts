import { Router } from 'express';
import checkAuth from '../middleware/auth.middelware';
import {
  deleteUser,
  getUserData,
  login,
  register,
  updateUser,
  updateUserFolders,
  updateUserParentsContr,
  updateUserPassword,
  updateUserTariff,
} from '../controllers/UserControllers';
import {
  checkLoginData,
  checkRegisterData,
} from '../middleware/validation.middelware';

export const router = Router();

// api/auth/register
router.post('/register', checkRegisterData(), register);

// api/auth/login
router.post('/login', checkLoginData(), login);

// api/auth/pesron - получаем данные
router.get('/person', checkAuth, getUserData);

// api/auth/pesron - изменяем данные
router.put('/person', checkAuth, updateUser);

// api/auth/pesron/pass
router.put('/person/pass', checkAuth, updateUserPassword);

// api/auth/pesron/parents
router.put('/person/parents', checkAuth, updateUserParentsContr);

// api/auth/pesron/tariff
router.put('/person/tariff', checkAuth, updateUserTariff);

// api/auth/pesron/delete
router.delete('/person/delete', checkAuth, deleteUser);

// api/auth/person/folders
router.put('/person/folders', checkAuth, updateUserFolders);
