class AddCountryToData < ActiveRecord::Migration
  def change
    add_column :data, :country, :string

  end
end
