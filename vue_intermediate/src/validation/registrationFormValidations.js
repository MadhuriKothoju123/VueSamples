 export const usernameValidation=(isvalid, data)=>{


    if(isvalid && data.length!==0){


        if(data.length<3){
              return "username should be at least 3 characters long"
        }
         return "username is required"
    }
    return null
}

export const emailValidation=(isvalid,email)=>{
    if(isvalid && email.length!==0){
        const emailRegex = /^[\w-.]+@gmail.com$/;
if(email.length<10){
    return "email should be at least 10 characters long"
}
    
        else if (!emailRegex.test(email)) {
            return 'Email must be a valid @gmail.com email address';
          }
          return null;
    }
}

export const moblieNumberValidation=(isvalid, number)=>{

    if(isvalid && number.length!==0){
        const phoneRegex1 = /^[6789]\d{9}$/;
        if(!phoneRegex1.test(number ))  return 'Phone number must be a 10-digit number';
        else  'enter valid mobile number'

    }
    else return null
}

export const passwordValidation=(isvalid, password)=>{
     if(isvalid && password.length!==0 ){
        if (password.length < 8) {
            return 'Password should be at-least 8 characters.';
          }
     else return 'required password'

     }
     return null
}


