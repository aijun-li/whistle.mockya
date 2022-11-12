import { BaseCollection, Collection, UpsertCollectionParams } from '~/typings';

const prefix = import.meta.env.DEV ? 'http://localhost:8899/whistle.mockya/api' : '/whistle.mockya/api';

function e(path: string) {
  return prefix + path;
}

export async function getCollection(id: string) {
  const endpoint = e(`/collection/${id}`);

  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error('Fetch Error!');
  }

  const { code, msg, data } = await res.json();

  if (code) {
    console.error(msg);
    throw new Error(msg);
  }

  return data as Collection;
}

export async function getCollections() {
  const endpoint = e('/collection');

  const res = await fetch(endpoint);

  if (!res.ok) {
    throw new Error('Fetch Error!');
  }

  const { code, msg, data } = await res.json();

  if (code) {
    console.error(msg);
    throw new Error(msg);
  }

  return data as BaseCollection[];
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

  return data as Collection;
}

export async function updateCollection(params: UpsertCollectionParams) {
  const res = await fetch(e(`/collection/${params.id}`), {
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

  return data as Collection;
}

export async function deleteCollection(id: string) {
  const res = await fetch(e(`/collection/${id}`), {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Fetch Error!');
  }

  const { code, msg, data } = await res.json();

  if (code) {
    console.error(msg);
    throw new Error(msg);
  }

  return data as Collection;
}
