import { makeAutoObservable } from 'mobx';

export default class NewsStore {
  constructor() {
    this._news = [];
    makeAutoObservable(this);
  }

  setNews(news) {
    this._news = news;
  }

  deleteNews(id) {
    this._news = this._news.filter((news) => news.id !== id);
  }

  addNews(newsItem) {
    this._news.push(newsItem);
  }

  get news() {
    return this._news;
  }
}
