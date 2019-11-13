# Simple article portal
This is a frontend part of app.

[See it live!](https://ancient-island-54893.herokuapp.com/)

Backend part can be found [here](https://github.com/Kahore/ex-articles-bakend/)

Frontend is built with 
- [vue-cli](https://github.com/vuejs/vue-cli)
- [vuex](https://github.com/vuejs/vuex)
- [vue router](https://github.com/vuejs/vue-router)
- [vuelidate](https://github.com/vuelidate/vuelidate)
- [typescript](https://www.typescriptlang.org/)

 For demo I already create several account, so you you can login to see how it all works.
 
 Reading article ok w/t login, but other stuffs required auth.
 
| Login                  | Password              |
| ---------------------- | --------------------- |
| John.Doe@ex.com        | 123456                |
| Tom.Smith@ex.com       | 123456                |
| Jane.Ostin@ex.com      | 123456                |

Anyway - you can also create a new user, if you want

## Features
- All forms under client-side validation.
- You can create, update and delete your articles.
- You can follow/unfollow user. It affect on user feed.
- You can like / unlike posts. It affect favorited articles at individual profile. It means you can see what article of selected author you already like.
- You can leave a comment.
- You can also update your personal info.

### After all - it's a demo app :)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
