import React from 'react'
import { useOutletContext, useParams } from "react-router-dom";

export const ConfirmOrder = () => {
    const { uuid } = useParams();
    const props = useOutletContext();
    const salad = props.shoppingCart.find(salad => salad.uuid === uuid);

    console.log(uuid);

    if (salad) {
        return (
            <div className="pt-3 mt-4 alert alert-success alert-dismissable">
                Din sallad har lagts till i varukorgen!
            </div>
        )
    } else {
        return (
            <div className="pt-3 mt-4 text-muted alert alert-danger alert-dismissable">
                Din beställning hittades inte.
            </div>
        )
    }
}