import { db } from "../firebase/config";

const getTasks = async() => {
    try {
        const res = await db
            .collection("tasks")
            .orderBy("createdAt", "desc")
            .get();
        let tasks = res.docs;
        return {
            tasks,
        };
    } catch (err) {
        console.log(err.message);
    }
};

export default getTasks;