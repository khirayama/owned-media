import axios, { AxiosResponse } from 'axios';

const PORT = process.env.PORT || 3000;

const req =
  typeof window === 'object'
    ? axios.create()
    : axios.create({
        baseURL: `http://localhost:${PORT}`,
      });

export class Resource {
  public static find(key: string, locale: string) {
    return req.get(`/${locale}/resources/${key}.json`).then((res: AxiosResponse) => {
      return res.data;
    });
  }
}
