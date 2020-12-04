class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def create
        user = User.find_or_create_by(username: params[:username], scoreboard_id: params[:scoreboard_id])
        if user 
            user.save
        end 
        render json: user
    end
end
