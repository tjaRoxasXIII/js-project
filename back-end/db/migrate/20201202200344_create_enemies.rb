class CreateEnemies < ActiveRecord::Migration[6.0]
  def change
    create_table :enemies do |t|
      t.string :name
      t.int :hp
      t.int :attack
      t.int :points

      t.timestamps
    end
  end
end
