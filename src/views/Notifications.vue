<template>
  <Dashboard></Dashboard>
  <div class="overlay">
      <div class="modal">
        <!-- Create modal -->
        <div class="modal-content">
          <div class="modal-header">
            <h3>Notifications</h3>
            <router-link to="/dashboard"><span class="close">&times;</span></router-link>
          </div>
          <div class="modal-body">
            <ul>
              <li>
                <div class="notification-item">
                  <div class="notification-item-header">
                    <div class="notification-item-header-left">
                      <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="">
                    </div>
                    <div class="notification-item-header-right">
                      <h4>John Doe</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.</p>
                    </div>
                  </div>
                  <div class="notification-item-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.</p>
                  </div>
                </div>
              </li>
              <li>
                <div class="notification-item">
                  <div class="notification-item-header">
                    <div class="notification-item-header-left">
                      <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="">
                    </div>
                    <div class="notification-item-header-right">
                      <h4>John Doe</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.</p>
                    </div>
                  </div>
                  <div class="notification-item-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quos.</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Dashboard from '../components/Dashboard.vue'

export default {
  name: 'Notifications',
  components: {Dashboard}
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-width: 500px;
  background-color: #292F4C;
  color: #fff;
  z-index: 101;
  padding: 30px;
  border-radius: 0 55px 0 0;
  overflow-y: auto;
}

/* custom style scrollbar  */
::-webkit-scrollbar {
  width: 100px;
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

</style>