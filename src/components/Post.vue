<template>
  <div>
    <Header/>

    <div id="post-header" class="page-header" v-if="post">
        <div
          class="page-header-bg"
          v-bind:style="showImg(post)"
          data-stellar-background-ratio="0.5"
        ></div>
        <div class="container">
          <div class="row">
            <div class="col-md-10">
              <div class="post-category" v-if="post.tags">
                <a v-for="tag of post.tags.split(',')" v-bind:href="tagUrl(tag)">{{tag}}</a>
              </div>
              <h1>{{post.title}}</h1>
              <ul class="post-meta">
                <li>
                  <a href="/#/about">Nerull</a>
                </li>
                <li>{{ getDate(post.date) }}</li>
                <li>
                  <i class="fa fa-comments"></i> 0
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    <div class="section">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div class="row">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="post post-row">
                    <!--                  <a class="post-img" href="blog-post.html"><img src="/static/img/Empty.jpg" alt=""></a>-->
                    <div class="post-body-noimg">
                      <!--                      <h3 class="post-title"><a v-bind:href="postUrl(post.id)">{{post.title}}</a></h3>-->
                      <p v-html="post.content"></p>
                    </div>
                  </div>

                  <div class="aside-widget" v-if="editable">
                    <div class="tags-widget">
                      <ul>
                        <li>
                          <router-link class="post-category" :to="'/edit/'+post.id">Edytuj</router-link>
                        </li>
                        <li>
                          <a href="#" class="post-category" v-on:click="deletePost()">Usuń</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- comments -->
              <div class="section-row" v-if="comments.length">
                <div class="section-title">
                  <h2>{{comments.length}} komentarzy</h2>
                </div>

                <div class="post-comments">
                  <!-- comment -->
                  <div class="media" v-for="comment0 of comments">
                    <div class="media-left">
                      <v-gravatar
                        class="media-object"
                        v-bind:email="comment0.email"
                        alt="Nobody"
                        default-img="mp"
                      />
                    </div>
                    <div class="media-body">
                      <div class="media-heading">
                        <h4>{{comment0.username}}</h4>
                        <span class="time">{{getDate(comment0.date)}}</span>
                        <a
                          v-if="editable"
                          v-on:click="removeComment(comment0.id)"
                          class="reply"
                        >Usuń</a>
                      </div>
                      <p>{{decodeURIComponent(comment0.message)}}</p>
                      <!-- /comment -->
                    </div>
                  </div>
                  <!-- /comment -->
                </div>
              </div>


            </div>


          </div>

          <div class="row">


              <div class="col-md-8">
              <div class="aside-widget">
                <div class="section-title">
                  <h2 class="title">Popularne posty</h2>
                </div>
                <div class="row">
                    <div class="col-md-4" v-for="(post, index) of mostRead">
                      <div class="post post-sm" v-if="index < 3" >
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
                <!-- /post -->
              </div>
              <!-- /post widget -->
            </div>

            <div class="col-md-4">
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
    </div>

    <Footer/>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import Gravatar from "vue-gravatar";
import Footer from "./Footer.vue"
import Header from "./Header.vue"

export default {
  name: "post",

  components: {
    "v-gravatar": Gravatar,
    Footer,
    Header
  },

  watch: {
    $route(to, from) {
      axios.get("/post/" + this.$route.params.id).then(response => {
        this.post = response.data;
        this.isEditable();
        window.scrollTo(0,0);
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });
    },
  },

  data() {
    axios
      .get("/tagCloud")
      .then(response => {
        this.tags = response.data;
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });

    axios.get("/post/" + this.$route.params.id).then(response => {
        this.post = response.data;
        this.isEditable();
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
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

    axios
      .get("/last")
      .then(response => {
        this.lastAdded = response.data;
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });

    // axios
    //   .get("/comments/" + this.$route.params.id)
    //   .then(response => {
    //     this.comments = response.data;
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     this.errors.push(e);
    //   });

    if (!this.editable) {
      axios
        .get("/post/inc/" + this.$route.params.id)
        .then(response => {})
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
    }

    return {
      msg: "Post View",
      post: "",
      tags: [],
      tags0: [],
      errors: [],
      editable: false,
      searchValue: "",
      mostRead: [],
      lastAdded: [],
      comment: { username: "", email: "", message: "", postId: "" },
      comments: []
    };
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

    showImg(post) {
      return "background-image: url('" + post.image + "');";
    },

    isEditable() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      };
      axios
        .get("/pingAuth", config)
        .then(response => {
          this.editable = true;
        })
        .catch(e => {
          this.editable = false;
        });
    },

    deletePost() {
      var r = confirm("Usunąć post?");
      if (r == false) {
        return;
      }
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      };
      axios
        .post("/post/delete/" + this.post.id, "", config)
        .then(response => {
          this.$router.push("/");
        })
        .catch(e => {});
    },

    showFirstP(description) {
      var pIdx = description.indexOf("</p>");
      var brIdx = description.indexOf("<br>");
      if (brIdx > 0 && pIdx > brIdx) {
        pIdx = brIdx;
      }
      return description.substring(0, pIdx);
    },

    removeComment(commentId) {
      axios
        .post("/deleteComment/" + commentId)
        .then(response => {
          axios
            .get("/comments/" + this.post.id)
            .then(response => {
              this.comments = response.data;
            })
            .catch(e => {
              console.log(e);
              this.errors.push(e);
            });
        })
        .catch(e => {
          console.log(e);
        });
    },

    search: function(event) {
      this.$router.push("/?q=" + this.searchValue);
      this.searchValue = "";
    },

    doSend: function(event) {
      var commentMsg = encodeURIComponent(this.comment.message);
      let msg =
        '{"email": "' +
        this.comment.email +
        '", "message": "' +
        commentMsg +
        '","username":"' +
        this.comment.username +
        '","postId":"' +
        this.post.id +
        '"}';

      console.log(commentMsg);
      axios
        .post("/pushComment/" + this.post.id, msg)
        .then(response => {
          axios
            .get("/comments/" + this.post.id)
            .then(response => {
              this.comments = response.data;
              this.comment.email = "";
              this.comment.message = "";
              this.comment.username = "";
            })
            .catch(e => {
              console.log(e);
              this.errors.push(e);
            });

          var message =
            "dodano nowy komentarz o treści: '" +
            commentMsg +
            "' do posta https://craftsoft.eu/#/post/" +
            this.post.id;
          msg =
            '{"email": "nerull@craftsoft.eu", "message": "' + message + '"}';
          axios
            .post("/send", msg)
            .then(response => {})
            .catch(e => {});
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
