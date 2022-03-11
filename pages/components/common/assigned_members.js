import React, { useContext, useState, useEffect } from "react";
import { CounterContext } from "../contex/adminProvider";
import Axios from "axios";
import { ListContext } from "../contex/ListProvider";
export default function AssignedMenber(props) {
    const { removeTeammember, designTeamList } = useContext(CounterContext)
    const { team } = useContext(ListContext)
    return (
        <div className="mt-3 row">
            {team.filter(val => {
                for (let i = 0; i <= 20; i++) {
                    if (val.teamId === designTeamList[i]) {
                        return val;
                    }
                }
            }).map((product) =>
                <div className="assignTeam-m me-1 col " key={product.teamId}>
                    <div>{product.Email}</div> <button className="removeTeammember" onClick={() => removeTeammember(product.teamId)}>X</button>
                </div>
            )}
        </div>
    )
}