<script context="module">
  import { jwt } from "../../store.js";
  export async function preload(page, session) {
    let jwt_value;

    const unsubscribe = jwt.subscribe(value => {
      jwt_value = value;
    });

    const param = page.params;
    const res = await this.fetch(`http://127.0.0.1:3333/subjects/${param.id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt")
      },
      mode: "cors",
      cache: "default"
    });
    const subjects = await res.json();
    return { subjects };
  }
</script>

<script>
  export let subjects;
  console.log(subjects);
</script>

<style>
  .container .logo {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 40px;
  }

  .logo .avatar {
    margin-left: 5px;
  }

  .logo .title {
    line-height: 64px;
    text-align: center;
    height: 64px;
  }

  .subject {
    columns: 2;
    margin: 0 auto;
    column-gap: 20px;
    /* margin-top: 80px; */
  }

  .subject .card {
    margin: 0 0 30px;
    overflow: hidden;
    break-inside: avoid;
  }

  iframe {
    width: 100%;
    height: 344px;
  }

  .selftext {
    width: 490px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    direction: ltr;
    padding-top: 10px;
    /* line-height: 20px; */
  }

  .reddit-link:hover {
    color: #7b68ee;
  }

  @media (max-width: 750px) {
    .container {
      columns: 1;
    }
  }
</style>

<div class="container logo">
  <div class="logo">
    <h1 class="title">Reddit</h1>
    <figure class="image is-64x64 avatar">
      <img class="is-rounded" src="/reddit.png" />
    </figure>
  </div>
</div>
<div class="container subject" style="">
  {#each subjects.reddit as reddit}
    <div class="card">
      {#if reddit.data.preview && !reddit.data.media}
        <div class="card-image">
          <figure class="image">
            <img
              src={`
               ${reddit.data.preview.images[0].source.url.replace('amp;s', 's')}`}
              alt="Placeholder image" />
          </figure>
        </div>
      {:else if reddit.data.media}
        {#if reddit.data.media.reddit_video}
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <video
                  class="video"
                  controls
                  src={`${reddit.data.media.reddit_video.fallback_url}`} />
              </div>
            </div>
          </div>
        {/if}
        {#if reddit.data.media.oembed}
          <div class="card-content">
            <div class="media">
              <div id="youtube" class="media-content">
                <iframe
                  title="Video"
                  src={reddit.data.media.oembed.html.match(/([^"]+)1/g)}
                  allowfullscreen />
              </div>
            </div>
          </div>
        {/if}
      {/if}
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <a
              href={`https://www.reddit.com${reddit.data.permalink}`}
              target="_blank">
              <p class="reddit-link title is-5">{reddit.data.title}</p>
            </a>
            {#if reddit.data.selftext}
              <p class="selftext">{reddit.data.selftext}</p>
            {/if}
          </div>
        </div>
        <div class="content">{reddit.data.author}</div>
      </div>
    </div>
  {/each}
</div>

<div class="container">

  <h1 class="title">Twitter</h1>
</div>
