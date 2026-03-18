import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Payload } from "../models/interfaces/usuario/auth/Payload";

export function isAuthenticated(req: Request, resp: Response, next: NextFunction){
  const authToken = req.headers.authorization;

  if(!authToken){
    return resp.status(401).end()
  }

  const [, token] = authToken.split(" ")

  if(!token){
    return resp.status(401).end()
  }

  try{
    const { sub } = verify(token, process.env.JWT_SECRET as string) as Payload;
    req.usuario_cpf = sub;
    return next()
  }catch(error){
    return resp.status(401).end();
  }
}