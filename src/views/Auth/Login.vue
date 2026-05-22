<template>
    <div class="login-container">
        <h1>Login</h1>
        <CustomErrorMessage :err-message="errorMessageList[0] || ''" v-if="errorMessageList.length > 1" />
        <form @submit.prevent="onLogin" class="expense-form">
                <CustomInput v-model="form.username" placeholder="Enter username or email" required />
                <PasswordInput v-model="form.password" placeholder="Enter password" required />
                <PrimaryButton :disabled="disableBtn" type="submit"> {{ disableBtn ? 'Loging in...' : 'Login'}}</PrimaryButton>
                <SecondaryButton  @click="router.push('/signup')"> Create new account </SecondaryButton>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { type LoginDTO } from '@/dto/Auth';
import { ref } from 'vue';
import { supabase } from '@/config/supabase';
import { useRouter } from 'vue-router';
import useUserStore from '@/store/users';
import CustomInput from '@/components/FormComponent/CustomInput.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import PasswordInput from '@/components/FormComponent/PasswordInput.vue';
import SecondaryButton from '@/components/Buttons/SecondaryButton.vue';
import CustomErrorMessage from '@/components/FormComponent/CustomErrorMessage.vue';
import { showSuccessToast, setToastDefaultOptions } from 'vant';
setToastDefaultOptions({ duration: 2000 });

const router = useRouter()
const user = useUserStore()

const form = ref<LoginDTO>({
    username: '',
    password: ''
})

const errorMessageList = ref<string[]>([])

const disableBtn = ref<boolean>(false)

const isEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const getEmailOfUser = async (username: string): Promise<string> => {

  return new Promise(async (resolve, reject) => {

    try {

      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('username', username)
        .single()

      if (error) {
        reject(error.message)
        errorMessageList.value.push('Failed to login. Please try again later')
        return
      }

      if (!data?.email) {
        reject('Email not found')
        errorMessageList.value.push('Failed to login. Please try again later')
        return
      }

      resolve(data.email)

    } catch (err: any) {
      reject(err.message || 'Unexpected error')
      errorMessageList.value.push('Failed to login. Please try again later')
    }

  })
}


const loginThruUsername = async(data: { email: string, password: string}) => {
    const username = data.email
    try {

        const email = await getEmailOfUser(username)

        const loginFormData = {
            email,
            password: data.password
        }

        login(loginFormData)

    } catch (err) {
        console.error(err)
        errorMessageList.value.push('Failed to login. Please try again later')
    }

}

const login = async(loginFormData: { email: string, password: string}) => {

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: loginFormData.email,
            password: loginFormData.password
        })
        if (error) {
            console.error(error.message)
            errorMessageList.value.push('Failed to login. Please try again Later')
            return
        }

        getUserInfo(data.user.id)
        showSuccessToast('Successfully Login')
        router.push('/')
        errorMessageList.value = []
    } catch(err: any) {
        errorMessageList.value.push('Failed to login. Please try again Later')
    } finally {
        disableBtn.value = false
    }

}

const onLogin = async () => {
    disableBtn.value = true
    errorMessageList.value = []
    const loginFormData = {
        email: form.value.username,
        password: form.value.password
    }

    // Login thru username
    if (!isEmail(loginFormData.email)) {
        loginThruUsername(loginFormData) 
        return
    }

    // Login thru email
    login(loginFormData)
    
}

const getUserInfo = async(userId: string) =>{
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', userId)
            .single()
        
        if (error) {
            console.log('Failed to get user info: ', error.message)
            return
        }

        user.updateUserInfo({
            fullName: data.full_name,
            username: data.username,
            email: data.email
        })

    } catch (err: any) {
        console.error('Failed to get user info:', err)
    }
}
</script>

<style lang="scss" scoped>
.login-container {
    height: 400px;
    border-radius: 10px;
    padding: 20px;
    
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
    }
}

</style>