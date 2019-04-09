/* like mutation */
import ACTION from '../actions/actiontsTypes';

const initialState = {
  test: [],
  isFetching: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.GOODS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.GOODS_RESPONSE: {
      return {
        ...state,
        goods: action.goods,
        isFetching: false,
        error: null,
      };
    }


    case ACTION.SINGLE_GOODS_RESPONSE: {
      const oneGoods = action.goods;
      const { goods } = state;
      const goodsIndex = goods.findIndex(g => g._id === oneGoods._id);
      if (goodsIndex === -1) {
        goods.push(oneGoods);
      } else {
        goods[goodsIndex] = oneGoods;
      }
      return {
        ...state,
        goods,
        isFetching: false,
        error: null,
      };
    }


    case ACTION.GOODS_ERROR: {
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    }
    default: {
      return state;
    }
  }
}


