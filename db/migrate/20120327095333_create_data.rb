class CreateData < ActiveRecord::Migration
  def change
    create_table :data do |t|
      t.string :name
			t.string :age
			t.string :country

      t.timestamps
    end
  end
end
