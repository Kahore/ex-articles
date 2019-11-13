<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <ul class="error-messages" v-if="error">
          <li>{{ error }}</li>
        </ul>
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset
                class="form-group"
                :class="{ 'form-group--error': $v.title.$error }"
              >
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model.trim="title"
                />
                <div
                  class="form-group__message--error"
                  v-if="!$v.title.required"
                >
                  Article title is required
                </div>
              </fieldset>
              <fieldset
                class="form-group"
                :class="{ 'form-group--error': $v.description.$error }"
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model.trim="description"
                />
                <div
                  class="form-group__message--error"
                  v-if="!$v.description.required"
                >
                  Please, fill what's this article about
                </div>
              </fieldset>
              <fieldset
                class="form-group"
                :class="{ 'form-group--error': $v.body.$error }"
              >
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model.trim="body"
                ></textarea>
                <div
                  class="form-group__message--error"
                  v-if="!$v.body.required"
                >
                  Stop, where is your text?
                </div>
              </fieldset>
              <fieldset
                class="form-group"
                :class="{ 'form-group--error': $v.tagList.$error }"
              >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model.lazy="tag"
                  @change.prevent="tagAdd"
                />
                <div class="tag-list">
                  <span
                    class="tag-pill tag-default"
                    v-for="(tag, index) in tagList"
                    :key="index"
                  >
                    <span>
                      {{ tag }}
                    </span>
                    <button
                      class="btn btn-danger tag-btn"
                      @click.prevent="tagDelete(index)"
                    >
                      x
                    </button>
                  </span>
                </div>
                <div
                  class="form-group__message--error"
                  v-if="!$v.tagList.required"
                >
                  Please, add some tags
                </div>
              </fieldset>
              <template v-if="$data._id === ''">
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click.prevent="saveAction('add')"
                  :disabled="isLoading"
                >
                  Publish Article
                </button>
              </template>
              <template v-else>
                <button
                  class="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  @click.prevent="saveAction('edit')"
                  :disabled="isLoading"
                >
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
import { required } from 'vuelidate/lib/validators';
@Component
export default class Editor extends Vue {
  get userId() {
    return users.userId;
  }
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
      const params = { _id: this.$route.params.articleId };
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
   * saveAction
   */
  public saveAction(mode: 'add' | 'edit') {
    // @ts-ignore
    this.$v.$touch();
    // @ts-ignore
    if (!this.$v.$invalid) {
      if (mode === 'add') {
        this.insertArticle();
      } else if (mode === 'edit') {
        this.updateArticle();
      }
    }
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
  /**
   * insertArticle
   */
  private insertArticle() {
    this.isLoading = true;
    const data: NewArticle = this.getArticleData();
    articles
      .insertArticle(data)
      .then(() => {
        this.isLoading = false;
        this.$router.push('/');
      })
      .catch((err) => {
        this.error = err;
      });
  }
  /**
   * updateArticle
   */
  private updateArticle() {
    this.isLoading = true;
    const data: NewArticle = this.getArticleData();
    const dataForUpdate: UpdateArticle = { _id: this.$data._id, ...data };
    articles
      .updateArticle(dataForUpdate)
      .then(() => {
        this.isLoading = false;
        this.$router.push('/');
      })
      .catch((err) => {
        this.error = err;
      });
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
  private validations() {
    return {
      title: {
        required,
      },
      description: {
        required,
      },
      body: {
        required,
      },
      tagList: {
        required,
      },
    };
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
