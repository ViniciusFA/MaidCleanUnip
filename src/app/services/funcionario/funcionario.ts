import { Usuario } from '../usuario/usuario';

export class Funcionario{
    id:number;
    cpf:string;
    nome:string;
    sobrenome:string;      
    login:string;       
    senha:string;    
    email:string;   
    urlFacebook: string;
    hasWhatsapp:string;
    telefone:string;    
    profissao:string;
    experiencia:string;
    endereco:string;
    complemento:string; 
    cidade:string;
    estado:string;
    cep:string;       
    sexo:string;
    id_usuario:Usuario;
}