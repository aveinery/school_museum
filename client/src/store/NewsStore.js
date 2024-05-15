import { makeAutoObservable } from 'mobx';

export default class NewsStore {
  constructor() {
    this._news = [
      {
        id: 1,
        title: 'Некит',
        datePublication: '2024-05-14',
        content: 'dfdffdf',
        link: [
          {
            id: 1,
            url: 'https://example.com',
          },
        ],
        image: [
          {
            id: 1,
            url: '',
          },
        ],
        file: [
          {
            id: 1,
            url: '',
            fileName: 'wewew.docx',
          },
        ],
      },
    ];
  }

  setNews(news) {
    this._news = news;
  }

  get News() {
    return this._news;
  }
}
