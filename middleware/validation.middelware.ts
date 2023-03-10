import { body, check } from "express-validator";

export const checkRegisterData = () => [
  check("email", "Неккоректный email").isEmail(),
  check("password", "Минимальная длина символов - 6").isLength({ min: 6 }),
];

export const checkLoginData = () => [
  check("email", "Введен неккоректный email").normalizeEmail().isEmail(),
  check("password", "Введите верный пароль").exists(),
];

export const checkReviews = () => {
  body("text", "Введите текст отзыва").isLength({ min: 10 }).isString();
  body("raiting", "Введите оценку фильма").isString();
};
