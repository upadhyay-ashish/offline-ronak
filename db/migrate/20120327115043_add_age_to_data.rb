class AddAgeToData < ActiveRecord::Migration
  def change
    add_column :data, :age, :integer

  end
end
