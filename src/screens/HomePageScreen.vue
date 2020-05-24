<template>
    <div class="HomepageScreen">
        <div class="Wrapper">
            <Header />

            <div class="Content">
                <!-- SLIDER -->
                <div class="Slider">
                    <vueper-slides
                        class="Slides"
                        :visible-slides="3"
                        :fixed-height="true"
                        :gap="1"
                        :arrows="false"
                        :pause-on-hover="true"
                        autoplay
                        :duration="3500"
                        :touchable="false"
                    >
                        <vueper-slide
                            v-for="(content, i) in newContents" 
                            :key="i" :image="content.imageUrl" :link="getPath(content)" 
                        />
                        <template v-slot:bullet="{ active}">
                            <i class="Icon" :class="{'Icon--active': active}">
                            </i>
                        </template>
                    </vueper-slides>
                </div>

                <!-- SECTIONS -->
                <div class="Section" v-for="(category, i) in categories" :key="i" >
                    <h2
                        class="SectionTitle"
                        @click="handleSectionRedirect(category.id)"
                    >
                        {{category.name}}
                    </h2>
                    <div class="SliderSection">
                        <Slider :contents="category.contents"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Slider, Header } from '@/components'
import utils from '@/utils/utils'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
    name: 'HomepageScreen',
    components: {
        Slider,
        Header,
        VueperSlides,
        VueperSlide
    },
    data () {
        return {
            value: undefined,
            categories: [],
            newContents: []
        }
    },
    methods: {
        handleSectionRedirect (param) {
            this.$router.push({ name: 'section', params: { id: param } })
        },
        async fetchResult () {
            this.newContents = await utils.getHomeScreenNews()
            this.categories = await utils.getHomeScreenInfo()
        },
        getPath (content) {
            const path = content.type === 'master' ? '/master/' : '/detail/';
            return path + content.id;
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

.HomepageScreen {
    .Wrapper {
        width: 100%;
        
        .Content {
            z-index: 1;
            .Slider {
                .Slides {
                    height: 350px;
                }
                .Icon{
                    background-color: $black-light;
                    border: 1px solid $black-medium;
                    border-radius: 10px;
                    box-shadow: none;
                    transition: 0.3s;
                    width: 15px;
                    height: 15px;
                }
                .Icon--active{
                    background-color: $body-color;
                }
            }
            .Section {
                .SectionTitle {
                    margin-left: 60px;
                    margin-top: 25px;
                    color: $body-color;
                    font-size: 35px;
                    cursor: pointer;
                }
                .SliderSection {
                    width: 100%;
                }
            }  
        } 
    }
}
img {
    cursor: pointer;
}
</style>
