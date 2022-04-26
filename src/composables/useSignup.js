import { ref } from 'vue'
import { dbAuth } from '../firebase/config'

const error = ref(null)

const signup = async(email, password, displayName) => {
    error.value = null

    try {
        const res = await dbAuth.createUserWithEmailAndPassword(email, password)
        if (!res) {
            throw new Error('Error! Could not commplete signup')
        }
        await res.user.updateProfile({ displayName })
        error.value = null

        return res

    } catch (err) {
        console.log(err.message)
        error.value = err.message
    }
}

const useSignup = () => {
    return { error, signup }
}

export default useSignup