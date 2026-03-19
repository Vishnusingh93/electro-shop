import { Client, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("69ac4d930028ff2f6a6b");

export const databases = new Databases(client);
export const storage = new Storage(client); 