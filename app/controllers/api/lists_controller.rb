class Api::ListsController < ApplicationController
  before_action :set_list, only: [:update, :destroy]

  def index
    render json: List.all
  end

  def create
    list = List.new(list_params)
    if list.save
      render json: list
    else
      render json: {errors: list.errors }, status: 401
    end
  end

  def update
    if @list.update(list_params)
      render json: @list
    else
      render json: { errors: @list.errors }, status: 401
    end
  end

  def destroy
    @list.destroy
    head :no_content
  end


  private

    def set_list
      @list = List.find(params[:id])
    end

    def list_params
      params.require(:list).permit(:title)
    end
end
