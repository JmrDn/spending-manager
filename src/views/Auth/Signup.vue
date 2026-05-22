<template>
    <div class="signup-container">
        <div class="signup-header">
            <van-button @click.prevent="router.push('/')">
                <template #icon>
                    <van-icon size="24" name="arrow-left" />
                </template>
            </van-button>
    
            <h1>Signup</h1>
        </div>
        <CustomErrorMessage :err-message="errorMessages[0] || ''" v-if="errorMessages.length >= 1" />
        <form @submit.prevent="signUp" class="expense-form">
            <CustomInput v-model="form.firstName" placeholder="Enter first name" required />
            <CustomInput v-model="form.lastName" placeholder="Enter last name" required />
            <CustomInput v-model="form.username" placeholder="Enter username" required />
            <CustomInput v-model="form.email" placeholder="Enter email" required />
            <PasswordInput v-model="form.password" placeholder="Enter password" required />
            <PasswordInput v-model="form.confirmPassword" placeholder="Confirm password" required />
            <PrimaryButton :disabled="disableBtn" type="submit"> {{ disableBtn ? 'Signing up...' : 'Signup'}}</PrimaryButton>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { type SignupDTO } from '@/dto/Auth';
import { ref } from 'vue';
import { supabase } from '@/config/supabase';
import { useRouter } from 'vue-router';
import CustomInput from '@/components/FormComponent/CustomInput.vue';
import PasswordInput from '@/components/FormComponent/PasswordInput.vue';
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue';
import useUserStore from '@/store/users';
import { showSuccessToast } from 'vant';
const user = useUserStore()
const router = useRouter()

const form = ref<SignupDTO>({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''

})


const errorMessages = ref<string[]>([])

const disableBtn = ref<boolean>(false)
    
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
const signUp = async () => {
    errorMessages.value = []
    disableBtn.value = true
  try {

        const signupData = {
            email: form.value.email,
            password: form.value.password
        }

        if (!isValidEmail(signupData.email)) {
            errorMessages.value.push('Please enter valud email')
            disableBtn.value = false
            return
        }

        if (form.value.confirmPassword !== signupData.password) {
            errorMessages.value.push('Password does not match')
            disableBtn.value = false
            return
        }

        // 1. Create auth account
        const { data, error } = await supabase.auth.signUp(signupData)
        
        // Signup failed
        if (error) {
            console.error('Signup failed:', error.message)
            errorMessages.value.push('Failed to signup. Please try again later.')
            disableBtn.value = false
            return
        }
        
        const _user = data.user

        // No user returned
        if (!_user) {
            console.error('No user returned after signup')
            errorMessages.value.push('Failed to signup. Please try again later.')
            disableBtn.value = false
            return
        }

        const userData = {
            email: form.value.email,
            full_name: form.value.firstName + ' ' + form.value.lastName,
            username: form.value.username
        }


        // 2. Insert profile
        const { error: userDataError } = await supabase
        .from('users')
        .insert([ userData ])

        // Profile insert failed
        if (userDataError) {

            console.error('Failed to save profile:', userDataError.message)

            // Remove active session/logout
            await supabase.auth.signOut()
            errorMessages.value.push('Failed to signup. Please try again later.')
            
            // Delete auth user via Edge Function or Admin API
            // NOTE:
            // Cannot delete user directly from frontend
            // because it requires service_role key
            user.updateUserInfo({
                fullName: '',
                username: '',
                email: ''
            })
            disableBtn.value = false
            return
        }

        user.updateUserInfo({
                fullName: userData.full_name,
                username: userData.username,
                email: userData.email
            })
        showSuccessToast('Successfully Signup')
        router.push('/')
        console.log('User registered successfully')

  } catch (err) {
    console.error('Unexpected error:', err)
    errorMessages.value.push('Failed to signup. Please try again later.')
    disableBtn.value = false
  }
}
</script>

<style lang="scss" scoped>

.signup-container {
    border-radius: 10px;
    padding: 20px;
    
    .signup-header {
        display: flex;
        justify-content: start;
        align-items: center;
        gap: 10px;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 10px;
    }

    .van-button {
        background: none;
        border: none;
        padding: 5px;
        margin: 0;
        
    }
}


</style>