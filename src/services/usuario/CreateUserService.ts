import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/usuario/UserRequest";

class CreateUserService {
  async execute({cpf, nome, telefone, email, senha, foto}: UserRequest){
    if(!cpf || !nome || !telefone || !email || !senha){
      throw new Error("É necessário preencher todos os campos obrigatórios (CPF, Nome, Telefone, E-mail e Senha");
    }

    // verifica se já existe usuario com cpf ou email
    const usuarioExistenteCPF = await prismaClient.usuario.findFirst({
      where: {
        cpf: cpf
      }
    })

    const usuarioExistenteEmail = await prismaClient.usuario.findFirst({
      where: {
        email: email
      }
    })

    if(usuarioExistenteCPF || usuarioExistenteEmail){
      throw new Error("Usuário já cadastrado com esses dados")
    }

    // criptografar senha
    const senhaHash = await hash(senha, 8)

    // criar usuarios com dados passados
    const usuario = await prismaClient.usuario.create({
      data: {
        cpf: cpf,
        email: email,
        nome: nome,
        senha: senhaHash,
        foto: foto || null,
        telefone: telefone
      },
      select: {
        cpf: true,
        nome: true,
        email: true,
        foto: true
      }
    })

    return usuario
  }
}

export { CreateUserService }