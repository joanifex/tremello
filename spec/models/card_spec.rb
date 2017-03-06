require 'rails_helper'

RSpec.describe Card, type: :model do
  describe 'attributes' do
    it 'has a body' do
      body = 'body'
      card = Card.create(body: body)
      expect(card.body).to eq(body)
    end
  end

  describe 'validations' do
    it { is_expected.to validate_presence_of(:body)}
  end
end
