<script context="module">
  export async function preload(page, session) {
    const { token } = session.token;
    if (!token) this.redirect(302, "login");
    console.log("token", token);
    const response = await this.fetch(`http://127.0.0.1:3333/subjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      mode: "cors",
      cache: "default"
    });
    const parsed = await response.json();
    if (parsed.error) return this.error(response.status, parsed.error);
    console.log(parsed);
    return { subjects: parsed };
  }
</script>

<script>
  import { onMount, beforeUpdate, afterUpdate } from "svelte";
  import { goto, stores } from "@sapper/app";
  const { session } = stores();
  import "bulma/css/bulma.css";

  export let subjects;

  let loggin = false;
</script>

<style>
  .title-subject {
    padding-top: 20px;
  }
  .without {
    text-align: center;
    font-size: 40;
  }

  .container {
    margin-top: 50px;
  }

  .button {
    margin-bottom: 10px;
    color: white;
    background: #7b68dd;
  }

  .button:hover {
    color: white;
    background: #7b68ff;
  }
</style>

<div class="container">
  <h1 class="title-subject title has-text-centered">SEUS ASSSUNTOS</h1>
  <a href="/subject/create" class="button">Criar Assunto</a>
  <div class="columns">
    {#if subjects.length == 0}
      <div class="without">Você não tem assuntos</div>
    {:else}
      {#each subjects as subject}
        <div class="column is-one-quarter">

          <div class="card">
            <div class="card-image">
              <figure class="image is-4by5">
                <img src={subject.image_url} alt="Placeholder image" />
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <a href={`/subject/${subject.id}`}>
                    <p class="title is-4">{subject.interested_name}</p>
                  </a>
                </div>
              </div>

              <div class="content">{subject.description}</div>
            </div>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</div>
