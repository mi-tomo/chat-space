Rails.application.routes.draw do
  devise_for :users
  
  resources :users, only: [:edit, :update,:index]
  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
    namespace :api do
      resources :messages, only: :index, defaults: { format: 'json' }
    end

  end

  root to: 'groups#index'

end
