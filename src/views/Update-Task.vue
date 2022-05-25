<template>
  <Dashboard></Dashboard>
  <transition name="smooth-in">
    <div class="overlay" v-if="start">
      <div class="modal">
        <!-- Create modal -->
        <div class="modal-content">
          <div class="modal-header">
            <h3>Update Task</h3>
            <router-link to="/dashboard"
              ><span class="close">&times;</span></router-link
            >
          </div>
          <div class="modal-body">
            <form @submit.prevent="editTask">
              <div class="form-group flex">
                <label for="name">Title</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  v-model="task.title"
                  placeholder="Name this task"
                />
                <div class="error">{{ error }}</div>
                <label for="name">Members</label>
                <input
                  type="text"
                  name="members"
                  id="name"
                  class="form-control"
                  v-model="task.assignedTo"
                  placeholder="*Assign already added members in comma seperated list"
                />
                <label for="description">Description</label>
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  v-model="task.description"
                  placeholder="Write a description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="status">Current Status</label>
                <select
                  name="status"
                  id=""
                  v-model="task.status"
                  class="status"
                  required
                  aria-placeholder="status"
                >
                  <option value="" selected disabled>Select Status</option>
                  <option value="In Progress">In Progres</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <label for="due-date">Due Date</label>
                <input
                  type="date"
                  name="due-date"
                  id="date"
                  class="form-control"
                  v-model="task.dueDate"
                />
              </div>
              <button class="btn" type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from "firebase";
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { db, timestamp } from "../firebase/config";
import Dashboard from "../components/Dashboard.vue";
import getTasks from "../composables/getTasks";
import getMembers from "../composables/getMembers";

// import updateTask from '../composables/updateTask'

export default {
  name: "Update-Task",
  components: { Dashboard },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const start = ref(false);
    const realMembers = ref([]);

    const error = ref(null);

    onMounted(() => {
      setTimeout(() => {
        start.value = true;
      }, 2000);
    });

    let task = reactive({
      id: route.params.id,
      title: route.params.title,
      description: route.params.description,
      assignedTo: "",
      dueDate: route.params.dueDate,
      status: route.params.status,
      createdAt: timestamp(),
    });
    const editTask = async () => {
      try {
        error.value = null;
        let splitArr = task.assignedTo.split(",");

        let assignArr = [];

        for (let i = 0; i < splitArr.length; i++) {
          assignArr.push(splitArr[i].trim());
        }

        let capitalizeArr = [];
        let capitalizedName = "";
        for (let i = 0; i < assignArr.length; i++) {
          capitalizedName =
            assignArr[i].charAt(0).toUpperCase() + assignArr[i].slice(1);
          capitalizeArr.push(capitalizedName);
        }

        const { members } = await getMembers();
        let list = members.map((data) => data.data().username);

        let mem = list.map((member) => {
          if (capitalizeArr.includes(member)) return member;
        });
        for (let i = 0; i < mem.length; i++) {
          if (mem[i] !== undefined) {
            realMembers.value.push(mem[i]);
          }
        }
        console.log(realMembers);
        if (realMembers.value.length === capitalizeArr.length) {
          let updatedTask = {
            id: route.params.id,
            title: task.title,
            description: task.description,
            assignedTo: capitalizeArr,
            dueDate: task.dueDate,
            status: task.status,
            createdAt: timestamp(),
          };

          await db
            .collection("tasks")
            .doc(updatedTask.id)
            .update(updatedTask)
            .then(async () => {
              try {
                console.log("the update was ok");

                router.push("/dashboard");
              } catch (err) {
                console.log(err);
              }
            })
            .catch((err) => console.log(err));
        } else {
          error.value = "Please check the names to ensure these members exist";
          console.log(error);
        }
      } catch (err) {
        error.value = "some members are not verified";
        console.log(err);
      }
    };

    return {
      task,
      start,
      error,
      editTask,
    };
  },
};
</script>

<style scoped>
.smooth-in-enter-from {
  opacity: 0;
}

.smooth-in-enter-active,
.smooth-in-leave-active {
  transition: all 1s ease;
}

.smooth-in-leave-to {
  opacity: 0;
}
.error {
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
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
  max-width: 600px;
  background-color: #292f4c;
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
  padding-top: 2px;
}
.modal-body form .form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background: transparent;
  color: #fff;
}

select {
  width: 100% !important;
  padding: 10px;
  margin: 0 !important;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background: #292f4c;
  color: #fff;
  outline: none;
  height: 45px;
  line-height: 20px;
}
select option {
  color: #fff;
  background: #292f4c;
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
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  color: #292f4c;
  cursor: pointer;
}
button.btn:hover {
  background-color: #002cff;
  color: #fff;
}

@media (max-width: 767.98px) {
  span.close {
    top: -25px;
    left: 140px;
  }
}
</style>
