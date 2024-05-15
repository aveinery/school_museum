import { makeAutoObservable } from 'mobx';

export default class DocumentStore {
  constructor() {
    this._document = [
      { id: 1, documentName: 'eddedeww.docx', url: '' },
      { id: 2, documentName: 'eddedeww.docx', url: '' },
      { id: 3, documentName: 'eddedeww.docx', url: '' },
    ];
  }

  setDocument() {
    this._document = document;
  }

  get document() {
    return this._document;
  }
}
