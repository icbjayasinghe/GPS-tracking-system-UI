import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Vehicle } from '../models/table.model';

export const ADD_VEHICLE = '[VEHICLE] Add';
export const REMOVE_VEHICLE = '[VEHICLE] Remove';

export class AddVehicle implements Action {
    readonly type = ADD_VEHICLE;

    constructor(public payload: Vehicle){}
}

export class RemoveVehicle implements Action {
    readonly type = REMOVE_VEHICLE;

    constructor(public payload: number){}
}

export type Actions = AddVehicle | RemoveVehicle;