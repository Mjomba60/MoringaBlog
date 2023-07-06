class LikesController < ApplicationController
    def like
        article = Article.find(params[:article_id])
        article.likes.create(user_id: current_user.id, interaction_type: 'like')
        article.increment!(:total_likes)
        redirect_to article_path(article)
    end

    def dislike
        article = Article.find(params[:article_id])
        article.likes.create(user_id: current_user.id, interaction_type: 'dislike')
        article.decrement!(:total_likes)
        redirect_to article_path(article)
    end
end