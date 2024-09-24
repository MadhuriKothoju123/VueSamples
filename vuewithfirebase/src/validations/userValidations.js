export const passwordRules = [
    v => !!v || 'Password is required',
    v => (v && v.length >= 8) || 'Password must be at least 8 characters',
    v => /[A-Z]/.test(v) || 'Password must contain at least one uppercase letter',
    v => /[a-z]/.test(v) || 'Password must contain at least one lowercase letter',
    v => /\d/.test(v) || 'Password must contain at least one digit',
    v => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Password must contain at least one special character'
  ];
  export const usernameRules = [
    v => !!v || 'Username is required',
    v => v.length > 3 || 'Username must be more than 3 characters',
    v => /^[a-zA-Z]+$/.test(v) || 'Username should not contain numbers',
    v => v.length <= 20 || 'Username must be less than or equal to 20 characters'
  ]
  
  export const emailRules = [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
  ]
  
  export const mobileRules = [
    v => !!v || 'Mobile number is required',
    v => /^\d{10}$/.test(v) || 'Mobile number must be 10 digits'
  ]
  
//   const locationRules = [
//     v => !!v && v.length > 0 || 'Location(s) are required'
//   ]
  

export const confirmPasswordRules = (password) => [
    v => !!v || 'Confirm password is required',
    v => v === password || 'Passwords do not match'
  ];
 export  const companyRules = [
    v => !!v || 'Company  is required'
  ]