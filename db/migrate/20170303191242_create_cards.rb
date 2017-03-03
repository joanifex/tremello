class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.belongs_to :list
      t.string :body


      t.timestamps
    end
  end
end
