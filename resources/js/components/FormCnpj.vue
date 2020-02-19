 <template>
  <div class="container">
    <div class="row my-5">
      <div class="col-md-9">
        <h4>CNPJs Cadastrados</h4>

        <table class="table table-hover">
          <thead>
            <th>Razão social</th>
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

      <div class="col-md-3">
        <form action @submit.prevent="save">
          <h4>Cadastrar Cnpj</h4>
          <!-- <b-button variant="success" @click="makeToast('success')" class="mb-2">Success</b-button> -->

          <input
            type="text"
            v-model="cnpj.nome"
            placeholder="Razão social"
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
          <input
            type="text"
            v-model="cnpj.municipio"
            placeholder="Município"
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
      //salva se não estiver id e edita caso ja seja um registro existente

      if (!this.cnpj.id) {
        cnpjs.cadastrar(this.cnpj).then(response => {
          this.cnpj = {};
          this.list();
          this.alertaFlutuante("success");

        });
      } else {
        cnpjs.edit(this.cnpj).then(response => {
          this.cnpj = {};
          this.list();
          this.alertaFlutuante("primary");

        });
      }
    },

    list() {
      cnpjs.listDb(this.cnpj).then(response => {
        this.cnpjs = response.data; //retorna os resultados do banco de dados e coloca na tabela
      });
    },

    edit(cnpj) {
      //setar campos com os valores para editar
      this.cnpj = cnpj;
    },

    destroy(cnpj) {
      if (confirm("Deseja Excluir mesmo esse registro?")) {
        cnpjs.destroy(cnpj).then(response => {
          this.alertaFlutuante("warning");
          this.list(); //atualiza a lista de cadastros

        });
      }
    },

    search(cnpj) {
      cnpjs.buscar(this.cnpj).then(response => {
        this.cnpj = response.data;
        if ((this.cnpj = response.data.message == "CNPJ inválido")) {
          this.alertaFlutuante("erro-cnpj");
          this.cnpj = {};
        } else {
          this.alertaFlutuante("cnpj-valido");
          this.cnpj = response.data;
        }
      });
    },

    alertaFlutuante(variant = null) {   //Verifica o parametro e assim sua correspondente mensagem
      //começa a variavel como vazia
      if (variant == "success") {
        //compara os parametros passados
        this.$bvToast.toast("Cadastrado com sucesso", {
          title: `CNPJ Cadastrado`,
          variant: variant,
          solid: true
        });
      } else if (variant == "danger") {
        this.$bvToast.toast("Erro ao cadastrar", {
          title: "Erro no CNPJ",
          variant: variant,
          solid: true
        });
      } else if (variant == "warning") {
        this.$bvToast.toast("Cadastro excluido com sucesso", {
          title: "CNPJ excluido da base de dados",
          variant: variant,
          solid: true
        });
      } else if (variant == "primary") {
        this.$bvToast.toast("Cadastro atualizado com sucesso", {
          title: "Dados atualizados",
          variant: variant,
          solid: true
        });
      } else if (variant == "erro-cnpj") {
        variant = "danger";
        this.$bvToast.toast("Cnpj inválido", {
          title: "Dados incorretos ou inválidos",
          variant: variant,
          solid: true
        });
      } else if (variant == "cnpj-valido") {
        variant = "info";
        this.$bvToast.toast("Cnpj válido", {
          title: "Cnpj encontrado e cadastrado na receita",
          variant: variant,
          solid: true
        });
      }
    }
  },
  mounted() {
    this.list();
    console.log(cnpjs)
  }
};
</script>

 <style>
</style>
