require 'rails_helper'
before_action List.create(title: "title")

RSpec.describe Api::CardsController, type: :controller do

  describe "GET #index" do
    it "returns JSON of all lists" do
      @list.cards.create(body: 'body')
      @list.cards.create(body: 'body 2')
      get :index
      parsed = JSON.parse(response.body)
      expect(parsed.length).to eq(2)
      expect(parsed.first['body']).to eq(@list.cards.first.title)
    end

  it "returns http success" do
    get :index
    expect(response).to have_http_status(:success)
    end
  end





end
