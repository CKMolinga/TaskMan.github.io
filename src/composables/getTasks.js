// Get tasks from firestore database by using the following snippet:
import { db } from '../firebase/config';

export const getTasks = () => {
    return db.collection('tasks').get()
        .then(snapshot => {
            const tasks = [];
            snapshot.forEach(doc => {
                tasks.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return tasks;
        })
        .catch(err => {
            console.log(err);
        });
};

export const getTask = (id) => {
    return db.collection('tasks').doc(id).get()
        .then(doc => {
            if (doc.exists) {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }
        })
        .catch(err => {
            console.log(err);
        });
};

// export const addTask = (task) => {
//     return db.collection('tasks').add({
//         ...task,
//         createdAt: timestamp()
//     })
//         .then(doc => {
//             return {
//                 id: doc.id,
//                 ...task
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const updateTask = (id, task) => {
//     return db.collection('tasks').doc(id).update({
//         ...task,
//         updatedAt: timestamp()
//     })
//         .then(() => {
//             return {
//                 id,
//                 ...task
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const deleteTask = (id) => {
//     return db.collection('tasks').doc(id).delete()
//         .then(() => {
//             return id;
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const getMembers = () => {
//     return db.collection('members').get()
//         .then(snapshot => {
//             const members = [];
//             snapshot.forEach(doc => {
//                 members.push({
//                     id: doc.id,
//                     ...doc.data()
//                 });
//             });
//             return members;
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const getMember = (id) => {
//     return db.collection('members').doc(id).get()
//         .then(doc => {
//             if (doc.exists) {
//                 return {
//                     id: doc.id,
//                     ...doc.data()
//                 };
//             }
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const addMember = (member) => {
//     return db.collection('members').add({
//         ...member,
//         createdAt: timestamp()
//     })
//         .then(doc => {
//             return {
//                 id: doc.id,
//                 ...member
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const updateMember = (id, member) => {
//     return db.collection('members').doc(id).update({
//         ...member,
//         updatedAt: timestamp()
//     })
//         .then(() => {
//             return {
//                 id,
//                 ...member
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const deleteMember = (id) => {
//     return db.collection('members').doc(id).delete()
//         .then(() => {
//             return id;
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const getProjects = () => {
//     return db.collection('projects').get()
//         .then(snapshot => {
//             const projects = [];
//             snapshot.forEach(doc => {
//                 projects.push({
//                     id: doc.id,
//                     ...doc.data()
//                 });
//             });
//             return projects;
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const getProject = (id) => {
//     return db.collection('projects').doc(id).get()
//         .then(doc => {
//             if (doc.exists) {
//                 return {
//                     id: doc.id,
//                     ...doc.data()
//                 };
//             }
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const addProject = (project) => {
//     return db.collection('projects').add({
//         ...project,
//         createdAt: timestamp()
//     })
//         .then(doc => {
//             return {
//                 id: doc.id,
//                 ...project
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const updateProject = (id, project) => {
//     return db.collection('projects').doc(id).update({
//         ...project,
//         updatedAt: timestamp()
//     })
//         .then(() => {
//             return {
//                 id,
//                 ...project
//             };
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//
// export const deleteProject = (id) => {
//     return db.collection('projects').doc(id).delete()
//         .then(() => {
//             return id;
//         })
//         .catch(err => {
//             console.log(err);
//         });
// };
//

export default {
    getTasks,
    getTask,
    // addTask,
    // updateTask,
    // deleteTask,
    // getMembers,
    // getMember,
    // addMember,
    // updateMember,
    // deleteMember,
}