<template >
  <div>
    
    <Header />

    <!-- SECTION -->
    <div class="section">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div id="hot-post" class="row hot-post">
          <div class="col-md-8 hot-post-left">
            <!-- post -->
            <div class="post post-thumb" v-if="posts.length > 0">
              <a class="post-img" v-bind:href="postUrl(posts[0].id)">
                <img v-if="posts[0].image" v-bind:src="posts[0].image" alt>
                <img v-if="!posts[0].image" src="/static/img/empty.png" alt>
              </a>
              <div class="post-body">
                <div class="post-category">
                  <a
                    v-for="tag of posts[0].tags.split(',')"
                    v-bind:class="tagCss(tag)"
                    v-bind:href="tagUrl(tag)"
                  >{{tag}}</a>
                </div>
                <h3 class="post-title title-lg">
                  <a v-bind:href="postUrl(posts[0].id)">{{posts[0].title}}</a>
                </h3>
                <ul class="post-meta">
                  <li>
                    <a href="/#/about">Nerull</a>
                  </li>
                  <li>{{ getDate(posts[0].date) }}</li>
                </ul>
              </div>
            </div>
            <!-- /post -->
          </div>
          <div class="col-md-4 hot-post-right">
            <!-- post -->
            <div class="post post-thumb" v-if="posts.length > 1">
              <a class="post-img" v-bind:href="postUrl(posts[1].id)">
                <img v-if="posts[1].image" v-bind:src="posts[1].image" alt>
                <img v-if="!posts[1].image" src="/static/img/empty.png" alt>
              </a>
              <div class="post-body">
                <div class="post-category">
                  <a
                    v-for="tag of posts[1].tags.split(',')"
                    v-bind:class="tagCss(tag)"
                    v-bind:href="tagUrl(tag)"
                  >{{tag}}</a>
                </div>
                <h3 class="post-title">
                  <a v-bind:href="postUrl(posts[1].id)">{{posts[1].title}}</a>
                </h3>
                <ul class="post-meta">
                  <li>
                    <a href="/#/about">Nerull</a>
                  </li>
                  <li>{{ getDate(posts[1].date) }}</li>
                </ul>
              </div>
            </div>
            <!-- /post -->

            <!-- post -->
            <div class="post post-thumb" v-if="posts.length > 2">
              <a class="post-img" v-bind:href="postUrl(posts[2].id)">
                <img v-if="posts[2].image" v-bind:src="posts[2].image" alt>
                <img v-if="!posts[2].image" src="/static/img/empty.png" alt>
              </a>
              <div class="post-body">
                <div class="post-category">
                  <a
                    v-for="tag of posts[2].tags.split(',')"
                    v-bind:class="tagCss(tag)"
                    v-bind:href="tagUrl(tag)"
                  >{{tag}}</a>
                </div>
                <h3 class="post-title">
                  <a v-bind:href="postUrl(posts[2].id)">{{posts[2].title}}</a>
                </h3>
                <ul class="post-meta">
                  <li>
                    <a href="/#/about">Nerull</a>
                  </li>
                  <li>{{ getDate(posts[2].date) }}</li>
                </ul>
              </div>
            </div>
            <!-- /post -->
          </div>
        </div>
        <!-- /row -->
      </div>
      <!-- /container -->
    </div>
    <!-- /SECTION -->

    <div class="section">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div class="row">
          <div class="col-md-8">
            <!-- row -->
            <div class="row">
              <div class="col-md-12">
                <div class="section-title">
                  <h2 class="title">Pozostałe posty</h2>
                </div>
              </div>
              <!-- post -->
              <div v-if="index > 2" v-for="(post, index) of posts">
                <div v-if="index % 2" class="clearfix visible-md visible-lg" ></div>
                <div class="col-md-6" > 
                <div class="post">
                  <a class="post-img" v-bind:href="postUrl(post.id)">
                    <img v-if="post.image" v-bind:src="post.image" alt>
                    <img v-if="!post.image" src="/static/img/empty.png" alt>
                  </a>
                  <div class="post-body">
                    <div class="post-category">
                      <a
                        v-for="tag of post.tags.split(',')"
                        v-bind:class="tagCss(tag)"
                        v-bind:href="tagUrl(tag)"
                      >{{tag}}</a>
                    </div>
                    <h3 class="post-title">
                      <a v-bind:href="postUrl(post.id)">{{post.title}}</a>
                    </h3>
                    <ul class="post-meta">
                      <li>
                        <a href="/#/about">Nerull</a>
                      </li>
                      <li>{{ getDate(post.date) }}</li>
                    </ul>
                  </div>
                </div>
              </div>
              </div>
              <div class="col-md-12" v-if="more && posts.length >= 9">
                <div class="section-row loadmore text-center">
                  <button v-on:click="nextPage" class="primary-button">Więcej</button>
                </div>
              </div>
              <!-- /post -->
            </div>
          </div>
          <!-- </div> -->
          <div class="col-md-4">
            <!-- ad widget-->
            <div class="aside-widget text-center">
              <a href="#" style="display: inline-block;margin: auto;">
                <img class="img-responsive" src alt>
              </a>
            </div>
            <!-- /ad widget -->

            <!-- category widget -->
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
            <!-- /category widget -->

            <!-- post widget -->
            <div class="aside-widget">
              <div class="section-title">
                <h2 class="title">Popularne posty</h2>
              </div>

              <div class="post post-widget" v-for="post of mostRead">
                <a class="post-img" v-bind:href="postUrl(post.id)">
                  <img v-if="post.image" v-bind:src="post.image" alt>
                  <img v-if="!post.image" src="/static/img/empty.png" alt>
                </a>
                <div class="post-body">
                  <div class="post-category">
                    <a
                      v-for="tag of post.tags.split(',')"
                      v-bind:class="tagCss(tag)"
                      v-bind:href="tagUrl(tag)"
                    >{{tag}}</a>
                  </div>
                  <h3 class="post-title">
                    <a v-bind:href="postUrl(post.id)">{{post.title}}</a>
                  </h3>
                </div>
              </div>

              <!-- /post -->
            </div>
            <!-- /post widget -->
          </div>

          <!-- /row -->
        </div>
        <!-- /container -->
      </div>
      <!-- /SECTION -->
    </div>

    <Footer/>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Footer from "./Footer.vue"
import Header from "./Header.vue"

// axios.defaults.baseURL = "http://127.0.0.1:9080"
axios.defaults.baseURL = "https://api.craftsoft.eu";
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
      mostRead: [],
      lastAdded: [],
      editable: false
    };
  },

  components: {
      Footer,Header
  },

  watch: {
    $route(to, from) {
      this.page = 1;
      this.more = true;
      var path = to.fullPath.includes("onTag")
        ? to.fullPath
        : to.fullPath.replace("/", "/search");
      var config = {}
      if (this.editable && !path.includes("onTag")) {
        config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token")
          }
        };
        path = path.replace("/search", "/searchFull");
        axios.get(path, config).then(response => {
          this.posts = response.data;
        }).catch(e => {
          console.log(e);
          this.errors.push(e);
        });
      } else {
        axios.get(path).then(response => {
          this.posts = response.data;
        }).catch(e => {
          console.log(e);
          this.errors.push(e);
        });
      }
      

      axios
        .get("/mostViewed")
        .then(response => {
          this.mostRead = response.data;
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
        this.tags = response.data;
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });

    var path = this.$route.fullPath;
    path = path.includes("onTag") ? path : path.replace("/", "/search");
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token")
      }
    };
    axios.get("/pingAuth", config).then(response => {
        this.editable = true;
        var path0 = path.replace("/search", "/searchFull");
        if (!path0.includes("onTag")) {
          axios.get(path0, config).then(response => {
            this.posts = response.data;
          }).catch(e => {
            console.log(e);
            this.errors.push(e);
          });
        } else {
          axios.get(path0).then(response => {
            this.posts = response.data;
          }).catch(e => {
            console.log(e);
            this.errors.push(e);
          });
        }
        
      })
      .catch(e => {
        this.editable = false;
        axios
          .get(path)
          .then(response => {
            this.posts = response.data;
          })
          .catch(e => {
            console.log(e);
            this.errors.push(e);
          });
      });

    axios
      .get("/mostViewed")
      .then(response => {
        this.mostRead = response.data;
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
      let idx = this.tags.findIndex(t => t.name == tag);
      let style = "post-category";
      if (idx < 4) {
        style += " cat-" + (idx + 1);
      }
      return style;
    },

    showTag(tag) {
      let idx = this.tags.findIndex(t => t.name == tag.name);
      if (idx > 4) {
        return true;
      }
      return false;
    },

    nextPage: function(event) {
      this.page += 1;
      let pSearch = "";
      if (this.$route.fullPath.indexOf("?") != -1) {
        pSearch = "&p=" + this.page;
      } else {
        pSearch = "?p=" + this.page;
      }

      var path = this.$route.fullPath;
      path = path.includes("onTag") ? path : path.replace("/", "/search");
      var config = {};
      if (this.editable) {
        config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("auth_token")
          }
        };
        path = path.replace("/search", "/searchFull");
      }
      axios
        .get(path + pSearch, config)
        .then(response => {
          let data0 = response.data;
          if (data0 < 5) {
            this.more = false;
          }
          this.posts = this.posts.concat(data0);
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
    },

    showFirstP(description) {
      var pIdx = description.indexOf("</p>");
      var brIdx = description.indexOf("<br>");
      if (brIdx > 0 && pIdx > brIdx) {
        pIdx = brIdx;
      }
      return description.substring(0, pIdx);
    }
  }
};
</script>

<style scoped>
</style>
