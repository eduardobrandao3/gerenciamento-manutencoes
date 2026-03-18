import prismaClient from "../../prisma";
import { ListServicesByIdRequest } from "../../models/interfaces/servico/ListServicesByIdRequest";

class ListServicesByIdService{
  async execute({id_servico, usuario_cpf}: ListServicesByIdRequest){
    if(!id_servico || !usuario_cpf){
      throw new Error("Informações para busca inválidas!")
    }

    // o usuario so pode ver os servicos q pertencem a ele, logo, o veiculo deve pertencer a ele
    const veiculosUsuario = await prismaClient.veiculo.findMany({
      where: {
        usuario_cpf: usuario_cpf
      }, 
      select: {
        placa: true
      }
    })

    const placas = []
    for(let v of veiculosUsuario){
      placas.push(v.placa)
    }

    const servicos = await prismaClient.servico.findFirst({
      where: {
        veiculo_placa: {
          in: placas
        },
        id: id_servico
      },
      select: {
        id: true,
        descricao: true,
        preco: true,
        data_realizacao: true,
        km: true,
        oficina: true
      }
    })

    return servicos
  }
}

export { ListServicesByIdService }