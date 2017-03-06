require 'rails_helper'

RSpec.describe List, type: :model do
  describe 'attributes' do
    it 'has a title' do
      title = 'title'
      list = List.create(title: title)
      expect(list.title).to eq(title)
    end
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:title)}
  end
end
