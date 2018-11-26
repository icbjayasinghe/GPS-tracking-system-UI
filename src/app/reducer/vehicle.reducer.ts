import { Action } from '@ngrx/store';
import { Vehicle } from './../models/table.model';
import * as VehicleAction from './../actions/table.actions';

const initialState: Vehicle = {
    vehicleNumber : '123',
    imei : '1234',
    userName : '12345',
    vehicleDetails : '123456'
}

export function reducer(state: Vehicle[] =[], action: VehicleAction.Actions){
    switch(action.type){
        case VehicleAction.ADD_VEHICLE:
            return [...state, action.payload];
        case VehicleAction.REMOVE_VEHICLE:
            state.splice(action.payload, 1)
            return state;
        default:
            return state;
    }
}


