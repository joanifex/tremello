class List < ApplicationRecord
  validates_presence_of :title

  has_many :cards, dependent: :destroy
end
