import { Request, Response } from "express";
import { CreateServiceRequest } from "../../models/interfaces/servico/CreateServiceRequest";
import { CreateServiceService } from "../../services/servico/CreateServiceService";

class CreateServiceController{
  async handle(req: Request, resp: Response){
    const veiculo_placa = req.query.veiculo_placa as string;
    const {descricao, preco, km, oficina, data_realizacao}: CreateServiceRequest = req.body;
    const usuario_cpf = req.usuario_cpf as string;
    const createServiceService = new CreateServiceService();
    const servicoCriado = await createServiceService.execute({veiculo_placa, descricao, preco, km, oficina, data_realizacao, usuario_cpf});

    return resp.json(servicoCriado)
  }
}

export { CreateServiceController }