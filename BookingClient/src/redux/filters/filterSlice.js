import { createSlice } from '@reduxjs/toolkit'

const toDay = new Date();
const initialState={
    filters:{
        sort:{
            SortBy:null,
            IsAscending:null
        },
        filter:{
            TypeIds:null,
            NeighborhoodIds:null,
            RoomFacilityIds:null,
            FacilityIds:null,
            ReviewRate:null,
            PriceTo:null,
            PriceFrom:null,
        },
        pagination:{
            PageIndex:null,
            PageSize:null,
        },
        search:{
            Geographycal_Id:1,
            CheckInDate:(toDay.getMonth()+1)+'/'+toDay.getDate()+'/'+toDay.getFullYear(),
            CheckOutDate:(toDay.getMonth()+1)+'/'+toDay.getDate()+'/'+toDay.getFullYear(),
            PeopleNum:1
        }
    }
}

const filtersSlice= createSlice({
    name:'filters',
    initialState,
    reducers:{
        setFiltersFilter:(state,action)=>{
            state.filters.filter = action.payload;
        },
        setFiltersSort:(state,action) =>{
            if(action.payload=='toppick')
            {
             state.filters.sort={
                SortBy:action.payload,
                IsAscending:false
             }
            }
            if(action.payload=='priceAsc')
            {
             state.filters.sort={
                SortBy:action.payload,
                IsAscending:true
             }
            }
            if(action.payload=='priceDesc')
            {
             state.filters.sort={
                SortBy:action.payload,
                IsAscending:false
             }
            }
            if(action.payload=='ratingDesc')
            {
             state.filters.sort={
                SortBy:action.payload,
                IsAscending:false
             }
            }
        },
        setFiltersSearch:(state,action)=>{
            state.filters.search = action.payload;
        },
        setFiltersPagination: (state,action) =>{
            state.filters.pagination= action.payload;
        },
        resetFilters:(state)=>{
            state.filters=initialState.filters
        },
        resetFiltersFilter:(state)=>{
            state.filters.filter=initialState.filters.filter
        },
    }
})
export const {setFiltersFilter,setFiltersPagination,setFiltersSearch,setFiltersSort,resetFilters,resetFiltersFilter} = filtersSlice.actions;
export default filtersSlice.reducer