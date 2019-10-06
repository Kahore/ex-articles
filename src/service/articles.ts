import axios from 'axios';
const URL = 'http://localhost:5000/api/articles/';
import {Article} from '../store/models';
class ArticlesService {
  public static getArticles(params?: object) {
    return new Promise(async (resolve, reject) => {
      const filter = typeof params === 'undefined' ? '' : params;
      // console.log('TCL: ArticlesService -> getArticles -> filter', filter);
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
        const data = res.data;
        resolve(
          data.map((article: Article) => ({
            ...article,
            createdAt: new Date(article.createdAt),
            updatedAt: new Date(article.updatedAt),
          })),
        );
      } catch (error) {
        reject(error);
      }
    });
  }
  public static insertArticle(text: Article) {
    return axios.post(URL, {
      text,
    });
  }
  public static updateArticle(articleInfo: Article) {
    return axios.put(URL, {
      articleInfo,
    });
  }
  public static deleteArticle(id: string) {
    // console.log('TCL: deleteArticle -> deleteSong -> id', id);
    return axios.delete(`${URL}${id}`);
  }
}
export default ArticlesService;
