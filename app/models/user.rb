class User < ActiveRecord::Base
    has_many :articles
    has_many :comments

    attribute :user_name, :string
end 