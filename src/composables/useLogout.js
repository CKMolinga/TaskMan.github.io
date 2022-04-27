import { ref } from 'vue'
import { dbAuth } from '../firebase/config'

const error = ref(null)

const logout = async() => {
    error.value = null

    try {
        await dbAuth.signOut()
        error.value = null

    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }
}

const useLogout = () => {
    return { error, logout }
}

export default useLogout