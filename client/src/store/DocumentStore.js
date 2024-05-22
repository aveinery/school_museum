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

  get documents() {
    return this._documents;
  }
}
