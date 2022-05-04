import { ref } from 'vue'
import { db } from '../firebase/config'

// Delete task from firestore database by using the following snippet:
const deleteTask = (id) => {
    return db.collection('tasks').doc(id).delete()
        .then(() => {
            return id;
        })
        .catch(err => {
            console.log(err);
        });
};

export default deleteTask;