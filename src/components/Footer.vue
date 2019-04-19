<template>
  <div>
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
        <!-- /row -->
      </div>
      <!-- /container -->
    </footer>
    <!-- /Footer -->
  </div>
</template>

<script>
    import axios from "axios";

    export default {        
        data : function() {
            axios.get("/tagCloud").then(response => {
                this.tags = response.data;
            }); 
            return {
                tags: []
            };
        },

        
        methods : {
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
        }   

    }
</script>

<style scoped>
</style>