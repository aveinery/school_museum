import { makeAutoObservable } from 'mobx';

export default class DocumentStore {
  constructor() {
    this._documents = [
      // { id: 1, documentName: 'eddedeww.docx', url: '' },
      // { id: 2, documentName: 'eddedeww.docx', url: '' },
      // { id: 3, documentName: 'eddedeww.docx', url: '' },
    ];
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
