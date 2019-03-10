<template >
  <div>
    <header id="header">
      <!-- Page Header -->
      <div id="post-header" class="page-header">
        <div class="background-img" style="background-image: url('/static/img/nano.jpg');"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-16">
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
                <h1>O mnie</h1>
                  <p>Nazywam się Daniel Lewiński</p><p>Od 2007 roku zajmuję się zawodowo programowaniem. Zanim rozpocząłem pracę w zawodzie programisty nie wiedziałem czy wybrać bezpieczeństwo systemów Linux czy programowanie.</p><p>Do dzisiaj lubię dłubać zarówno w systemach jak i programować. Na co dzień zajmuję się BigData, DevOps</p><p>Moim wiodącym językiem programowania jest JAVA, choć z programowania najbardziej interesuje mnie optymalizacja operacji, profilowanie, JIT, GC i JVM - lubię wyciskać na maksa co się da :)</p><p>Ostatnimi czasy ponownie wkręciłem się w programowanie c++ i hobbystycznie programuję w c++ i javascript (nodejs)</p><p>Ten blog jest od początku do końca napisany w c++ i vuejs :)</p>
                
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
          this.tags = response.data
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
        let idx = this.tags.findIndex(t => t.name == tag)
        let style = "post-category";
        if (idx < 4) {
          style += " cat-" + (idx + 1);
        }
        return style;
      },

      showTag(tag) {
        let idx = this.tags.findIndex(t => t.name == tag.name);
        if (idx > 3) {
          return true;
        }
        return false;
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
