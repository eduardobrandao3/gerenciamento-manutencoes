import prismaClient from "../../prisma";
import { ListAllVehiclesService } from "../veiculo/ListAllVehiclesService";

class ListAllServicesService{
  async execute(usuario_cpf: string){
    if(!usuario_cpf){
      throw new Error("Precisa estar logado para visualizar os serviços")
    }

    // so pode mostrar servicos daquele usuario
    // pegando primeiro as placas para achar servicos associados a ela

    const listaVeiculos = new ListAllVehiclesService();
    const veiculos = await listaVeiculos.execute(usuario_cpf)
    const placas = [];

    for(let v of veiculos){
      placas.push(v.placa)
    }

    const servicos = await prismaClient.servico.findMany({
      where: {
        veiculo_placa: {
          in: placas
        }
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

export { ListAllServicesService }