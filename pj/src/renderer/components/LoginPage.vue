<template>
    <b-container id="loginPage" class="w-100" fluid >
        <img id="imgLogo" src="~@/assets/login/logo.png" alt="logo">
        <div id="divInputForm">
            <b-row>
                <b-col class="pl-1 pr-1" cols="4">
                    USER ID
                </b-col>
                <b-col class="pl-1 pr-1">
                    <input type="text" class="custom-white-input border" placeholder="User ID" v-model="modelData.userId">
                </b-col>
            </b-row>
            <b-row class="mt-3">
                <b-col class="pl-1 pr-1" cols="4">
                    PASSWORD
                </b-col>
                <b-col class="pl-1 pr-1">
                    <input type="password" class="custom-white-input border" placeholder="Password" v-model="modelData.password">
                </b-col>
            </b-row>
            <b-row class="mt-5">
                <b-col class="pl-1 pr-1">
                    <b-form-checkbox
                        id="remenberMe"
                        v-model="modelData.isRememberMe"
                        name="remenberMe"
                    >
                        Save login profile
                    </b-form-checkbox>
                </b-col>
            </b-row>
            <b-row class="mt-5">
                <b-col class="pl-1 pr-1">
                    <b-button id="btnLogin" class="custom-blue-btn" block variant="primary" @click="login">Login</b-button>
                </b-col>
            </b-row>
            <b-row class="mt-2">
                <b-col class="pl-1 pr-1">
                    <b-button id="btnSignUp" class="custom-white-btn" block @click="signup">Add User</b-button>
                </b-col>
            </b-row>
        </div>
    </b-container>
</template>

<script>
    export default {
        name:'login-page',
        data(){
            return{
                modelData:{
                    userId:'',
                    password:'',
                    isRememberMe:{}
                }
            }
        },
        methods:{
            signup(){
                console.log('signup')
            },
            login(){
                console.log('login')
            }
        }
    }
</script>

<style>
  #loginPage {
    background-color: #1C283E;
    text-align: center;
    color: white;
  }
  #imgLogo {
    width: 30%;
    margin-top: 200px;
  }
  #divInputForm {
    width: 330px;
    margin: 0 auto;
    margin-top: 100px;
    padding: 15px;
    background-color: rgba(255, 255, 255, 0);
    text-align: left;
  }