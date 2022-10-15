import { Collection, UpsertCollectionParams } from '@shared/typings';

const prefix = '/api';
function e(path: string) {
  return prefix + path;
}

export async function getCollection(id?: string) {
  const endpoint = id ? e(`/collection/${id}`) : e('/collection');

  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error('Fetch Error!');
  }

  const { code, msg, data } = await res.json();

  if (code) {
    console.error(msg);
    throw new Error(msg);
  }

  return data as Collection[];
}

export async function createCollection(params: UpsertCollectionParams) {
  const res = await fetch(e('/collection'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error('Fetch Error!');
  }

  const { code, msg, data } = await res.json();

  if (code) {
    console.error(msg);
    throw new Error(msg);
  }

  return data;
}

export async function updateCollection(params: UpsertCollectionParams) {
  const res = await fetch(e('/collection'), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    throw new Error('Fetch Error!');
  }

  const { code, msg, data } = await res.json();

  if (code) {
    console.error(msg);
    throw new Error(msg);
  }

  return data;
}
