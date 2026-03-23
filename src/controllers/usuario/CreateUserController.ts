import { Request, Response } from "express";
import { CreateUserService } from "../../services/usuario/CreateUserService";
import { UserRequest } from "../../models/interfaces/usuario/UserRequest";

class CreateUserController{
  async handle(req: Request, resp: Response){
    const {cpf, nome, email, telefone, senha, confirmaSenha}: UserRequest = req.body
    const createUserService = new CreateUserService();

    // ve se passou arquivo de foto
    const foto = req.file?.filename as string


    const usuario = await createUserService.execute({cpf, nome, email, telefone, senha, foto, confirmaSenha})
    
    return resp.json({
      message: `Usuário de nome '${usuario.nome}' cadastrado com sucesso!`
    })
  }
}

export { CreateUserController }