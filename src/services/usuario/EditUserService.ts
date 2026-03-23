import prismaClient from "../../prisma";
import { hash } from "bcryptjs";
import { EditUserRequest } from "../../models/interfaces/usuario/EditUserRequest";

class EditUserService {
  async execute({
    cpf,
    nome,
    email,
    telefone,
    foto,
    senha,
    confirmaSenha,
  }: EditUserRequest) {
    const data: any = {};
    let senhaHash = undefined
    if ((senha && !confirmaSenha) || (!senha && confirmaSenha)) {
      throw new Error("Digite a nova senha e a confirmação");
    } else if (senha && confirmaSenha) {
      if (senha !== confirmaSenha) {
        throw new Error("As senhas não são correspondentes");
      } else {
        senhaHash = await hash(senha, 8);
      }
    }

    if (email) {
      const usuarioEmailExistente = await prismaClient.usuario.findFirst({
        where: {
          email: email,
          NOT: {cpf: cpf}
        },
      });
      if (usuarioEmailExistente) {
        throw new Error("E-mail já existente");
      }
    }

    if(nome){
      data.nome = nome
    }
    if(email){
      data.email = email
    }
    if(telefone){
      data.telefone = telefone
    }
    if(senhaHash){
      data.senha = senhaHash
    }
    if(foto){
      data.foto = foto
    }

    const usuarioAtualizado = await prismaClient.usuario.update({
      where: {
        cpf: cpf,
      },
      data: data,
      select: {
        cpf: true,
        telefone: true,
        nome: true,
        email: true,
        foto: true,
      },
    });

    return usuarioAtualizado;
  }
}

export { EditUserService };
