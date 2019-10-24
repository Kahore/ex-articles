import axios from 'axios';
let URL = 'http://localhost:5000/api/articles/';
if (process.env.NODE_ENV === 'production') {
   URL = '/api/articles/';
}
import {Article, NewArticle} from '../store/models';
class ArticlesService {
  public static async getArticles(params?: object): Promise<Article[]>  {
    try {
      const data: Article[] = await this.getArticlesData(params) as Article[];
      data.map((article: Article) => ({
        ...article,
        createdAt: new Date(article.createdAt),
        updatedAt: new Date(article.updatedAt),
      }));
      return data;
    } catch (error) {
      return error;
    }
  }
  public static async getSingleArticle(params?: object): Promise<Article> {
    try {
      const data = await this.getArticlesData(params) as Article[];
      let singleData = data[0] as Article;
      singleData = {
        ...singleData,
        createdAt: new Date(singleData.createdAt),
        updatedAt: new Date(singleData.updatedAt),
      };
      return singleData;
    } catch (error) {
      return error;
    }
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
  private static getArticlesData(params?: object) {
    return new Promise(async (resolve, reject): Promise<Article[]> => {
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
        const data = res.data.articles;
        resolve( data );
        return data;
      } catch (error) {
        reject(error);
      }
      throw new Error('Shouldn\'t be reachable');
    });
  }
}
export default ArticlesService;
