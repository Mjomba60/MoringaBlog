class ArticleController < ApplicationController
    set :default_content_type, "application/json"
  
    get "/articles" do
      articles = Article.all
      articles.to_json(include: { comments: { include: :user } })
    end
  
    get "/articles/:id" do
      article = Article.find(params[:id])
      article.to_json(include: { comments: { include: :user } })
    end
  
    post "/articles" do
      article = Article.create(params)
      article.to_json(include: { comments: { include: :user } })
    end
  
    put "/articles/:id" do
      article = Article.update(params[:id], params.filter { |k, v| v != params })
      article.to_json
    end
  end
  