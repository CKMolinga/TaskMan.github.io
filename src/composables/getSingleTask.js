import { ref } from 'vue'
// Get tasks from firestore database by using the following snippet:
import { db } from '../firebase/config'


const getTask = () => {

    const task = ref([])
    const taskError = ref(null)

    const taskLoad = async() => {
        try {
            const res = await db.collection('tasks').doc('id').get()

            task.value = res.docs.map(doc => {
                return {
                    ...res.data(),
                    id: res.id
                }
            })

        } catch (err) {
            taskError.value = err.message
        }
    }
    return { task, taskError, taskLoad }
}

export default getTask