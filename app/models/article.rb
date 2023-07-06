class Article < ActiveRecord::Base
    has_many :likes
    has_many :comments
    has_many :users, through: :comments
end