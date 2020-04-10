import api from './api'

export default {
    getImageUrl(id){
        return 'http://localhost:3000/static/images/' + id + '.jpg';
    },

    getVideoUrl(){
        return 'http://localhost:3000/static/videos/1/manifest.mpd';
    },

    completeContentInfo(contents = []){
        return contents.map((content) => {
            content.imageUrl = this.getImageUrl(content.id);
            content.defaultImage = 'http://localhost:3000/static/images/default.jpg'
            content.hover = false;
            return content;
        });
    },

    cleanCategories(categories = []){
        return categories.filter((category) => {
            return category && category.contents && category.contents.length;
        });
    },

    async getHomeScreenInfo() {
        const categories = (await api.getCategories(
            [{activeCategories: true}]
        )).items;

        for (const category of categories) {
            const categoryReferences = (await api.getCategoryContents(
                    category.id,
                    [{activeContents: true}]
                )).items,
                contents = categoryReferences.map((categoryReference) => categoryReference.content);

            category.contents = this.completeContentInfo(contents);
        }

        return this.cleanCategories(categories);
    },

    async getHomeScreenNews() {
        const contents = (await api.getContents(
                [{activeContents: true}, {limit: 7}, {newContent: true}]
            )).items,
            contentWithImages = this.completeContentInfo(contents);

        return contentWithImages;
    },

    async getSectionScreenInfo(id) {
        const category = await api.getCategory(id),
            categoryReferences = (await api.getCategoryContents(
                id,
                [{activeContents: true}]
            )).items,
            contents = categoryReferences.map((categoryReference) => categoryReference.content);

        category.contents = this.completeContentInfo(contents);

        return category;
    },

    async getDetailScreenInfo(id) {
        const content = await api.getContent(id);
        content.imageUrl = this.getImageUrl(id);
        content.videoUrl = this.getVideoUrl();
        return content;
    },

    async searchContent(title) {
        const contents = (await api.getContents([{title}])).items;

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
        const args = [{activeContents: true}, {seasonNumber}],
            contents = (await api.getContentEpisodes(id, args)).items;

        return this.completeContentInfo(contents);
    }
}