<template>
    <Carousel3d
        class="SliderSectionSlides"
        :disable3d="true"
        :clickable="false"
        :controls-visible="true"
        :display="5"
        :width="390"
        :height="200"
        :space="400"
        :border="0"
        :loop="true"
        >
            <slide v-for="(content, i) in contents" :index="i" :key="i" :slide-space="300">
                <template slot-scope="" >
                    <div v-on:mouseover="onHoverEnter(content)"
                        v-on:mouseleave="onHoverLeave(content)" 
                        :style="`height: 100%`" 
                        :class="{'Info': content.hover, Img: !content.hover}">
                        <div v-if="!content.hover">
                            <img :src="`${content.imageUrl}`" >
                        </div>
                        <div class="Info--text" v-if="content.hover">
                            <h2 @click="getPath(content)">{{ content.title }}</h2>
                            <h4>{{ content.genre || 'Entretenimiento/Otros' }}</h4>
                            <p>{{ content.description || '...' }}</p>
                            <footer>
                                <span>{{ content.year || '-' }}</span>
                                <span>{{ content.country || '-' }}</span>
                                <span>{{ content.duration + 'min' || '-' }}</span>
                                <span>{{ content.parentalRating || '-' }}</span>
                                <Icon icon="star" :size="20" 
                                    @click="makeFavorite(content)"
                                    :style="{color : content.isFavorite ? '#F6B406' : '#9191a3'}"
                                    class="Icon"/>
                                <Icon v-if="content.type !== 'master'" icon="play" :size="20" 
                                    @click="getPath(content)"
                                    :style="{color : '#9191a3'}"
                                    class="Icon"/>
                            </footer>
                        </div>
                    </div>
                </template>
            </slide>
    </Carousel3d>
</template>

<script>
import VueTypes from 'vue-types'
import { Carousel3d, Slide } from 'vue-carousel-3d';
import {Icon} from '@/components';
import utils from '@/utils/utils';

export default {
    name: 'Slider',
    components: {
        Icon,
        Carousel3d,
        Slide,
    },
    props: {
        contents: VueTypes.array.isRequired
    },
    data () {
        return {}
    },
    methods: {
        onHoverEnter (content) {
            content.hover = true
        },
        onHoverLeave (content) {
            content.hover = false
        },
        getPath (content) {
            this.$router.push({ name: 
                content.type === 'master' ? 'master' : 'detail', params: { id: content.id } });
        },
        async makeFavorite (content) {
            await utils.makeFavorite(content);
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/theme/_variables.scss";

.SliderSection {
    width: 100%;
    .SliderSectionSlides {
        height: 200px;
        .Img {
            background-color: $white;
            border: 1px solid $black-medium;
            .Img--test {
                background-size: cover;
                height: 200px;
            }
        }
        .Info {
            background-color: $black-light;
            border: 1px solid $black-medium;
            .Info--text{
                h2 {
                    color: $gray-02;
                    font-weight:bold;
                    padding: 2px 10px 0px 10px;
                    cursor: pointer;
                }
                h4 {
                    color: $gray-02;
                    padding: 0px 10px;
                }
                p {
                    color: $gray-04;
                    padding: 0px 5px 5px 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    text-align: left;
                    max-height: 70px;
                    line-height: 15px;
                    font-size: 14px;
                }
                footer {
                    color: $gray-04;
                    font-weight:bold;
                    bottom: 5px;
                    position: absolute;
                    font-size: 15px;
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
</style>
