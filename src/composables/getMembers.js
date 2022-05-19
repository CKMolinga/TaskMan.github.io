import { ref } from 'vue'
import { db } from '../firebase/config'

// Get Members from Firebase
const getMembers = () => {
    const members = ref([])
    const error = ref(null)

    const load = async() => {
        try {
            const res = await db.collection('members').get()
            members.value = res.docs.map(doc => { return { id: doc.id, ...doc.data() } })
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    return {
        members,
        error,
        load
    }
}

export default getMembers