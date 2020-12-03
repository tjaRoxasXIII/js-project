class ScoreboardsController < ApplicationController
    def show
        scoreboard = Scoreboard.first
        render json: scoreboard, include: :users
    end
end
