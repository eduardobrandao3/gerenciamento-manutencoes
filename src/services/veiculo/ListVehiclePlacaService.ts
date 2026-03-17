import prismaClient from "../../prisma";
import { ListVehiclePlacaRequest } from "../../models/interfaces/veiculo/ListVehiclePlacaRequest";

class ListVehiclePlacaService{
  async execute({placa, usuario_cpf}: ListVehiclePlacaRequest){
    if(!placa || !usuario_cpf){
      throw new Error("Informações faltantes para busca")
    }

    const veiculo = await prismaClient.veiculo.findFirst({
      where: {
        placa: placa,
        usuario_cpf: usuario_cpf
      },
      select: {
        placa: true,
        marca: true, 
        modelo: true,
        ano_fabricacao: true,
        cor: true,
        imagem: true,
        descricao: true
      }
    })

    return veiculo;
  }
}

export { ListVehiclePlacaService }