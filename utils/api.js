import { ajax } from 'rxjs/observable/dom/ajax';

export const postLink = url => ajax.post('/shorten', { url }, { 'Content-Type': 'application/json' });