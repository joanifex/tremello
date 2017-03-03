Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: {format: :json} do
    resources :lists, except: [:show, :new, :edit] do
      resources :cards, except: [:show, :new, :edit]
    end
  end

  get '*unmatched_route', to: 'home#index'
end
