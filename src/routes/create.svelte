<script>
  import { goto } from "@sapper/app";

  let fields = { username: "", email: "", password: "" };
  let errors = { username: "", email: "", password: "", create: "" };
  let valid = true;
  async function singup() {
    errors.create = "";
    if (fields.username.trim().length < 1) {
      valid = false;
      errors.username = "O username não pode está vazio";
    } else {
      errors.username = "";
    }
    if (fields.email.trim().length < 1) {
      valid = false;
      errors.email = "O e-mail não pode está vazio";
    } else {
      errors.email = "";
    }
    if (fields.password.trim().length < 1) {
      valid = false;
      errors.password = "O password não pode está vazio";
    } else {
      errors.password = "";
    }

    if (valid) {
      fetch("http://127.0.0.1:3333/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fields)
      })
        .then(response => response.json())
        .then(data => {
          if (data.code == "200") {
            goto("/login");
          } else {
            console.log(data);
            errors.create = "Não foi possível criar o usuário";
          }
        })
        .catch(error => {
          errors.create =
            "O serviço está indisponivel tente Novamente mais tarde";
          console.log("Error:", error);
        });
    }
  }
</script>

<style>
  .subtitle {
    margin-top: 10px;
  }

  .card {
    width: 350px;
    height: 350px;
  }

  .button {
    color: white;
    background: #7b68ee;
  }
  .container {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<div class="container">
  <div class="card">
    <div class="content">
      <columns>
        <p class="subtitle is-5 has-text-centered">Novo Registro</p>
        <form>
          <div class="column">
            <p class="help is-danger">{errors.create}</p>
            <input
              bind:value={fields.username}
              class="input"
              type="text"
              placeholder="User Name" />
            <p class="help is-danger">{errors.username}</p>
          </div>
          <div class="column">
            <input
              bind:value={fields.email}
              class="input"
              type="text"
              placeholder="E-mail" />
            <p class="help is-danger">{errors.email}</p>
          </div>
          <div class="column">
            <input
              bind:value={fields.password}
              class="input"
              type="password"
              placeholder="Password" />
            <p class="help is-danger">{errors.password}</p>
          </div>
          <div class="column">
            <button on:click|preventDefault={singup} class="button">
              Criar Conta
            </button>
          </div>
        </form>
      </columns>
    </div>
  </div>
</div>
