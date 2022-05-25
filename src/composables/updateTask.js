import {
    db
} from '../firebase/config'

const updateTask = async (id, task) => {
    try {
        console.log(id, task);
        let res = await db.collection('tasks').doc(id).update({
            ...task,
            updatedAt: timestamp()
        })
        console.log(res.docs);
        // .then(doc => {
        //     console.log(doc);
        //     // return {
        //     //     id: doc.id,
        //     //     ...task
        //     // };
        // })
        // .catch(err => {
        //     console.log(err);
        // });
    } catch (err) {
        console.log(err);
    }

}

export default {
    updateTask
}