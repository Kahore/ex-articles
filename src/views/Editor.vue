<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
          <ul class="error-messages" v-if="error">
            <li>{{error}}</li>
          </ul>
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Article Title"
                    v-model.trim="title">
              </fieldset>
              <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="What's this article about?"
                    v-model.trim="description">
              </fieldset>
              <fieldset class="form-group">
                  <textarea
                    class="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    v-model.trim="body"></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model.lazy="tag"
                    @change.prevent="tagAdd">
                    <div class="tag-list">
                      <span
                      class="tag-pill tag-default"
                      v-for="(tag, index) in tagList"
                      :key="index">
                      <span>
                         {{tag}}
                      </span>
                    <button
                      class="btn btn-danger tag-btn"
                      @click.prevent="tagDelete(index)">x</button>
                      </span>
                    </div>
              </fieldset>
              <template v-if="$data._id === ''">
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click.prevent="insertArticle"
                  :disabled="isLoading">
                
                    Publish Article
                </button>
              </template>
              <template v-else>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click.prevent="updateArticle"
                  :disabled="isLoading">
                  Amend Article
                  </button>
              </template>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import users from '../store/modules/users';
import articles from '../store/modules/articles';
import { NewArticle, UpdateArticle } from '../store/models';
@Component
export default class Editor extends Vue {
    // tslint:disable-next-line
    public _id: string = '';
    public title: string = '';
    public description: string = '';
    public body: string = '';
    public tagList: string[] = [];
    private tag: string = '';
    private error: string = '';
    private isLoading: boolean = false;
    /**
     * created
     */
    public created() {
      this.loadArticle();
    }
    /**
     * loadArticle
     */
    public loadArticle() {
      if (typeof this.$route.params.articleId !== 'undefined') {
        const params = {_id: this.$route.params.articleId };
        articles.loadSingleArticle(params).then(() => {
            this.$data._id = articles.singleArticle._id;
            this.title = articles.singleArticle.title;
            this.description = articles.singleArticle.description;
            this.body = articles.singleArticle.body;
            this.tagList = articles.singleArticle.tagList;
          });
      }
    }
    /**
     * insertArticle
     */
    public insertArticle() {
      this.isLoading = true;
      const data: NewArticle = this.getArticleData();
      articles.insertArticle(data).then(() => {
        this.isLoading = false;
        this.$router.push('/');
      }).catch((err) => {
        this.error = err;
      });
    }
    /**
     * updateArticle
     */
    public updateArticle() {
      this.isLoading = true;
      const data: NewArticle = this.getArticleData();
      const dataForUpdate: UpdateArticle  = { _id: this.$data._id, ...data };
      articles.updateArticle(dataForUpdate).then(() => {
        this.isLoading = false;
        this.$router.push('/');
      }).catch((err) => {
        this.error = err;
      });
    }
    /**
     * tagAdd
     */
    public tagAdd() {
      this.tagList.push(this.tag);
      this.tag = '';
    }
    /**
     * tagDelete
     */
    public tagDelete(idx: number) {
      this.tagList.splice(idx, 1);
    }
    get userId() {
      return users.userId;
    }
    private getArticleData(): NewArticle {
      const data: NewArticle = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList,
        author_id: this.userId,
      };
      return data;
    }
}
</script>

<style scoped>
.tag-btn {
  padding: 0.1rem;
  font-size: 0.6rem;
  margin: 0.1rem;
}
</style>