import { ref } from 'vue'
import { dbAuth } from '../firebase/config'

const error = ref(null)

const login = async(email, password) => {
    error.value = null

    try {
        const res = await dbAuth.signInWithEmailAndPassword(email, password)
        error.value = null
        console.log(res)

        return res

    } catch (err) {
        console.log(err.value)
        error.value = 'Invalid email or password'
    }
}

const useLogin = () => {
    return { error, login }
}

export default useLogin