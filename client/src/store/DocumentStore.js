import { makeAutoObservable } from 'mobx';

export default class DocumentStore {
  constructor() {
    this._documents = [];
  }

  setDocuments(documents) {
    this._documents = documents;
  }

  addDocument(document) {
    this._documents.push(document);
  }

  deleteDocument(id) {
    this._documents = this._documents.filter((document) => document.id !== id);
  }

  get documents() {
    return this._documents;
  }
}
