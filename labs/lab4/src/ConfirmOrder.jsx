import React from 'react'
import { useOutletContext, useParams } from "react-router-dom";

export const ConfirmOrder = () => {
    const uuid  = useParams();
    const props = useOutletContext();
    const salad = props.shoppingCart.find(salad => salad.uuid === uuid.id);

    if (salad) {
        return (
            <div className="mt-3 alert alert-success alert-dismissible fade show" role="alert">
                <p>Din sallad har lagts till i varukorgen!</p>
            </div>
        )
    } else {
        return (
            <div className="mt-3 alert alert-danger alert-dismissible fade show" role="alert">
               <p>Din beställning hittades inte.</p>
            </div>
        )
    }
}