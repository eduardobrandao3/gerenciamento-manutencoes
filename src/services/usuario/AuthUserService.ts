import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AuthRequest } from "../../models/interfaces/usuario/auth/AuthRequest";

class AuthUserService {
  async execute({ email, senha }: AuthRequest) {
    if (!email || !senha) {
      throw new Error("Preencha o e-mail e senha");
    }

    const usuarioExiste = await prismaClient.usuario.findFirst({
      where: {
        email: email,
      },
    });

    if (!usuarioExiste) {
      throw new Error("E-mail ou senha inválido");
    }

    const senhaConfere = await compare(senha, usuarioExiste.senha);
    if(!senhaConfere){
      throw new Error("E-mail ou senha inválido")
    }

    const token = sign(
      {
        name: usuarioExiste.nome,
        email: usuarioExiste.email,
      },
      process.env.JWT_SECRET as string,
      {
        subject: usuarioExiste.cpf,
        expiresIn: "2h",
      },
    );

    return {
      cpf: usuarioExiste.cpf,
      nome: usuarioExiste.nome,
      email: usuarioExiste.email,
      foto: usuarioExiste.foto,
      token: token
    }
  }
}

export { AuthUserService };
