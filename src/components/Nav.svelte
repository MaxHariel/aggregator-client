<script>
  // export let segment;
  export let login;
  import { onMount } from "svelte";
</script>

<style>
  .navbar-item:hover {
    background: white;
    color: #7b68ee;
  }

  .navbar-item:active {
    background: white;
    color: #7b68ee;
  }
  .container {
    display: flex;
  }
  .navbar {
    /* padding: 0 0; */
  }
</style>

<!-- <nav>
	<ul>
		<li><a href="" aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
	</ul>
</nav> -->
<nav
  class="navbar is-fixed-top is-transparent"
  role="navigation"
  aria-label="main navigation">
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href=".">
        <strong class="title is-">Agregator</strong>
      </a>
      <div
        onclick="document.querySelector('.navbar-menu').classList.toggle('is-active');"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </div>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <a class="navbar-item">Sobre</a>
        {#if login}
          <a href="/home" class="navbar-item">Assuntos</a>
          <a href="/logout" class="navbar-item">
            <strong>Log Out</strong>
          </a>
        {:else}
          <a href="/login" class="navbar-item">Log In</a>
          <a href="/create" class="navbar-item">Sing Up</a>
        {/if}
      </div>
    </div>
  </div>
</nav>
