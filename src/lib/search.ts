import Fuse from 'fuse.js';

export function createSearchIndex(items: Array<any>, keys: string[]) {
  return new Fuse(items, {
    keys,
    threshold: 0.3,
    includeScore: true,
  });
}

export function searchInIndex(index: Fuse<any>, query: string) {
  return index.search(query).map(result => result.item);
}