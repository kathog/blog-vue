<template >
  <div>
    <!-- HEADER -->
    <header id="header">
      <!-- NAV -->
      <div id="nav">
        <!-- Top Nav -->
        <div id="nav-top" style="background: #1b1c1e;">
          <div class="container">
            <div class="nav-logo">
              <h3>
                <a href="/#/" class="logo" style="color: #fff;">DevOps tech blog</a>
              </h3>
            </div>

            <!-- search & aside toggle -->
            <div class="nav-btns">
              <!-- <button class="aside-btn"><i class="fa fa-bars"></i></button> -->
              <!-- <button class="search-btn"><i class="fa fa-search"></i></button> -->
              <!-- <div id="nav-search">
							<form>
								<input class="input" name="search" placeholder="Enter your search...">
							</form>
							<button class="nav-close search-close">
								<span></span>
              </button>-->
              <form class="search-top-form" @submit.prevent="search">
                <!-- <span class="icon fa fa-search"></span> -->
                <input
                  style="background: #323335; border:none"
                  type="text"
                  v-model="searchValue"
                  placeholder="szukaj"
                  class="input"
                >
              </form>
              <!-- </div> -->
            </div>
            <!-- /search & aside toggle -->
          </div>
        </div>

        <div id="nav-bottom">
          <div class="container">
            <!-- nav -->
            <ul class="nav-menu">
              <li>
                <a href="/#/" class="logo">HOME</a>
              </li>
              <li v-for="tag of tags" v-if="!showTag(tag)">
                <a v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <div class="page-header">
      <div class="container">
        <div class="row">
          <div class="col-md-offset-1 col-md-10 text-center">
            <div class="author">
              <!-- <img class="author-img center-block" src="https://api.craftsoft.eu/img/9d86e940-5de1-11e9-a604-b9289feaab85" alt=""> -->
              <h1 class="text-uppercase">Kontakt</h1>
              <p class="lead">Jeśli masz jakieś pytania lub chcesz się ze mną skontaktować</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div class="row">
          <!-- <div class="row"> -->
          <div class="col-md-8">
            <div class="row">
              <div class="section-row">
                <div class="section-title">
                  <h2 class="title">Informacje kontaktowe</h2>
                </div>
                <p></p>
                <ul class="contact">
                  <!-- <li><i class="fa fa-phone"></i> 202-555-0194</li> -->
                  <li>
                    <i class="fa fa-envelope"></i>
                    <a href="mailto:daniel.lewinski@craftsoft.eu">daniel.lewinski@craftsoft.eu</a>
                  </li>
                  <!-- <li><i class="fa fa-map-marker"></i> 123 6th St.Melbourne, FL 32904</li> -->
                </ul>
              </div>
              <div class="section-row">
                <div class="section-title">
                  <h2 class="title">Napisz mail</h2>
                </div>
                <div v-if="response.length" v-bind:class="getAlertClass()" role="alert">
                  <p>{{response}}</p>
                </div>
                <form @submit.prevent="doSend">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="form-group">
                        <input
                          class="input"
                          v-bind:disabled="disabled"
                          type="email"
                          placeholder="E-mail"
                          v-model="email"
                          required
                        >
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <textarea
                          class="input"
                          v-bind:disabled="disabled"
                          v-model="message"
                          placeholder="Wiadomość"
                          required
                        ></textarea>
                      </div>
                      <button class="primary-button">Wyślij</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="aside-widget">
              <div class="section-title">
                <h2 class="title">Kategorie</h2>
              </div>
              <div class="category-widget">
                <ul>
                  <li v-for="tag of tags" v-if="!showTag(tag)">
                    <a v-bind:href="tagUrl(tag.name)">
                      {{tag.name}}
                      <span>{{tag.value}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
    </div>

    <!-- Footer -->
    <footer id="footer">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div class="row">
          <div class="col-md-5">
            <div class="footer-widget">
              <div class="footer-logo">
                <h3 class="post-title">
                  <a href="/" class="logo">CraftSoft</a>
                </h3>
              </div>
              <ul class="footer-nav">
                <!-- <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Advertisement</a></li>-->
              </ul>
              <div class="footer-copyright">
                <span>
                  &copy;
                  Copyright &copy;All rights reserved | This template is made with
                  <i
                    class="fa fa-heart-o"
                    aria-hidden="true"
                  ></i> by
                  <a href="https://colorlib.com" target="_blank">Colorlib</a>
                </span>
              </div>
            </div>
          </div>
          <!-- <div class="col-md-3"></div> -->

          <div class="col-md-6">
            <div class="row">
              <div class="col-md-3">
                <div class="footer-widget">
                  <h3 class="footer-title">About</h3>
                  <ul class="footer-links">
                    <li>
                      <a href="/#/about">O mnie</a>
                    </li>
                    <li>
                      <a href="/#/contact">Kontakt</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9">
                <div class="footer-widget">
                  <h3 class="footer-title">Kategorie</h3>
                  <div class="tags-widget">
                    <ul>
                      <li v-for="tag of tags">
                        <a
                          v-bind:class="tagCss(tag.name)"
                          v-bind:href="tagUrl(tag.name)"
                        >{{tag.name}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </footer>
    <!-- /Footer -->
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "Index",
  data() {
    axios
      .get("/last")
      .then(response => {
        this.lastAdded = response.data;
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });

    return {
      posts: [],
      tags: [],
      tags0: [],
      errors: [],
      page: 1,
      more: true,
      searchValue: "",
      mostRead: [],
      lastAdded: [],
      name: "",
      email: "",
      message: "",
      disabled: false,
      success: false,
      response: ""
    };
  },

  watch: {
    $route(to, from) {
      this.page = 1;
      this.more = true;

      axios
        .get("/mostViewed")
        .then(response => {
          // JSON responses are automatically parsed.
          this.mostRead = response.data;
          // console.log(this.posts)
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
    }
  },

  created() {
    axios
      .get("/tagCloud")
      .then(response => {
        // JSON responses are automatically parsed.
        this.tags0 = response.data;
        this.tags = Object.keys(this.tags0)
          .map(t => {
            this.$set(this.tags0[t], "key", t);
            return this.tags0[t];
          })
          .sort(this.sortProperty("value"));

        // console.log(this.tags)
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });

    axios
      .get("/mostViewed")
      .then(response => {
        // JSON responses are automatically parsed.
        this.mostRead = response.data;
        // console.log(this.posts)
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });
  },

  methods: {
    getDate(datetime) {
      let date = new Date();
      date.setTime(datetime);
      return moment(date).format("DD-MM-YYYY");
    },

    postUrl(postId) {
      return "/#/post/" + postId;
    },

    tagUrl(tag) {
      return "/#/onTag?t=" + tag;
    },

    sortProperty(prop) {
      return (a, b) => {
        if (a[prop] < b[prop]) return 1;
        if (a[prop] > b[prop]) return -1;
        return 0;
      };
    },

    tagCss(tag) {
      // console.log("tag: " + tag);
      let idx = this.tags.findIndex(t => t.name == tag);
      // console.log("idx: " + idx);

      let style = "post-category";
      if (idx < 4) {
        style += " cat-" + (idx + 1);
      }
      // console.log(style);
      return style;
    },

    showTag(tag) {
      let idx = this.tags.findIndex(t => t.name == tag.name);
      // console.log("show idx: " + idx);
      if (idx > 3) {
        return true;
      }
      return false;
    },

    search: function(event) {
      console.log(this.searchValue);
      this.$router.push("/?q=" + this.searchValue);
      this.searchValue = "";
    },

    showFirstP(description) {
      var pIdx = description.indexOf("</p>");
      var brIdx = description.indexOf("<br>");
      if (brIdx > 0 && pIdx > brIdx) {
        pIdx = brIdx;
      }
      return description.substring(0, pIdx);
    },

    getAlertClass() {
      if (this.success) {
        return "alert alert-success";
      } else {
        return "alert alert-danger";
      }
    },

    doSend: function(event) {
      this.disabled = true;
      let msg =
        '{"email": "' + this.email + '", "message": "' + this.message + '"}';

      axios
        .post("/send", msg)
        .then(response => {
          console.log(response.data);
          this.disabled = false;
          this.success = true;
          this.email = "";
          this.message = "";
          this.response = "Wiadomość wysłana poprawnie";
        })
        .catch(e => {
          console.log(e);
          this.disabled = false;
          this.response = e.message;
        });
    }
  }
};
</script>

<style scoped>
</style>
