<template>
  <Dashboard></Dashboard>
  <div class="overlay">
      <div class="modal">
        <!-- Create modal -->
        <div class="modal-content">
          <div class="modal-header">
            <h3>Add New Task</h3>
                <router-link to="/dashboard"><span class="close">&times;</span></router-link>
          </div>
          <div class="modal-body">
            <form action="" @submit.prevent="addTask">
              <div class="form-group">
                <label for="name">Title</label>
                <input type="text" name="name" id="name" class="form-control" v-model="title">
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" id="" cols="30" rows="10" v-model="description"></textarea>
              </div>
              <div class="form-group">
                <label for="due-date">Due Date</label>
                <input type="date" name="due-date" id="date" class="form-control" v-model="dueDate">
              </div>
              <button class="btn" type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { db, timestamp } from '../firebase/config'
import Dashboard from '../components/Dashboard.vue'

export default {
  name: 'Add-Task',
  components: {Dashboard},

  setup() {
    const router = useRouter()
    const assignedTo = ref([])
    const dueDate = ref(null)
    const status = ref([])
    const title = ref(null)
    const description = ref(null)
    const date = ref(null)

    const addTask = async () => {
      const task = {
        id: Math.floor(Math.random() * 10000),
        title: title.value,
        description: description.value,
        assignedTo: assignedTo.value,
        dueDate: dueDate.value.toString(),
        status: status.value,
        createdAt: timestamp()
      }

      const res =  await db.collection('tasks').add(task)
      
      router.push('/dashboard')
  
    }

    return {
      assignedTo,
      dueDate,
      status,
      title,
      description,
      date,
      addTask
    }
  }
}
</script>

<style scoped>
/* Overlay background of whole page */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5af;
  z-index: 100;
}

/* modal style */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  background-color: #292F4C;
  color: #fff;
  z-index: 101;
  padding: 30px;
  border-radius: 5px;
}
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-header h3 {
  margin: 0;
}
.modal-header a {
  color: #fff;
  text-decoration: none;
}
.modal-header span {
  cursor: pointer;
  position: relative;
  top: -25px;
  left: 180px;
  font-size: 28px;
}
.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.modal-body form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-body form .form-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}
.modal-body form .form-group label {
  margin: 0;
  padding-bottom: 5px;
}
.modal-body form .form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background: transparent;
  color: #fff;
}
.modal-body form .form-group input:focus {
  outline: none;
}
.modal-body form .form-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background: transparent;
  color: #fff;
  resize: none;
}
button.btn {
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  color: #292F4C;
  cursor: pointer;
}
button.btn:hover {
  background-color: #002CFF;
  color: #fff;
}
</style>