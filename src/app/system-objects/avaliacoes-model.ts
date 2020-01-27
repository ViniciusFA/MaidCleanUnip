import { Stars } from './stars-model';
export class Avaliacoes{
    idAvaliacao:number;
    idUsuario:number;
    compromisso:number;
    organizacao:number;
    disciplina:number;
    limpeza:number;
    media:number;
    stars:Stars = new Stars();    

    constructor(public id:number, public star:number){}

}