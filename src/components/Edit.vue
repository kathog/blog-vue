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
        <div class="row">
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <span>Tytuł</span>
                    <input class="input" v-model="post.title" type="text" name="name">
                  </div>
                  <div class="form-group">
                    <span>Zdjęcie</span>
                    <input class="input" v-model="post.image" type="text" name="image">
                  </div>
                  <div class="form-group">
                    <span>Kategorie</span>
                    <vue-tags-input
                      v-model="tag"
                      :tags="tags0"
                      :separators="[',']"
                      :autocompleteItems="tags"
                      @tags-changed="newTags => tags0 = newTags"
                    />
                  </div>
                  <div class="form-group">
                    <span>Opis</span>
                    <v-editor-app v-model="post.description"></v-editor-app>
                  </div>
                  <br>
                  <br>
                  <br>
                  <div class="form-group">
                    <span>Treść</span>
                    <v-editor-app v-model="post.content"></v-editor-app>
                  </div>
                  <!-- <div class="form-check"> -->
                  <div class="custom-control custom-checkbox">
                    <input class="custom-control-input" type="checkbox" v-model="post.publish">
                    <label class="custom-control-label">Post opublikowany</label>
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
import axios from "axios";
import moment from "moment";
import Vue from "vue";
// import YimoVueEditor from 'yimo-vue-editor'
import VueTagsInput from "@johmun/vue-tags-input";
import VEditor from "yimo-vue-editor";

Vue.use(VEditor, {
  name: "v-editor-app",
  config: {
    lang: YimoVueEditor.E.langs.en,
    uploadImgUrl: "https://api.craftsoft.eu/upload",
    menus: ["source", "|", "bold", "underline", "italic", "strikethrough", "eraser", "forecolor", "bgcolor", "|", "quote", "fontfamily", "fontsize", "head", "unorderlist", "orderlist", "alignleft", "aligncenter", "alignright", "|", "link", "unlink", "table", "|", "img", "insertcode", "|", "undo", "redo", "fullscreen"]
  },

  uploadHandler: (type, resTxt) => {
    if (type === "success") {
      var res = JSON.parse(resTxt);
      return res.base64;
    } else if (type === "error") {
      //todo toast
    } else if (type === "timeout") {
      //todo toast
    }
    return "upload failed__";
  }
});

export default {
  name: "Edit",
  components: {
    YimoVueEditor,
    VueTagsInput
  },

  data() {
    this.isEditable();

    axios
      .get("/tagCloud")
      .then(response => {
        var tags0 = response.data;
        tags0.forEach(this.convertTag);
      })
      .catch(e => {
        console.log(e);
        this.errors.push(e);
      });

    if (this.$route.params.id != null) {
      axios
        .get("/post/" + this.$route.params.id)
        .then(response => {
          this.post = response.data;
          this.loadTags();
        })
        .catch(e => {
          console.log(e);
          this.errors.push(e);
        });
    }

    return {
      post: {
        title: "",
        tags: "",
        content: "",
        description: "",
        publish: false
      },
      tags: [],
      tags0: [],
      errors: [],
      tag: ""
    };
  },

  methods: {
    convertTag(value) {
      this.tags.push({
        text: value.name,
        value: value.name,
        classes: "tag-category",
        style: "background-color: #212631"
      });
    },

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

    test01() {
      this.post.tags = "";
      this.tags0.forEach(e => {
        this.post.tags += e.text;
        this.post.tags += ",";
      });
      this.post.tags = this.post.tags.substring(0, this.post.tags.length - 1);
    },

    loadTags() {
      let split = this.post.tags.split(",");
      split.forEach(e => {
        this.tags0.push({
          text: e,
          value: e,
          classes: "tag-category",
          style: "background-color: #212631"
        });
      });
    },

    save: function(event) {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      };

      this.test01();

      if (this.post.id != null) {
        let content = JSON.stringify(this.post);
        axios
          .post("/post/edit/" + this.post.id, content, config)
          .then(response => {
            let data0 = response.data;
            this.$router.push("/post/" + data0);
          })
          .catch(e => {
            if (e.message == "Request failed with status code 403") {
              this.$router.push("/login");
            } else {
              this.errors.push(e);
              event.preventDefault();
            }
          });
      } else {
        let content = JSON.stringify(this.post);

        axios
          .post("/post/save", content, config)
          .then(response => {
            let data0 = response.data;
            this.$router.push("/post/" + data0);
          })
          .catch(e => {
            console.log(e);
            if (e.message == "Request failed with status code 403") {
              this.$router.push("/login");
            } else {
              this.errors.push(e);
              event.preventDefault();
            }
          });
      }
    },

    isEditable() {
      let config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("auth_token")
        }
      };
      axios
        .get("/pingAuth", config)
        .then(response => {})
        .catch(e => {
          this.$router.push("/login");
        });
    }
  }
};
</script>
