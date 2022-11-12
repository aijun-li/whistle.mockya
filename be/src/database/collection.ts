import { UpsertCollectionParams } from '~/typings';
import prisma from './prisma';

const collectionSelectFields = {
  id: true,
  title: true,
  updatedAt: true,
};

export async function upsertCollection({ id, title }: UpsertCollectionParams) {
  const data = await prisma.collection.upsert({
    create: {
      id,
      title,
    },
    update: {
      title,
    },
    where: {
      id,
    },
    select: collectionSelectFields,
  });

  return data;
}

export async function getCollections() {
  const data = await prisma.collection.findMany({
    select: collectionSelectFields,
  });
  return data;
}

export async function deleteCollection(id: string) {
  const data = await prisma.collection.delete({
    where: {
      id,
    },
    select: collectionSelectFields,
  });
  return data;
}

export async function getCollection(id: string) {
  const data = await prisma.collection.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      rules: {
        include: {
          data: true,
        },
      },
    },
  });
  return data;
}
