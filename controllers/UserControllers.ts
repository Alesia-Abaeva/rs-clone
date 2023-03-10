import { validationResult } from "express-validator";
import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import config from "config";
import jwt from "jsonwebtoken";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    //валидация на стороне сервера
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Неккоректные данные при регистрации.",
      });
    }

    const { email, password, name } = req.body;

    const candidate = await User.findOne({ email }); //прoверяем есть ли такой юзер уже

    if (candidate) {
      return res
        .status(400)
        .json({ message: "Такой пользователь уже существует..." });
    }

    const hashedPassword = await bcrypt.hash(password, 12); //хэшируем пароль

    const user = new User({
      email,
      password: hashedPassword,
      name,
      tariff: "base",
      parentControls: "PARENT",
    });

    await user.save();

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "3h", //время существования токена
    });

    res.status(201).send({
      token,
      user,
      userId: user.id,
      message: "Пользователь успешно создан!",
    });
  } catch (e) {
    res
      .status(500) // добавляем стандартную серверную ошибку
      .json({ message: "Не удалось зарегистрироваться." });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Попробуйте еще раз. В данных ошибка.",
      });
    }

    const { email, password } = req.body; //   логика создания пользователя

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, попробуйте снова." });
    }

    //   создаем токен для авторизованного пользователя
    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "10h", //время существования токена
    });

    // const refreshToken = jwt.sign(
    //   { userId: user.id },
    //   config.get("jwtRefreshSecret"),
    //   {
    //     expiresIn: "10h", //время существования токена
    //   }
    // ); // TODO: добавить рефреш токен

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Ошибка авторизации..." });
  }
};

export const getUserData = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Нет доступа" });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, lastName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        name,
        lastName,
      },
      {
        new: true,
      }
    );

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базе данных: ${e}` });
  }
};

export const updateUserPassword = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { password, newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        message: "Введите новый пароль",
      });
    }

    if (password === newPassword) {
      return res.status(400).json({
        message: "Новый пароль не может быть равен старому паролю",
      });
    }

    const user = await User.findById(req.user.userId);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("isMatch", isMatch);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Неверный пароль, данные не обновлены" });
    }

    const userUpdate = await User.findByIdAndUpdate(
      req.user.userId,
      {
        password: await bcrypt.hash(newPassword, 12),
      },
      {
        new: true,
      }
    );

    res.json({
      message: "Данные успешно обновлены!",
    });
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базе данных: ${e}` });
  }
};

export const updateUserParentsContr = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { parentControls } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        parentControls,
      },
      {
        new: true,
      }
    );

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базе данных: ${e}` });
  }
};

export const updateUserTariff = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { tariff } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        tariff,
      },
      {
        new: true,
      }
    );

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базе данных: ${e}` });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await User.deleteOne({ _id: req.user.userId });
    res.status(200).json({ message: "Пользователь удален" });
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` });
  }
};

export const updateFolders = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req?.body?.folderName || !req?.body?.id) {
    return res
      .status(400)
      .json({ message: "Folder name and movie id is required" });
  }

  try {
    const filmId = req.body.id;
    const folderName = req.body.folderName;

    const user = await User.findById(req.user.userId);
    let arr = user.folders[folderName];
    const prevArr = JSON.parse(JSON.stringify(arr));

    const idx = arr.indexOf(filmId);

    if (folderName === "watchedRecently") {
      idx !== -1 ? arr : arr.push(filmId);
      arr = arr.reverse().slice(0, 10).reverse();
    } else {
      idx !== -1 ? arr.splice(idx, 1) : arr.push(filmId);
    }
    console.log(user, arr, folderName);
    // findByIdAndUpdate
    const result = await User.findOneAndUpdate(
      {
        _id: req.user.userId,
        // [`folders.${folderName}`]: prevArr,
      },
      {
        $set: { [`folders.${folderName}`]: arr },
      },
      {
        new: true,
      }
    );
    console.log(result, "result");
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: `Ошибка при запросе к базу данных: ${e}` });
  }
};
