class AddQuestionsToData < ActiveRecord::Migration
  def change
  	add_column :data, :gender, :string
  	add_column :data, :q1, :string
  	add_column :data, :q2, :string
  end
end
