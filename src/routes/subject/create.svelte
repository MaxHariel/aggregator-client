<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  let subject = "";
  let description = "";

  let data = new FormData();

  onMount(() => {
    const fileInput = document.querySelector("#file input[type=file]");
    fileInput.onchange = () => {
      if (fileInput.files.length > 0) {
        const fileName = document.querySelector("#file .file-name");
        fileName.textContent = fileInput.files[0].name;
        data.append("file", fileInput.files[0]);
      }
    };
  });

  function handleSubmit() {
    data.append("subject", subject);
    data.append("description", description);
    console.log("JWT ",sessionStorage.getItem('jwt'))
    fetch("http://127.0.0.1:3333/subjects", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('jwt')
      },
      body: data
    })
      .then(response => response.json())
      .then(data => {
        if(data.status) { 
          goto("/home") 
        } else {

        }  
      })
      .catch(error => {
        
        console.error("Error:", error);
      });
  }
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
          <form>
            <div class="field">
              <label class="label">Assunto</label>
              <div class="control">
                <input
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
                <input class="file-input" type="file" name="resume" required/>
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
                <button
                  on:click|preventDefault={handleSubmit}
                  type="submit"
                  class="button is-link">
                  Criar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
