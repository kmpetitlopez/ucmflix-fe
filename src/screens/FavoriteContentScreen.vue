<template>
    <div class="SectionScreen">
        <div class="Wrapper">
            <Header title="Contenido Favorito" />

            <div class="Content">
                <!-- SECTIONS -->
                <div class="MoviesContainer">
                    <div
                        class="Movies"
                        v-for="(content, i) in contents"
                        :key="i"
                        :style="{backgroundImage : content.hover ? '' : `url('${content.imageUrl}')`  }"
                        v-on:mouseover="onHoverEnter(content)"
                        v-on:mouseleave="onHoverLeave(content)"
                    >
                        <template  v-if="content.hover">
                            <div class="Movies--text" >
                                <h2 @click="handleClickOnImage(content)">{{ content.title }}</h2>
                                <h4>{{ content.genre || 'Entretenimiento/Otros'}}</h4>
                                <p>{{ content.description || '...'}}</p>
                                <footer>
                                    <span>{{content.year || '-'}}</span>
                                    <span>{{content.country || '-'}}</span>
                                    <span>{{content.duration + 'min' || '-'}}</span>
                                    <span>{{content.parentalRating || '-'}}</span>
                                    <Icon icon="star" :size="20" @click="makeFavorite(content)"
                                    :style="{color : content.isFavorite ? '#F6B406' : '#9191a3'}"
                                    class="Icon"/>
                                    <Icon v-if="content.type !== 'master'" icon="play" :size="20" 
                                    @click="handleClickOnImage(content)"
                                    :style="{color : '#9191a3'}"
                                    class="Icon"/>
                                </footer>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Header, Icon } from '@/components'
import utils from '@/utils/utils'

export default {
    name: 'SectionScreen',
    components: {
        Header,
        Icon
    },
    data () {
        return {
            isTyping: false,
            name: undefined,
            contents: []
        }
    },
    methods: {
        handleClickOnImage (param) {
            const name =  param.type === 'master' ? 'master' : 'detail';
            this.$router.push({ name, params: { id: param.id } })
        },
        async fetchResult () {
            this.contents = await utils.getFavoriteContentScreenInfo();
        },
        onHoverEnter (content) {
            content.hover = true
        },
        onHoverLeave (content) {
            content.hover = false
        },
        async makeFavorite (content) {
            await utils.makeFavorite(content);
            this.contents = this.contents.filter((content) => content.isFavorite);
        }
    },
    mounted () {
        if (!this.$store.getters.isLoggedIn) {
            this.$router.push('/login');
        } else {
            this.fetchResult()
        }
    }
}
</script>
<style lang="scss" scoped>
@import "@/theme/_variables.scss";

.SectionScreen {
    width: 100%;

    .Wrapper {        
        .Content {
            z-index: 1;
            .MoviesContainer {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                margin: 0px 60px;
                grid-row-gap: 30px;
                grid-column-gap: 30px;

                .Movies {
                    position: relative;
                    height: 200px;
                    background-size: cover;
                    background-repeat: no-repeat;
                    background-color: $black-light;
                    border: 1px solid $black-medium;
                    .Movies--text{
                        h2 {
                            color: $gray-02;
                            font-weight:bold;
                            padding: 5px 10px 0px 10px;
                            cursor: pointer;
                        }
                        h4 {
                            color: $gray-02;
                            padding: 0px 10px;
                        }
                        p {
                            color: $gray-04;
                            padding: 0px 5px 5px 5px;
                            text-align: left;
                            max-height: 70px;
                            line-height: 15px;
                        }
                        footer {
                            color: $gray-04;
                            font-weight:bold;
                            bottom: 10px;
                            position: absolute;
                            span{
                                padding: 10px;
                            }
                            .Icon {
                                cursor: pointer;
                                padding: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
