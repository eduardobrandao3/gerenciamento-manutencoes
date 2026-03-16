import { Request, Response } from "express";
import { AuthRequest } from "../../models/interfaces/usuario/auth/AuthRequest";
import { AuthUserService } from "../../services/usuario/AuthUserService";

class AuthUserController{
  async handle(req: Request, resp: Response){
    const {email, senha}: AuthRequest = req.body
    const authUserService = new AuthUserService();

    const usuario = await authUserService.execute({email, senha})

    return resp.json(usuario)
  }
}

export { AuthUserController }