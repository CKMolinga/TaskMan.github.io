<template>
  <!-- <Dashboard></Dashboard> -->
  <div class="overlay">
      <div class="modal">
        <!-- Create modal -->
        <div class="modal-content">
          <div class="modal-header">
            <h3>Are you sure you want to logout?</h3>
            <router-link to="/dashboard"><span class="close">&times;</span></router-link>
          </div>
          <div class="modal-body">
            <form action="">
              <div class="form-group"></div>
                <button type="submit" class="btn btn-primary" @click="handleClick">Yes</button>
                <button type="submit" class="btn btn-primary" @click="handleSubmit">No</button>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import { useRouter } from 'vue-router'

import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'

import Dashboard from '../components/Dashboard.vue'

export default {
  name: 'Confirm_Logout',
  components: {Dashboard},

  setup() {
        const router = useRouter()
        
        const { error, logout } = useLogout()
        const { user } = getUser()

        const handleClick = async () => {
            await logout()
            if (!error.value) {
                router.push('/login')
            }
        }

        return { error, user, handleClick }

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
  left: 140px;
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