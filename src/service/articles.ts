import axios from 'axios';
let URL = 'http://localhost:5000/api/articles/';
if (process.env.NODE_ENV === 'production') {
   URL = '/api/articles/';
}
import {Article, NewArticle} from '../store/models';
class ArticlesService {
  public static getArticles(params?: object) {
    return new Promise(async (resolve, reject) => {
      const filter = typeof params === 'undefined' ? '' : params;
      try {
        let res;
        if (typeof params === 'undefined') {
          res = await axios.get(URL);
        } else {
          res = await axios.get(URL, {
            params: {
              filter,
            },
          });
        }
        let data = res.data.articles;
        if ( res.data.articlesCount  === 1) {
            data = { ...data[0], createdAt: new Date(data[0].createdAt), updatedAt: new Date(data[0].updatedAt) };
          } else {
            data.map((article: Article) => ({
            ...article,
            createdAt: new Date(article.createdAt),
            updatedAt: new Date(article.updatedAt),
          }));
          }

        resolve( data );
      } catch (error) {
        reject(error);
      }
    });
  }
  public static insertArticle(newArt: NewArticle) {
    return axios.post(URL, {
      newArt,
    });
  }
  public static updateArticle(articleInfo: Article) {
    return axios.put(URL, {
      articleInfo,
    });
  }
  public static deleteArticle(id: string) {
    return axios.delete(`${URL}${id}`);
  }
}
export default ArticlesService;
