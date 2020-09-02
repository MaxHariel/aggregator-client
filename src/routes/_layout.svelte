<script context="module">
  import { goto } from "@sapper/app";

  export async function preload(page, session) {
    
    }
</script>

<script>
  import Nav from "../components/Nav.svelte";
  import { onMount, beforeUpdate } from "svelte";
  import "bulma/css/bulma.css";

  export let segment;
  let login = false;

  beforeUpdate(async () => {
    login = sessionStorage.getItem("jwt") == undefined ? false : true;
    // if (!sessionStorage.getItem('jwt')) goto('/login')
  });
</script>

<style>
  main {
    position: relative;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {login} {segment} />

<main>
  <slot />
</main>
