<template>
  <div>
    <header id="header">
      <!-- Page Header -->
      <div id="post-header" class="page-header">
        <div class="background-img" style="background-image: url('/static/img/nano.jpg');"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="post-meta">
                  <div>
                    <router-link class="post-category" to="/">CRAFTSOFT BLOG</router-link>
                  </div>
                  <br>
                  <div v-if="post.tags != null">
                    <a
                      v-for="tag of post.tags.split(',')"
                      v-bind:class="tagCss(tag)"
                      v-bind:href="tagUrl(tag)"
                    >{{tag}}</a>
                    <span class="post-date">{{ getDate(post.date.$date) }}</span>
                  </div>
                </div>
                <h1>{{post.title}}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Page Header -->
    </header>
    <!--    <router-link to="/firstroute/dup">Link to route one, child one</router-link>-->
    <!-- section -->
    <!--    {{doSearch()}}-->
    <div class="section">
      <!-- container -->
      <div class="container">
        <!-- row -->
        <div class="row">
          <div class="row">
            <div class="col-md-8">
              <div class="row">
                <div class="col-md-12">
                  <div class="post post-row">
                    <!--                  <a class="post-img" href="blog-post.html"><img src="/static/img/Empty.jpg" alt=""></a>-->
                    <div class="post-body-noimg">
                      <!--                      <h3 class="post-title"><a v-bind:href="postUrl(post.id)">{{post.title}}</a></h3>-->
                      <p v-html="post.content"></p>
                    </div>
                    <div class="post-meta" v-if="editable">
                      <router-link class="post-category" :to="'/edit/'+post.id">Edytuj</router-link>
                      <a href="#" class="post-category" v-on:click="deletePost()">Usuń</a>
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
                        <a v-if="editable" v-on:click="removeComment(comment0.id)" class="reply">Usuń</a>
                      </div>
                      <p>{{decodeURIComponent(comment0.message)}}</p>
                      <!-- <p style="display: none">{{comment0.id}}</p> -->
                      <!-- comment -->
                      <!-- <div class="media">
											<div class="media-left">
												<img class="media-object" src="/static/img/author.png" alt="">
											</div>
											<div class="media-body">
												<div class="media-heading">
													<h4>John Doe</h4>
													<span class="time">March 27, 2018 at 8:00 am</span>
													<a href="#" class="reply">Reply</a>
												</div>
												<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
											</div>
                      </div>-->
                      <!-- /comment -->
                    </div>
                  </div>
                  <!-- /comment -->
                </div>
              </div>
              <!-- /comments -->
              <!-- reply -->
              <div class="section-row">
                <div class="section-title">
                  <h2>Zostaw komentarz</h2>
                  <p>Twój mail nie zostanie upubliczniony. Wymagane pola są oznaczone *</p>
                </div>
                <form class="post-reply" @submit.prevent="doSend">
                  <div class="row">
                    <div class="col-md-4">
                      <div class="form-group">
                        <span>Imię *</span>
                        <input class="input" type="text" v-model="comment.username" required>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="form-group">
                        <span>Email *</span>
                        <input class="input" type="email" v-model="comment.email" required>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="form-group">
                        <textarea
                          class="input"
                          v-model="comment.message"
                          placeholder="Wiadomość"
                          required
                        ></textarea>
                      </div>
                      <button class="primary-button">Wyślij</button>
                    </div>
                  </div>
                </form>
              </div>
              <!-- /reply -->
            </div>

            <div class="col-md-4">
              <!-- catagories -->
              <div class="aside-widget">
                <div class="section-title">
                  <h2>Kategorie</h2>
                </div>
                <div class="category-widget">
                  <ul>
                    <li v-for="tag of tags" v-if="!showTag(tag)">
                      <a v-bind:class="tagCss(tag.name)" v-bind:href="tagUrl(tag.name)">
                        {{tag.name}}
                        <span>{{tag.value}}</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- /catagories -->
              <!-- tags -->
              <div class="aside-widget">
                <div class="tags-widget">
                  <ul>
                    <li v-for="tag of tags" v-if="showTag(tag)">
                      <a v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- /tags -->
              <div class="aside-widget">
                <div class="section-title">
                  <h2>Najczęściej czytane</h2>
                </div>
                <div class="post post-widget" v-for="post of mostRead">
                  <div class="post-body-noimg">
                    <h3 class="post-title">
                      <a v-bind:href="postUrl(post.id)">{{post.title}}</a>
                    </h3>
                    <!-- <p v-html="showFirstP(post.description)"></p> -->
                  </div>
                </div>
              </div>

              <div class="aside-widget">
                <div class="section-title">
                  <h2>Najnowsze</h2>
                </div>
                <div class="post post-widget" v-for="post of lastAdded">
                  <div class="post-body-noimg">
                    <h3 class="post-title">
                      <a v-bind:href="postUrl(post.id)">{{post.title}}</a>
                    </h3>
                    <!-- <p v-html="showFirstP(post.description)"></p> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <div class="col-md-3"></div>

          <div class="col-md-4">
            <div class="row">
              <div class="col-md-6">
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
              <div class="col-md-6">
                <div class="footer-widget">
                  <h3 class="footer-title">Kategorie</h3>
                  <ul class="footer-links">
                    <li v-for="tag of tags" v-if="!showTag(tag)">
                      <a v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
                    </li>
                  </ul>
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
import Gravatar from "vue-gravatar";


export default {
  name: "post",

  components: {
    "v-gravatar": Gravatar
  },

  data() {
    axios.get("/tagCloud").then(response => {
        this.tags = response.data;
      }).catch(e => {
        console.log(e);
        this.errors.push(e);
      });

    axios
      .get("/post/" + this.$route.params.id)
      .then(response => {
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

    axios
      .get("/comments/" + this.$route.params.id)
      .then(response => {
        this.comments = response.data;
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });

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

    isEditable() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      };
      axios
        .get("/pingAuth", "", config)
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
        .catch(e => {
        });
    },

    showFirstP(description) {
      var pIdx = description.indexOf("</p>");
      var brIdx = description.indexOf("<br>");
      if (brIdx > 0 && pIdx > brIdx) {
        pIdx = brIdx;
      }
      return description.substring(0, pIdx);
    },

    removeComment (commentId) {
    axios.post("/deleteComment/" + commentId).then(response => {
          axios.get("/comments/" + this.post.id).then(response => {
              this.comments = response.data;
            }).catch(e => {
              console.log(e);
              this.errors.push(e);
            });
          
        }).catch(e => {
          console.log(e);
        });
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
      axios.post("/pushComment/" + this.post.id, msg).then(response => {
          axios.get("/comments/" + this.post.id).then(response => {
              this.comments = response.data;
              this.comment.email = '';
              this.comment.message = '';
              this.comment.username = '';
            }).catch(e => {
              console.log(e);
              this.errors.push(e);
            });
            
          var message = "dodano nowy komentarz o treści: '"+commentMsg +"' do posta https://craftsoft.eu/#/post/" + this.post.id; 
          msg = "{\"email\": \"nerull@craftsoft.eu\", \"message\": \"" + message + "\"}";
          axios.post("/send", msg).then(response => {
            })
            .catch(e => {
            });  
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>
