<template>
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
              <!-- <li v-for="tag of tags" v-if="!showTag(tag)">
                <a v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
              </li> -->

              <li class="has-dropdown megamenu" v-if="tags" >
                <a v-bind:href="tagUrl(tags[0].name)">{{tags[0].name}}</a>
                <div class="dropdown tab-dropdown">
                  <div class="row">
                    <div class="col-md-10">
                      <div class="dropdown-body tab-content">
                        <div id="tab1" class="tab-pane fade in active">
                          <div class="row">
                            <div class="col-md-4" v-for="post of posts01" >
                              <div class="post post-sm" >
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
                                <h3 class="post-title title-sm">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
						  </li>

              <li class="has-dropdown megamenu" v-if="tags" >
                <a v-bind:href="tagUrl(tags[1].name)">{{tags[1].name}}</a>
                <div class="dropdown tab-dropdown">
                  <div class="row">
                    <div class="col-md-10">
                      <div class="dropdown-body tab-content">
                        <div id="tab1" class="tab-pane fade in active">
                          <div class="row">
                            <div class="col-md-4" v-for="post of posts02" >
                              <div class="post post-sm" >
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
                                <h3 class="post-title title-sm">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
						  </li>

              <li class="has-dropdown megamenu" v-if="tags" >
                <a v-bind:href="tagUrl(tags[2].name)">{{tags[2].name}}</a>
                <div class="dropdown tab-dropdown">
                  <div class="row">
                    <div class="col-md-10">
                      <div class="dropdown-body tab-content">
                        <div id="tab1" class="tab-pane fade in active">
                          <div class="row">
                            <div class="col-md-4" v-for="post of posts03" >
                              <div class="post post-sm" >
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
                                <h3 class="post-title title-sm">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
						  </li>


              <li class="has-dropdown megamenu" v-if="tags" >
                <a v-bind:href="tagUrl(tags[3].name)">{{tags[3].name}}</a>
                <div class="dropdown tab-dropdown">
                  <div class="row">
                    <div class="col-md-10">
                      <div class="dropdown-body tab-content">
                        <div id="tab1" class="tab-pane fade in active">
                          <div class="row">
                            <div class="col-md-4" v-for="post of posts04" >
                              <div class="post post-sm" >
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
                                <h3 class="post-title title-sm">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
						  </li>

              <li class="has-dropdown megamenu" v-if="tags" >
                <a v-bind:href="tagUrl(tags[4].name)">{{tags[4].name}}</a>
                <div class="dropdown tab-dropdown">
                  <div class="row">
                    <div class="col-md-10">
                      <div class="dropdown-body tab-content">
                        <div id="tab1" class="tab-pane fade in active">
                          <div class="row">
                            <div class="col-md-4" v-for="post of posts05" >
                              <div class="post post-sm" >
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
                                <h3 class="post-title title-sm">
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
						  </li>



              <li class="has-dropdown megamenu">
							<a href="#">Pozostałe</a>
							<div class="dropdown">
								<div class="dropdown-body">
									<div class="row">
                      <div class="col-md-3">
                        <ul class="dropdown-list">
                          <li v-for="(tag, index) of tags01" >
                            <a v-if="index == 0" v-bind:href="tagUrl(tag.name)"><h4 class="dropdown-heading">{{tag.name}}</h4></a>
                            <a v-if="index != 0" v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-3" >
                        <!-- <h4 class="dropdown-heading">Lifestyle</h4> -->
                        <ul class="dropdown-list">
                          <li v-for="(tag, index) of tags02" >
                            <a v-if="index == 0" v-bind:href="tagUrl(tag.name)"><h4 class="dropdown-heading">{{tag.name}}</h4></a>
                            <a v-if="index != 0" v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-3" >
                        <!-- <h4 class="dropdown-heading">Fashion</h4> -->
                        <ul class="dropdown-list">
                          <li v-for="(tag, index) of tags03">
                            <a v-if="index == 0" v-bind:href="tagUrl(tag.name)"><h4 class="dropdown-heading">{{tag.name}}</h4></a>
                            <a v-if="index != 0" v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
                          </li>
                        </ul>
                      </div>
                      <div class="col-md-3">
                        <!-- <h4 class="dropdown-heading">Health</h4> -->
                        <ul class="dropdown-list">
                          <li v-for="(tag, index) of tags04">
                            <a v-if="index == 0" v-bind:href="tagUrl(tag.name)"><h4 class="dropdown-heading">{{tag.name}}</h4></a>
                            <a v-if="index != 0" v-bind:href="tagUrl(tag.name)">{{tag.name}}</a>
                          </li>
                        </ul>
                      </div>
									</div>
								</div>
							</div>
						</li>
            </ul>
          </div>
        </div>
      </div>
    </header>


  </div>
</template>

<script>
    import axios from "axios";
    import moment from "moment";

    export default {        
        data : function() {
            axios.get("/tagCloud").then(response => {
                this.tags = response.data;

                let size = this.tags.length;
                let batch = size / 4;
                let startIdx = 6;
                this.tags01 = this.tags.slice(startIdx -1 , batch + startIdx);
                this.tags02 = this.tags.slice(batch + startIdx, batch * 2 + startIdx);
                this.tags03 = this.tags.slice(batch * 2 + startIdx, batch * 3 + startIdx);
                this.tags04 = this.tags.slice(batch * 3 + startIdx, size);


                axios.get("/onTag?t=" + this.tags[0].name + "&r=3").then(response => {
                  this.posts01 = response.data;
                });
                axios.get("/onTag?t=" + this.tags[1].name + "&r=3").then(response => {
                  this.posts02 = response.data;
                });
                axios.get("/onTag?t=" + this.tags[2].name + "&r=3").then(response => {
                  this.posts03 = response.data;
                });
                axios.get("/onTag?t=" + this.tags[3].name + "&r=3").then(response => {
                  this.posts04 = response.data;
                });
                axios.get("/onTag?t=" + this.tags[4].name + "&r=3").then(response => {
                  this.posts05 = response.data;
                });
            }); 
            return {
                tags: [],
                tags01: [],
                tags02: [],
                tags03: [],
                tags04: [],
                posts01: [],
                posts02: [],
                posts03: [],
                posts04: [],
                posts05: [],
                searchValue: "",
            };
        },

        
        methods : {
          getDate(datetime) {
            let date = new Date();
            date.setTime(datetime);
            return moment(date).format("DD-MM-YYYY");
          },

            postUrl(postId) {
              return "/#/post/" + postId;
            },
            tagCss(tag) {
                let idx = this.tags.findIndex(t => t.name == tag);
                let style = "post-category";
                if (idx < 4) {
                    style += " cat-" + (idx + 1);
                }
                return style;
            },
            tagUrl(tag) {
                return "/#/onTag?t=" + tag;
            },

            search: function(event) {
              this.$router.push("/?q=" + this.searchValue);
              this.searchValue = "";
            },
        }   

    }
</script>

<style scoped>
</style>