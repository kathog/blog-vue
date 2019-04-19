<template >
  <div>
    <Header />

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

    <Footer/>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Footer from "./Footer.vue"
import Header from "./Header.vue"

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

  components: {
    Footer,
    Header
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
