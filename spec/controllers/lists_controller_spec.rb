require 'rails_helper'

RSpec.describe Api::ListsController, type: :controller do

  describe "GET #index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'POST #create' do
     it 'sets the list instance variable' do
       @list = 'list'
       list_params = {list: title}
       post :create, list_params
       expect(:list).to_not eq(nil)
     end
   end
end
