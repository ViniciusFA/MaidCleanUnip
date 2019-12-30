import { ConfigService } from './../config.service';
import { Http, RequestOptions, Headers } from '@angular/http';

export class AvaliacoesService{

    private baseUrlService: string = '';
    private headers:Headers;
    private options:RequestOptions;

    constructor(private http:Http,
                private configService:ConfigService){
                    this.baseUrlService = configService.getUrlService() + '/avaliacoes';
                    this.headers = new Headers({ 'Content-Type': 'application/json;charset=UTF-8'});
                    this.options = new RequestOptions({headers:this.headers});
                }

    /*Pega Avaliação do usuario no banco */
    getAvaliationsUser(id_usuario:Number){
        //http://localhost:8090/api/usuario/avaliacoes/191
        return this.http.get(this.baseUrlService + '/' + id_usuario)
            .map(res => res.json());

    }
}