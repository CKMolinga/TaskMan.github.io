import { ref } from 'vue'
import { dbAuth } from '../firebase/config'

const user = ref(dbAuth.currentUser)

dbAuth.onAuthStateChange(_user => {
    console.log('_user', _user)
    user.value = _user
})

const getUser = () => {
    return { user }
}

export default getUser