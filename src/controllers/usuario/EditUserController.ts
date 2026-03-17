import { Request, Response } from "express";
import { EditUserRequest } from "../../models/interfaces/usuario/EditUserRequest";
import { EditUserService } from "../../services/usuario/EditUserService";

class EditUserController {
  async handle(req: Request, resp: Response) {
    const { nome, email, telefone, senha, confirmaSenha }: EditUserRequest =
      req.body;
    const cpf = req.usuario_cpf;
    const foto = req.file?.filename;
    const editUserService = new EditUserService();

    const usuarioEditado = await editUserService.execute({
      cpf,
      nome,
      email,
      telefone,
      senha,
      confirmaSenha,
      foto,
    });

    return resp.json(usuarioEditado);
  }
}

export { EditUserController };
