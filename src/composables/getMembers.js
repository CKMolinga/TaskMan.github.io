import { ref } from "vue";
import { db } from "../firebase/config";

// Get Members from Firebase
const getMembers = async() => {
    const members = ref([]);
    const error = ref(null);

    try {
        const res = await db.collection("members").get();

        let members = res.docs;

        return {
            members,
            error,
            res,
        };
    } catch (err) {
        error.value = err.message;
        console.log(error.value);
    }
};

export default getMembers;