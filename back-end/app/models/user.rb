class User < ApplicationRecord
    belongs_to :Scoreboard

    validates :presence, :true
    validates :uniqueness, :true
    
end
