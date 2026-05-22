<template>
  <div class="profile-container">
    <Card>
      <template #content>
        <div class="profile-header">
          <div class="avatar-circle">
            {{ userInitials }}
          </div>
          <h2 class="full-name">{{ profile.fullName || 'User Profile' }}</h2>
          <p class="user-username">@{{ profile.username || 'username' }}</p>
        </div>

        <div class="info-list">
            <div class="info-item">
                <span class="label">Email Address</span>
                <span class="value">{{ profile.email }}</span>
            </div>
            <PrimaryButton 
                @click="handleLogout">
                {{ loggingOut ? 'Logging out..' : 'Logout Account'  }}
            </PrimaryButton>
        </div>

        
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'
import { supabase } from '@/config/supabase'
import { useRouter } from 'vue-router'
import { showConfirmDialog, showToast } from 'vant'
import Card from '@/components/Card.vue'
import PrimaryButton from '@/components/Buttons/PrimaryButton.vue'
import useUserStore from '@/store/users'

const router = useRouter()
const user = useUserStore()
const loggingOut = ref(false)
const profile = ref({
  fullName: '',
  username: '',
  email: ''
})

// Calculate initials for the avatar circle (e.g., "John Doe" -> "JD")
const userInitials = computed(() => {
  if (!profile.value.fullName) return 'U'
  return profile.value.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
})

watchEffect (() =>{
    profile.value = user.getUserInfo
})

// const fetchUserProfile = async () => {
//   // 1. Get the current authenticated user from Supabase
//   const { data: { user } } = await supabase.auth.getUser()
  
//   if (user) {
//     profile.value.email = user.email
    
//     // 2. Fetch extra profile details (Full Name, Username) from your public.users table
//     // Ensure you created this table correctly using the UUID fix from earlier!
//     const { data, error } = await supabase
//       .from('users')
//       .select('full_name, username')
//       .eq('user_id', user.id)
//       .single()

//     if (data) {
//       profile.value.fullName = data.full_name
//       profile.value.username = data.username
//     }
//   }
// }

const handleLogout = () => {
  showConfirmDialog({
    title: 'Logout',
    message: 'Are you sure you want to sign out?',
    confirmButtonColor: '#2ecc71', // Matching your money green
  })
    .then(async () => {
      loggingOut.value = true
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        showToast('Logout failed')
        loggingOut.value = false
      } else {
        router.push('/login') // Redirect to login page
      }
    })
    .catch(() => {
      // User cancelled logout
    })
}

// onMounted(fetchUserProfile)
</script>

<style lang="scss" scoped>

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f1f5f9;
  margin-bottom: 20px;
}

.avatar-circle {
  width: 80px;
  height: 80px;
  background: #2ecc71; /* Your signature Green */
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 15px;
  box-shadow: 0 4px 12px rgba(46, 204, 113, 0.2);
}

.full-name {
  color: #1e293b;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 0;
}

.user-username {
  color: #64748b;
  font-size: 0.9rem;
  margin-top: 4px;
}

.info-list {
  margin-bottom: 15px;
  padding: 0 15px;

  button {
    width: 100%;
    margin-top: 50px;
  }
}

.info-item {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}

.label {
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.value {
  color: #334155;
  font-size: 1rem;
  font-weight: 500;
}


</style>