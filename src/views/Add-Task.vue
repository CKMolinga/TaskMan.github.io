<template>
  <Dashboard></Dashboard>
  <div class="overlay">
    <div class="modal">
      <!-- Create modal -->
      <div class="modal-content">
        <div class="modal-header">
          <h3>Add New Project</h3>
          <router-link to="/dashboard"
            ><span class="close">&times;</span></router-link
          >
        </div>
        <div class="modal-body">
          <form action="" @submit.prevent="addTask">
            <div class="form-group flex">
              <label for="name">Title</label>
              <input
                type="text"
                name="name"
                id="name"
                class="form-control"
                v-model="title"
                placeholder="Name this task"
              />
              <div class="error">{{ error }}</div>
              <label for="name">Members</label>
              <input
                type="text"
                name="members"
                id="name"
                class="form-control"
                v-model="assignedTo"
                placeholder="Add members in comma seperated list"
              />
              <label for="description">Description</label>
              <textarea
                name="description"
                id=""
                cols="30"
                rows="10"
                v-model="description"
                placeholder="Write a description"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="status">Current Status</label>
              <select
                name="status"
                id=""
                v-model="status"
                class="status"
                required
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
                v-model="dueDate"
              />

              <div v-for="tag in list" :key="tag" style="padding: 0 5px">
                {{ tag }}
              </div>
            </div>

            <button class="btn" type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { db, timestamp } from "../firebase/config";
import { computed } from "vue";

import Dashboard from "../components/Dashboard.vue";

import getMembers from "../composables/getMembers";

export default {
  name: "Add-Task",
  components: {
    Dashboard,
  },

  setup() {
    const router = useRouter();
    const assignedTo = ref("");
    const dueDate = ref(null);
    const status = ref(["In progress", "Completed", "Pending", "Cancelled"]);
    const title = ref(null);
    const description = ref(null);
    const date = ref(null);
    const name = ref(null);

    const error = ref(null);

    const addTask = async () => {
      let splitArr = assignedTo.value.split(",");
      let realMembers = [];

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

      console.log(capitalizeArr);

      const { members } = await getMembers();
      let list = members.map((data) => data.data().username);

      let mem = list.map((member) => {
        if (capitalizeArr.includes(member)) return member;
      });
      for (let i = 0; i < mem.length; i++) {
        if (mem[i] !== undefined) {
          realMembers.push(mem[i]);
        }
      }

      if (realMembers.length === splitArr.length) {
        error.value = null;
        console.log("success:", realMembers);

        const task = {
          id: Math.floor(Math.random() * 10000),
          title: title.value,
          description: description.value,
          assignedTo: realMembers,
          dueDate: dueDate.value,
          status: status.value,
          createdAt: timestamp(),
        };

        const res = await db.collection("tasks").add(task);
        console.log(res);

        router.push("/dashboard");
      } else {
        error.value = "Please check the names to ensure these members exist";
      }
    };

    return {
      assignedTo,
      dueDate,
      status,
      title,
      description,
      date,
      name,
      error,

      addTask,
    };
  },
};
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
  backdrop-filter: blur(5px);
}
.error {
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
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
  padding-top: 5px;
}

.modal-body form .form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background: transparent;
  color: #fff;
}

select.status {
  width: 109%;
  padding: 10px;
  margin: 0 0 0 -2px !important;
  border-radius: 5px;
  border: 1px solid #e5e5e5;
  background: #292f4c;
  color: #fff;
  outline: none;
  height: 42px;
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
  font-size: 18px;
  width: 108%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  color: #292f4c;
  cursor: pointer;
  margin: 10px 0 0 -10px !important;
}

button.btn:hover {
  background-color: #002cff;
  color: #fff;
}
span.close {
  padding: 5px;
}

@media (max-width: 767.98px) {
  span.close {
    top: -25px;
    left: 125px;
  }
}
</style>
