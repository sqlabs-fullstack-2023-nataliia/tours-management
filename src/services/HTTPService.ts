import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";

interface Entity {
    id: string;
    [key: string]: any;
}

export class HTTPService {

    collection: string;

    constructor(collection: string) {
        this.collection = collection;
    }

    async getAll() {
        const controller = new AbortController();
        const request = await getDocs(collection(database, this.collection))
        return { request, cancel: () => controller.abort() }
    }

    async delete(id: string) {
        const ref = doc(database, this.collection, id);
        return await deleteDoc(ref);
    }

    async get(id: string) {
        const ref = doc(database, this.collection, id);
        return await getDoc(ref);
    }

    async add<T extends Entity>(entity: T) {
        try {
            const res = await addDoc(collection(database, this.collection), entity)
            const reff = doc(database, this.collection, res.id);
            entity.id = res.id
            await updateDoc(reff, entity);
            return entity
        } catch (error: any) {
            console.log(error.message)
        }

    }

    async update<T extends Entity>(entity: T) {
        try {
            const reff = doc(database, this.collection, entity.id);
            return await updateDoc(reff, entity);
        } catch (error: any) {
            console.log(error.message)
        }
    }

}

const create = (collection: string) => new HTTPService(collection);

export default create;