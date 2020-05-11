import api from './api'
import axios from 'axios'
import url from 'url'

export default {
    isRemoteImage(uri = '') {
        const HTTP_REGEX = /^(https|http)?:\/\//;

        return HTTP_REGEX.test(uri.trim());
    },

    getImageUrl(image){
        let imageUrl = (image && image.uri) ? image.uri : '/static/images/default.jpg';

        imageUrl = !this.isRemoteImage(imageUrl) ? url.resolve(axios.defaults.baseURL, imageUrl) : imageUrl;
        return imageUrl;
    },

    getVideoUrl(asset){
        return url.resolve(axios.defaults.baseURL, asset);
    },

    async completeContentInfo(contents = []){
        for(const content of contents) {
            content.image = await api.getContentImage(content.id);
            content.imageUrl = this.getImageUrl(content.image);
            content.hover = false;
        }

        return contents;
    },

    cleanCategories(categories = []){
        return categories.filter((category) => {
            return category && category.contents && category.contents.length;
        });
    },

    async getHomeScreenInfo() {
        const categories = (await api.getCategories(
            {activeCategories: true}
        )).items;

        for (const category of categories) {
            const categoryReferences = (await api.getCategoryContents(
                    category.id,
                    {activeContents: true}
                )).items,
                contents = categoryReferences.map((categoryReference) => categoryReference.content);

            category.contents = await this.completeContentInfo(contents);
        }

        return this.cleanCategories(categories);
    },

    async getHomeScreenNews() {
        const contents = (await api.getContents(
                {activeContents: true, limit: 7, newContent: true}
            )).items,
            contentWithImages = await this.completeContentInfo(contents);

        return contentWithImages;
    },

    async getSectionScreenInfo(id) {
        const category = await api.getCategory(id),
            categoryReferences = (await api.getCategoryContents(
                id,
                {activeContents: true}
            )).items,
            contents = categoryReferences.map((categoryReference) => categoryReference.content);

        category.contents = await this.completeContentInfo(contents);

        return category;
    },

    async getDetailScreenInfo(id) {
        const content = await api.getContent(id);
        content.image = await api.getContentImage(content.id);
        content.imageUrl = this.getImageUrl(content.image);
        content.videoUrl = this.getVideoUrl(content.asset);
        return content;
    },

    async searchContent(title) {
        const contents = (await api.getContents({title})).items;

        return contents;
    },

    async getMasterSeasons(id) {
        const response = [],
            seasons = (await api.getContentSeasons(id)).items;

        for (const season of seasons) {
            const episodes = await this.getSeasonEpisodes(id, season.seasonNumber);

            response.push({
                seasonNumber: season.seasonNumber,
                episodes
            });
        }

        return response;
    },

    async getSeasonEpisodes(id, seasonNumber) {
        const args = {activeContents: true, seasonNumber},
            contents = (await api.getContentEpisodes(id, args)).items;

        return this.completeContentInfo(contents);
    }
}