class CreateScoreboards < ActiveRecord::Migration[6.0]
  def change
    create_table :scoreboards do |t|
      t.string :game_name

      t.timestamps
    end
  end
end
