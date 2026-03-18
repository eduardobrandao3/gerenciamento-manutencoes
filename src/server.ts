import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";

const app = express();
const port = 3333;
app.use(express.json());
app.use(router);
app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
  if(err instanceof Error){
    return resp.status(400).json({
      error: err.message
    })
  }
  return resp.status(500).json({
    status: "error",
    message: "Erro interno do servidor"
  })
})
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port} - Projeto de Gerenciamento de Manutenções`)
})