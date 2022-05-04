import { ref } from 'vue'

import { db } from '../firebase/config'

const updateTask = (id, task) => {
    return db.collection('tasks').doc(id).update({
            ...task,
            updatedAt: timestamp()
        })
        .then(doc => {
            return {
                id: doc.id,
                ...task
            };
        })
        .catch(err => {
            console.log(err);
        });
}

export default { updateTask }