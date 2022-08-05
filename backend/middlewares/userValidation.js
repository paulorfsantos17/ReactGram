const {body} = require("express-validator")

const userCreateValidation = () =>{
  return [
    body("name").isString().withMessage("O nome é obrigatorio.")
      .isLength({min: 3}).withMessage("O nome precisa ter no minímo 3 caracteres!"),
    body("email").isString().withMessage("o e-mail e obrigatório!")
      .isEmail().withMessage("Insira um e-mail válido"),
    body("password").isString().withMessage("Insira um senha")
      .isLength({min: 5}).withMessage("A senha precisa ter no minímo 5 caracteres!"),
    body("confirmpassword").isString().withMessage("A confirmação de senha é obrigatória")
      .custom((value, {req}) => {
        if(value != req.body.password) {
          throw new Error("As senhas não são iguais.")
        }
        return true
      })
  ]
}

module.exports = {
  userCreateValidation,
}