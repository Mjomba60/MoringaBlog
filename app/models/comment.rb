class Comment < ActiveRecord::Base
    belongs_to :user
    belongs_to :article

    def comment_params
        params.require(:comment).permit(:content, :user_id, :article_id)
    end
      
    # def create
    #     # ...
    #     comment_params = params.require(:comment).permit(:content)
    #     @comment = Comment.new(comment_params)
    #     # ...
    # end
end