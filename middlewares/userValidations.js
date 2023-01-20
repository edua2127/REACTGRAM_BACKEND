const { body } = require('express-validator');

const userCreateValidation = () => {
  return [
    body("name").isString().withMessage("Nome é Obrigatorio").isLength({ min: 3 }).withMessage("Nome deve ter no minimo 3 caracteres"),
    body("email").isString().withMessage("Email é Obrigatorio").isEmail().withMessage("Insira um email valido"),
    body("password").isString().withMessage("Senha é Obrigatorio").isLength({ min: 6 }).withMessage("Senha deve ter no minimo 6 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("Confirmação de senha é Obrigatorio")
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais");
        }
        return true;
      })
  ]
}

const loginValidation = () => {
  return [
    body("email").isString().withMessage("Email é Obrigatorio").isEmail().withMessage("Insira um email valido"),
    body("password").isString().withMessage("Senha é Obrigatorio")
  ]
}

const userUpdateValidation = () => {
  return [
    body("name").optional().isLength({ min: 3 }).withMessage("O nome deve ter pelomenos 3 caracteres"),
    body("password").optional().isLength({ min: 6 }).withMessage("A senha deve ter pelomenos 3 carateres")
  ]
}

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
}