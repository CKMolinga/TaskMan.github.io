import { ref } from 'vue'
import { db } from '../firebase/config'

const getMembers = () => {

    const members = ref([])
    const error = ref(null)

    const load = async() => {
        try {
            const res = await db.collection('members')
                .orderBy('createdAt', 'desc')
                .get()

            members.value = res.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })

        } catch (err) {
            error.value = err.message
        }
    }
    return { members, error, load }
}