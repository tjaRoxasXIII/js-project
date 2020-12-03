class CreateEnemies < ActiveRecord::Migration[6.0]
  def change
    create_table :enemies do |t|
      t.string :name
      t.integer :hp
      t.integer :attack
      t.integer :points

      t.timestamps
    end
  end
end
