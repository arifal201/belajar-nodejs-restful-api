import { prismaClient } from "../src/application/database"
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test'
    }
  });
}

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: 'test',
      password: await bcrypt.hash('rahasia',10),
      token: 'test',
      name: 'test'
    }
  });
}

export const getUserTest = async () =>{
  return prismaClient.user.findUnique({
    where: {
      username: 'test'
    }
  });
}

export const removeAllTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: 'test'
    }
  });
}