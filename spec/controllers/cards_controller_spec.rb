require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  let(:list) { FactoryGirl.create(:list) }
  let(:card) { FactoryGirl.create(:card) }

  before(:each) do
    @list = FactoryGirl.create(:list)
  end

  describe "GET #index" do
    it "returns http success" do
      get :index, params: {list_id: @list.id}
      expect(response).to have_http_status(:success)
    end

    it "sets the list instance variable" do
      get :index, params: {list_id: @list.id}
      expect(assigns(:list)).to eq(@list)
    end

    it "returns JSON of all cards" do
      @list.cards.create(body: 'body')
      @list.cards.create(body: 'body2')
      get :index, params: {list_id: @list.id}
      parsed = JSON.parse(response.body)
      expect(parsed.size).to eq(2)
      expect(parsed.first['body']).to eq(@list.cards.first.body)
    end
  end

  describe 'POST #create' do

    it "sets the list instance variable" do
      get :index, params: {list_id: @list.id}
      expect(assigns(:list)).to eq(@list)
    end

    describe 'success' do
      before(:each) do
        @params = { list_id: @list.id, card: {body: "body"}}
      end

      it "returns http success" do
        post :create, params: @params
        expect(response).to have_http_status(:success)
      end

      it "creates a new card" do
        expect(Card.count).to eq(0)
        post :create, params: @params
        expect(Card.count).to eq(1)
      end

      it "returns JSON of created body" do
        post :create, params: @params
        parsed = JSON.parse(response.body)
        expect(parsed["body"]).to eq(Card.first.body)
      end
    end

    describe 'fails' do
      before(:each) do
        @params = { list_id: @list.id, card: {body: ""}}
      end

      it "returns errors JSON" do
        post :create, params: @params
        parsed = JSON.parse(response.body)
        expect(parsed["errors"]["body"].first).to eq("can't be blank")
      end

      it "returns status 401 when create fails" do
        post :create, params: @params
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'PUT #update' do

    it "sets the list instance variable" do
      get :index, params: {list_id: @list.id}
      expect(assigns(:list)).to eq(@list)
    end

    describe 'succeeds' do
      before(:each) do
        @card = @list.cards.create(body: "body")
        @card_params = {
          list_id: @list.id,
          id: @card.id,
          card: {body: "updated body"}
        }
      end

      it 'sets the card instance variable' do
        put :update, params: @card_params
        expect(assigns(:card)).to eq(@card)
      end

      it "returns http success" do
        put :update, params: @card_params
        expect(response).to have_http_status(:success)
      end

      it "updates card" do
        put :update, params: @card_params
        expect(Card.first.body).to eq("updated body")
      end

      it "returns JSON of updated list" do
        put :update, params: @card_params
        parsed = JSON.parse(response.body)
        expect(parsed["body"]).to eq(Card.first.body)
      end
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do
      @card = @list.cards.create(body: "body")
      @params = {list_id: @list.id, id: @card.id}
    end

    it 'sets the list instance variable' do
      delete :destroy, params: @params
      expect(assigns(:card)).to eq(@card)
    end

    it "should destroy a list" do
      expect(Card.count).to eq(1)
      delete :destroy, params: @params
      expect(Card.count).to eq(0)
    end
  end
end
