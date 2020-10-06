import apiClient from 'services/axios'
import store from 'store'
import { createApolloFetch } from 'apollo-fetch';


// updateProfle
export async function updateProfle(usrName, password) {
  console.log(usrName)
  console.log(password)
 
  const fetch = createApolloFetch({
   uri: 'http://localhost:4000/graphql',
 });
 
 return fetch({
   query: `{
     login(username:"imajkumar",password:"Ajay@9711"){
      id,
      avatar,
      name,
      role
      email
      token
      refreshToken,
     }
   }`,
 }).then(response => {
   if (response) {
     const { refreshToken } = response.data.login
     if (refreshToken) {
       store.set('accessToken', refreshToken)
     }
     return response.data.login
   }
   return false
 })
 .catch(err => console.log(err))
 
 
  
 
 }
// updateProfle
export async function login(email, password) {
 console.log(email)
 console.log(password)

 const fetch = createApolloFetch({
  uri: 'http://localhost:4000/graphql',
});

return fetch({
  query: `{
    login(username:"imajkumar",password:"Ajay@9711"){
     id,
     avatar,
     name,
     role
     email
     token
     refreshToken,
    }
  }`,
}).then(response => {
  if (response) {
    const { refreshToken } = response.data.login
    if (refreshToken) {
      store.set('accessToken', refreshToken)
    }
    return response.data.login
  }
  return false
})
.catch(err => console.log(err))


 

}

export async function register(email, password, name) {
  return apiClient
    .post('/auth/register', {
      email,
      password,
      name,
    })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function currentAccount() {
  const fetch = createApolloFetch({
    uri: 'http://localhost:4000/graphql',
  });
  
  return fetch({
    query: `{
      login(username:"imajkumar",password:"Ajay@9711"){
       id,
       avatar,
       name,
       role
       email
       token
       refreshToken,
      }
    }`,
  }).then(response => {
    if (response) {
      const { refreshToken } = response.data.login
      if (refreshToken) {
        store.set('accessToken', refreshToken)
      }
      return response.data.login
    }
    return false
  })
  .catch(err => console.log(err))
  
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      store.remove('accessToken')
      return true
    })
    .catch(err => console.log(err))
}
