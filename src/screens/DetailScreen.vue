<template>
    <div class="VideoContainer">
        <div class="Navigation" @click="$router.back()">
                <Icon icon="chevron-left" :size="50"></Icon>
        </div>
        <video id="video" controls></video>
    </div>
</template>

<script>
import Icon from '@/components/Icon/Icon.vue'
import utils from '@/utils/utils'
import player from '@/utils/player'

export default {
    name: 'DetailScreen',
    components: {
        Icon,
    },
    computed: {
        videoID () {
            return this.$router.history.current.params.id
        }
    },
    data () {
        return {
            content: {}
        }
    },
    methods: {
        async fetchResult () {
            this.content = await utils.getDetailScreenInfo(this.videoID);
            player.initPlayer(this.content.videoUrl);
        }
    },
    async mounted () {
        await this.fetchResult()
    },
}
</script>
<style lang="scss" scoped>
@import "@/theme/_variables.scss";

.VideoContainer {
    video {
        position: fixed; right: 0; bottom: 0;
        min-width: 100%; min-height: 100%;
        width: auto; height: auto; z-index: -100;
        background-size: cover;
    }
    .Navigation {
        margin: 20px 60px 20px 60px;
        cursor: pointer;
    }
}
</style>
