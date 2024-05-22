import { makeAutoObservable } from 'mobx';

export default class NewsStore {
  constructor() {
    this._news = [
      // {
      //   id: 1,
      //   title: 'Некит',
      //   datePublication: '2024-05-14',
      //   content: 'dfdffdf',
      //   link: [
      //     {
      //       id: 1,
      //       url: 'https://example.com',
      //     },
      //   ],
      //   image: [
      //     {
      //       id: 1,
      //       url: 'https://sun9-5.userapi.com/impg/Ok5y3PjTtcZEkEsoEr6LsO04_joYEg_ovKR4AQ/9HAHu8A9LlY.jpg?size=807x788&quality=95&sign=e55c3904e89fe17cfe3b585769fd3247&c_uniq_tag=i75K9iuVCAzujkhN8uiFBm1ZAWxdsZGpGzqoR1KsCco&type=album',
      //     },
      //   ],
      //   file: [
      //     {
      //       id: 1,
      //       url: '',
      //       name: 'wewew.docx',
      //     },
      //   ],
      // },
      // {
      //   id: 2,
      //   title: 'я лох',
      //   datePublication: '2024-05-14',
      //   content:
      //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis nulla interdum massa laoreet convallis laoreet a tellus. Sed pulvinar magna nibh, ut malesuada nisi sodales eget. Proin at lectus eu leo placerat consectetur eu quis metus. In vehicula augue a magna auctor ultricies. Mauris suscipit imperdiet luctus. Curabitur sodales mattis odio et malesuada. Etiam fermentum condimentum purus, a rutrum purus rutrum nec. Mauris in rutrum tellus, ut ultrices nulla.Pellentesque scelerisque rhoncus est vel consectetur. Etiam vehicula id nulla vitae placerat. Nam tempus malesuada enim. Nullam ornare ex eu nisi scelerisque, vel commodo orci tempor. Nunc ultricies ut lacus vitae varius. Aliquam bibendum blandit dui, non iaculis neque pretium at. Maecenas imperdiet risus magna, quis venenatis ipsum suscipit quis. In odio dui, mollis eu tempor non, rutrum vel risus. Proin vitae ultrices magna, id pulvinar enim. Vivamus aliquam neque vel lectus vulputate, quis lobortis ex rhoncus. Nullam accumsan libero eget commodo imperdiet. Suspendisse fringilla sed augue ut porta. Nam sed eleifend metus.Phasellus a rutrum massa. Vivamus tincidunt, nisl mollis interdum ultrices, est tortor pharetra metus, porta condimentum metus odio non elit. Praesent elementum, quam at varius bibendum, est est varius neque, vulputate laoreet dolor elit dignissim mi. Nam eu auctor augue, ac varius orci. Fusce fermentum velit consectetur sapien consectetur elementum vitae quis eros. Nullam arcu est, scelerisque ac imperdiet ut, congue nec elit. Ut et orci aliquam, eleifend dui eget, ornare nisl. Pellentesque consectetur sapien id ornare venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec urna non dolor rhoncus mollis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse accumsan turpis nec nisl accumsan, at varius sem ultrices. Maecenas sodales urna enim, nec dignissim libero lobortis congue. Ut eu pellentesque leo, id vehicula nulla. Sed ut tortor et nibh facilisis sagittis',
      //   link: [
      //     {
      //       id: 2,
      //       url: 'https://example.com',
      //     },
      //   ],
      //   image: [
      //     {
      //       id: 2,
      //       url: 'https://sun9-39.userapi.com/impg/92jZSZotT2-Q4W-WAq7H9DOJIVMPYA3N7_HJ9Q/TIWmc1Lxfik.jpg?size=750x741&quality=95&sign=d67fc28df3d723e8bb5159d485f93b9f&c_uniq_tag=gEcILunX2qdFvvMwtzDFs4GinFF8ggjIbyQoQ1qXcYc&type=album',
      //     },
      //   ],
      //   file: [
      //     {
      //       id: 2,
      //       url: '',
      //       name: 'wewew.docx',
      //     },
      //   ],
      // },
      // {
      //   id: 3,
      //   title: 'я лох',
      //   datePublication: '2024-05-14',
      //   content: 'dsdsd',
      //   link: [
      //     {
      //       id: 3,
      //       url: 'https://example.com',
      //     },
      //   ],
      //   image: [
      //     {
      //       id: 3,
      //       url: 'https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502290_gas-kvas-com-p-kartinki-lyubie-48.jpg',
      //     },
      //   ],
      //   file: [
      //     {
      //       id: 3,
      //       url: '',
      //       name: 'wewew.docx',
      //     },
      //   ],
      // },
    ];
    makeAutoObservable(this);
  }

  setNews(news) {
    this._news = news;
  }

  get news() {
    return this._news;
  }
}
