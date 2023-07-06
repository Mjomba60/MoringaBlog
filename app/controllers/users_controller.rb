require "sinatra/base"
require "bcrypt"

class UsersController < Sinatra::Base
  set :default_content_type, "application/json"

  post "/users" do
    user = User.new(user_params(params[:user]))
    user.password_digest = BCrypt::Password.create(params[:user][:password])

    if user.save
      { message: "Signup successful" }.to_json
    else
      status 400
      { message: "Please signup to continue" }.to_json
      redirect_to "/signup"
    end
  end
  #password_digest handles password encryption and authenitcation
  #The bcrypt gem is used to handle these

  post "/users/authenticate" do
    user = User.find_by(user_name: params[:username])
    password = params[:password]

    if user && BCrypt::Password.new(user.password_digest) == password
      { message: "password is correct" }.to_json
    else
      status 401
      { message: "incorrect password" }.to_json
    end
  end

  #get users
  get "/users/:id" do
    user = User.find(params[:id])
    user.to_json
  end

  #DELETE /users/:id

  delete "/users/:id" do
    user = User.find(params[:id])
    if user.destroy
      { message: "User deleted" }.to_json
    else
      status 500
      { message: "failed to delete user" }.to_json
    end
  end

  private

  def user_params(params)
    params.require(:user).permit(:first_name, :last_name, :user_name, :email, :password)
  end
end
