import Vue from "vue";
import Vuex from "vuex";
import MarketplaceItemModel from "./models/marketplaceItemModel";
import performItemsFiltering from "./utils/filter";
import { resetPaging, addNextPage } from "./utils/pager";

export const updateAllItemsMutation = "updateAllItems";
export const updateFilteredItemsMutation = "updateFilteredItems";
export const updateItemsToShowMutation = "updateItemsToShow";
export const updateTagsCountMutation = "updateTagsCount";

export const updateFilterPassphraseMutation = "updateFilterPassphrase";
export const addNextPageInPagerListingMutation = "addNextPageInPagerListing";
export const updatePagerLastItemIndexMutation = "updatePagerLastItemIndex";

export const initItemsStateAction = "initItemsState";
export const addPageAction = "addPage";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {
      allItems: Array<MarketplaceItemModel>(),
      filteredItems: Array<MarketplaceItemModel>(),
      itemsToShow: Array<MarketplaceItemModel>(),
      tagsCount: new Map<string, number>()
    },
    filter: {
      searchPhrase: ""
    },
    pager: {
      lastItemIndex: 0
    }
  },
  mutations: {
    updateAllItems(state, allItems: Array<MarketplaceItemModel>) {
      state.data.allItems = allItems;
    },
    updateFilteredItems(state, filteredItems: Array<MarketplaceItemModel>) {
      state.data.filteredItems = filteredItems;
    },
    updateItemsToShow(state, itemsToShow: Array<MarketplaceItemModel>) {
      state.data.itemsToShow = itemsToShow;
    },
    updateTagsCount(state, tagsCount: Map<string, number>) {
      state.data.tagsCount = tagsCount;
    },
    updateFilterSearchPhrase(state, newSearchPhrase: string) {
      state.filter.searchPhrase = newSearchPhrase;
    },
    updatePagerLastItemIndex(state, lastItemIndex) {
      state.pager.lastItemIndex = lastItemIndex;
    }
  },
  getters: {
    allItems: state => state.data.allItems,
    filteredItems: state => state.data.filteredItems,
    itemsToShow: state => state.data.itemsToShow,
    tagsCount: state => state.data.tagsCount,
    filterSearchphrase: state => state.filter.searchPhrase,
    pagerLastItemIndex: state => state.pager.lastItemIndex
  },
  actions: {
    initItemsState(context, allItems) {
      context.commit(updateAllItemsMutation, allItems);
      context.commit(updateFilteredItemsMutation, allItems);
      resetPaging();
    },
    updateFilterPassphrase(context, newSearchPhrase: string) {
      context.commit(updateFilterPassphraseMutation, newSearchPhrase);
    },
    filterItems(_, searchPhrase) {
      performItemsFiltering(searchPhrase);
    },
    addPage(_, tmp) {
      addNextPage();
    }
  }
});
