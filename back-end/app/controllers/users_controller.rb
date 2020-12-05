class UsersController < ApplicationController
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by(id: params[:id])
        render json: user
    end

    def create
        user = User.find_or_create_by(username: params[:username], scoreboard_id: params[:scoreboard_id])
        if user 
            user.save
        end 
        render json: user
    end

    def update
        user = User.find_by(username: params[:username])
        if user
            user.top_score = params[:top_score]
            user.save
        end
    end
end
