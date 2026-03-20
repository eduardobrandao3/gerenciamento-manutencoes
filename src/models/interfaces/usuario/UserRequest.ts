export interface UserRequest {
  cpf: string;
  nome: string;
  telefone: string;
  email: string;
  senha: string;
  confirmaSenha: string;
  foto?: string;
}
