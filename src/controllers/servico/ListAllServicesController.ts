import { Request, Response } from "express";
import { ListAllServicesService } from "../../services/servico/ListAllServicesService";

class ListAllServicesController{
  async handle(req: Request, resp: Response){
    const usuario_cpf = req.usuario_cpf as string;

    const listAllServicesService = new ListAllServicesService();
    const servicos = await listAllServicesService.execute(usuario_cpf)

    return resp.json(servicos)
  }
}

export { ListAllServicesController }