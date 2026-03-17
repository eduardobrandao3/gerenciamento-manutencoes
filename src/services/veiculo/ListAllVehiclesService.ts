import prismaClient from "../../prisma";

class ListAllVehiclesService{
  async execute(usuario_cpf: string){
    if(!usuario_cpf){
      throw new Error("Informações inválidas de usuários")
    }
    const veiculos = await prismaClient.veiculo.findMany({
      where: {
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

    return veiculos
  }
}

export { ListAllVehiclesService }