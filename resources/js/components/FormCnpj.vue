 <template>
  <div class="container">
    <div class="row my-5">
      <div class="col-md-10">
        <h4>CNPJs Cadastrados</h4>

        <table class="table table-hover">
          <thead>
            <th>Empresa</th>
            <th>CNPJ</th>
            <th>Municipio</th>
            <th></th>
            <th></th>
          </thead>

          <tr v-for="(cnpjs,key) in cnpjs" :key="key">
            <!-- <td v-text="cnpjs.id"></td> -->
            <td v-text="cnpjs.nome"></td>
            <td v-text="cnpjs.cnpj"></td>
            <td v-text="cnpjs.municipio"></td>
            <td>
              <button @click="edit(cnpjs)" class="btn btn-primary">Editar</button>
            </td>
            <td>
              <button @click="destroy(cnpjs)" class="btn btn-danger">Excluir</button>
            </td>
          </tr>
        </table>
      </div>

      <div class="col-md-2">
        <form action @submit.prevent="save">
          <h4>Cadastrar Cnpj</h4>
          <!-- <b-button variant="success" @click="makeToast('success')" class="mb-2">Success</b-button> -->

          <input
            type="text"
            v-model="cnpj.nome"
            placeholder="Empresa"
            class="form-control"
            required
          />
          <br />
          <input
            type="text"
            v-model="cnpj.cnpj"
            placeholder="Digite um CNPJ"
            class="form-control"
            required
          />

          <br />
          <button class="btn btn-success">Cadastrar</button>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-md-6">
        <input type="text" placeholder="CNPJ" v-model="cnpj.cnpj_cadastral" class="form-control" />
        <br />
        <button @click="search">buscar Cnpj</button>
      </div>
    </div>
  </div>
</template>

 <script>
import { http } from "../services/config";
import cnpjs from "../services/cnpj";

export default {
  data() {
    return {
      cnpj: {
        //Objeto vazio

        id: "",
        nome: "",
        cnpj: "",
        municipio: ""
      },

      cnpjs: [], //para armazenar registros vindo da api

      cnpjTeste: [] //para armazenar registros da receita WS
    };
  },
  methods: {
    save() {
      //salva e edita caso ja seja um registro existente

      if (!this.cnpj.id) {
        cnpjs.cadastrar(this.cnpj).then(response => {
          this.cnpj = {};
          this.list();
          this.alertaFlutuante("success");
          // console.log('Cadastrado com sucesso');
        });
      } else {
        cnpjs.edit(this.cnpj).then(response => {
          this.cnpj = {};
          this.list();
          alert("Atualizado com sucesso");
        });
      }
    },

    list() {
      cnpjs.listDb(this.cnpj).then(response => {
        this.cnpjs = response.data; //salva em data
      });
    },

    edit(cnpj) {
      //setar campos com os valores para editar
      this.cnpj = cnpj;
    },

    destroy(cnpj) {
      if (confirm("Deseja Excluir mesmo esse registro?")) {
        cnpjs.destroy(cnpj).then(response => {
          this.list();
          console.log(this.cnpj);
        });
      }
    },

    search(cnpj) {
      cnpjs.buscar(this.cnpj).then(response => {
        this.cnpj = response.data;
        console.log(this.cnpjTeste);
      });
    },

    alertaFlutuante(variant = null) { //começa a variavel como vazia
      if (variant == "success") {  //compara os parametros passados
        this.$bvToast.toast("Cadastrado com sucesso", {
          title: `CNPJ Cadastrado`,
          variant: variant,
          solid: true
        });
      }
      else if (variant == "danger") {
        this.$bvToast.toast("Erro ao cadastrar", {
          title: "Erro no CNPJ",
          variant: variant,
          solid: true
        });
      }
    }
  },
  mounted() {
    this.list();
  }
};
</script>

 <style>
</style>
