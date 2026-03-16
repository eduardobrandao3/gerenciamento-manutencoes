import prismaClient from "../../prisma";

class DetailUserService {
  async execute(usuario_cpf: string){
    if(!usuario_cpf){
      throw new Error("CPF inválido")
    }

    const usuario = await prismaClient.usuario.findFirst({
      where: {
        cpf: usuario_cpf
      },
      select: {
        cpf: true,
        nome: true,
        email: true,
        foto: true
      }
    })
    return usuario;
  }
}

export { DetailUserService }