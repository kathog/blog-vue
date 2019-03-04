<template >
  <div>
    <header id="header">
      <!-- Page Header -->
      <div id="post-header" class="page-header">
        <div class="background-img" style="background-image: url('/static/img/nano.jpg');"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-18">
              <div class="row">
            <div class="col-md-8">
              <div class="post-meta">
              <div>
                <router-link class="post-category" to="/">CRAFTSOFT BLOG</router-link>
              </div>
                <br />
                <div>
                  <a v-for="tag of tags" v-if="!showTag(tag)" v-bind:class="tagCss(tag.name)" v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
                </div>
                
              </div>
              <h1>DevOps tech blog</h1>
            </div>
            <div class="col-md-4">
              <form class="login" @submit.prevent="search">
                <input type="text" v-model="searchValue" placeholder="szukaj" class="input" style="background-color: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.5);">
              </form>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- /Page Header -->
    </header>

    <div class="section">
      <!-- container -->
      <div class="container">
        <ul v-if="errors && errors.length">
          <li v-for="error of errors">
            {{error.message}}
          </li>
        </ul>
        <!-- row -->
        <div class="row">
          <div class="row">
            <div class="col-md-8">
              <div class="row">

                <div class="col-md-12" v-for="post of posts">
                  <div class="post post-row">
                    <!--                  <a class="post-img" href="blog-post.html"><img src="/static/img/Empty.jpg" alt=""></a>-->
                    <div class="post-body-noimg">
                      <div class="post-meta">
<!--                        <router-link v-for="tag of post.tags.split(',')" v-bind:class="tagCss(tag)" :to="tagUrl(tag)">{{tag}}</router-link>-->
                        <a v-for="tag of post.tags.split(',')" v-bind:class="tagCss(tag)" v-bind:href="tagUrl(tag)">{{tag}}</a>
                        <span class="post-date">{{ getDate(post.date.$date) }}</span>
                      </div>
                      <h3 class="post-title"><a v-bind:href="postUrl(post._id)">{{post.title}}</a></h3>
                      <p v-html="post.description"></p>
                    </div>
                  </div>
                </div>

                <div class="col-md-12" v-if="more && posts.length >= 5" >
                  <div class="section-row">
                    <button v-on:click="nextPage" class="primary-button center-block">Więcej</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <!-- catagories -->
              <div class="aside-widget">
                <div class="section-title">
                  <h2>Kategorie</h2>
                </div>
                <div class="category-widget">
                  <ul>
                    <li v-for="tag of tags" v-if="!showTag(tag)"><a  v-bind:class="tagCss(tag.name)"  v-bind:href="tagUrl(tag.name)">{{tag.name}}<span>{{tag.value}}</span></a></li>
                  </ul>
                </div>
              </div>
              <!-- /catagories -->

              <!-- tags -->
              <div class="aside-widget">
                <div class="tags-widget">
                  <ul>
                    <li v-for="tag of tags" v-if="showTag(tag)"><a v-bind:href="tagUrl(tag.name)">{{tag.name}}</a></li>
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
                    <h3 class="post-title"><a v-bind:href="postUrl(post._id)">{{post.title}}</a></h3>
                    <!-- <p v-html="showFirstP(post.description)"></p> -->
                    <!-- <div style="display: none">{{post.count}}</div> -->
                  </div>
							  </div>
              </div>

              <div class="aside-widget">
                <div class="section-title">
                  <h2>Najnowsze</h2>
                </div>
                <div class="post post-widget" v-for="post of lastAdded">
                  <div class="post-body-noimg">
                    <h3 class="post-title"><a v-bind:href="postUrl(post._id)">{{post.title}}</a></h3>
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
								<h3 class="post-title"><a href="/" class="logo">CraftSoft</a></h3>
							</div>
							<ul class="footer-nav">
								<!-- <li><a href="#">Privacy Policy</a></li>
								<li><a href="#">Advertisement</a></li> -->
							</ul>
							<div class="footer-copyright">
								<span>&copy;
Copyright &copy;All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a></span>
							</div>
						</div>
					</div>
          <div class="col-md-3">
          </div>

					<div class="col-md-4">
						<div class="row">
							<div class="col-md-6">
								<div class="footer-widget">
									<h3 class="footer-title">About</h3>
									<ul class="footer-links">
										<li><a href="/#/about">O mnie</a></li>
                    <li><a href="/#/contact">Kontakt</a></li>
									</ul>
								</div>
							</div>
							<div class="col-md-6">
								<div class="footer-widget">
									<h3 class="footer-title">Kategorie</h3>
									<ul class="footer-links">
                    <li v-for="tag of tags" v-if="!showTag(tag)"><a  v-bind:href="tagUrl(tag.name)">{{tag.name}}</a></li>
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
  import axios from 'axios';
  import moment from 'moment';

  // axios.defaults.baseURL = "http://127.0.0.1:9080"
  axios.defaults.baseURL = "https://api.craftsoft.eu"
  export default {
    name: "Index",
    data() {

          axios.get("/last")
          .then(response => {
            this.lastAdded = response.data
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
          });

      return {
        posts: [],
        tags: [],
        tags0: [],
        errors: [],
        page : 1,
        more : true,
        searchValue: "",
        mostRead: [],
        lastAdded: [],
      }

    },

    watch: {
      '$route' (to, from) {
        this.page = 1;
        this.more = true;
        axios.get(to.fullPath)
          .then(response => {
            this.posts = response.data
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
          });

          axios.post("/mostViewed")
          .then(response => {
            this.mostRead = response.data
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
          });
      }
    },

    created() {


      axios.get("/tagCloud")
        .then(response => {
          // JSON responses are automatically parsed.
          this.tags0 = response.data
          this.tags = Object.keys(this.tags0)
            .map(t => {
              this.$set(this.tags0[t], 'key', t)
              return this.tags0[t]
            })
            .sort(this.sortProperty('value'));


          // console.log(this.tags)
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        });

      axios.get(this.$route.fullPath)
        .then(response => {
          // JSON responses are automatically parsed.
          this.posts = response.data
          // console.log(this.posts)
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        });

      axios.post("/mostViewed")
          .then(response => {
            // JSON responses are automatically parsed.
            this.mostRead = response.data
            // console.log(this.posts)
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
          });

    },

    methods: {
      getDate(datetime) {
        let date = new Date();
        date.setTime(datetime);
        return moment(date).format('DD-MM-YYYY');
      },

      postUrl(postId) {
        return "/#/post/" + postId.$oid;
      },

      tagUrl(tag) {
        return "/#/onTag?t=" + tag;
      },

      sortProperty(prop) {
        return (a, b) => {
          if (a[prop] < b[prop])
            return 1;
          if (a[prop] > b[prop])
            return -1;
          return 0;
        }
      },

      tagCss(tag) {
        // console.log("tag: " + tag);
        let idx = this.tags.findIndex(t => t.name == tag)
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

      nextPage: function (event) {
        this.page += 1;
        let pSearch = "";
        if (this.$route.fullPath.indexOf("?") != -1) {
          pSearch = "&p=" + this.page;
        } else {
          pSearch = "?p=" + this.page;
        }
        axios.get(this.$route.fullPath +  pSearch)
          .then(response => {
            // JSON responses are automatically parsed.
            let data0 = response.data;
            if (data0 < 5) {
              this.more = false;
            }
            this.posts = this.posts.concat(data0);
            // console.log(this.posts)
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
          });
        // alert('Hello ' + this.page + '!')
      },

      search: function (event) {
        console.log(this.searchValue);
        this.$router.push("/?q=" + this.searchValue);
        this.searchValue = "";
      },

      showFirstP (description) {
        var pIdx = description.indexOf("</p>");
        var brIdx = description.indexOf("<br>");
        if (brIdx > 0 && pIdx > brIdx) {
          pIdx = brIdx;
        }
        return description.substring(0, pIdx);
      }

    }

  }

</script>

<style scoped>

</style>
