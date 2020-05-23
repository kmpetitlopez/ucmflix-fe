<template>
    <div class="Wrapper">
        <Header :isLogin="true" />
        <div class="Login">
            <div class="Card">
                <h1>Crear cuenta</h1>
                <form class="Form" ref="form" @submit.prevent="handleSubmit" v-if="!emailSent">
                    <div class="Form_Field">
                        <p class=Label>Usuario</p>
                        <div class="Input">
                            <Icon icon="user" :size="18"/>
                            <input v-model="data.username" name="username" type="text" placeholder="Usuario">
                            <Transition name="fade" :duration="500">
                                <span v-if="isInvalid.username" class="Error">
                                    {{ specialMessages.username || error.username }}
                                </span>
                            </Transition>
                        </div>
                    </div>
                    <div class="Form_Field">
                        <p class=Label>Email</p>
                        <div class="Input">
                            <Icon icon="mail" :size="18"/>
                            <input v-model="data.email" name="email" type="email" placeholder="Email">
                            <Transition name="fade" :duration="500">
                                <span v-if="isInvalid.email" class="Error">
                                    {{ error.email }}
                                </span>
                            </Transition>
                        </div>
                    </div>
                    <div class="Button">
                        <button :disabled="isLoading" data-cy="loginBtn"
                            class="flex row-center pl-2 pr-2" @click="handleSubmit">
                            Crear
                        </button>
                    </div>
                </form>
                <p v-if="emailSent">Email enviado a {{data.email}}</p>
        </div>
    </div>
</div>
</template>

<script>
import { Icon, Header} from '@/components'
import api from '@/utils/api';
import authUtils from '@/utils/authUtils';
import constants from '@/utils/constants';

export default {
    name: 'LoginScreen',
    components: {
        Icon,
        Header,
    },
    data () {
        return {
           data: {
                username: '',
                email: ''
            },
            error: {},
            isInvalid: {},
            specialMessages: {},
            emailSent: false,
            isLoading: false
        }
    },
    methods: {
        async handleSubmit () {
            const validFormParams = authUtils.checkForm(this.data),
                isValid = authUtils.isValidForm(validFormParams.isInvalid);

            this.isInvalid = validFormParams.isInvalid;
            this.error = validFormParams.error;
            this.specialMessages = validFormParams.specialMessages;

            this.isLoading = true;

            if (isValid) {
                try {
                    await api.singUp(this.data);
                    this.emailSent = true;
                } catch (err) {
                    if (err && err.response
                        && err.response.data &&
                        err.response.data === constants.BE_ERRORS.USER_ALREADY_EXIST) {
                            this.error.username = 'El usuario o email ya existe.';
                            this.isInvalid.username = true;
                    } else {
                        this.error.username = 'Error creando usuario.';
                        this.isInvalid.username = true;
                    }
                }
               
            }

            this.isLoading = false;
        }
    },
}
</script>
<style scoped lang="scss">
@import "@/theme/_variables.scss";
.Wrapper {
    width: 100%;
    .Login {
        min-height: 100vh;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .Card {
        border-radius: .8rem;
        background: $black-medium;
        padding: 3rem;
        width: 20rem;
    }
    h1 {
    font-family: sans-serif;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    color: $body-color;
    }
    .Form_Field {
        margin-bottom: 2rem;
    }
    .Label {
    margin-bottom: .5rem;
    font-size: .8rem;
    color: $body-color;
    }
    .Input {
        position: relative;
        .Icon {
            position: absolute;
            top: 1.2rem;
            transform: translateY(-50%);
            left: .8rem;
        }
        input {
            width: calc(100% - 2.7rem);
            min-height: 2.3rem;
            padding: 0 .3rem 0 2.5rem;
            border: 1px solid $body-color;
            border-radius: .3rem;
            background: transparent;
            color: $body-color;
            font-size: .8rem;
            line-height: .8rem;
            font-weight: 400;
            transition: border-color 0.5s ease-in-out;
            &:focus {
                border-color: #999;
                outline: none;
            }

        }
        .Error {
            margin-top: 5px;
            float: right;
            font-size: .8rem;
            color: tomato;
        }
    }
    .Button {
        button {
            width: 40%;
            padding: .8rem;
            background: $black-light;
            color: $body-color;
            text-transform: uppercase;
            font-size: .8rem;
            line-height: .8rem;
            font-weight: bold;
            border-radius: .5rem;
            border-color: transparent;
            margin-right: 15px;
            cursor: pointer;
            &:disabled {
                background-color: #c8c8c8;
                cursor: not-allowed;
            }
            &:focus {
                outline: none;
            }
        }
        a {
            color: $body-color;
            font-size: .9rem;
        }
    }
    hr {
        border-color: $body-color;
        border-left: none;
        border-right: none;
        margin: 15px 0px;
    }
    .Button2 {
        button {
            width: 100%;
            padding: .8rem;
            background: $black-light;
            color: $body-color;
            text-transform: uppercase;
            font-size: .8rem;
            line-height: .8rem;
            font-weight: bold;
            border-radius: .5rem;
            border-color: transparent;
            margin-right: 15px;
            cursor: pointer;
            &:disabled {
                background-color: #c8c8c8;
                cursor: not-allowed;
            }
            &:focus {
                outline: none;
            }
        }
        a {
            color: $body-color;
            font-size: .9rem;
        }
    }
}

</style>
