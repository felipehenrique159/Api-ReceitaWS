import {http} from './config';

export default{

    buscar:(cnpj)=>{
        console.log(cnpj.cnpj_cadastral);
        //return http.get('https://www.receitaws.com.br/v1/cnpj/'+ '05018904000168');
        return http.get('https://cors-anywhere.herokuapp.com/http://www.receitaws.com.br/v1/cnpj/' + cnpj.cnpj_cadastral);

    },

    listDb:() => {
        return http.get('cnpj');
    },

    cadastrar:(cnpj) =>{
        return http.post('cnpj',cnpj);
    },

    edit:(cnpj) =>{
        return http.put('cnpj/' + cnpj.id,cnpj );
    },

    destroy:(cnpj) =>{

       return http.delete('cnpj/' + cnpj.id);

    },


}


