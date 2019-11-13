import axios from 'axios';
let URL = 'http://localhost:5000/api/tags/';
if (process.env.NODE_ENV === 'production') {
  URL = '/api/tags/';
}
class TagService {
  public static async getTags(): Promise<string[]> {
    const response = await axios.get(URL, {});
    return response.data.tags as string[];
  }
}

export default TagService;
