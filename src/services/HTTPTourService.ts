import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { HTTPService } from "./HTTPService";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { database, storage } from "./firebaseConfig";

interface Entity {
    id: string;
    image?: any
    [key: string]: any;
}


class HTTPTourService extends HTTPService {
    constructor(collection: string) {
        super(collection);
    }

    async add<T extends Entity>(entity: T) {
        const storageRef = ref(storage, `gallery/${entity.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, entity.image);

        const uploadPromise = new Promise<void>((resolve, reject) => {
            uploadTask.on("state_changed", (snapshot) => { },
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
            entity.image && await uploadPromise;
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
        const storageRef = ref(storage, `gallery/${entity.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, entity.image);

        const uploadPromise = new Promise<void>((resolve, reject) => {
            uploadTask.on("state_changed", (snapshot) => { },
                (error) => {
                    console.error(error);
                    reject(error);
                },
                async () => {
                    try {
                        const downloadedURL = await getDownloadURL(uploadTask.snapshot.ref);
                        if(entity.image instanceof File){
                            entity.image = downloadedURL;
                        }
                        resolve();
                    } catch (error: any) {
                        console.error(error.message);
                        reject(error);
                    }
                });
        });

        try {
            await uploadPromise;
            const reff = doc(database, this.collection, entity.id);
            return await updateDoc(reff, entity);
        } catch (error: any) {
            console.log(error.message)
        }
    }

}

const createTourService = (collection: string) => new HTTPTourService(collection);

export default createTourService;


