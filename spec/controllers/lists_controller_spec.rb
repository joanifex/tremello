require 'rails_helper'

RSpec.describe Api::ListsController, type: :controller do

  describe "GET #index" do
    it "returns JSON of all lists" do
      List.create(title: 'title')
      List.create(title: 'title 2')
      get :index
      parsed = JSON.parse(response.body)
      expect(parsed.length).to eq(2)
      expect(parsed.first['title']).to eq(List.first.title)
    end

    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
    it "returns http success" do
      list_params = {list: {title: "title"} }
      post :create, list_params
      expect(response).to have_http_status(:success)
    end

    it "returns JSON of created list" do
      list_params = {list: {title: "title"} }
      post :create, list_params
      parsed = JSON.parse(response.body)
      expect(parsed["title"]).to eq(List.first.title)
    end

    it "returns JSON of errors when create fails" do
      list_params = {list: {title: " "} }
      post :create, list_params
      parsed = JSON.parse(response.body)
      expect(parsed["errors"]["title"].first).to eq("can't be blank")
    end

    it "returns status 401 when create fails" do
      list_params = {list: {title: " "} }
      post :create, list_params
      expect(response).to have_http_status(401)
    end
  end

  describe 'PUT #update' do
    it 'sets the list instance variable' do
      list = List.create(title: "title")
      params = {id: list.id, list: {title: "updated title"}}
      put :update, params
      expect(assigns(:list).id).to eq(list.id)
    end

    it "returns http success" do
      List.create(title: "title")
      params = {id: List.first.id, list: {title: "updated title"}}
      put :update, params
      expect(response).to have_http_status(:success)
    end

    it "updates list" do
      List.create(title: "title")
      params = {id: List.first.id, list: {title: "updated title"}}
      put :update, params
      expect(List.first.title).to eq("updated title")
    end

    it "returns JSON of updated list" do
      List.create(title: "title")
      params = {id: List.first.id, list: {title: "updated title"}}
      put :update, params
      parsed = JSON.parse(response.body)
      expect(parsed["title"]).to eq(List.first.title)
    end

    it "returns JSON of errors when create fails" do
      List.create(title: "title")
      params = {id: List.first.id, list: {title: " "}}
      put :update, params
      parsed = JSON.parse(response.body)
      expect(parsed["errors"]["title"].first).to eq("can't be blank")
    end

    it "returns status 401 when create fails" do
      List.create(title: "title")
      params = {id: List.first.id, list: {title: " "}}
      put :update, params
      expect(response).to have_http_status(401)
    end
  end

  describe 'DELETE #destroy' do

    it 'sets the list instance variable' do
      list = List.create(title: "title")
      delete :destroy, id: list.id
      expect(assigns(:list)).to eq(list)
    end

    it "should destroy a list" do
      List.create(title: 'title')
      expect(List.count).to eq(1)
      delete :destroy, {id: List.first.id}
      expect(List.count).to eq(0)
    end
  end
end
