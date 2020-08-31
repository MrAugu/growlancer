<template>
    <section>
      <header>
        <title>{{ title }}</title>
        <a href="/" class="logo">Mod<span class="outline-text">Cord</span></a>
        <a class="bars" ref="bars" @click="toggleMenu()"><i class="fas fa-bars"></i></a>
        <ul ref="nav" class="display-fix">
          <li><a href="/"><i class="fas fa-home"></i> Home</a></li>
          <li><a href="/dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
          <li><a href="/commands"><i class="fas fa-terminal"></i> Commands</a></li>
          <li><a href="/support"><i class="fas fa-headset"></i> Support</a></li>
          <li><a href="/legal"><i class="fas fa-file-contract"></i> Legal</a></li>
          <li><a href="/login" v-if="!authenticated"><i class="fab fa-keycdn"></i> Login</a></li>
          <li><a class="user-tag" v-if="authenticated" v-html="`${username}`"></a></li>
        </ul>
      </header>
    </section>
</template>

<script>
import { mapGetters,mapActions } from "vuex";

export default {
  name: "Header",
  computed: mapGetters(["authenticated", "username"]),
  methods: {
    toggleMenu() {
      var bars = this.$refs.bars;
      var nav = this.$refs.nav;
      if (!this.menuToggled) {
        this.menuToggled = true;
        bars.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
        nav.classList.toggle("display-block");
      } else {
        this.menuToggled = false;       
        bars.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        nav.classList.toggle("display-block");
      }
    },
    ...mapActions(["setToken", "fetchUserData", "projectUserData"])
  },
  data() {
    return {
      menuToggled: false
    }
  },
  created() {
    let URL = window.location.search.substring(1);
    const parameters = new URLSearchParams(URL);
    if (parameters.get("auth") && parameters.get("auth") === "ok") {
      this.setToken(parameters.get("token"));
      localStorage.setItem("expires-in", (Date.now() + 1000 * 60 * 60 * 72));
      if (!this.authenticated) this.fetchUserData();
    } else {
      var session = localStorage.getItem("session-data");
      if (session) session = JSON.parse(session);
      var expiration = localStorage.getItem("expires-in");
      if (expiration) expiration = parseInt(expiration);
      if (!session && !expiration) return;
      if (!expiration && session) return localStorage.removeItem("session-data");
      var isPastDue = Date.now() > expiration;

      if (isPastDue) {
        localStorage.removeItem("session-data");
        localStorage.removeItem("expires-in");
      }

      if (!isPastDue && session) {
        if (!this.authenticated) this.projectUserData(session);
      }
    }
  },
  props: ["title"]
}
</script>

<style scoped>
  header {
    width: 100%;
    height: 5em;
    box-sizing: border-box;
    margin-bottom: 2em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  }

  header ul {
    position: relative;
    display: flex;
    float: right;
    transition: .5s;
  }

  header ul li {
    list-style: none;
  }

  header ul li a {
    position: relative;
    display: block;
    padding: 0.6em 1.2em;
    margin: 1.2em 0;
    text-transform: uppercase;
    text-decoration: none;
    color: #ffffff;
    transition: 0.5s;
  }

  header ul li a:hover {
    -webkit-animation-name: rainbowHover;
    animation-name: rainbowHover;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite
  }

  @-webkit-keyframes rainbowHover {
    0%,
    100% {
      color: #a24bcf
    }
    33% {
      color: #4b79cf
    }
    66% {
      color: #4bc5cf
    }
  }

  @keyframes rainbowHover {
    0%,
    100% {
      color: #a24bcf
    }
    33% {
      color: #4b79cf
    }
    66% {
      color: #4bc5cf
    }
  }

  .bars {
    display: none;
    position: absolute;
    z-index: 999;
    right: 1.3em;
    top: 0.5em;
    color: #ffffff;
    cursor: pointer;
    font-size: 2em;
  }

  .logo {
    margin-left: 0.5em;
    color: #ffffff;
    text-decoration: none;
    font-size: 40px;
    position: relative;
    top: 0.2em;
  }

  .user-tag {
    color: #dfa32b!important
  }

  @media only screen and (max-width: 990px) {
    .display-block {
      display: block;
    }

    .bars {
      display: block;
    }

    header {
      padding: 0;
    }

    .user-tag {
      padding-bottom: 1em;
    }

    header ul {
      padding-top: 1.5em;
      padding-bottom: -2px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      margin-bottom: 2em;
      width: 100%;
      top: 0;
      display: none;
      -webkit-animation-name: animatetop;
      -webkit-animation-duration: 0.4s;
      animation-name: animatetop;
      animation-duration: 0.4s
    }

    @-webkit-keyframes animatetop {
      from {
        top: -300px;
        opacity: 0
      }
      to {
        top: 0;
        opacity: 1
      }
    }

    @keyframes animatetop {
      from {
        top: -300px;
        opacity: 0
      }
      to {
        top: 0;
        opacity: 1
      }
    }

    header ul li a {
      margin: 0;
      display: block;
      text-align: center;
      color: #ffffff;
    }
  }
</style>