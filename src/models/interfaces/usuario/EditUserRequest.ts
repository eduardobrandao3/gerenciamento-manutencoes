export interface EditUserRequest{
  cpf: string;
  nome?: string | undefined;
  email?: string | undefined;
  foto?: string | undefined;
  telefone?: string | undefined;
  senha?: string | undefined;
  confirmaSenha?: string | undefined
}