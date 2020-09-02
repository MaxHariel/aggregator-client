<script>
  //   import { push } from "svelte-spa-router";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  import { jwt } from "../store.js";

  let fields = { email: "", password: "" };
  let errors = { email: "", password: "", auth: "" };

  let loading = false;

  async function login() {
    let valid = true;
    errors.auth = "";
    if (fields.email.trim().length < 1) {
      valid = false;
      errors.email = "E-mail não pode está vazio";
    } else {
      errors.email = "";
    }

    if (fields.password.trim().length < 6) {
      valid = false;
      errors.password = "Senha deve ter pelo menos 6 caracters";
    } else {
      errors.password = "";
    }

    loading = true;
    if (valid) {
      console.log("oi");
      const response = fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(fields)
      });

      const parsed = await response.json();

      if (parsed.error) {
        errors.auth = parsed.error;
      } else {
        $session.token = parsed.token;
        goto("/home");
      }
      loading = false;
    }
  }
</script>

<style>
  .container {
    margin-top: 60px;
    display: flex !important;
    align-items: center;
    justify-content: center !important;
  }
  .card {
    width: 450px;
    height: 320px;
    border-radius: 10px;
    text-align: center;
  }
  .input {
    width: 90%;
    margin: 10px 22px;
  }

  p {
    text-align: center;
  }

  .title {
    padding-top: 20px;
  }

  .button {
    color: white;
    background: #7b68ee;
    margin: 10px 22px;
  }

  .button:hover {
    background: #7b88ee;
  }
</style>

<div class="container">
  <div class="card">
    <p class=" title is-4">Acesso</p>
    <form>
      <p class="help is-danger">{errors.auth}</p>
      <div class="field">
        <div class="control">
          <input
            bind:value={fields.email}
            placeholder="E-mail"
            class="input"
            type="email" />
          <!-- {#if $loginForm.v.errors.includes('email')} -->
          <p class="help is-danger">{errors.email}</p>
          <!-- {/if} -->
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            bind:value={fields.password}
            class="input"
            type="password"
            min="6"
            placeholder="Password" />
          <p class="help is-danger">{errors.password}</p>
        </div>
      </div>
      <button on:click|preventDefault={login} class="button is-pulled-left">
        Login
      </button>
    </form>
  </div>
</div>
