require 'rails_helper'

RSpec.describe Api::ListsController, type: :controller do
  let(:list) { FactoryGirl.create(:list) }

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end

    it "returns JSON of all lists" do
      FactoryGirl.create(:list)
      FactoryGirl.create(:list, title: "title2")
      get :index
      parsed = JSON.parse(response.body)
      expect(parsed.size).to eq(2)
      expect(parsed.first['title']).to eq(List.first.title)
    end
  end

  describe 'POST #create' do
    describe 'success' do
      before(:each) do
        @list_params = {list: {title: "title"} }
      end

      it "returns http success" do
        post :create, params: @list_params
        expect(response).to have_http_status(:success)
      end

      it "returns JSON of created list" do
        post :create, params: @list_params
        parsed = JSON.parse(response.body)
        expect(parsed["title"]).to eq(List.first.title)
      end
    end

    describe 'fails' do
      before(:each) do
        @list_params = {list: {title: " "} }
      end

      it "returns errors JSON" do
        post :create, params: @list_params
        parsed = JSON.parse(response.body)
        expect(parsed["errors"]["title"].first).to eq("can't be blank")
      end

      it "returns status 401 when create fails" do
        post :create, params: @list_params
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'PUT #update' do
    describe 'succeeds' do
      before(:each) do
        @list = List.create(title: "title")
        @params = {id: @list.id, list: {title: "updated title"}}
      end

      it 'sets the list instance variable' do
        put :update, params: @params
        expect(assigns(:list)).to eq(@list)
      end

      it "returns http success" do
        put :update, params: @params
        expect(response).to have_http_status(:success)
      end

      it "updates list" do
        put :update, params: @params
        expect(List.first.title).to eq("updated title")
      end

      it "returns JSON of updated list" do
        put :update, params: @params
        parsed = JSON.parse(response.body)
        expect(parsed["title"]).to eq(List.first.title)
      end
    end

    describe 'fails' do
      before(:each) do
        @list = List.create(title: "title")
        @params = {id: List.first.id, list: {title: " "}}
      end

      it "returns JSON of errors when create fails" do
        put :update, params: @params
        parsed = JSON.parse(response.body)
        expect(parsed["errors"]["title"].first).to eq("can't be blank")
      end

      it "returns status 401 when create fails" do
        put :update, params: @params
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'DELETE #destroy' do
    before(:each) do
      @list = FactoryGirl.create(:list)
    end

    it 'sets the list instance variable' do
      delete :destroy, params: {id: @list.id}
      expect(assigns(:list)).to eq(@list)
    end

    it "should destroy a list" do
      expect(List.count).to eq(1)
      delete :destroy, params: {id: @list.id}
      expect(List.count).to eq(0)
    end
  end
end
