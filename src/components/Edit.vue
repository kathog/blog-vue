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

                <div>
<!--                  <a v-for="tag of post.tags.split(',')" v-bind:class="tagCss(tag)" v-bind:href="tagUrl(tag)">{{tag}}</a>-->
<!--                  <span class="post-date">{{ getDate(post.date.$date) }}</span>-->
                </div>

              </div>
              <h1>DevOps tech blog</h1>
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
            <div class="col-md-12">
              <div class="row">

                <div class="col-md-12" >
                  <div class="form-group">
                      <span>Tytuł</span>
                      <input class="input" v-model="post.title" type="text" name="name">
                  </div>
                  <div class="form-group">
                    <span>Kategorie</span>
                    <vue-tags-input
                                    v-model="tag"
                      :tags="tags0"
                      :separators="[',']"
                                    :autocomplete-items="tags"
                      @tags-changed="newTags => tags0 = newTags"
                    />
                  </div>
                  <div class="form-group">
                    <span>Opis</span>
                    <!-- <v-editor :content="post.description" :path="path" v-model="post.description"></v-editor> -->
                    <yimo-vue-editor v-model="post.description" > </yimo-vue-editor>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div class="form-group">
                    <span>Treść</span>
                    <!-- <v-editor :content="post.content" :path="path" v-model="post.content"></v-editor> -->
                    <yimo-vue-editor v-model="post.content" > </yimo-vue-editor>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="section-row">
                    <button v-on:click="save" class="primary-button center-block">Save</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>



</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import Vue from 'vue'
  import YimoVueEditor from 'yimo-vue-editor'
  import VueTagsInput from '@johmun/vue-tags-input';
  import Editor from 'tt-vue-editor'

  // axios.defaults.baseURL = "http://127.0.0.1:9080"
  axios.defaults.baseURL = "https://api.craftsoft.eu"

  Vue.use(YimoVueEditor, {
    name: 'v-editor-app',//Custom name
    config: {
      // lang: YimoVueEditor.E.langs.en,
    },//wagnEditor config
    uploadHandler: (type, resTxt) => {//Upload processing hook
      if (type === 'success') {
        var res = JSON.parse(resTxt)//Do not process the default look at the return value bit image path
        if (res.status !== 1) {
          return null
        }
        return res.data
      } else if (type === 'error') {
        //todo toast
      } else if (type === 'timeout') {
        //todo toast
      }
      return 'upload failed__'
    }
  })

  export default {
    name: 'Edit',
    components: {
      YimoVueEditor,
      VueTagsInput,
      'v-editor': Editor
    },

    data() {

      this.isEditable();

      axios.get("/tagCloud")
        .then(response => {
          // JSON responses are automatically parsed.
          var tags0 = response.data;
          console.log(tags0)
          tags0.forEach(this.convertTag);
          console.log(this.tags)
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        });

      if (this.$route.params.id != null) {
        axios.get("/post/" + this.$route.params.id)
          .then(response => {
            this.post = response.data
            this.loadTags()
          })
          .catch(e => {
            console.log(e)
            this.errors.push(e)
          });
      }
        return {
          post: {title:"", tags:"", content:"", description:""},
          tags: [],
          tags0: [],
          errors: [],
          tag:'',
          path: "/upload/"
        }

    },

    methods: {

      convertTag(value) {
        this.tags.push({text : value.name, value: value.name, classes: 'tag-category', style: 'background-color: #212631'})
      },

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
        if (idx > 4) {
          return true;
        }
        return false;
      },

      test01 () {
        console.log(this.tags0);
        this.post.tags = '';
        this.tags0.forEach(e => {
          this.post.tags += e.text;
          this.post.tags += ',';
        });
        this.post.tags = this.post.tags.substring(0, this.post.tags.length-1)
        console.log(this.post.tags);
      },

      loadTags () {
        let split = this.post.tags.split(',');
        split.forEach(e => {
          this.tags0.push({text : e, value: e, classes: 'tag-category', style: 'background-color: #212631'})
        });
      },


      save: function (event) {
        console.log(this.post);
        let config = {
          // withCredentials: true,
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('auth_token'),
          }
        };

        this.test01();

        console.log("Bearer " + localStorage.getItem('auth_token'));
      console.log(JSON.stringify(this.post));
        // axios.defaults.headers.common['Authorization'] = "Bearer " + this.readCookie('auth_token');
        if (this.post._id != null) {
          let content = JSON.stringify(this.post);

          axios.post("/post/edit/" + this.post._id.$oid, content, config)
            .then(response => {
              let data0 = response.data;
              console.log(data0);
              this.$router.push("/post/"+ data0);
            })
            .catch(e => {
              console.log(e)
              if (e.message == "Request failed with status code 403") {
                this.$router.push("/login");
              } else {
                this.errors.push(e)
                event.preventDefault();
              }
            });
        } else {
          let content = JSON.stringify(this.post);

          axios.post("/post/save", content, config)
            .then(response => {
              let data0 = response.data;
              console.log(data0);
              this.$router.push("/post/"+ data0);
            })
            .catch(e => {
              console.log(e)
              if (e.message == "Request failed with status code 403") {
                this.$router.push("/login");
              } else {
                this.errors.push(e)
                event.preventDefault();
              }
            });
        }
      },

      isEditable () {
        let config = {
          // withCredentials: true,
          headers: {
            // 'Content-Type': 'application/json',
            Authorization: "Bearer " + localStorage.getItem('auth_token'),
          }
        };
        axios.post("/pingAuth", "", config)
          .then(response => {
          }).catch(e => {
            this.$router.push("/login");
          });
      },

    }
  }
</script>
