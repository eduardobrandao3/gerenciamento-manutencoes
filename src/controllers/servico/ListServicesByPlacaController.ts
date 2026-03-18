import { Request, Response } from "express";
import { ListServicesByPlacaRequest } from "../../models/interfaces/servico/ListServicesByPlacaRequest";
import { ListServicesByPlacaService } from "../../services/servico/ListServicesByPlacaService";

class ListServicesByPlacaController{
  async handle(req: Request, resp: Response){
    const usuario_cpf = req.usuario_cpf as string;
    const veiculo_placa = req.query.veiculo_placa as string;

    const listServices = new ListServicesByPlacaService();
    const servicos = await listServices.execute({usuario_cpf, veiculo_placa})

    return resp.json(servicos)
  }
}

export { ListServicesByPlacaController }