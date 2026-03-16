import { Request, Response } from "express";
import { DetailUserService } from "../../services/usuario/DetailUserService";

class DetailUserController{
  async handle(req: Request, resp: Response){
    const usuario_cpf = req.usuario_cpf as string;
    const detailUserService = new DetailUserService();

    const usuario = await detailUserService.execute(usuario_cpf)

    return resp.json(usuario)
  }
}

export { DetailUserController }