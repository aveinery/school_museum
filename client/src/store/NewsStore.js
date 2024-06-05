import { action, makeAutoObservable, observable } from 'mobx';

export default class NewsStore {
  constructor() {
    this._news = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
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

  updateNews(data) {
    const index = this._news.findIndex((news) => news.id === data.id);
    this._news[index] = data;
  }

  get news() {
    return this._news;
  }

  setPage(page) {
    this._page = page;
  }

  get page() {
    return this._page;
  }

  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }

  get totalCount() {
    return this._totalCount;
  }

  setLimit(limit) {
    this._limit = limit;
  }
  get limit() {
    return this._limit;
  }
}
