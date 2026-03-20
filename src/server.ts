import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json"
import path from "path";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT) || 3333;
app.use(express.json());
app.use(cors())
app.use("/v1", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")))
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

app.get("/termos", (req: Request, resp: Response) => {
  return resp.json({
    message: "Termos de Serviço"
  })
})
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${port} - Projeto de Gerenciamento de Manutenções`)
})