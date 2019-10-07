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
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="insertArticle"
                :disabled="isLoading">
                  Publish Article
              </button>
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
import { NewArticle } from '../store/models';
@Component
export default class Editor extends Vue {
    public title: string = '';
    public description: string = '';
    public body: string = '';
    public tagList: string[] = [];
    private tag: string = '';
    private error: string = '';
    private isLoading: boolean = false;
    /**
     * insertArticle
     */
    public insertArticle() {
      this.isLoading = true;
      const data: NewArticle = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList,
        author_id: this.userId,
      };
      articles.insertArticle(data).then(() => {
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
}
</script>

<style scoped>
.tag-btn {
  padding: 0.1rem;
  font-size: 0.6rem;
  margin: 0.1rem;
}
</style>