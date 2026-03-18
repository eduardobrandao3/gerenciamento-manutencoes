import { Request, Response } from "express";
import { EditServicesRequest } from "../../models/interfaces/servico/EditServicesRequest";
import { EditServicesService } from "../../services/servico/EditServicesService";

class EditServicesController{
  async handle(req: Request, resp: Response){
    const {descricao, preco, data_realizacao, km, oficina}: EditServicesRequest = req.body;
    const id = req.query.id as string;
    const veiculo_placa = req.query.veiculo_placa as string;
    const usuario_cpf = req.usuario_cpf as string;

    const editServicesService = new EditServicesService();
    const servicoAlterado = await editServicesService.execute({usuario_cpf, veiculo_placa, id, descricao, preco, data_realizacao, km, oficina})

    return resp.json(servicoAlterado)
  }
}

export { EditServicesController }