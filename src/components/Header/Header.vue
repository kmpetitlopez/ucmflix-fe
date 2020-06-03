<template>
    <div class="Parent">
        <div class="Header">
            <div class="Flex">
                <div class="Logo" :class="{'Logo--extra': title}" @click="$router.push('/')">
                    <h1>UCM<span>FLIX</span></h1>
                </div>
                <div class="SectionTitle" v-if="title">
                    <h2>{{ title }}</h2>
                </div>
            </div>
            <div class="Search" v-if="!isLogin">
                <Input
                    v-model="value"
                    name="search"
                    type="search"
                    placeholder="Search a video..."
                    iconLeft="search"
                    :width="350"
                />
                <Icon icon="star" :size="20" class="Buttons" @click="$router.push('/favorite-contents')"/>
                <Icon icon="logout" :size="20" class="Buttons" @click="logout"/>
            </div>
        </div>
    </div>
</template>

<script>
import VueTypes from 'vue-types'
import {Input, Icon} from '@/components';
import api from '@/utils/api';

export default {
    name: 'Header',
    props: {
        title: VueTypes.string.def(''),
        isLogin: VueTypes.bool.def(false)
    },
    components: {
        Input,
        Icon
    },
    data() {
        return {
            value: undefined
        };
    },
    methods: {
        async logout() {
            await api.logout();
            this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.Parent {
    position: sticky;
    top: 0px;
    height: 90px;
    background-color: $secondary;
    z-index: 2;
    .Header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 60px;
        .Flex {
            display: flex;
            .Logo {
                cursor: pointer;
                h1 {
                    color: $primary;
                    font-size: 50px;
                    margin: 0;
                    padding: 0;
                    span {
                        font-size: 35px;
                        opacity: 0.7;
                    }
                }
            }
            .Logo--extra {
                padding-right: 30px;
                border-right: 1px solid $primary;
                margin-right: 30px;
            }
            .SectionTitle {
                display: flex;
                align-items: center;
                h2 {
                    font-size: 35px;
                    color: $body-color;
                    margin: 0;
                }
            }
        }
        .Search {
            display: flex;
        }
        .Buttons{
            margin-left: 5px;
            cursor: pointer;
            color : $gray-02;
            border: 1px solid $gray-04;
            border-radius: 4px;
            padding: 6px 5px;
        }
    }
}
</style>
