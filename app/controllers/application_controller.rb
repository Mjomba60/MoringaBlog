class ApplicationController < Sinatra::Base
    set :default_content_type, "application/json"
  
    # Add your routes here
    get "/" do
      { message: "Good luck with your project!" }.to_json
    end
  
    post "/signup" do
      first_name = params[:first_name]
      last_name = params[:last_name]
      user_name = params[:user_name]
      email = params[:email]
      password = params[:password]
  
      encrypted_password = BCrypt::Password.create(password)
  
      user = User.new(first_name: first_name, last_name: last_name, user_name: user_name, email: email, password: encrypted_password)
  
      if user.save
        redirect "/articles"
      else
        redirect "/signup"
      end
    end
  
    # post "/login" do
    #   email = params[:email]
    #   password = params[:password]
  
    #   user = User.find_by(user_name: email)
  
    #   if user && BCrypt::Password.new(user.password) == password
    #     session[:user_id] = user.id
    #     redirect "/articles"
    #   else
    #     redirect "/login"
    #   end
    # end
    #status 201
    # user.to_json
    post "/login" do
      email = params[:email]
      password = params[:password]
  
      user = User.find_by(email: email)
      puts(email)
      puts(password)
      puts(user)
      if user && user.password == password
        session[:user_id] = user.id
        status 200
        user.to_json
      else
        status 400
        { error: "Wrong email or password" }.to_json
      end
    end
    #
    post "/users" do
      first_name = params[:first_name]
      last_name = params[:last_name]
      user_name = params[:user_name]
      email = params[:email]
      password = params[:password]
  
      user = User.new(
        first_name: first_name,
        last_name: last_name,
        user_name: user_name,
        email: email,
        password: password,
      )
  
      if user.save
        status 201
        user.to_json
      else
        status 500
        { error: "Error saving user" }.to_json
      end
    end
  
    #password_digest handles password encryption and authenitcation
    #The bcrypt gem is used to handle these
  
    post "/users/authenticate" do
      user = User.find_by(email: params[:email])
  
      if user && BCrypt::Password.new(user.password_digest) == password
        message = "password is correct".to_json
      else
        message = "incorrect password".to_json
      end
    end
  
    #get all users
    get "/users" do
      users = User.all
      users.to_json
    end
  
    get "/articles" do
      articles = Article.all
      articles.to_json(include: { comments: { include: :user } })
    end
  
    get "/users/:id" do
      user = User.find(params[:id])
      user.to_json
    end
  
    #DELETE /users/:id
  
    delete "/users/:id" do
      user = User.find(params[:id])
      if user.destroy
        message = "User deleted".to_json
      else
        message = "failed to delete user".to_json
      end
    end
  
    get "/articles" do
      articles = Article.all
      articles.to_json(include: { comments: { include: :user } })
    end
  
    get "/articles/:id" do
      article = Article.find(params[:id])
      article.to_json(include: { comments: { include: :user } })
    end
  
    # delete "/articles/:id" do
    #   article = Article.find(params[:id])
      
    #   if article.destroy
    #     # render json: { message: 'Article deleted successfully' }
    #     header :no_content
    #   else
    #     render json: { error: 'Failed to delete the article' }, status: :unprocessable_entity
    #   end
    # end
    delete "/articles/:id" do
      article = Article.find(params[:id])
    
      if article.destroy
        { message: 'Article deleted successfully' }.to_json
      else
        { error: 'Failed to delete the article' }.to_json
      end
    end
    
  
    post "/articles" do
      article = Article.create(params)
      article.to_json(include: { comments: { include: :user } })
    end
  
    put "/articles/:id" do
      article = Article.update(params[:id], params.filter { |k, v| v != params })
      article.to_json
    end
  
    get "/articles/:article_id/comments" do
      article_id = params[:article_id]
      comments = Comment.where(article_id: article_id)
      comments.to_json
    end
  
    get "/articles/:article_id/like" do
      article_id = params[:article_id]
      likes = Like.where(article_id: article_id)
      likes.to_json
    end
  
    post "/articles/:article_id/interaction" do
      article_id = params[:article_id]
      user_id = params[:user_id]
      interaction_type = params[:interaction_type] # Should be either 'like' or 'dislike'
  
      like = Like.new(article_id: article_id, user_id: user_id, interaction_type: interaction_type)
  
      if like.save
        like.to_json
      else
        status 500
        { error: "Error saving like" }.to_json
      end
    end
  
    post "/articles/:article_id/comments" do
      article_id = params[:article_id]
      user_id = params[:user_id]
      comments = params[:comments]
  
      comment = Comment.new(article_id: article_id, user_id: user_id, comments: comments)
  
      if comment.save
        comment.to_json
      else
        status 500
        { error: "Error saving comment" }.to_json
      end
    end
  
    delete "/articles/:article_id/comments/:comment_id" do
      article_id = params[:article_id]
      comment_id = params[:comment_id]
  
      comment = Comment.find_by(id: comment_id, article_id: article_id)
  
      if comment.nil?
        status 404
        { error: "Comment not found" }.to_json
      else
        comment.destroy
        { message: "Comment deleted successfully" }.to_json
      end
    end
  
    def like
      article = Article.find(params[:article_id])
      article.likes.create(user_id: current_user.id, interaction_type: "like")
      article.increment!(:total_likes)
      redirect_to article_path(article)
    end
  
    def dislike
      article = Article.find(params[:article_id])
      article.likes.create(user_id: current_user.id, interaction_type: "dislike")
      article.decrement!(:total_likes)
      redirect_to article_path(article)
    end
  
    private
  
    def user_params
      params.require(:user).permit(:first_name, :last_name, :user_name, :email, :password)
    end
  
    def comment_params
      params.require(:comment).permit(:content)
    end
  
    def current_user
      User.find(session[:user_id]) if session[:user_id]
    end
  
    def current_article
      Article.find(params[:article_id]) if params[:article_id]
    end
end
  