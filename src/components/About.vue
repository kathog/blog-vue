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
						<h3><a href="/#/" class="logo" style="color: #fff;">DevOps tech blog</a></h3>
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
							</button> -->
              <form class="search-top-form" @submit.prevent="search">
                <!-- <span class="icon fa fa-search"></span> -->
                    <input style="background: #323335; border:none" type="text" v-model="searchValue" placeholder="szukaj" class="input">
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
            <li v-for="tag of tags" v-if="!showTag(tag)"><a v-bind:href="tagUrl(tag.name)">{{tag.name}}</a></li>
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
							<img class="author-img center-block" src="https://api.craftsoft.eu/img/9d86e940-5de1-11e9-a604-b9289feaab85" alt="">
							<h1 class="text-uppercase">Daniel Lewiński</h1>
							<p class="lead">Od 2007 roku zajmuję się zawodowo programowaniem. Zanim rozpocząłem pracę w zawodzie programisty nie wiedziałem czy wybrać bezpieczeństwo systemów Linux czy programowanie. Do dzisiaj lubię dłubać zarówno w systemach jak i programować. Na co dzień zajmuję się BigData, DevOps Moim wiodącym językiem programowania jest JAVA, choć z programowania najbardziej interesuje mnie optymalizacja operacji, profilowanie, JIT, GC i JVM - lubię wyciskać na maksa co się da :) Ostatnimi czasy ponownie wkręciłem się w programowanie c++ i hobbystycznie programuję w c++ i javascript (nodejs) Ten blog jest od początku do końca napisany w c++ i vuejs :)</p>
							<!-- <ul class="author-social">
								<li><a href="#"><i class="fa fa-facebook"></i></a></li>
								<li><a href="#"><i class="fa fa-twitter"></i></a></li>
								<li><a href="#"><i class="fa fa-google-plus"></i></a></li>
								<li><a href="#"><i class="fa fa-instagram"></i></a></li>
							</ul> -->
						</div>
					</div>
				</div>
			</div>
		</div>

<div class="section" >
    <div class="container">
				<div class="row">

<div class="col-md-8">
      <!-- post widget -->
					<div class="aside-widget">
						<div class="section-title">
							<h2 class="title">Popularne posty</h2>
						</div>


             <div class="post post-widget" v-for="post of mostRead">
                    <a class="post-img" v-bind:href="postUrl(post.id)"><img v-bind:src="post.image" alt=""></a>
                      <div class="post-body">
                        <div class="post-category">
                          <a v-for="tag of post.tags.split(',')" v-bind:class="tagCss(tag)" v-bind:href="tagUrl(tag)">{{tag}}</a>
                        </div>
                        <h3 class="post-title"><a v-bind:href="postUrl(post.id)">{{post.title}}</a></h3>
                      </div>
                  </div>
				
						<!-- /post -->
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
                  <div  class="tags-widget">
                      <ul>
                        <li v-for="tag of tags">
                          <a  v-bind:class="tagCss(tag.name)" v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
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

          axios.get("/mostViewed")
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

      axios.get("/mostViewed")
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
        return "/#/post/" + postId;
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
