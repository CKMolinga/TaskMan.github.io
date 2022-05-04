import { ref } from 'vue'
// Get tasks from firestore database by using the following snippet:
import { db } from '../firebase/config'
import { dbAuth } from '../firebase/config'
import getUser from '../composables/getUser'

const { user } = getUser()

// Create new collection for tasks for the current user
const createNewCollection = async() => {
    try {
        await db.collection('users').doc(user.uid).collection('tasks').add({
            name: 'New Collection',
            createdAt: timestamp()
        })
    } catch (err) {
        console.log(err)
    }
}

export default createNewCollection