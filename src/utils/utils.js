import api from './api'

export default {
    isRemoteImage(uri = '') {
        const HTTP_REGEX = /^(https|http)?:\/\//;

        return HTTP_REGEX.test(uri.trim());
    },

    getImageUrl(image){
        let imageUrl = (image && image.uri) ? image.uri : '/static/images/default.jpg';

        return imageUrl;
    },

    async completeContentInfo(contents = []){
        for(const content of contents) {
            const favoriteContents = await api.getFavoriteContent(
                {contentId: content.id});
            content.image = await api.getContentImage(content.id);
            content.imageUrl = this.getImageUrl(content.image);
            content.hover = false;
            content.isFavorite = favoriteContents && favoriteContents.count > 0;
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

    async getFavoriteContentScreenInfo() {
        const favoriteContents = (await api.getFavoriteContent()).items,
            contents = favoriteContents.map((favoriteContent) => favoriteContent.content);

        return this.completeContentInfo(contents);
    },

    async getDetailScreenInfo(id) {
        const content = await api.getContent(id);
        content.image = await api.getContentImage(content.id);
        content.imageUrl = this.getImageUrl(content.image);
        content.videoUrl = content.asset;
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
    },

    async makeFavorite (content) {
        if (content.isFavorite) {
            await api.deleteFavoriteContent({contentId: content.id});
        } else {
            await api.makeFavoriteContent({contentId: content.id});
        }

        content.isFavorite = !content.isFavorite;

        return content;
    }
}