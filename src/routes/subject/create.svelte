<script context="module">
  export async function preload(page, session) {
    const { token } = session.token;
    console.log("token", token);
    return { token };
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  let subject = "";
  let description = "";
  export let token;

  onMount(() => {
    const fileInput = document.querySelector("#file input[type=file]");
    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        const fileName = document.querySelector("#file .file-name");
        fileName.textContent = fileInput.files[0].name;
      }
    };
  });

  const handleSubmit = async e => {
    const formData = new FormData(event.target);
    let data = new FormData();
    for (const [k, v] of formData.entries()) {
      data.append(`${k}`, v);
    }

    const reponse = fetch("http://127.0.0.1:3333/subjects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: data
    });
  };
</script>

<style>
  button {
    margin-top: 10px;
  }

  .columns {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }
</style>

<div class="columns">
  <div class="column is-half">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Criar Assunto</p>
      </header>
      <div class="card-content">
        <div class="content">
          <form action="#" on:submit|preventDefault={handleSubmit}>
            <div class="field">
              <label class="label">Assunto</label>
              <div class="control">
                <input
                  name="subject"
                  bind:value={subject}
                  class="input"
                  type="text"
                  placeholder=""
                  required />
              </div>
            </div>
            <div class="field">
              <label class="label">Descrição</label>
              <div class="control">
                <textarea
                  name="description"
                  bind:value={description}
                  class="textarea"
                  placeholder=""
                  rows="3"
                  maxlength="144"
                  required />
              </div>
            </div>
            <div id="file" class="file has-name">
              <label class="file-label">
                <input class="file-input" type="file" name="file" required />
                <span class="file-cta">
                  <span class="file-icon">
                    <i class="fas fa-upload" />
                  </span>
                  <span class="file-label">Escolha um arquivo</span>
                </span>
                <span class="file-name">Sem arquivo...</span>
              </label>
            </div>
            <div class="field">
              <div class="control">
                <button type="submit" class="button is-link">Criar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
