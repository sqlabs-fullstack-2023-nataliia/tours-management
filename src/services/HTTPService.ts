import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { database, storage } from "./firebaseConfig";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

interface Entity {
    id: string;
    image?: any
    //[x: string]: unknown
    [key: string]: any;
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

        const uploadPromise = new Promise<void>((resolve, reject) => {
            const storageRef = ref(storage, `gallery/${entity.image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, entity.image);
            uploadTask.on("state_changed", (snapshot) => {},
                (error) => {
                    console.error(error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadedURL = await getDownloadURL(uploadTask.snapshot.ref);
                        entity.image = downloadedURL;
                        resolve();
                    } catch (error: any) {
                        console.error(error.message);
                        reject(error);
                    }
            });
        });

        try {
            if(entity.image){
                await uploadPromise;
            }
            const res = await addDoc(collection(database, this.collection), entity)
            const reff = doc(database, this.collection, res.id);
            entity.id = res.id
            await updateDoc(reff, entity);
            return entity
        } catch (error: any) {
            console.log(error.message)
        }
    }

    async get(id: string) {
        const ref = doc(database, this.collection, id);
        return await getDoc(ref);
    }

    async update<T extends Entity>(entity: T) {

        const uploadPromise = new Promise<void>((resolve, reject) => {
            const storageRef = ref(storage, `gallery/${entity.image.name}`);
            const uploadTask = uploadBytesResumable(storageRef, entity.image);
            uploadTask.on("state_changed", (snapshot) => {},
                (error) => {
                    console.error(error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadedURL = await getDownloadURL(uploadTask.snapshot.ref);
                        entity.image = downloadedURL;
                        resolve();
                    } catch (error: any) {
                        console.error(error.message);
                        reject(error);
                    }
            });
        });

        try {
            if(entity.image){
                await uploadPromise;
            }
            const reff = doc(database, this.collection, entity.id);
            return await updateDoc(reff, entity);
        } catch (error: any) {
            console.log(error.message)
        }
    }

}

const create = (collection: string) => new HTTPService(collection);

export default create;