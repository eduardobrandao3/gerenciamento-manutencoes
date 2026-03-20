import prismaClient from "../../prisma";
import { ListServicesByPlacaRequest } from "../../models/interfaces/servico/ListServicesByPlacaRequest";

class ListServicesByPlacaService{
  async execute({usuario_cpf, veiculo_placa}: ListServicesByPlacaRequest){
    if(!usuario_cpf || !veiculo_placa){
      throw new Error("Informações necessárias não fornecidas")
    }

    const veiculoDoUsuario = await prismaClient.veiculo.findFirst({
      where: {
        usuario_cpf: usuario_cpf,
        placa: veiculo_placa
      }
    })

    if(!veiculoDoUsuario){
      throw new Error("O usuário solicitante não é proprietário do veículo")
    }

    const servicos = await prismaClient.servico.findMany({
      where: {
        veiculo_placa: veiculo_placa
      },
      select: {
        id: true,
        veiculo_placa: true,
        preco: true,
        km: true,
        oficina: true,
        data_realizacao: true,
        descricao: true
      }
    })

    return servicos
  }
}

export { ListServicesByPlacaService }