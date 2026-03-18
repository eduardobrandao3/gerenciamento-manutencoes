import { Request, Response } from "express";
import { ListServicesByIdService } from "../../services/servico/ListServicesByIdService";

class ListServicesByIdController{
  async handle(req: Request, resp: Response){
    const usuario_cpf = req.usuario_cpf as string;
    const id_servico = req.query.id_servico as string;

    const listServices = new ListServicesByIdService();
    const servicos = await listServices.execute({id_servico, usuario_cpf})

    return resp.json(servicos)
  }
}

export { ListServicesByIdController }