
import {ref,computed} from 'vue'


export default function useTogglePassword(){

   const passwordFieldType = ref('password')

   const togglePasswordVisibility = () => {
      passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
   }

   const passwordToggleIcon = computed( () => passwordFieldType.value === 'password' ? 'EyeIcon' : 'EyeOffIcon')

   return {
      passwordFieldType,
      togglePasswordVisibility,
      passwordToggleIcon
   }
  

  
}

export const _ = null
