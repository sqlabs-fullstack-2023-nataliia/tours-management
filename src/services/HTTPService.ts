import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";

interface Entity {
    id: string;
    [x: string]: unknown
}

class HTTPService {

    collection: string;

    constructor(collection: string){
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

    async add<T extends Entity>(entity: T) {
        return await addDoc(collection(database, this.collection), entity)
    }

    async update<T extends Entity>(entity: T) {
        const ref = doc(database, this.collection, entity.id);
        return await updateDoc(ref, entity);
    }

}

const create = (collection: string) => new HTTPService(collection);

export default create;